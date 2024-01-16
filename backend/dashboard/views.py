from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import CompanyDashboard
from .serializers import CompanyDashboardSerializer
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
def recieve_data_on_dashboard(requests):
    data_reciver_serializer= CompanyDashboardSerializer(data=requests.data)
    if data_reciver_serializer.is_valid():
        data_reciver_serializer.save()
        return Response(data_reciver_serializer.data, status=status.HTTP_201_CREATED)
    return Response(data_reciver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_all_cases(request):
    user_listing = CompanyDashboard.objects.all()
    user_serializer = CompanyDashboardSerializer(user_listing, many=True)
    return Response(user_serializer.data)







