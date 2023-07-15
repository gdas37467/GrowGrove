from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from userAuthentication.models import UserModelDB,ReferralDB,Deposit,Mypackages
import json
import jwt
import datetime
import uuid
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
            print(deposit)

        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Error occurred while retriving pending deposit requests.'})
        else:
            pending_deposits = []

            for item in deposit:
                pending_deposits.append({
                    'id' : str(item.id),
                    'username' : item.username,
                    'transaction_id' : item.transactionId,
                    'quantity' : item.quantity,
                    'date' : item.date,
                    'status' : item.status


                    }

                )
                print(item.quantity)
            return JsonResponse({
                    'success': 'Pending deposits fetched successfully',
                    'transactions' : pending_deposits
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

            # if myPackageObj is None : 

            #     array = []
            #     array.append(str(depositObj.id))
            #     newPackage = Mypackages(packages = json.dumps(array),username = depositObj.username)
           
            #     newPackage.save()
                
            # else:    
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
               
        
                
            
            return JsonResponse({'success' : 'Successfully Approved'})



        except Exception as e: 
            print(e)
            return JsonResponse({'error' : e})
        

        
