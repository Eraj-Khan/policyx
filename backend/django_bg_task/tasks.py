from celery import shared_task
from datetime import datetime, timedelta
import time
from django.utils import timezone
from dashboard.models import CompanyDashboard, CompanyPackages



@shared_task
def cleanup_dashboard_records():
    print('Cleaning up records')
    # print(f"TIME DELTA{timezone.now() - timezone.timedelta(minutes=1)}")

    current_date = timezone.now().date()
    print(current_date)
    # Get CompanyDashboards older than 5 minutes with is_completed=False and no matching Package
    dashboards_to_delete = CompanyDashboard.objects.filter(
        created_at__date=current_date,
        is_completed=False
    )
    print(dashboards_to_delete,'list to dlt')

    for dashboard in dashboards_to_delete:
        print('in dashboard',dashboard)
        print('in dashboard',dashboard.case_id)

        # CASE 1
        # if packages of specific case_id is bidded but not completed till 2 mins
        packages_to_update=CompanyPackages.objects.filter(
            case_id=dashboard.case_id,
            updated_at__date=current_date,
            )
        if packages_to_update:
            print(packages_to_update, 'in case 1 ')
            if not dashboard.is_completed:
                print("here")
                dashboard.is_expired =True
                dashboard.save()
                print("save")
                for package in packages_to_update:
                    package.is_expired = True
                    package.save()
        else:
            print('in case 2')
            # CASE 2
            # If no bid by company till 2min
            dashboard.is_expired =True
            dashboard.save()
    
    print('Cleanup completed')
