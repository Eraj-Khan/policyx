# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('all-users/', all_users)

    # Add other URL patterns as needed
]
