from django.urls import path
from .views import *

urlpatterns = [
    path('products/', product_list_create),
    path('products/<int:pk>/', product_detail),
    path('transactions/', transaction_list_create),
    path('inventory/', inventory_summary),
]