from rest_framework import serializers
from .models import ProductMaster, StockTransaction, StockDetail
from django.db.models import Sum

# Serializer for ProductMaster (prodmast)
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMaster
        fields = ['product_id', 'name', 'sku', 'description', 'created_at']


# Serializer for StockDetail (used nested in transactions)
class StockDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockDetail
        fields = ['detail_id', 'product', 'quantity']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0.")
        return value


# Main serializer for StockTransaction (stckmain)
class StockTransactionSerializer(serializers.ModelSerializer):
    details = StockDetailSerializer(many=True, write_only=True)

    class Meta:
        model = StockTransaction
        fields = ['transaction_id', 'transaction_type', 'timestamp', 'reference_note', 'details']

    def validate(self, data):
        """
        Validates that:
        - Transaction type is valid (IN or OUT)
        - Stock is available for each product on OUT
        """
        transaction_type = data.get('transaction_type')
        details = data.get('details')

        if not details:
            raise serializers.ValidationError("At least one product must be included in the transaction.")

        if transaction_type == 'OUT':
            for item in details:
                product = item['product']
                quantity = item['quantity']

                # Calculate current stock for this product
                in_qty = StockDetail.objects.filter(
                    product=product, transaction__transaction_type='IN'
                ).aggregate(total=Sum('quantity'))['total'] or 0

                out_qty = StockDetail.objects.filter(
                    product=product, transaction__transaction_type='OUT'
                ).aggregate(total=Sum('quantity'))['total'] or 0

                available = in_qty - out_qty
                if quantity > available:
                    raise serializers.ValidationError(
                        f"Not enough stock for '{product.name}'. Available: {available}, Requested: {quantity}"
                    )

        return data

    def create(self, validated_data):
        """
        Create transaction and nested stock details
        """
        details_data = validated_data.pop('details')
        transaction = StockTransaction.objects.create(**validated_data)

        for detail in details_data:
            StockDetail.objects.create(transaction=transaction, **detail)

        return transaction
