from django.urls import path
from .views import user_input_view,success_page,get_data_by_case_id

urlpatterns = [
    path('', user_input_view, name='user_input'),
    path('success/', success_page, name='success_page'),
    # Add other URL patterns as needed
    path('get_data_by_case_id/<str:case_id>/', get_data_by_case_id, name='get_data_by_case_id'),
]

