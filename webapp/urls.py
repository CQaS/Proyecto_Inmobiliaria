from django.urls import path, re_path, conf
from django.conf import settings
from django.contrib.staticfiles.urls import static
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('msg', views.msg, name='msg'),
    path('login', views.login, name='login'),
    path('salir', views.salir, name='salir'),
    path('404', views.notFound, name='404'),
    path('accounts/', conf.include('django.contrib.auth.urls')),
    ##### NOT FOUND #####
    path('<str:err>/', views.notFound, name='404'),
    re_path(r'^propiedad/(?P<err>\w+)/$', views.notFound, name='404'),
    re_path(r'^cliente/(?P<err>\w+)/$', views.notFound, name='404'),
    re_path(r'^contrato/(?P<err>\w+)/$', views.notFound, name='404'),
    re_path(r'^empleado/(?P<err>\w+)/$', views.notFound, name='404'),
    ##### FIN NOT FOUND #####

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
