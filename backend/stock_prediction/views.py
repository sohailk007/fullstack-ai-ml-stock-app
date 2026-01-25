from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema

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
            return Response({'status': 'success', 'ticker': ticker}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)