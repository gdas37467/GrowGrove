from django.urls import path
from adminpanel import views

urlpatterns = [
    # admin pending deposit request fetch
    path('get_admin_deposit/', views.get_admin_deposit, name="admin deposit"),
    path('approve_deposit/', views.approve_deposit, name="approve deposit"),
    path('approve_withdraw/',views.approve_withdraw,name = "Approve WIthdraws"),
    path('send-otp/',views.send_otp,name = "send otp"),
    path('verify-otp/',views.verify_otp,name = "verify otp"),
    path('resend-otp/',views.resend_otp,name = "resend otp")

]