from django.db import models
from accounts.models import User

class UserInformation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_information')
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10)
    bmi = models.FloatField()
    children = models.IntegerField()
    smoker = models.BooleanField()
    region = models.CharField(max_length=50)
    marital_status = models.CharField(max_length=20)
    income = models.FloatField()
    education = models.CharField(max_length=50)
    employment_status = models.CharField(max_length=50)
    case_id = models.CharField(max_length=64, blank=True, null=True, unique=True)


    class Meta:
        db_table = 'UserInformation'

# class Budget(models.Model):
#     user_information = models.OneToOneField(UserInformation, on_delete=models.CASCADE, primary_key=True)
#     budget = models.FloatField()
#     ai_suggested = models.FloatField(null=True, blank=True)


#     class Meta:
#         db_table = 'Budget'