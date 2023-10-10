from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from userAuthentication.models import UserModelDB,ReferralDB,Deposit,Mypackages,Withdraw
import json
import jwt
import datetime
import uuid
from decimal import Decimal
import time 
from smtplib import SMTPException
import pyotp
import qrcode
from io import BytesIO
import base64
import random
from django.core.mail import send_mail
import logging
# Create your views here.

secret_key = "CRYPT_PROJECT"

@csrf_exempt
def get_admin_deposit(request) : 
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
            deposit  = Deposit.objects.filter(status ='pending' )
            withdrawal  = Withdraw.objects.filter(status = 'pending')
            #print(withdrawal)
            # if(deposit == None) : 
            #     return JsonResponse({'error': 'Empty' },status = 500)

        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Error occurred while retriving pending deposit requests.'},status=400)
        else:
            pending_deposits = []
            pending_withdrawals = []

            for item in deposit:
                userObj = UserModelDB.objects.filter(username = item.username).first()
                wallet_address = userObj.walletAddress
                pending_deposits.append({
                    'id' : str(item.id),
                    'username' : item.username,
                    'transaction_id' : item.transactionId,
                    'quantity' : item.quantity,
                    'date' : item.date,
                    'status' : item.status,
                    'payment_id' : item.payment_id,
                    'wallet_address' : wallet_address
                    }

                )
                



            for item in withdrawal:
                pending_withdrawals.append({
                    'id' : str(item.id),
                    'username' : item.username,
                    'amount' : float(Decimal(str(item.amount))),
                    'date' : item.date,
                    'status' : item.status,
                    'walletAdress' : item.walletAddress


                    }

                )
            
            pending_deposits.reverse()
            pending_withdrawals.reverse()
               
            return JsonResponse({
                    'success': 'Pending deposits fetched successfully',
                    'transactions' : pending_deposits,
                    'withdrawals' : pending_withdrawals,

                },status=200, safe=False)

    return JsonResponse({'error' : 'Invalid request method' } ,status=400)

@csrf_exempt
def approve_deposit(request) : 
    if request.method == 'POST':
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
            body = json.loads(request.body)
            id_trans = body['id']
            depositObj = Deposit.objects.filter(id = id_trans ).first()
            update = Deposit.objects.filter(id=id_trans).update(status= 'confirmed')
            
            
           
          #  print(depositObj.username)
            myPackageObj = Mypackages.objects.filter(username = depositObj.username).first()
            print(myPackageObj)

               
            array = []
            if myPackageObj.packages != None:
                
                array = json.loads(myPackageObj.packages)
                
                array.append(str(depositObj.id))
                total_p = len(array)
                #print(total_p)
                updated_array = json.dumps(array)

                #print(updated_array)
                update_len = Mypackages.objects.filter(username = depositObj.username).update(t_packages = total_p)
                update = Mypackages.objects.filter(username = depositObj.username).update(packages = updated_array)
                
                
                
            else :
                
                array.append(str(depositObj.id))
                myPackageObj.packages = json.dumps(array)
                total_p = len(array)
                #print(total_p)
                updated_array = json.dumps(array)
                #print(updated_array)
                update_len = Mypackages.objects.filter(username = depositObj.username).update(t_packages = total_p)
                update = Mypackages.objects.filter(username = depositObj.username).update(packages = updated_array)
               

            username = depositObj.username
            print(username)
            userObj = UserModelDB.objects.filter(username = username).first()

            sponsorName = userObj.sponsorName
            print(sponsorName)

            if sponsorName != 'none' :
                sponsorRefObj = ReferralDB.objects.filter(username = sponsorName).first()
                sp_package_obj = Mypackages.objects.filter(username = sponsorName).first()
                current_balance = float(Decimal(str(sp_package_obj.current_balance)))
                current_balance+= float(depositObj.quantity * 50 )
                print(current_balance)
                update_curr_balance = Mypackages.objects.filter(username = sponsorName).update(current_balance = current_balance)

                instant1 = sponsorRefObj.instant1
               
                instant1 += (depositObj.quantity * 50 )
                print(instant1)
                update_1 = ReferralDB.objects.filter(username = sponsorName).update(instant1 = instant1)

                supersponsorObj = UserModelDB.objects.filter(username = sponsorName).first()
                supersponsorName = supersponsorObj.sponsorName
                print(supersponsorName)
                if supersponsorName != 'none' : 
                    supersponsorRefObj = ReferralDB.objects.filter(username = supersponsorName).first()
                    supersp_package_obj = Mypackages.objects.filter(username = supersponsorName).first()
                    current_balance = float(Decimal(str(supersp_package_obj.current_balance)))
                    current_balance+= float(depositObj.quantity * 25 )
                    update_curr_balance = Mypackages.objects.filter(username = supersponsorName).update(current_balance = current_balance)

                    instant2 = supersponsorRefObj.instant2
                    print(instant2)
                    instant2 += (depositObj.quantity * 25 )
                    update_2 = ReferralDB.objects.filter(username = supersponsorName).update(instant2 = instant2)



                
            
            return JsonResponse({'success' : 'Successfully Approved'})


        except Exception as e: 
           
            return JsonResponse({'error' : e})
    return JsonResponse({'error' : 'Invalid Request Method'},status=401)   

