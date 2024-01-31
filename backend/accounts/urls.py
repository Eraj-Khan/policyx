from django.contrib import admin
from django.urls import path, include
from .views import CustomUserRegistrationView
from accounts.views import CustomTokenObtainPairView   


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('api/auth/users/', CustomUserRegistrationView.as_view({'post': 'create'}), name='user-create'),
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
]