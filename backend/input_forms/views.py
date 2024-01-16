from django.shortcuts import render, redirect
from .forms import UserInformationForm, BudgetForm


import requests
import json 

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