@csrf_exempt
def decline_deposit(request):
    if request.method == 'POST':
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'},status=400)
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'},status=400)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'},status=400)
        
        try:
            body = json.loads(request.body)
            id_trans = body['id']
            depositObj = Deposit.objects.filter(id = id_trans ).delete()

            return JsonResponse({'success' : 'Successfully Declined'})
        
        except Exception as e: 
            print(e)
            return JsonResponse({'error' : e},status=400)
    
    return JsonResponse({'error' : 'Invalid Request Method'},status=401)


@csrf_exempt
def decline_withdraw(request):
    if request.method == 'POST':
        token = request.headers.get("token")
        if not token:
            return JsonResponse({'error': 'Token not provided'},status=400)
        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            userIdEmail = decoded_token['email']
            #print(userIdEmail)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'},status=400)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'},status=400)
        
        try:
            body = json.loads(request.body)
            id_trans = body['id']
            withdrawObj = Withdraw.objects.filter(id = id_trans ).delete()

            return JsonResponse({'success' : 'Successfully Declined'})
        
        except Exception as e: 
            print(e)
            return JsonResponse({'error' : e},status=400)
    
    return JsonResponse({'error' : 'Invalid Request Method'},status=401)






@csrf_exempt
def approve_withdraw(request) : 
    if request.method == 'POST':
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
            body = json.loads(request.body)
            id_trans = body['id']
           
            withdrawObj = Withdraw.objects.filter(id = id_trans ).first()
            
            username = withdrawObj.username
            userpackage = Mypackages.objects.filter(username = username).first()
            current_balance = float(Decimal(str(userpackage.current_balance)))
            if current_balance < float(Decimal(str(withdrawObj.amount))) :
                update = Withdraw.objects.filter(id=id_trans).update(status= 'Rejected')
                return JsonResponse({'error' : 'Minimum Current Balance should be $50'},status=200)
            current_balance -= float(Decimal(str(withdrawObj.amount)))
            update = Withdraw.objects.filter(id=id_trans).update(status= 'confirmed')
            update_curr_balance = Mypackages.objects.filter(username = username).update(current_balance = current_balance)
        
            return JsonResponse({'success' : 'Successfully Approved'})



        except Exception as e: 
            print(e)
            return JsonResponse({'error' : e})
    return JsonResponse({'error' : 'Invalid Request Method'},status=401)





def generate_otp():
    return str(random.randint(1000, 9999))

