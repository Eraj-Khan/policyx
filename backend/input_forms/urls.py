from django.urls import path
from .views import user_input_view, get_ai_recommendation

urlpatterns = [
    path('', user_input_view, name='user_input'),
    path('get_data_by_case_id/<str:case_id>/', get_ai_recommendation, name='get_data_by_case_id'),
]

