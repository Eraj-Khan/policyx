from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import CompanyDashboard,CompanyPackages
from .serializers import CompanyDashboardSerializer,CompanyPackagesSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg,Count,Sum
from django.db.models.functions import TruncMonth,Extract
from django.core.mail import send_mass_mail
from django.conf import settings
from django.db import models, IntegrityError
from accounts.models import User
from input_forms.views import UserInformation,UserInformationSerializer
    
@api_view(['POST'])
def recieve_data_on_dashboard(request):
    company_details = User.objects.filter(role='company')
    company_emails = [email.email for email in company_details]
    subject = 'New Insurance Case Received'
    message = 'Hello,\n\nA new insurance case has been received. Please log in to your dashboard to review and place a bid.'
    email_data = (
        (subject, message, 'noreply@gmail.com', company_emails),
    )
    
    data_reciver_serializer = CompanyDashboardSerializer(data=request.data)
    
    if data_reciver_serializer.is_valid():
        data_reciver_serializer.save()
        send_mass_mail(email_data, fail_silently=False)
        return Response(data_reciver_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(data_reciver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_all_cases(request):
    company_dashboard_objects = CompanyDashboard.objects.all()
    company_dashboard_serializer = CompanyDashboardSerializer(company_dashboard_objects, many=True) 
    return Response(company_dashboard_serializer.data)

@api_view(['POST'])
def place_package(requests):
    try:
        package_place_serializer = CompanyPackagesSerializer(data=requests.data)
        if package_place_serializer.is_valid():
            package_place_serializer.save()
            return Response(package_place_serializer.data, status=status.HTTP_201_CREATED)
        return Response(package_place_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError as integ_err:
        return Response({'error': f'Error!! {integ_err}'})
    except Exception as e:
        return Response({'error': f'error occurred {e}'})



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
            "Placed Packages": company_packages_serializer.data,
    }

    return Response(data)


@api_view(['GET'])
def list_user_packages(request,case_user):
    company_user_data = CompanyPackages.objects.filter(case_user=case_user)

    if not company_user_data:
        return Response("user Not Found!!")
    
    company_user_serializer = CompanyPackagesSerializer(company_user_data, many=True)


    data = {
            "Bids": company_user_serializer.data
        }

    return Response(data)


@api_view(['GET'])
def list_company_packages(request, company_name):
    try:
        company_user_data = CompanyPackages.objects.filter(company_name=company_name)

        if not company_user_data:
            return Response("No Packages Found for the specified company.")

        company_user_serializer = CompanyPackagesSerializer(company_user_data, many=True)

        data = {
            "Packages": company_user_serializer.data
        }

        return Response(data)

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def list_all_users(request, case_id):
    try:
        user_dashboard_data = UserInformation.objects.get(case_id=case_id)
        userdashboardserializer = UserInformationSerializer(user_dashboard_data)
        return Response(userdashboardserializer.data)
    except UserInformation.DoesNotExist:
        return Response("Data Not Found!!", status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_bid(requests,case_id,company_name):
    print(company_name)
    try:
        company_package_update = CompanyPackages.objects.get(case_id=case_id, company_name=company_name)
    except CompanyPackages.DoesNotExist:
        return Response("Data Not Found!!", status=status.HTTP_404_NOT_FOUND)
    
    update_serializer = CompanyPackagesSerializer(company_package_update, data=requests.data)
    
    if update_serializer.is_valid():
        update_serializer.save()
        return Response(update_serializer.data)
    
    return Response(update_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def accept_package(request, case_id, company_name):
    try:
        company_package = CompanyPackages.objects.get(case_id=case_id, company_name=company_name)

        if not company_package.is_accepted:
            company_package.is_accepted = True
            company_package.save()

            company_dashboard = CompanyDashboard.objects.get(case_id=case_id)
            company_dashboard.is_completed = True
            company_dashboard.save()
            notify_company_email(company_name)

            return Response({'message': 'Package accepted and company notified.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Package already accepted.'}, status=status.HTTP_200_OK)

    except CompanyPackages.DoesNotExist:
        return Response({'error': 'Company package not found.'}, status=status.HTTP_404_NOT_FOUND)

    except CompanyDashboard.DoesNotExist:
        return Response({'error': 'Company dashboard not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def notify_company_email(company_name):
    try:
        company_details = User.objects.filter(role='company')
        company_emails = [email.email for email in company_details]
        subject = 'Bid Accepted Notification'
        message = f'Congratulations! Your bid has been accepted by the user.'
        from_email = 'noreply@example.com'

        email_data = [(subject, message, from_email, [recipient_email]) for recipient_email in company_emails]
        send_mass_mail(email_data, fail_silently=False)

    except User.DoesNotExist:
        pass

@api_view(['GET'])
def get_statistics(request):
    try:
        total_cases = CompanyDashboard.objects.count()
        total_completed_cases = CompanyDashboard.objects.filter(is_completed=True).count()
        average_age = CompanyDashboard.objects.filter(is_completed=True).aggregate(avg_age=Avg('age'))['avg_age']
        total_accepted_packages = CompanyPackages.objects.filter(is_accepted=True).count()
        total_revenue = CompanyPackages.objects.filter(is_accepted=True).aggregate(total_revenue=Sum('total_annual_coverage'))['total_revenue']



        statistics_data = {
            'total_cases': total_cases,
            'total_completed_cases': total_completed_cases,
            'average_age': average_age,
            'total_accepted_packages': total_accepted_packages,
            'total_revenue': total_revenue,

        }

        return Response(statistics_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_monthly_completed_cases(request):
    try:
        monthly_completed_cases = CompanyDashboard.objects.filter(is_completed=True) \
            .annotate(month=TruncMonth('created_at')) \
            .annotate(month_name=Extract('month', 'month')) \
            .values('month_name') \
            .annotate(count=Count('id'))

        return Response(monthly_completed_cases, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def get_average_package_coverage(request):
    try:
        average_coverage = CompanyPackages.objects.filter(is_accepted=True) \
            .aggregate(avg_coverage=Avg('total_annual_coverage'))['avg_coverage']

        return Response({'average_coverage': average_coverage}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def count_bids(request, company_name):
    try:
        total_bids_count = CompanyPackages.objects.filter(company_name=company_name).count()

        accepted_bids_count = CompanyPackages.objects.filter(company_name=company_name, is_accepted=True).count()

        return Response({'total_bids_count': total_bids_count, 'accepted_bids_count': accepted_bids_count}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)