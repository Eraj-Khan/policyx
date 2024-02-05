from django.contrib import admin
from django.urls import path
from .views import get_answer,ping

urlpatterns = [
    path('answer/', get_answer),
    # path('answer/response/', views.get_answer_response),
    path('ping/', ping),
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('answer/', views.post_query),
#     path('answer/response/', views.get_query_response),
#     path('ping/', views.ping),
# ]
