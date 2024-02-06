from django.shortcuts import render
from .models import User, CompanyUser
from rest_framework import status
from rest_framework.response import Response
from djoser.views import UserViewSet
from rest_framework import generics
from .serializers import CustomUserCreateSerializer, CompanyUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_name'] = self.user.username
        data['role'] = self.user.role
        data['id'] = self.user.id
        data['email'] = self.user.email
        if data['role'] == "company":
            company = CompanyUser.objects.get(user_id = data['id'])
            data['company_name'] = company.company_name
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class CustomUserRegistrationView(UserViewSet):
    def perform_create(self, serializer):
        
        additional_data = {
            'company_name': self.request.data.get('company_name', None),
            'business_type': self.request.data.get('business_type', None),
            'business_address': self.request.data.get('business_address', None),
            'contact_person': self.request.data.get('contact_person', None),
            'phone_number': self.request.data.get('phone_number', None),
            'industry' : self.request.data.get('industry', None),
            'email': self.request.data.get('email', None),
            'terms_and_conditions_accepted': self.request.data.get('terms_and_conditions_accepted', None)
        }
        company_name = additional_data['company_name']
        if company_name is not None:
            company_name = company_name.lower()
    
    # Update the 'company_name' key with the lowercased value
        additional_data['company_name'] = company_name
        serializer.save(additional_data=additional_data)

# class CompanyUserCreateView(generics.CreateAPIView):
#     queryset = CompanyUser.objects.all()
#     serializer_class = CompanyUserSerializer
#     def create(self, request, *args, **kwargs):
#         role = request.data.get('role', None)
#         if role not in ['user', 'company_user']:
#             return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
#         if role == 'company':
#             user_serializer = CustomUserCreateSerializer(data=request.data)
#             if user_serializer.is_valid():
#                 user = user_serializer.save()
#                 company_user_data = {'user': user.id, **request.data}
#                 company_user_serializer = CompanyUserSerializer(data=company_user_data)
#                 if company_user_serializer.is_valid():
#                     company_user_serializer.save()
#                     return Response(company_user_serializer.data, status=status.HTTP_201_CREATED)
#                 else:
#                     user.delete()
#                     return Response(company_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 




class CompanyUserCreateView(APIView):
    def post(self, request):
        data = request.data
        
        serializer = CompanyUserSerializer(data=data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.data["email"], password=serializer.data["password"]
            )
            if not user:
                return Response(
                    {"message": "Invalid Credentials"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            token = get_tokens_for_user(user)
            return Response(
                {"token": token, }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)








