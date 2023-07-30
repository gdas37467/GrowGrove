from django.urls import path
from userAuthentication import views

urlpatterns = [
    # user authentication | endpoint : user/auth/signup
    path('signup/', views.signup_view, name="signup"),

    # user authentication | endpoint : user/auth/signin
    path('signin/', views.signin_view , name="signin"),
    path('deposit/', views.depositView , name="deposit"),
    path('get-myPackages/',views.get_myPackages, name = "getMypackages"),
    path('get-referrals/',views.get_refferals,name ='Get Referral List'),
    path('withdraw/',views.withdrawView,name = "Withdrawal API"),
    path('get-user-withdraw/',views.get_user_withdraw, name = "User withdraw list"),
    path('get-user-deposit/',views.get_user_deposit, name = "User deposit list"),
    path('get-user-details/',views.get_user_all, name = "get user details"),
    path('get-wallet-details/',views.get_wallet_details,name= " Wallet Details"),
    path('buy-package/',views.buy_package, name="Buy package from balance"),
    path('set-wallet-address/',views.set_wallet_address,name="set walllet address")
    
]