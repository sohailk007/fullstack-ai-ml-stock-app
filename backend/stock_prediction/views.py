from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema

import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

from .serializers import StockPredictionSerializer
from .utils import save_plot

from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model

@extend_schema(
    tags=["Stock Prediction"],
    request={"application/json": StockPredictionSerializer},
    responses={200: StockPredictionSerializer},
)
class StockPredictionView(APIView):
    """
    API endpoint to fetch full historical stock data,
    generate charts, and return image URLs.
    """

    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ticker = serializer.validated_data["ticker"]

        # -------------------- Fetch Full Historical Data --------------------
        df = yf.download(ticker, period="max")

        if df.empty:
            return Response(
                {"error": "Invalid ticker symbol or no data found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        df = df.reset_index()

        # -------------------- Generate Closing Price Plot --------------------
        plt.switch_backend("Agg")
        plt.figure(figsize=(14, 7))
        plt.plot(df["Date"], df["Close"], label="Closing Price")
        plt.title(f"Closing Price History for {ticker}")
        plt.xlabel("Date")
        plt.ylabel("Price")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        price_plot_filename = f"stock_prediction/{ticker}_price_chart.png"
        price_plot_img = save_plot(price_plot_filename)

        # -------------------- Calculate EMAs --------------------
        df["EMA_50"] = df["Close"].ewm(span=50, adjust=False).mean()
        df["EMA_200"] = df["Close"].ewm(span=200, adjust=False).mean()

        # -------------------- Generate EMA Plot --------------------
        plt.figure(figsize=(14, 7))
        plt.plot(df["Date"], df["Close"], label="Close Price")
        plt.plot(df["Date"], df["EMA_50"], label="50-day EMA")
        plt.plot(df["Date"], df["EMA_200"], label="200-day EMA")
        plt.title(f"{ticker} Price with Moving Averages", fontsize=20)
        plt.xlabel("Date", fontsize=14)
        plt.ylabel("Price (USD)", fontsize=14)
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        ema_plot_filename = f"stock_prediction/{ticker}_ema_chart.png"
        ema_plot_img = save_plot(ema_plot_filename)
        
        # Splitting the data into training and testing sets
        training_data = pd.DataFrame(df.Close[0:int(len(df)*0.70)])
        testing_data = pd.DataFrame(df.Close[int(len(df)*0.70): int(len(df))])
        
        # Scaling down the data between 0 and 1
        scaler = MinMaxScaler(feature_range=(0,1))
        
        # Load ML Model
        model = load_model('stock_prediction_model.keras')
        
        # Prepare testing data
        past_100_days = training_data.tail(100)
        final_df = pd.concat([past_100_days, testing_data], ignore_index=True)
        input_data = scaler.fit_transform(final_df)
        
        x_test = []
        y_test = []

        for i in range(100, input_data.shape[0]):
            x_test.append(input_data[i-100: i])
            y_test.append(input_data[i, 0])
        x_test, y_test = np.array(x_test), np.array(y_test)
        
        # Making Predictions
        y_predicted = model.predict(x_test)
        
        # Revert the scaled prices to original prices
        y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
        y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
        
        print(y_predicted)
        print(y_test)

        # -------------------- API Response --------------------
        return Response(
            {
                "status": "success",
                "ticker": ticker,
                "price_chart": price_plot_img,
                "ema_chart": ema_plot_img,
                "first_trading_date": str(df["Date"].min().date()),
            },
            status=status.HTTP_200_OK,
        )
