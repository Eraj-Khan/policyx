from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('policy/', include('notifications.urls')),
    path('current_bid/',include('bidding.urls'))
]
