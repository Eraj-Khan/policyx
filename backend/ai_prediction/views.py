from django.shortcuts import render
from input_forms.models import UserInformation
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserInformationSerializer 
import joblib
import pandas as pd
from django.conf import settings
import os

@api_view(['GET'])
def user_by_case_id(request, case_id):
    try:
        user_info = UserInformation.objects.get(case_id=case_id)
        serializer = UserInformationSerializer(user_info)

        fields_to_retrieve = [
                "age", "bmi", "children", "smoker", "gender",
                "region"
            ]
        data_dict = {key: serializer.data.get(key, None) for key in fields_to_retrieve}

        data_encoded = pd.DataFrame({
            'age': [data_dict['age']],  
            'bmi': [data_dict['bmi']],  
            'children': [data_dict['children']],  
            'smoker_yes': [int(data_dict['smoker'])],  
            'gender_male': [1 if data_dict['gender'] == 'male' else 0],  
            'region_northwest': [1 if data_dict['region'] == 'northwest' else 0],  
            'region_southeast': [1 if data_dict['region'] == 'southeast' else 0],
            'region_southwest': [1 if data_dict['region'] == 'southwest' else 0]
    })

        model_path = os.path.join(settings.BASE_DIR, 'ai_prediction', 'model', 'xgboost_model_insurance.joblib')
        loaded_model = joblib.load(model_path)
        predictions = loaded_model.predict(data_encoded)
        predictions = int(predictions/12)
        print("Predictions:", int(predictions))

        # array_of_values_to_be_scored = [serializer.data.get(field) for field in fields_to_retrieve]
        # data_to_retrieve = {field: serializer.data['Ai_Suggested_Premium'][field] for field in fields_to_retrieve}

        # access_token = {"access_token":"eyJraWQiOiIyMDI0MDEwNjA4MzciLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01NTAwMEFUSEhRIiwiaWQiOiJJQk1pZC01NTAwMEFUSEhRIiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiMzYyMTY5ODUtMmE2ZS00YTQyLThhMWEtNjc4ZDdjOTUzZDE5IiwiaWRlbnRpZmllciI6IjU1MDAwQVRISFEiLCJnaXZlbl9uYW1lIjoiSHV6ZWZhIiwiZmFtaWx5X25hbWUiOiJBbnZlciIsIm5hbWUiOiJIdXplZmEgQW52ZXIiLCJlbWFpbCI6Imh1emVmYWFudmVyQGdtYWlsLmNvbSIsInN1YiI6Imh1emVmYWFudmVyQGdtYWlsLmNvbSIsImF1dGhuIjp7InN1YiI6Imh1emVmYWFudmVyQGdtYWlsLmNvbSIsImlhbV9pZCI6IklCTWlkLTU1MDAwQVRISFEiLCJuYW1lIjoiSHV6ZWZhIEFudmVyIiwiZ2l2ZW5fbmFtZSI6Ikh1emVmYSIsImZhbWlseV9uYW1lIjoiQW52ZXIiLCJlbWFpbCI6Imh1emVmYWFudmVyQGdtYWlsLmNvbSJ9LCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiI1ZGU0N2I3MTQ1Mzk0MWNmYTM2OGM1OWQ3Nzg3NGZjZCIsImZyb3plbiI6dHJ1ZX0sImlhdCI6MTcwNTMzNDYyNCwiZXhwIjoxNzA1MzM4MjI0LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.fWdrJ4Dq9eQK_P-8-abPG3S6iFizEUO3OsWOpJJlXoKPEtDnCZRr3GAA_B9Ko9Q611B0MBC_dX7Pr0wmmIP8suLL29AAbouLkGumTx9_rR8-UNKBuYHdJqxe-hww6JObALTgPOguGFl1Xm17OTFpohtS39AottYnwUOchKlXmWvV8oHa1DzQqrufwkiqKLUAN4sByAkMKNjXyi92TifDKSUpgnNl3zsWdx33wQ2i_VqKHC4jx3EJ8uz-kPuxq--Vpbbe8QoibKnKUYVreDtISTDHI9SdFPZsNYnDQ-9gq9TAU_9O660rVpm6R_B3ubII7qpulK5AIGEzLdUbCXzOwQ","refresh_token":"not_supported","token_type":"Bearer","expires_in":3600,"expiration":1705338224,"scope":"ibm openid"}
        # url = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployments/44346209-bc39-420d-8972-ac88059061b1/predictions?version=2021-05-01'
        # header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + access_token["access_token"]}
        # payload_scoring = {"input_data": [{"fields": [fields_to_retrieve], "values": [array_of_values_to_be_scored]}]}
        # response_scoring = requests.post(url, json=payload_scoring,headers=header)
        # prediction_value = response_scoring.json()['predictions'][0]['values'][0][0]


        # prediction_value = 1700.2321 / 12
        return Response({"Ai_Suggested_Premium": int(predictions)}, status=status.HTTP_200_OK)
    except UserInformation.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
