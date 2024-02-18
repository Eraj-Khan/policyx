from django.db import models
from accounts.models import User

class CompanyDashboard(models.Model):
    case_id = models.CharField(max_length=255, unique=True, default=1)
    id_user = models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    age = models.IntegerField(max_length=255, null=True, blank=True)
    gender =  models.CharField(max_length=255, default='', null=True, blank=True)
    bmi = models.FloatField(max_length=255, default=25, null=True)
    children = models.IntegerField(max_length=255, default=0, null=True, blank=True)
    smoker = models.BooleanField(default=False)
    region =  models.CharField(max_length=255, default='', null=True, blank=True)
    marital_status =  models.CharField(max_length=255, default='', null=True, blank=True)
    income = models.BigIntegerField(max_length=255, default=0, null=True)
    education = models.CharField(max_length=255, default='', null=True, blank=True)
    employment_status = models.CharField(max_length=255, default='', null=True, blank=True)
    recommended_value = models.IntegerField(max_length=255, default='', null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True,null=True)
    updated_at=models.DateTimeField(auto_now=True)
    is_completed=models.BooleanField(default=False,null=True)
    active=models.BooleanField(default=True,null=True)
    is_expired = models.BooleanField(default=False)

    
    def __str__(self):
        return self.case_id


class CompanyPackages(models.Model):
    case_user =models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    id=models.AutoField(primary_key=True)
    case_id = models.CharField(max_length=255, default=1)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    total_annual_coverage = models.IntegerField(max_length=255, null=True, blank=True)
    accidental_emergencies= models.IntegerField(max_length=255, null=True, blank=True)
    ambulance_services_expenses= models.IntegerField(max_length=255, null=True, blank=True)
    hospitalization_room_charges = models.IntegerField(max_length=255, null=True, blank=True)
    surgery = models.IntegerField(max_length=255, null=True, blank=True)
    dental_and_vision_care = models.IntegerField(max_length=255, null=True, blank=True)
    other_medical_expenses = models.IntegerField(max_length=255, null=True, blank=True)
    monthly_coverage= models.IntegerField(max_length=255, default=0, null=True, blank=True)
    updated_at=models.DateTimeField(auto_now=True)
    is_accepted=models.BooleanField(default=False,null=True)
    is_expired = models.BooleanField(default=False)

    class Meta:
        unique_together = ('case_user','case_id', 'company_name')
  
    def __str__(self):
        return self.case_id