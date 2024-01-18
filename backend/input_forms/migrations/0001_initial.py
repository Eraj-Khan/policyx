# Generated by Django 5.0.1 on 2024-01-17 18:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Age', models.IntegerField()),
                ('gender', models.CharField(max_length=10)),
                ('bmi', models.FloatField()),
                ('children', models.IntegerField()),
                ('smoker', models.BooleanField()),
                ('region', models.CharField(max_length=50)),
                ('martial_status', models.CharField(max_length=20)),
                ('income', models.FloatField()),
                ('education', models.CharField(max_length=50)),
                ('employment_status', models.CharField(max_length=50)),
                ('case_id', models.CharField(blank=True, max_length=64, null=True, unique=True)),
            ],
            options={
                'db_table': 'UserInformation',
            },
        ),
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('user_information', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='input_forms.userinformation')),
                ('budget', models.FloatField()),
                ('ai_suggested', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Budget',
            },
        ),
    ]