from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import CompanyUser
from .serializers import CompanyUserSerializer

class CompanyUserListCreate(generics.ListCreateAPIView):
    queryset = CompanyUser.objects.all()
    serializer_class = CompanyUserSerializer
