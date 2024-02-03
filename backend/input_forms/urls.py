from django.urls import path
from .views import user_input_view, get_ai_recommendation, insurance_buyer_dashboard

urlpatterns = [
    path('', user_input_view, name='user_input'),
    path('get_data_by_case_id/<str:case_id>/', get_ai_recommendation, name='get_data_by_case_id'),
    path('get_insurance_buyer_dashboard_data/<str:user_id>/', insurance_buyer_dashboard, name='insurance_buyer_dashboard'),

]

