from django.urls import path
from .views import policies_list,policy_filter

urlpatterns = [
    path('policy_list/', policies_list, name='policies_list'),
    path('recommend/', policy_filter, name='recommend')
]
