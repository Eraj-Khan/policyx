from django.shortcuts import render, redirect
from .forms import UserInformationForm, BudgetForm


import requests
import json 

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from input_forms.models import Budget , UserInformation
from ai_prediction.serializers import BudgetSerializer, UserInformationSerializer

def make_ai_prediction_request():
    ai_prediction_endpoint = 'http://127.0.0.1:8000/ai-prediction/all-users/'
    response = requests.get(ai_prediction_endpoint)
    return response.status_code, response.text if response.status_code == 200 else None

def user_input_view(request):
    if request.method == 'POST':
        user_info_form = UserInformationForm(request.POST, prefix='user_info')
        budget_form = BudgetForm(request.POST, prefix='budget')

        if user_info_form.is_valid() and budget_form.is_valid():
            user_info = user_info_form.save()
            budget = budget_form.save(commit=False)
            budget.user_information = user_info
            # budget.save()


            status_code, ai_prediction_response = make_ai_prediction_request()
            if status_code == 200:
                print(ai_prediction_response)

                prediction_data = json.loads(ai_prediction_response)
                ai_suggested_value = float(prediction_data.get("Ai Suggested Premium", 0.0))
                budget.ai_suggested = ai_suggested_value
                budget.save()

                return redirect('success_page')

            else:
                error_message = f"Error making AI prediction request. Status Code: {status_code}"
                return render(request, 'model_error.html', {'error_message': error_message})

            
            # return redirect('success_page')
    else:
        user_info_form = UserInformationForm(prefix='user_info')
        budget_form = BudgetForm(prefix='budget')

    return render(request, 'user_input_template.html', {'user_info_form': user_info_form, 'budget_form': budget_form})

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