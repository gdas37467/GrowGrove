from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserModelDB,ReferralDB,Deposit,Mypackages,Withdraw
import json
from django.contrib.auth import authenticate, login
import jwt
import datetime
import uuid
import pytz
from decimal import Decimal






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
            profile = UserModelDB(email=email,username=username,sponsorName=sponsorName,registrationDate=datetime.date.today(), referralLink='http://localhost:3000/sign-up/' + username)
            
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

#Withdraw View
@csrf_exempt 
def withdrawView(request):
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
        amount = body['amount']
        dateObj = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata'))
        iso_format = "%Y-%m-%d %H:%M:%S"
        date  = datetime.datetime.strftime(dateObj, iso_format)
        
        
        try : 
            withdraw = Withdraw(
                id=str(uuid.uuid4()),
                username = username,
                amount = float(amount),
                date = date
            
            )
           
            withdraw.save()
            
        except Exception as e:
            return JsonResponse({'error' : 'Error while saving the data'},status = 400)
      
        return JsonResponse({'success'  : 'Withdraw details stored successfully'} ,status=200)
        
    return JsonResponse({'error': 'Invalid request method.'},status = 400)

#Get user withdrawal List

@csrf_exempt
def get_user_withdraw(request) : 
    if request.method == 'GET':
          #token verification
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'})
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'})
        
        try:
            username = User.objects.filter(email = userIdEmail).first()
            print(username)
            withdraw  = Withdraw.objects.filter(username = username )
            userpackageObj = Mypackages.objects.filter(username=username).first()
            current_balance = float(Decimal(str(userpackageObj.current_balance)))
            # print(deposit)
            # if(deposit == None) : 
            #     return JsonResponse({'error': 'Empty' },status = 500)

        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Error occurred while retriving pending deposit requests.'},status=400)
        else:
            withdrawals = []

            for item in withdraw:
                if item.status == 'confirmed' : 
                    status = 'Active'
                if item.status == 'expired' : 
                    status = 'Expired'
                if item.status == 'pending' :
                    status = 'Pending'

                withdrawals.append({
                    'id' : str(item.id),
                   
                    'amount' : float(Decimal(str(item.amount))),
                    'date' : item.date.date(),
                    'status' : status


                    }

                )
            withdrawals.reverse()
              
            return JsonResponse({
                    'success': 'Withdrawal List fetched successfully',
                    'transactions' : withdrawals,
                    'current_balance' : current_balance
                },status=200, safe=False)

    return JsonResponse({'error' : 'Invalid request method' } ,status=400)

#get user deposit list

@csrf_exempt
def get_user_deposit(request) : 
    if request.method == 'GET':
          #token verification
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'})
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'})
        
        try:
            username = User.objects.filter(email = userIdEmail).first()
            print(username)
            withdraw  = Deposit.objects.filter(username = username )
            # print(deposit)
            # if(deposit == None) : 
            #     return JsonResponse({'error': 'Empty' },status = 500)

        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Error occurred while retriving pending deposit requests.'},status=400)
        else:
            deposits = []

            for item in withdraw:
                if item.status == 'confirmed' : 
                    status = 'Confirmed'
                if item.status == 'expired' : 
                    status = 'Expired'
                if item.status == 'pending' :
                    status = 'Pending'

                deposits.append({
                    'id' : str(item.id),
                   
                    'amount' : float(Decimal(str(item.quantity))) * float(100),
                    'date' : item.date.date(),
                    'status' : status


                    }

                )
            deposits.reverse()
              
            return JsonResponse({
                    'success': 'Deposit List fetched successfully',
                    'transactions' : deposits
                },status=200, safe=False)

    return JsonResponse({'error' : 'Invalid request method' } ,status=400) 




#get my packages API


