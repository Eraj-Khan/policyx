
from datetime import datetime, timedelta
from django.db.models import Q
from company.models import CompanyDashboard, Packages
from background_task import background

@background(schedule=timedelta(minutes=1))  # Run the task every day, adjust as needed
def clean_expired_cases():
    three_days_ago = datetime.now() - timedelta(days=3)
    current_date = datetime.now().date()
    print('running cleanup tasks')


    # Get CompanyDashboard instances that meet the criteria
    expired_cases = CompanyDashboard.objects.filter(
        created_at__lte=current_date,
        packages__isnull=True
    )

    # Delete the instances that meet the criteria
    expired_cases.delete()

    # Get CompanyDashboard instances with matching Packages and is_completed=False
    incomplete_cases = CompanyDashboard.objects.filter(
        Q(packages__isnull=False) & Q(is_completed=False)
    )

    # Delete incomplete cases
    incomplete_cases.delete()
