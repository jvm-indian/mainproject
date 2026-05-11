from django.db import models
import uuid

class UserRole(models.TextChoices):
    ADMIN = 'Admin', 'Admin'
    SHG_WORKER = 'SHG_Worker', 'SHG Worker'
    INSTITUTION = 'Institution', 'Institution'

class WasteCategory(models.TextChoices):
    ORGANIC = 'Organic', 'Organic'
    PLASTIC = 'Plastic', 'Plastic'
    RECYCLABLE = 'Recyclable', 'Recyclable'
    UNSEGREGATED = 'Unsegregated', 'Unsegregated'

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=UserRole.choices)
    email = models.EmailField(unique=True, null=True, blank=True)
    digital_wallet_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    institution_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

class SmartBin(models.Model):
    id = models.CharField(max_length=50, primary_key=True) # e.g., '1jb23cs192'
    location_lat = models.DecimalField(max_digits=9, decimal_places=6)
    location_lng = models.DecimalField(max_digits=9, decimal_places=6)
    fill_level_percentage = models.IntegerField(default=0)
    battery_health = models.IntegerField(default=100)
    network_status = models.CharField(max_length=50, default='Online')
    installed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bin {self.id} - Fill: {self.fill_level_percentage}%"

class WasteLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    smart_bin = models.ForeignKey(SmartBin, on_delete=models.CASCADE, related_name='waste_logs')
    image_hash = models.CharField(max_length=255, null=True, blank=True)
    classification = models.CharField(max_length=20, choices=WasteCategory.choices)
    weight_kg = models.DecimalField(max_digits=8, decimal_places=3)
    moisture_level = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.classification} ({self.weight_kg}kg) at {self.smart_bin.id}"

class Collection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shg_worker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='collections')
    smart_bin = models.ForeignKey(SmartBin, on_delete=models.SET_NULL, null=True, related_name='collections')
    total_weight_kg = models.DecimalField(max_digits=8, decimal_places=3)
    purity_score = models.IntegerField()
    payout_amount = models.DecimalField(max_digits=10, decimal_places=2)
    collection_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Collection by {self.shg_worker.name} - {self.total_weight_kg}kg"

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    material_source = models.CharField(max_length=100, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    listed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
