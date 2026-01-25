from django.urls import path
from .views import StockPredictionView

app_name = 'stock_prediction'

urlpatterns = [
    path('predict/', StockPredictionView.as_view(), name='stock-predict'),
]