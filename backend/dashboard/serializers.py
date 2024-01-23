from rest_framework import serializers
from .models import CompanyDashboard,Packages,CompanyDetails

class CompanyDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDashboard
        fields = '__all__'
        
class CompanyPackagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = '__all__'
        
class CompanyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDetails
        fields = '__all__'
        