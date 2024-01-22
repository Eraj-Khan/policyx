from rest_framework import serializers
from .models import User, CompanyUser
from djoser.serializers import UserCreateSerializer


class CustomUserCreateSerializer(UserCreateSerializer):
    
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'role', 'password']
        
    def validate(self, attrs):
        email = attrs.get('email', '')
        return attrs

    def create(self, validated_data, **kwargs):
        user = User.objects.create_user(**validated_data)
        try:

            company_user = user.company_profile
        except CompanyUser.DoesNotExist:

            company_user_data = {
                'user': user,
                'company_name': kwargs.get('company_name', ''),
                'business_type': kwargs.get('business_type', ''),
                'business_address': kwargs.get('business_address', ''),
                'contact_person': kwargs.get('contact_person', ''),
                'phone_number': kwargs.get('phone_number', ''),
                'industry': kwargs.get('industry', ''),
                'terms_and_conditions_accepted': kwargs.get('terms_and_conditions_accepted', False),
            }
            CompanyUser.objects.create(**company_user_data)

        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.role == 'company':
            try:
                company_user = instance.company_profile
                data.update({
                    'company_name': company_user.company_name,
                    'business_type': company_user.business_type,
                    'business_address': company_user.business_address,
                    'contact_person': company_user.contact_person,
                    'phone_number': company_user.phone_number,
                    'industry': company_user.industry,
                    'terms_and_conditions_accepted': company_user.terms_and_conditions_accepted,
                })
            except CompanyUser.DoesNotExist:
                print("404 not found")
                return ("404 not found")
        return data


# class CustomUserCreateSerializer(UserCreateSerializer):
    
#     class Meta:
#         model = User
#         fields = ['email', 'username', 'first_name', 'last_name', 'role', 'password']
        
#     def validate(self, attrs):
#         email = attrs.get('email', '')
#         return attrs

#     def create(self, validated_data, **kwargs):
#         # Pass additional keyword arguments to the create_user method
#         # user = User.objects.create_user(**validated_data, **kwargs)
#         user = User.objects.create_user(**self.initial_data, **kwargs)
#         try:
#             company_user = user.company_profile
#         except CompanyUser.DoesNotExist:
#             company_user_data = {
#                 'user': user,
#                 'company_name': kwargs.get('company_name', ''),
#                 'business_type': kwargs.get('business_type', ''),
#                 'business_address': kwargs.get('business_address', ''),
#                 'contact_person': kwargs.get('contact_person', ''),
#                 'phone_number': kwargs.get('phone_number', ''),
#                 'industry': kwargs.get('industry', ''),
#                 'terms_and_conditions_accepted': kwargs.get('terms_and_conditions_accepted', False),
#             }
#             CompanyUser.objects.create(**company_user_data)

#         return user

#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#         if instance.role == 'company':
#             try:
#                 company_user = instance.company_profile
#                 data.update({
#                     'company_name': company_user.company_name,
#                     'business_type': company_user.business_type,
#                     'business_address': company_user.business_address,
#                     'contact_person': company_user.contact_person,
#                     'phone_number': company_user.phone_number,
#                     'industry': company_user.industry,
#                     'terms_and_conditions_accepted': company_user.terms_and_conditions_accepted,
#                 })
#             except CompanyUser.DoesNotExist:
#                 print("404 not found")
#                 return ("404 not found")
#         return data

# class CompanyUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CompanyUser
#         fields = '__all__'

# class CustomUserCreateSerializer(UserCreateSerializer):
    
#     class Meta:
#         model = User
#         fields = ['email', 'username', 'first_name', 'last_name', 'role', 'password']
        
#     def validate(self, attrs):
#         email = attrs.get('email', '')
#         return attrs

#     def create(self, validated_data, **kwargs):
#         # Separate the User fields from the additional CompanyUser fields
#         user_data = {key: validated_data.pop(key, None) for key in ['email', 'username', 'first_name', 'last_name', 'role', 'password']}
        
#         # Pass user_data to create_user method
#         user = User.objects.create_user(**user_data, **kwargs)
        
#         # Now, create the CompanyUser instance
#         company_user_data = {
#             'user': user,
#             'company_name': kwargs.get('company_name', ''),
#             'business_type': kwargs.get('business_type', ''),
#             'business_address': kwargs.get('business_address', ''),
#             'contact_person': kwargs.get('contact_person', ''),
#             'phone_number': kwargs.get('phone_number', ''),
#             'industry': kwargs.get('industry', ''),
#             'terms_and_conditions_accepted': kwargs.get('terms_and_conditions_accepted', False),
#         }
#         CompanyUser.objects.create(**company_user_data)

#         return user

#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#         if instance.role == 'company':
#             try:
#                 company_user = instance.company_profile
#                 data.update({
#                     'company_name': company_user.company_name,
#                     'business_type': company_user.business_type,
#                     'business_address': company_user.business_address,
#                     'contact_person': company_user.contact_person,
#                     'phone_number': company_user.phone_number,
#                     'industry': company_user.industry,
#                     'terms_and_conditions_accepted': company_user.terms_and_conditions_accepted,
#                 })
#             except CompanyUser.DoesNotExist:
#                 print("404 not found")
#                 return ("404 not found")
#         return data