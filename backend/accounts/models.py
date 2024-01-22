# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# class UserManager(BaseUserManager):
#     def create_user(self, email, is_admin=False, password=None, username=None, first_name=None, last_name=None):
#         if not email:
#             raise ValueError('User must have an email address')
        
#         if not password:
#             raise ValueError('Password not provided')
            
#         user = self.model(
#             email=self.normalize_email(email),
#             username=username,
#             first_name=first_name,
#             last_name=last_name,
#             is_admin=is_admin,
#             is_verified=True
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
    
#     def create_superuser(self, email, is_admin=True, password=None, username='admin', first_name='admin', last_name='admin'):
#         user = self.create_user(
#             email=email,
#             username=username,
#             first_name=first_name,
#             last_name=last_name,
#             password=password,
#             is_admin=is_admin,
#         )
#         user.is_admin = True
#         user.is_verified = True
#         user.is_staff = True 
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user


# class User(AbstractBaseUser, PermissionsMixin):
#     username = models.CharField(max_length=50, unique=True)
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     email = models.EmailField(max_length=254, unique=True)
#     is_verified = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     is_superuser = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     USERNAME_FIELD = 'email'

#     objects = UserManager()

#     def __str__(self):
#         return self.email

# class CompanyUser(models.Model):
#     company_name = models.CharField(max_length=100)
#     business_type = models.CharField(max_length=100)
#     business_address = models.TextField()
#     contact_person = models.CharField(max_length=100)
#     email_address = models.EmailField(max_length=254)
#     phone_number = models.CharField(max_length=15)
#     industry = models.CharField(max_length=100)
#     username = models.CharField(max_length=50, unique=True)
#     password = models.CharField(max_length=50)
#     terms_and_conditions_accepted = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.company_name

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, role='normal', password=None, username=None, first_name=None, last_name=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')

        if not password:
            raise ValueError('Password not provided')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            role=role,
            is_verified=True,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, username='admin', first_name='admin', last_name='admin'):
        user = self.create_user(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            role='admin',
        )
        user.is_admin = True
        user.is_verified = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=254, unique=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    ROLE_CHOICES = (
        ('normal', 'Normal User'),
        ('company', 'Company User'),
    )
    role = models.CharField(max_length=12, choices=ROLE_CHOICES, default='normal')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

class CompanyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company_profile')
    company_name = models.CharField(max_length=100)
    business_type = models.CharField(max_length=100)
    business_address = models.TextField()
    contact_person = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    industry = models.CharField(max_length=100)
    terms_and_conditions_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
