from django.urls import path
from . import views
from webapp import views
from django.conf import settings
from django.contrib.staticfiles.urls import static

urlpatterns = [
    path('', views.index, name="index"),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)    