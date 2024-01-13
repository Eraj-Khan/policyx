from django.shortcuts import render, redirect
from .forms import UserInformationForm, BudgetForm

def user_input_view(request):
    if request.method == 'POST':
        user_info_form = UserInformationForm(request.POST, prefix='user_info')
        budget_form = BudgetForm(request.POST, prefix='budget')

        if user_info_form.is_valid() and budget_form.is_valid():
            user_info = user_info_form.save()
            budget = budget_form.save(commit=False)
            budget.user_information = user_info
            budget.save()
            return redirect('success_page')  # Redirect to a success page

    else:
        user_info_form = UserInformationForm(prefix='user_info')
        budget_form = BudgetForm(prefix='budget')

    return render(request, 'user_input_template.html', {'user_info_form': user_info_form, 'budget_form': budget_form})

def success_page(request):
    return render(request, 'success_page.html')