@csrf_exempt
def get_myPackages(request):
    if request.method == 'GET':
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'})
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'})
        
        try:
            username = UserModelDB.objects.filter(email = userIdEmail).first()
            usernameObj = Mypackages.objects.filter(username = username).first()
            current_balance = float(Decimal(str(usernameObj.current_balance)))
            total_earnings = float(Decimal(str(usernameObj.t_earning)))
            transactions = []
            if usernameObj.packages is not None: 

                userpackages = json.loads(usernameObj.packages)
                
                
                for item in userpackages:
                    #print(item)
                    id = uuid.UUID(item).hex
                    depositObj = Deposit.objects.filter(id = id).first()
                    #print(depositObj)
                    if depositObj.status == 'confirmed' : 
                        status = 'Confirmed'
                    if depositObj.status == 'expired' : 
                        status = 'Expired'

                    transactions.append(
                        {
                            'date' : depositObj.date.date(),
                            'quantity' : depositObj.quantity,
                            'profit' : float(Decimal(str(depositObj.earning))),
                            'status' : status
                        }
                    )
                    transactions.reverse()
        
        except Exception as e :
            return JsonResponse({'error' : e})
        
        return JsonResponse({'success' : 'Packages details returned successfully','transactions' : transactions, 'total_earning' : total_earnings, 'current_balance' : current_balance},status = 200)
    
    return JsonResponse({'error' : 'Invalid Request Method'}, status = 401)

@csrf_exempt
def get_refferals(request):
    if request.method == 'GET':
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'})
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'})
        
        try:
            usernameObj = UserModelDB.objects.filter(email = userIdEmail).first()
            #print(usernameObj.username)
            referralObj = ReferralDB.objects.filter(username = usernameObj.username).first()
            
            
            
            l1array =[]
            l2array = []
            if referralObj.level1 is not None: 
                level1 = json.loads(referralObj.level1)
                for item in level1 : 
                    userObj = User.objects.filter(username = item).first()
                    referreeId  = userObj.username
                    referreeName = userObj.get_full_name()
                    words = referreeName.split()


                    cleaned_words = [word.strip("('),") for word in words]


                    full_name = ' '.join(cleaned_words)
                    date = userObj.date_joined.date()


                    userModelObj = UserModelDB.objects.filter(username = item).first()
                    sponsorName = userModelObj.sponsorName
                    packagesObj = Mypackages.objects.filter(username = item).first()
                    total_packages = packagesObj.t_packages

                    l1array.append(
                        {
                            'username' : referreeId,
                            'name' : full_name,
                            'sponsorId' : sponsorName,
                            'totalPackages' : total_packages,
                            'date' :str(date)

                        }

                    )
            if referralObj.level2 is not None:
                level2 = json.loads(referralObj.level2)
                for item in level2 : 
                    userObj = User.objects.filter(username = item).first()
                    referreeId  = userObj.username
                    referreeName = userObj.get_full_name()
                    words = referreeName.split()


                    cleaned_words = [word.strip("('),") for word in words]


                    full_name = ' '.join(cleaned_words)
                    date = userObj.date_joined.date()
                    userModelObj = UserModelDB.objects.filter(username = item).first()
                    sponsorName = userModelObj.sponsorName
                    packagesObj = Mypackages.objects.filter(username = item).first()
                    total_packages = packagesObj.t_packages

                    l2array.append(
                        {
                            'username' : referreeId,
                            'name' : full_name,
                            'sponsorId' : sponsorName,
                            'totalPackages' : total_packages,
                            'date' :str(date)

                        }

                    )
            
            instant1 = referralObj.instant1
            bonus1 = referralObj.bonus1
            instant2 = referralObj.instant2
            bonus2 = referralObj.bonus2
            l1bonus = instant1+bonus1
            l2bonus = instant2+bonus2
            total_bonus = l1bonus+l2bonus
            bonusObj = {
                'total_bonus' : total_bonus,
                'l1bonus' : l1bonus,
                'l2bonus' : l2bonus
            }

            
            
            return JsonResponse({'success' : 'Refferals fetched successfully','level1' : l1array , 'level2' : l2array ,'bonusObj' : bonusObj},status=200)
            
        
        except Exception as e : 

            return JsonResponse({'error' : e},staus = 500)
    
    return JsonResponse({'error' : 'Invalid Request'},status=400)



@csrf_exempt

