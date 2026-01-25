from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
import yfinance as yf
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt 
from datetime import datetime, timedelta
import os
from django.conf import settings

# Create your views here.

@extend_schema(
    tags=['Stock Prediction'],
    request={
        "application/json": StockPredictionSerializer,
        },
    responses={201: StockPredictionSerializer},
)
class StockPredictionView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            # Fetch the data from yfinance API
            now = datetime.now()
            start = datetime(now.year - 12, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            #print(df)
            if df.empty:
                return Response({'error': 'Invalid ticker symbol or no data found.'}, status=status.HTTP_400_BAD_REQUEST)
            df = df.reset_index()
            # Generate Basic Plot
            plt.switch_backend('Agg')  # Use a non-interactive backend  
            plt.figure(figsize=(14,7))
            plt.plot(df.Close, label='closing Price')
            plt.title(f'Closing Price History for {ticker}')
            plt.xlabel("Date")
            plt.ylabel("Closing Price")
            plt.legend()
            plt.grid()
            # Save the plot to a file
            plot_filename = f'stock_prediction/{ticker}_chart.png'
            image_path = os.path.join(settings.MEDIA_ROOT, plot_filename)
            plt.savefig(image_path)
            plt.close()
            plot_img = settings.MEDIA_URL + plot_filename
            print(f"Plot saved to {plot_img}")

            return Response({'status': 'success', 'ticker': ticker, 'plot_img': plot_img}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)