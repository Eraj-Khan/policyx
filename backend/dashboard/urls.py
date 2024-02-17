from django.urls import path
from .views import *
urlpatterns = [
    path('create_case/', recieve_data_on_dashboard, name='create_case'),
    path('list_users/', list_all_cases, name='list_users'),
    path('send_packages/', place_package, name='send_packages'),
    path('update_packages/<str:case_id>/<str:company_name>', update_bid, name='update_packages'),
    path('list_packages_and_bids/<str:case_id>/', list_all_packages, name='all_bids'),
    path('list_user_packages/<str:case_user>/', list_user_packages, name='all_bids'),
    path('list_all_users/<str:case_id>/', list_all_users, name='all_users'),
    path('accept_package/<str:case_id>/<str:company_name>', accept_package, name='accept_package'),
    path('list_company_packages/<str:company_name>/', list_company_packages, name='list_company_packages'),
    path('statistics/<str:id>', get_statistics, name='get_statistics'),
    path('monthly_completed_cases/<str:id_user>/', get_monthly_completed_cases, name='get_monthly_completed_cases'),
    path('average_package_coverage/<str:id_user>/', get_average_package_coverage, name='get_average_package_coverage'),
   path('count_bids/<str:company_name>/', count_bids, name='count_accepted_bids'),

]