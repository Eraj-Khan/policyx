from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import CompanyDashboard,CompanyPackages
from .serializers import CompanyDashboardSerializer,CompanyPackagesSerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mass_mail
from django.conf import settings
from accounts.models import CompanyUser


    
@api_view(['POST'])
def recieve_data_on_dashboard(requests):
    company_details=CompanyUser.objects.all()
    company_emails=[email.email for email in company_details]
    subject = 'New Insurance Case Received'
    message = f'Hello,\n\nA new insurance case has been received. Please log in to your dashboard to review and place a bid.'
    email_data = (
    (subject, message,'noreply@gmail.com', company_emails),
)
    data_reciver_serializer= CompanyDashboardSerializer(data=requests.data)
    if data_reciver_serializer.is_valid():
        data_reciver_serializer.save()
        send_mass_mail((email_data),fail_silently=False)

        return Response(data_reciver_serializer.data, status=status.HTTP_201_CREATED)
    return Response(data_reciver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_all_cases(request):
    user_listing = CompanyDashboard.objects.all()
    user_serializer = CompanyDashboardSerializer(user_listing, many=True)
    return Response(user_serializer.data)

@api_view(['POST'])
def place_package(requests):
    package_place_serializer= CompanyPackagesSerializer(data=requests.data)
    if package_place_serializer.is_valid():
        package_place_serializer.save()
        return Response(package_place_serializer.data, status=status.HTTP_201_CREATED)
    return Response(package_place_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_all_packages(request,case_id):
    company_dashboard_data = CompanyDashboard.objects.get(case_id=case_id)
    company_packages_data = CompanyPackages.objects.filter(case_id=case_id)
    if not company_dashboard_data:
        return Response("Data Not Found!!")
    if not company_packages_data:
        return Response("Package Not Found!!")
    
    company_dashboard_serializer = CompanyDashboardSerializer(company_dashboard_data)
    company_packages_serializer = CompanyPackagesSerializer(company_packages_data, many=True)

    data = {
            "Case":company_dashboard_serializer.data,
            "Bids": company_packages_serializer.data
        }

    return Response(data)