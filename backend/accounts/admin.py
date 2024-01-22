from django.contrib import admin
from .models import User, CompanyUser


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'first_name', 'last_name', 'username', 'created_at', 'is_admin', 'role']
    
class CompanyUserAdmin(admin.ModelAdmin):
    list_display = [
                    'id', 'user', 'company_name', 'business_type', 
                    'business_address', 'contact_person', 'phone_number', 'industry', 'terms_and_conditions_accepted'
                    ]

    
admin.site.register(User, UserAdmin)
admin.site.register(CompanyUser, CompanyUserAdmin)
