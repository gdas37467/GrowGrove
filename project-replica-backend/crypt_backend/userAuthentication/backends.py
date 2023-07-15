from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

# user = authenticateEmail(request, email=email, password=password)

# custom email authentication backend class
class EmailBackend(ModelBackend): # EmailBackend inheriths ModelBackend
    # Implement the authenticate method:
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None

