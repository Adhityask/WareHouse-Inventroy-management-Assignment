from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone

class ProductMaster(models.Model):  
    product_id = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} ({self.sku})"

    class Meta:
        db_table = "prodmast"
        verbose_name = "Product"
        verbose_name_plural = "Products"


class StockTransaction(models.Model):  
    transaction_id = models.AutoField(primary_key=True)  
    TRANSACTION_TYPE_CHOICES = (
        ('IN', 'Stock In'),
        ('OUT', 'Stock Out'),
    )
    transaction_type = models.CharField(max_length=3, choices=TRANSACTION_TYPE_CHOICES)
    timestamp = models.DateTimeField(default=timezone.now)
    reference_note = models.TextField(blank=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        db_table = "stckmain"
        verbose_name = "Stock Transaction"
        verbose_name_plural = "Stock Transactions"


class StockDetail(models.Model):  # Table: stckdetail
    detail_id = models.AutoField(primary_key=True)  # Custom PK
    transaction = models.ForeignKey(StockTransaction, on_delete=models.CASCADE, related_name="details")
    product = models.ForeignKey(ProductMaster, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} - Qty: {self.quantity}"

    class Meta:
        db_table = "stckdetail"
        verbose_name = "Stock Detail"
        verbose_name_plural = "Stock Details"
        constraints = [
            models.CheckConstraint(check=models.Q(quantity__gt=0), name="quantity_positive")
        ]
