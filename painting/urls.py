from django.urls import path
from . import views

urlpatterns = [
    path('', views.painting, name='painting'),
]