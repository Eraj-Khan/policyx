from django.urls import path
from .views import user_input_view,success_page

urlpatterns = [
    path('', user_input_view, name='user_input'),
    path('success/', success_page, name='success_page'),
    # Add other URL patterns as needed
]
