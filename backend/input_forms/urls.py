from django.urls import path
from .views import user_input_view, get_data_by_case_id

urlpatterns = [
    path('', user_input_view, name='user_input'),
    path('get_data_by_case_id/<str:case_id>/', get_data_by_case_id, name='get_data_by_case_id'),
]

