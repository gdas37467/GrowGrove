from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserModelDB,ReferralDB,Deposit,Mypackages
import json
from django.contrib.auth import authenticate, login
import jwt
import datetime
import uuid
import pytz


secret_key = "CRYPT_PROJECT"

# Route 1: Sign-Up-User View Function
@csrf_exempt
def signup_view(request):

    if request.method == 'POST':

        # grab the email and password from request
        body = json.loads(request.body)
        username = body['username']
        email = body['email']
        password = body['password']
        firstName = body['firstName'],
        lastName = body['lastName'],
        sponsorName = body['sponsorName']
        # print(body['username'])
        # print(body['email'])
        # print(body['password'])

        # check if email and password is not null
        if not username or not email or not password:
            return JsonResponse({'error':'Username and Password are required.'},status=500)
        
        # check if username already exists
        try:
            User.objects.get(username=username)
            return JsonResponse({'error': 'Username already exists.'},status=500)
        except User.DoesNotExist:
            pass

        try:
            user = User.objects.get(email=email)
            return JsonResponse({'error': 'Email already exists.'},status=500)
        except User.DoesNotExist:
            
            # if all okay, create a user object
            user = User(username=username, email=email,first_name = firstName, last_name = lastName)
            user.set_password(password)
            
            #profile obejct for UserModelDB
            profile = UserModelDB(email=email,username=username,sponsorName=sponsorName,registrationDate=datetime.date.today(), referralLink={"http://localhost:3000/sign-up/" + username})
            
            #push user to referralTable
            referralTable = ReferralDB(username=username)
            mypackagesDB = Mypackages(username=username)

            #check if the sponsorname is valid
            validSponsor = UserModelDB.objects.filter(username=sponsorName).first()
            #push to referralDB
            if sponsorName != 'none' and validSponsor!=None :
                sponsor = ReferralDB.objects.filter(username=sponsorName).first()
                #print(sponsor)
                l1 = []
                if sponsor.level1 != None:
                    l1 = json.loads(sponsor.level1)
                    l1.append(username)
                    sponsor.level1 = json.dumps(l1)
                    sponsor.save()
                else :
                    l1.append(username)
                    sponsor.level1 = json.dumps(l1)
                    sponsor.save()
                
                supersponorNameObj = UserModelDB.objects.filter(username=sponsorName).first()
                #print(supersponorNameObj.email)
                supersponorName = supersponorNameObj.sponsorName
                if supersponorName != "none":
                    supersponor = ReferralDB.objects.filter(username=supersponorName).first()
                    l2 = []
                    if supersponor.level2 != None:
                        l2 = json.loads(supersponor.level2)
                        l2.append(username)
                        supersponor.level2 = json.dumps(l2)
                        supersponor.save()
                    else :
                        l2.append(username)
                        supersponor.level2 = json.dumps(l2)
                        supersponor.save()
            

            
            # save it to database
            referralTable.save()
            profile.save()
            user.save()
            mypackagesDB.save()
            
            # Create JWT token
            token = jwt.encode({'email': email}, secret_key, algorithm='HS256')
            return JsonResponse({'success':'user successfully signed up','token': token},status=200)
    
    return JsonResponse({'error':'Invalid Request'})

# Route 2: Sign-in-User View Function
@csrf_exempt
def signin_view(request):
    
    if request.method == 'POST':
        # Parse the request body as JSON
        body = json.loads(request.body)
        
        email = body['email']
        password = body['password']
        print(email)
        print(password)
        
        # Authenticate user
        user = authenticate(request, email=email, password=password)
        print(user)
        
        if user is not None:
            # Log in the authenticated user
            login(request, user)

            # Create JWT token
            token = jwt.encode({'email': email}, secret_key, algorithm='HS256')
            
            return JsonResponse({'success': 'Login successful','token': token},status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'},status=401)
    
    return JsonResponse({'error':'Invalid Request'})

@csrf_exempt 
def depositView(request):
    if request.method == "POST":
        token = request.headers.get("token")
        
        if not token:
            return JsonResponse({'error': 'Token not provided',},status=401)
        
        try:
            # Verify the token
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'},status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'},status=401)
        
        username = UserModelDB.objects.filter(email = userIdEmail).first().username
        
        body = json.loads(request.body)
        quantity = body['quantity']
        transaction_id = body['transaction_id']
        payment_id = body['payment_id']
        dateObj = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata'))
        iso_format = "%Y-%m-%d %H:%M:%S"
        date  = datetime.datetime.strftime(dateObj, iso_format)
        
        
        try : 
            deposit = Deposit(
                id=str(uuid.uuid4()),
                username = username,
                quantity = quantity,
                transactionId = transaction_id,
                date = date
            
            )
           
            deposit.save()
            
        except Exception as e:
            return JsonResponse({'error' : 'Error while saving the data'},status = 400)
      
        return JsonResponse({'success'  : 'Deposite details stored successfully'} ,status=200)
        
    return JsonResponse({'error': 'Invalid request method.'},status = 400)




