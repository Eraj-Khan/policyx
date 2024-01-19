# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    # path('all-users/', all_users)
    path('user_by_case_id/<str:case_id>/', user_by_case_id, name= 'user_by_case_id'),
    # Add other URL patterns as needed
]
