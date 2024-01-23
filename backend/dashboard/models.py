from django.db import models

class CompanyDashboard(models.Model):
    case_id = models.CharField(max_length=255, unique=True, default=1)
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

    
    def __str__(self):
        return self.case_id


class CompanyPackages(models.Model):
    package_id =models.OneToOneField(CompanyDashboard,on_delete=models.CASCADE,primary_key=True,null=False)
    case_id = models.CharField(max_length=255, default=1)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    total_annual_coverage = models.IntegerField(max_length=255, null=True, blank=True)
    accidental_emergencies= models.IntegerField(max_length=255, null=True, blank=True)
    ambulance_services_expenses= models.IntegerField(max_length=255, null=True, blank=True)
    hospitalization_room_charges = models.IntegerField(max_length=255, null=True, blank=True)
    surgery = models.IntegerField(max_length=255, null=True, blank=True)
    dental_and_vision_care = models.IntegerField(max_length=255, null=True, blank=True)
    other_medical_expenses = models.IntegerField(max_length=255, null=True, blank=True)
    company_bid = models.IntegerField(max_length=255, default=0, null=True, blank=True)
    
    def __str__(self):
        return self.case_id