from django.shortcuts import render
import jwt
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from input_forms.models import UserInformation
from ai_prediction.serializers import UserInformationSerializer
from accounts.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user

def make_ai_prediction_request(case_id):
    # ai_prediction_endpoint = 'http://127.0.0.1:8000/ai-prediction/all-users/'
    get_user_by_case_id = f'http://127.0.0.1:8000/ai-prediction/user_by_case_id/{case_id}'
    response = requests.get(get_user_by_case_id)
    return response.status_code, response.text if response.status_code == 200 else None


@csrf_exempt
@require_POST
def user_input_view(request):
    try:
        # Access the token from the Authorization header
        token = request.headers.get('Authorization', '').split(' ')[1]
        print(f'Token: {token}')

        payload = jwt.decode(token,'django-insecure-&rd#)qvlwhxdlx1a2nibmew1%$8+#3njmb_b39xn^sdz($2@y)',  algorithms=['HS256'])

        print(payload)

        user_id = payload['user_id']

        print('Received POST request:')
        print(f"Request body: {request.body.decode('utf-8')}")
        data = json.loads(request.body)
        print('Parsed JSON data:')
        print(data)

        # Convert "No" string to False for boolean fields
        smoker = data.get('smoker', '').lower() == 'yes'
        hash_data = ''.join([str(data[field]) for field in data]).encode('utf-8')
        hash_key = hashlib.sha256(hash_data).hexdigest()
        hash_key = 'PX' + hash_key[:4]

        user_info = UserInformation.objects.create(
            user_id=user_id,  # Associate with the authenticated user
            age=data['age'],
            gender=data['gender'],
            bmi=data['bmi'],
            children=data['children'],
            smoker=smoker,
            region=data['region'],
            marital_status=data['marital_status'],
            income=data['income'],
            education=data['education'],
            employment_status=data['employment_status'],
            case_id=hash_key,
        )

        return JsonResponse({
            'message': 'Form submitted successfully',
            'case_id': hash_key,
            })

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({'error': str(e)})
def success_page(request):
    return render(request, 'success_page.html')


@api_view(['GET'])
def get_ai_recommendation(request, case_id):
    try:
        cases_data = UserInformation.objects.get(case_id=case_id)
        # ai_budget_data = cases_data.budget
        cases_serializer = UserInformationSerializer(cases_data)
        # ai_budget_serializer = BudgetSerializer(ai_budget_data)
        print(case_id)
        status_code, ai_prediction_response = make_ai_prediction_request(case_id)
        if status_code == 200:
            print(ai_prediction_response)
            prediction_data = json.loads(ai_prediction_response)
            ai_suggested_value = float(prediction_data.get("Ai_Suggested_Premium", 0.0))
        #     # budget.ai_suggested = ai_suggested_value
        #     # budget.save()
        response_data = {
            'case': {
                **cases_serializer.data,
                'ai_suggested': ai_suggested_value
                # 'budget': ai_budget_serializer.data['budget'],
                # 'ai_suggested': ai_budget_serializer.data['ai_suggested'],
            },
        }
        return Response(response_data)
    except UserInformation.DoesNotExist:
        return Response({'message': 'Case not found'}, status=404)