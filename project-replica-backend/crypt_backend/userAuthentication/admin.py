from django.contrib import admin

from .models import UserModelDB,ReferralDB,Deposit,Mypackages
# Register your models here.
admin.site.register(UserModelDB)
admin.site.register(ReferralDB)
admin.site.register(Deposit)
admin.site.register(Mypackages)
