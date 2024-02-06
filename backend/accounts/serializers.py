from rest_framework import serializers
from .models import User, CompanyUser
from djoser.serializers import UserCreateSerializer


class CustomUserCreateSerializer(UserCreateSerializer):
    
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'role', 'password']
        
    def validate(self, attrs):
        email = attrs.get('email', '')
        return attrs

    def create(self, validated_data, **additional_data):
        user = User.objects.create_user(**validated_data, **additional_data)
        return user 


class CompanyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyUser
        fields = ['company_name','business_type','business_address','contact_person','company_number','industry','terms_and_conditions_accepted']

    