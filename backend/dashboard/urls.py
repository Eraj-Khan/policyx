from django.urls import path
from .views import recieve_data_on_dashboard,list_all_cases,place_package,list_all_packages,update_bid,accept_package,list_all_users
urlpatterns = [
    path('create_case/', recieve_data_on_dashboard, name='create_case'),
    path('list_users/', list_all_cases, name='list_users'),
    path('send_packages/', place_package, name='send_packages'),
    path('update_packages/<str:case_id>/<str:company_name>', update_bid, name='update_packages'),
    path('list_packages_and_bids/<str:case_id>/<str:case_user>/', list_all_packages, name='all_bids'),
    path('list_all_users/<str:case_id>/', list_all_users, name='all_users'),
    path('accept_package/<str:case_id>/<str:company_name>', accept_package, name='accept_package'),

]