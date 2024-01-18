from django import forms
from .models import UserInformation, Budget
import hashlib
from django.db.models.signals import pre_save
from django.dispatch import receiver

class UserInformationForm(forms.ModelForm):
    class Meta:
        model = UserInformation
        fields = '__all__'
        exclude = ['hash_key','case_id']

class BudgetForm(forms.ModelForm):
    class Meta:
        model = Budget
        fields = '__all__'
        exclude = ['user_information','ai_suggested'] 
        

@receiver(pre_save, sender=UserInformation)
def generate_hash_key(sender, instance, **kwargs):
    # Generate a hash using all fields from the instance
    hash_data = ''.join([str(getattr(instance, field.attname)) for field in instance._meta.fields]).encode('utf-8')
    hash_key = hashlib.sha256(hash_data).hexdigest()
    instance.case_id = hash_key
