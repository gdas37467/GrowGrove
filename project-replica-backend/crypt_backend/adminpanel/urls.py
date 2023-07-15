from django.urls import path
from adminpanel import views

urlpatterns = [
    # admin pending deposit request fetch
    path('get_admin_deposit/', views.get_admin_deposit, name="admin deposit"),
    path('approve_deposit/', views.approve_deposit, name="approve deposit")
]