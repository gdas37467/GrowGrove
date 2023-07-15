from django.core.management.base import BaseCommand
from userAuthentication.models import Mypackages

class Command(BaseCommand):
    help = 'Update the total interest received for every user'

    def handle(self, *args, **options):
        # Retrieve all users
        # users = Mypackages.objects.all()

        # # Update interest for each user
        # for user in users:
        #     current_interest = user.interest
        #     # Perform your calculations to update the total interest here
        #     new_interest = current_interest + 100  # Example calculation

        #     # Update the user's total interest
        #     user.interest = new_interest
        #     user.save()
        print(4)

        self.stdout.write(self.style.SUCCESS('Total interest updated successfully.'))