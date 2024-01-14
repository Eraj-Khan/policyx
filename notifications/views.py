from django.http import JsonResponse
from .models import Policies
from .serializers import PoliciesSerializer
from rest_framework.decorators import api_view
import json
from company_dashboard.models import CompanyDashboard
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def policies_list(request):
    policies = Policies.objects.all()
    serializer = PoliciesSerializer(policies, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def policy_filter(request):
    case_id = request.data.get('case_id')
    policies = Policies.objects.filter(case_id=case_id)
    serializer = PoliciesSerializer(policies, many=True)
    jsonPolicy = json.dumps(serializer.data[0])
    load_json=json.loads(jsonPolicy)
    load_json["suggested_value"]=get_bid_company1()
    print(load_json)
    company_dash=CompanyDashboard(
            id=load_json['id'],
            case_id=load_json['case_id'],
            age=load_json['age'],
            gender=load_json['gender'],
            bmi=load_json['bmi'],
            children=load_json['children'],
            smoker=load_json['smoker'],	
            region= load_json['region'],
            marital_status= load_json['marital_status'],
            income= load_json['income'],
            education=load_json['education'],
            employment_status=load_json['employment_status'],
            recommended_value=get_bid_company1()
        
    )
    company_dash.save()

    return Response(status= status.HTTP_200_OK, data={"message":"Bid Request Sent"})

def get_bid_company1():
    #bids from companies will be added here with logic
    #three functions will be created for companies
    #send function once the bid is recieved from the company
    return 5000

