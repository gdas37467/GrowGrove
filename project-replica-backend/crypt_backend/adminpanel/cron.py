from userAuthentication.models import Mypackages,Deposit,ReferralDB
import uuid
import json
from decimal import Decimal
import datetime
import pytz
def my_job():
    users = Mypackages.objects.all()
    #print(users)
    for user in users:
        total_earning = float(Decimal(str(user.t_earning)))
        current_balance = float(Decimal(str(user.current_balance)))
        total_packages = 0
        if user.packages is not None: 
            userpackages = json.loads(user.packages)
            for item in userpackages:
                #print(item)
                id = uuid.UUID(item).hex
                #print(id)
                depositObj = Deposit.objects.filter(id = id).first()
                #print(depositObj.username)
                if depositObj.status == 'pending' or depositObj.status == 'expired':
                    continue
                else:
                    price = float(100*depositObj.quantity)
                    if float(Decimal(str(depositObj.earning))) >= 5.00*price:
                        depositObj.status = 'expired'
                        continue
                    else:
                        profit = (price * (1.5 / float(100)))
                        earning = profit + float(Decimal(str(depositObj.earning)))
                        total_packages += depositObj.quantity
                        total_earning +=earning
                        current_balance +=earning
                        print(earning)
                        update = Deposit.objects.filter(id = uuid.UUID(item)).update(earning = earning)
        
        u_mypackage = Mypackages.objects.filter(username = user.username).update(t_earning = total_earning,t_packages = total_packages,current_balance = current_balance)

        print("/n")
        print("total pckaed : ", total_packages)
        print("earning :" ,total_earning)
    
        print("current_balance: ",current_balance)


def update_referral():
    users= ReferralDB.objects.all()
    for user in users:
        print(user.username)
        total_bonus =0
        if user.level1 is None:
            continue
        else:
            level1 = json.loads(user.level1)
            
            level1_bonus = 0
            for item in level1:
                #print(item)
                usernameObj = Mypackages.objects.filter(username = item).first()
                userpackages = userpackages = json.loads(usernameObj.packages)
                for item in userpackages:
                    #print(item)
                    id = uuid.UUID(item).hex
                    #print(id)
                    depositObj = Deposit.objects.filter(id = id).first()
                    #print(depositObj.username)
                    if depositObj.status == 'pending' or depositObj.status == 'expired':
                        continue
                    else:
                        
                        #created_date = depositObj.date.date()
                        created_date = datetime.datetime.strptime('2023-05-18', "%Y-%m-%d").date()
                        current_date_string= datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata')).date().isoformat()
                        current_date = datetime.datetime.strptime(current_date_string, "%Y-%m-%d").date()
                        #print("\n",date)
                        # current_time_string = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata')).isoformat()
                        # current_time = datetime.datetime.strptime(current_time_string, "%Y-%m-%dT%H:%M:%S.%f%z")
                        # minutes_passed = (current_time.year - date.year) * 12*30*24*60 + (current_time.month - date.month)*30*24*60 + (current_time.day - date.day)*24*60 + (current_time.hour - date.hour)*60 + (current_time.minute - date.minute)
                        
                        #find total months passed till date, for each package
                        months_passed = (current_date.year - created_date.year)*12 + (current_date.month - created_date.month)
                        print(months_passed)
                        
                        if months_passed >= 1: 
                            level1_bonus += depositObj.quantity *months_passed * 10

            print("\nlevel1bonus " ,level1_bonus )  
            #update level-1 bonus in referral
            update1 = ReferralDB.objects.filter(username = user.username).update(bonus1= level1_bonus) 
            total_bonus+=level1_bonus 

        if user.level2 is None : 
            prev_total_bonus = Mypackages.objects.filter(username = user.username).first().t_bonus
            print(prev_total_bonus)
            update_t_bonus = Mypackages.objects.filter(username = user.username).update(t_bonus = float(total_bonus))
            total_earning_package = Mypackages.objects.filter(username = user.username).first()
            current_balance = float(Decimal(str(total_earning_package.current_balance)))
            current_balance-= float(Decimal(str(prev_total_bonus)))
            current_balance+=float(total_bonus)
            
            update_current_bal = Mypackages.objects.filter(username = user.username).update(current_balance = current_balance)
            print("level_2 none" , current_balance,total_bonus)
            continue
        else:
            level2 = json.loads(user.level2)
            level2_bonus = 0
            for item in level2:
                #print(item)
                usernameObj = Mypackages.objects.filter(username = item).first()
                userpackages = userpackages = json.loads(usernameObj.packages)
                for item in userpackages:
                    #print(item)
                    id = uuid.UUID(item).hex
                    #print(id)
                    depositObj = Deposit.objects.filter(id = id).first()
                    #print(depositObj.username)
                    if depositObj.status == 'pending' or depositObj.status == 'expired':
                        continue
                    else:
                        
                        #created_date = depositObj.date.date()
                        created_date = datetime.datetime.strptime('2023-05-18', "%Y-%m-%d").date()
                        current_date_string= datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata')).date().isoformat()
                        current_date = datetime.datetime.strptime(current_date_string, "%Y-%m-%d").date()
                        #print("\n",date)
                        # current_time_string = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata')).isoformat()
                        # current_time = datetime.datetime.strptime(current_time_string, "%Y-%m-%dT%H:%M:%S.%f%z")
                        # minutes_passed = (current_time.year - date.year) * 12*30*24*60 + (current_time.month - date.month)*30*24*60 + (current_time.day - date.day)*24*60 + (current_time.hour - date.hour)*60 + (current_time.minute - date.minute)
                        
                        #find total months passed till date, for each package
                        months_passed = (current_date.year - created_date.year)*12 + (current_date.month - created_date.month)
                        print(months_passed)
                        
                        if months_passed >= 1: 
                            level2_bonus += depositObj.quantity* months_passed * 5

            print("\nlevel1bonus " ,level1_bonus )
            update2 = ReferralDB.objects.filter(username = user.username).update(bonus2= level2_bonus) 
            total_bonus+=level2_bonus

        prev_total_bonus = Mypackages.objects.filter(username = user.username).first().t_bonus
        update_t_bonus = Mypackages.objects.filter(username = user.username).update(t_bonus = float(total_bonus))
        total_earning_package = Mypackages.objects.filter(username = user.username).first()
        current_balance = float(Decimal(str(total_earning_package.current_balance)))
        current_balance-= float(Decimal(str(prev_total_bonus)))
        current_balance+=float(total_bonus)
        update_current_bal = Mypackages.objects.filter(username = user.username).update(current_balance = current_balance)
        print("total_earning and bonus" , current_balance,total_bonus)


                        