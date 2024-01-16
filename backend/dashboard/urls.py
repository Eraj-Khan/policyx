from django.urls import path
from .views import recieve_data_on_dashboard,list_all_cases
urlpatterns = [
    path('create_case/', recieve_data_on_dashboard, name='create_case'),
    path('list_users/', list_all_cases, name='list_users'),
]