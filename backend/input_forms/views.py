from django.shortcuts import render, redirect
from .forms import UserInformationForm, BudgetForm
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from .models import UserInformation, Budget
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from input_forms.models import Budget , UserInformation
from ai_prediction.serializers import BudgetSerializer, UserInformationSerializer

def make_ai_prediction_request():
    ai_prediction_endpoint = 'http://127.0.0.1:8000/ai-prediction/all-users/'
    response = requests.get(ai_prediction_endpoint)
    return response.status_code, response.text if response.status_code == 200 else None

@csrf_exempt
@require_POST
def user_input_view(request):
    try:
        print('Received POST request:')
        print(f"Request body: {request.body.decode('utf-8')}")

        data = json.loads(request.body)
        print('Parsed JSON data:')
        print(data)

        # Convert "No" string to False for boolean fields
        smoker = data.get('smoker', '').lower() == 'yes'

        hash_data = ''.join([str(data[field]) for field in data]).encode('utf-8')
        hash_key = hashlib.sha256(hash_data).hexdigest()

        user_info = UserInformation.objects.create(
            Age=data['age'],
            gender=data['gender'],
            bmi=data['bmi'],
            children=data['children'],
            smoker=smoker,
            region=data['region'],
            martial_status=data['marital_status'],  # Correct the field name here
            income=data['income'],
            education=data['education'],
            employment_status=data['employment_status'],
            case_id=hash_key,
        )

        budget = Budget.objects.create(
            user_information=user_info,
            budget=data['budget'],
        )

        return JsonResponse({'message': 'Form submitted successfully'})
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({'error': str(e)})
    
def success_page(request):
    return render(request, 'success_page.html')

@api_view(['GET'])
def get_data_by_case_id(request, case_id):
    try:
        cases_data = UserInformation.objects.get(case_id=case_id)
        ai_budget_data = Budget.objects.filter(user_information=cases_data)
        cases_serializer = UserInformationSerializer(cases_data)
        ai_budget_serializer = BudgetSerializer(ai_budget_data, many=True)
        response_data = {
            'case': cases_serializer.data,
            'budgetDetails': ai_budget_serializer.data
        }
        return Response(response_data)
    except UserInformation.DoesNotExist:
        return Response({'message': 'Case not found'}, status=404)
