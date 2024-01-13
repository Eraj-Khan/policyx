from rest_framework import serializers
from .models import User
from djoser.serializers import UserCreateSerializer

class CustomUserCreateSerializer(UserCreateSerializer):
    
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password']
        
    def validate(self, attrs):
        email = attrs.get('email', '')
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

