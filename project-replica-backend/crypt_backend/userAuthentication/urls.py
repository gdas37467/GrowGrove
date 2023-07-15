from django.urls import path
from userAuthentication import views

urlpatterns = [
    # user authentication | endpoint : user/auth/signup
    path('signup/', views.signup_view, name="signup"),

    # user authentication | endpoint : user/auth/signin
    path('signin/', views.signin_view , name="signin"),
    path('deposit/', views.depositView , name="deposit")
]