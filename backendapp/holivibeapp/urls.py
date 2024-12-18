from django.urls import path, include
from . import views

urlpatterns = [
    path('fetch', views.fetch_holidays),
    path('fetch_country',views.fetch_country),
    path('holiday/<int:id>',views.fetch_holiday)
]
