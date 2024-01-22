from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import CompanyDashboard,Packages,CompanyDetails
from ..company.serializers import CompanyDashboardSerializer,CompanyPackagesSerializer
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

@api_view(['POST'])
def place_package(requests):
    try:
        case_id=CompanyDashboard.objects.filter(case_id=requests.data["case_id"]).first()
        company_id=CompanyDetails.objects.filter(company_id=requests.data["company_id"]).first()
        print(case_id)
        print(company_id)
        data=requests.data
        save_package=Packages.objects.create(
            case_id=case_id,
            company_id=company_id,
            company_name=data["company_name"],
            total_annual_coverage=data["total_annual_coverage"],
            accidental_emergencies=data["accidental_emergencies"],
            ambulance_services_expenses=data["ambulance_services_expenses"],
            hospitalization_room_charges=data["hospitalization_room_charges"],
            surgery=data["surgery"],
            dental_and_vision_care=data["dental_and_vision_care"],
            other_medical_expenses=data["other_medical_expenses"],
            company_bid=data["company_bid"]
        )
        return Response(data={"message":"Bid Sent Successfully"},status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(data={"error":F"Error! {e}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_all_packages(request):
    company_dashboard_data = CompanyDashboard.objects.all()
    company_packages_data = Packages.objects.all()

    company_dashboard_serializer = CompanyDashboardSerializer(company_dashboard_data, many=True)
    company_packages_serializer = PackagesSerializer(company_packages_data, many=True)

    data = {
            "company_dashboard": company_dashboard_serializer.data,
            "company_packages": company_packages_serializer.data,
        }

    return Response(data)
