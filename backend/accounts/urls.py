from django.contrib import admin
from django.urls import path, include
# from .views import CompanyUserListCreate

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    # path('company_users/', CompanyUserListCreate.as_view(), name='company-user-list-create'),
]