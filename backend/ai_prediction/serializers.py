# serializers.py
from rest_framework import serializers
from input_forms.models import UserInformation

class UserInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformation
        fields = '__all__'
