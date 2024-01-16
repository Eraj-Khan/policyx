from rest_framework import serializers
from .models import CompanyDashboard

class CompanyDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDashboard
        fields = '__all__'