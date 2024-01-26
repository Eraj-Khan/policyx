from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import CompanyDashboard,CompanyPackages
from .serializers import CompanyDashboardSerializer,CompanyPackagesSerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mass_mail
from django.conf import settings
from django.db import models, IntegrityError
from accounts.models import User
from .company_plans import Adamjee_insurance, Jubilee_insurance, EFU_insurance

    
@api_view(['POST'])
def recieve_data_on_dashboard(requests):
    company_details=User.objects.filter(role='company')
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
    try:
        package_place_serializer= CompanyPackagesSerializer(data=requests.data)
        if package_place_serializer.is_valid():
            package_place_serializer.save()
            return Response(package_place_serializer.data, status=status.HTTP_201_CREATED)
        return Response(package_place_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError as integ_err:
        return Response({'error':f'Error!! {integ_err}'})
    except Exception as e:
        return Response({'error':f'error occurred {e}'})


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

@api_view(['PUT'])
def update_bid(requests,case_id,company_name):
    print(company_name)
    try:
        company_package_update = CompanyPackages.objects.get(case_id=case_id, company_name=company_name)
    except CompanyPackages.DoesNotExist:
        return Response("Data Not Found!!", status=status.HTTP_404_NOT_FOUND)
    
    # Use the retrieved instance to update data
    update_serializer = CompanyPackagesSerializer(company_package_update, data=requests.data)
    
    if update_serializer.is_valid():
        update_serializer.save()
        return Response(update_serializer.data)
    
    return Response(update_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
@api_view(['GET'])
def choose_package(request,company_name,premium):
    if company_name == 'Adamjee insurance':
        # result = "Hello"
        result=Adamjee_insurance(premium)
    if company_name == 'Jubilee insurance':
        result=Jubilee_insurance(premium)
    if company_name == 'Efu insurance':
        result=EFU_insurance(premium)

    return Response(result)