from django.urls import path
from . import views
from webapp import views

urlpatterns = [
    path('', views.index, name="index"),
    
]    