@csrf_exempt
def send_otp(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        user = User.objects.filter(email  = email)
        try:
            if user is not None:
                otp = generate_otp()
                message = f'Your OTP for password update is: {otp}'
                subject = 'OTP Verification'
                from_email = 'verification@cryptoption.net.in'  # Replace with your email
                recipient_list = [email]

                send_mail(subject, message, from_email, recipient_list)
                request.session['otp'] = {
                    'otp': otp,
                    'timestamp': time.time()  # Add the timestamp when OTP is generated
                }
                request.session['email'] = email
                return JsonResponse({'status': 'success'})
        except SMTPException as e:
                print('There was an error sending an email: ', e)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'},status =401)

@csrf_exempt
def verify_otp(request):
    if request.method == 'POST':
        otp_submitted = request.POST.get('otp')
        
        if otp_submitted:
            otp_data = request.session.get('otp')
            if otp_data:
                otp_generated = otp_data.get('otp')
                timestamp = otp_data.get('timestamp')
                current_time = time.time()
                
                # Check if OTP is within the 5-minute validity period
                if otp_generated == otp_submitted and current_time - timestamp <= 300:
                    # OTP matched and is still valid, do further processing here
                # OTP matched, do further processing here
                    return JsonResponse({'status': 'success'})
                else:
                    return JsonResponse({'status': 'error', 'message': 'Invalid OTP or OTP has expired.'})
            else:
                return JsonResponse({'status': 'error', 'message': 'No OTP data found. Please generate OTP first.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'OTP not provided.'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def resend_otp(request):
    if request.method == 'GET':
        email = request.session.get('email')
        if email:
            otp = generate_otp()
            message = f'Your OTP for password update is: {otp}'
            subject = 'OTP Verification'
            from_email = 'verification@cryptoption.net.in'  # Replace with your email
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)
            request.session['otp'] = otp
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Email not provided.'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt

def update_password(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        email = request.session.get('email')
        print(email)
    
        if  not password:
            return JsonResponse({'error':'Username and Password are required.'},status=500)
        
        # check if username already exists
        try:
            email = request.session.get('email')
            user = User.objects.filter(email=email).first()
            user.set_password(password)
            user.save()

        except :
            return JsonResponse({'error':'Error while fetching data' },status=500)
        
        return JsonResponse({'success':'Password succesfully updated' },status=200)
    
    return JsonResponse({'error':'Invalid request Method' },status=401)


def update_password(request):
    if request.method == 'POST':

        password = request.POST.get('password')

        email = request.session.get('email')

        print(email)

    

        if  not password:

            return JsonResponse({'error':'Username and Password are required.'},status=500)



        # check if username already exists

        try:

            email = request.session.get('email')

            user = User.objects.filter(email=email).first()

            user.set_password(password)

            user.save()



        except :

            return JsonResponse({'error':'Error while fetching data' },status=500)



        return JsonResponse({'success':'Password succesfully updated' },status=200)

    

    return JsonResponse({'error':'Invalid request Method' },status=401)

@csrf_exempt
def genQr(request):
    if request.method == "GET":
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
            secret_k =pyotp.random_base32()
            #request.session["secret_key"] = secret_key
            uri = pyotp.totp.TOTP(secret_k).provisioning_uri(userIdEmail, issuer_name='CRYPTOPTION')
            # img = qrcode.make(uri)
            # img.save("gourabQR.png")

            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(uri)
            qr.make(fit=True)

            # Create a QR code image
            img = qr.make_image(fill_color="black", back_color="white")
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            base64_image = base64.b64encode(buffer.getvalue()).decode()
            is2fa = jwt.encode({'is2fa': True}, secret_key, algorithm='HS256')
            update = UserModelDB.objects.filter(email = userIdEmail).update(base_64_qr = base64_image, is2fa = is2fa ,secret_key=secret_k)
            

            return JsonResponse({"status" : "QR generated","is2fa" : is2fa})
        except Exception as e:
            logging.getLogger("error_logger").error(repr(e))
            return JsonResponse({"error" : "Error While Generating QR"},status=404)
    
    return JsonResponse({"error" : "Invalid Request Method"},status=400)

@csrf_exempt 
def getQr(request):
    if request.method == "GET":
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
        
        try : 
            qr = UserModelDB.objects.filter(email = userIdEmail).first().base_64_qr
            return JsonResponse({"success" : "QR retrieved " , "qr" : qr})
        except : 
            return JsonResponse({"error" : "Error while retieving QR" },status=400)

@csrf_exempt
def verifyQr(request):
    if request.method == "POST":
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
            body = json.loads(request.body)
            otp = body['otp']
            
            
            #secret_key = request.session.get("secret_key")
            secret_k = UserModelDB.objects.filter(email = userIdEmail).first().secret_key
            totp = pyotp.TOTP(secret_k)
            if totp.verify(otp):
                val = jwt.encode({'verified': True}, secret_key, algorithm='HS256')
                return JsonResponse({"success" : val},status=200)
            else:
                return JsonResponse({"error" : "Incorrect OTP"},status=400)
        except:
            return JsonResponse({"error" : "Error while fetching Data"},status=400)
        
    return JsonResponse({"error" : "Invalid Request Method"},status=400)

@csrf_exempt
def disable(request):
    if request.method == "GET":
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
            
            update = UserModelDB.objects.filter(email = userIdEmail).update(base_64_qr = "",is2fa = False, secret_key="")
            
            return JsonResponse({"success" : "Deactivated Successfully"},status=200)
           
        except:
            return JsonResponse({"error" : "Error while fetching Data"},status=400)
        
    return JsonResponse({"error" : "Invalid Request Method"},status=400)