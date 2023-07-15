import os
from celery import Celery
from datetime import timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crypt_backend.settings')

app = Celery('crypt_backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()



# Schedule the task to run every day at 2 am
app.conf.beat_schedule = {
    'update_interest_task': {
        'task': 'adminpanel.tasks.update_interest_task',
        'schedule': timedelta(minutes=1),
    },
}