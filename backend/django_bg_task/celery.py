from __future__ import absolute_import, unicode_literals

import os
from celery import Celery
from celery.schedules import crontab

from celery import Celery

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 
    'server.settings'
)

app = Celery('django_bg_task')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {  
    'completed-cleanup-task': {
        'task': 'django_bg_task.tasks.cleanup_dashboard_records',
        'schedule': crontab(minute='*/5'),  # Run every 2 minutes
    },
}

# Use Redis as the broker and result backend
app.conf.broker_url = 'redis://localhost:6379/0'
app.conf.result_backend = 'redis://localhost:6379/0'

app.autodiscover_tasks()