def get_user_all(request) :
    if request.method == 'GET':
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'})
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'})
        
        try:
            usernameObj = UserModelDB.objects.filter(email = userIdEmail).first()
            username = usernameObj.username
            userObj = User.objects.filter(username = username).first()
            name = userObj.get_full_name()
            words = name.split()
            cleaned_words = [word.strip("('),") for word in words]
            full_name = ' '.join(cleaned_words)
            date = usernameObj.registrationDate
            packageObj = Mypackages.objects.filter(username = usernameObj.username).first()
            total_earning = float(Decimal(str(packageObj.t_earning)))
            total_packages = packageObj.t_packages
            amount = float(total_packages*100)
            referral_link = usernameObj.referralLink
            wallet_address = usernameObj.walletAddress

            obj = {
                'username' : username,
                'email'  : userIdEmail,
                'name' : full_name,
                'date' : date,
                'referral_link' : referral_link,
                'wallet_address' : wallet_address
            }



            return JsonResponse({
                'success' : 'Returned successfully',
                'details' : obj },status =200)



        except Exception as e:
            JsonResponse({'error' : e},status=500)

    return JsonResponse({'error' : 'Invalid Request'},status=400)


@csrf_exempt
def get_wallet_details(request): 
    if request.method == 'GET':
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'})
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'})
        
        try:
            usernameObj = UserModelDB.objects.filter(email = userIdEmail).first()
            username = usernameObj.username
            packagesObj = Mypackages.objects.filter(username = username).first()
            total_earning = float(Decimal(str(packagesObj.t_earning)))
            current_balance = float(Decimal(str(packagesObj.current_balance)))
            amount = float(packagesObj.t_packages * 100)
            obj = {
                'current_balance' : current_balance,
                'total_earning' : total_earning,
                'amount' : amount
                            
                    }

            return JsonResponse({'success' : 'Returned successfully',
                'details' : obj },status =200)

        
        except Exception as e:
            JsonResponse({'error' : e},status=500)

    return JsonResponse({'error' : 'Invalid Request'},status=400)


@csrf_exempt
def buy_package(request) : 
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
        
        dateObj = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata'))
        iso_format = "%Y-%m-%d %H:%M:%S"
        date  = datetime.datetime.strftime(dateObj, iso_format)
        id = str(uuid.uuid4())
        
        try : 
            deposit = Deposit(
                id=id,
                username = username,
                quantity = quantity,
                status = 'confirmed',
                date = date
            
            )
           
            deposit.save()
            
            myPackageObj = Mypackages.objects.filter(username = username).first()
            print(myPackageObj)

               
            array = []
            if myPackageObj.packages != None:
                
                array = json.loads(myPackageObj.packages)
                
                array.append(str(id))
                total_p = len(array)
                #print(total_p)
                updated_array = json.dumps(array)

                #print(updated_array)
                update_len = Mypackages.objects.filter(username = username).update(t_packages = total_p)
                update = Mypackages.objects.filter(username = username).update(packages = updated_array)
                
                
                
            else :
                
                array.append(str(id))
                myPackageObj.packages = json.dumps(array)
                total_p = len(array)
                #print(total_p)
                updated_array = json.dumps(array)
                #print(updated_array)
                update_len = Mypackages.objects.filter(username = username).update(t_packages = total_p)
                update = Mypackages.objects.filter(username = username).update(packages = updated_array)
            
        except Exception as e:
            return JsonResponse({'error' : 'Error while saving the data'},status = 400)
      
        return JsonResponse({'success'  : 'Buy package details stored successfully'} ,status=200)
        
    return JsonResponse({'error': 'Invalid request method.'},status = 400)

@csrf_exempt
def set_wallet_address(request): 
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

        wallet_address = body['wallet_address']
        try :

            userObj  = UserModelDB.objects.filter(username = username).update(walletAddress =wallet_address)
        except Exception as e:
            return JsonResponse({'error' : 'Error while saving the data'},status = 400)
      
        return JsonResponse({'success'  : 'Wallet address updated successfully'} ,status=200)
        
    return JsonResponse({'error': 'Invalid request method.'},status = 400)
        
        