from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from .models import ProductMaster, StockTransaction, StockDetail
from .serializers import ProductSerializer, StockTransactionSerializer


# Create your views here.



@api_view(['GET', 'POST'])
def product_list_create(request):
    if request.method == 'GET':
        products = ProductMaster.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    try:
        product = ProductMaster.objects.get(product_id=pk)
    except ProductMaster.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=204)


@api_view(['GET', 'POST'])
def transaction_list_create(request):
    if request.method == 'GET':
        transactions = StockTransaction.objects.all().order_by('-timestamp')
        serializer = StockTransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StockTransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def inventory_summary(request):
    products = ProductMaster.objects.all()
    data = []

    for product in products:
        in_qty = StockDetail.objects.filter(
            product=product, transaction__transaction_type='IN'
        ).aggregate(total=Sum('quantity'))['total'] or 0

        out_qty = StockDetail.objects.filter(
            product=product, transaction__transaction_type='OUT'
        ).aggregate(total=Sum('quantity'))['total'] or 0

        stock = in_qty - out_qty

        data.append({
            "product_id": product.product_id,
            "name": product.name,
            "sku": product.sku,
            "stock": stock
        })

    return Response(data)
