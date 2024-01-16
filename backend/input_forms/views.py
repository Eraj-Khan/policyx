from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from .models import UserInformation, Budget
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

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
            martial_status=data['maritalStatus'],  # Correct the field name here
            income=data['income'],
            education=data['education'],
            employment_status=data['employment'],
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
