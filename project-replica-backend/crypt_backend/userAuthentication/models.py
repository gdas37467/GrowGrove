from django.db import models
# Create your models here.
import uuid
from decimal import Decimal
from djongo.storage import GridFSStorage
from django.conf import settings

grid_fs_storage = GridFSStorage(collection='deposit_files', base_url='/media/')
# Create your models here.
class UserModelDB(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    username = models.TextField()
    sponsorName = models.TextField()
    referralLink = models.TextField()
    registrationDate = models.DateField()
    walletAddress = models.TextField(default="Address not set yet")
    
    # Newly added
    is2fa = models.BooleanField(default=False)
    base_64_qr = models.TextField(default="",max_length=5000)
    secret_key = models.TextField(default="",max_length=200)


   

    def __str__(self) :
        return self.username
    
class ReferralDB(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.TextField()
    level1 = models.JSONField()
    level2 = models.JSONField()
    bonus1 =models.IntegerField(default=0)
    instant1 =models.IntegerField(default=0) #Instant bonus on referral
    instant2 = models.IntegerField(default=0) # Instant bonus on Referral
    bonus2= models.IntegerField(default=0)
    

    def __str__(self) :
        return self.username

class Mypackages(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    username = models.TextField()
    packages = models.JSONField()
    t_packages = models.PositiveIntegerField(default=0)
    t_earning = models.DecimalField(default=Decimal("0.00"),max_digits=50, decimal_places=2)
    t_bonus = models.DecimalField(default=Decimal("0.00"),max_digits=50, decimal_places=2)
    current_balance = models.DecimalField(default=Decimal("0.00"),max_digits=50, decimal_places=2)
    
    def __str__(self) :
        return self.username


class Deposit(models.Model) :
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    username = models.TextField()
    quantity = models.PositiveIntegerField(default=0)
    transactionId = models.TextField(default="N/A")
    payment_id = models.TextField("N/A")
    date = models.DateTimeField()
    status = models.TextField(default='pending')
    earning = models.DecimalField(default=Decimal("0.00"),max_digits=50, decimal_places=2)
    file = models.FileField(default=None, upload_to='deposit', storage=grid_fs_storage)
    
    

    
    def __str__(self) : 
        return self.username
    
class Withdraw(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    username =models.TextField()
    amount = models.DecimalField(default=Decimal("0.00"),max_digits=50, decimal_places=2)
    status = models.TextField(default='pending')
    date = models.DateTimeField()
    walletAddress = models.TextField(default=" ")

    def __str__(self) : 
        return self.username

# class Lists(models.Model) : 
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
#     username = models.TextField()
#     depositList  = models.JSONField()
#     withdrawList = models.JSONField()
     
#     



