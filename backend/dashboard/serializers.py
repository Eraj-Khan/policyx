from rest_framework import serializers
from .models import CompanyDashboard,CompanyPackages

class CompanyDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDashboard
        fields = '__all__'
        
class CompanyPackagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyPackages
        fields = '__all__'
    def create(self,validated_data):
        validated_data['company_name']=validated_data['company_name'].lower()
        return CompanyPackages.objects.create(**validated_data)
