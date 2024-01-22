from django.db.models.signals import post_save
from django.dispatch import receiver
from server.tasks import clean_expired_cases
from company.models import CompanyDashboard


@receiver(post_save, sender=CompanyDashboard)
def trigger_clean_expired_cases(sender, instance, **kwargs):
    print('running cleanup signals')
    clean_expired_cases(repeat=1, repeat_until=None)