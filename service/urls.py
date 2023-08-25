from django.urls import path
from service import views_propiedad, views_cliente
from django.conf import settings
from django.contrib.staticfiles.urls import static

urlpatterns = [
    ##### RUTAS PROPIEDADES #####
    path('propiedad', views_propiedad.index_propiedad, name="index_propiedad"),
    path('propiedad/crear', views_propiedad.crear_propiedad, name="crear_propiedad"),
    path('propiedad/editar/<int:id_inmueble>', views_propiedad.editar_propiedad, name="editar_propiedad"),
    path('propiedad/eliminar/<int:id_inmueble>', views_propiedad.eliminar_propiedad, name="eliminar_propiedad"),
    ##### FIN RUTAS PROPIEDADES #####
    ##### RUTAS CLIENTES #####
    path('cliente', views_cliente.index_cliente, name="index_cliente"),
    path('cliente/crear', views_cliente.crear_cliente, name="crear_cliente"),
    path('cliente/editar/<int:id_inmueble>', views_cliente.editar_cliente, name="editar_cliente"),
    path('cliente/eliminar/<int:id_inmueble>', views_cliente.eliminar_cliente, name="eliminar_cliente"),
    ##### FIN RUTAS CLIENTES #####
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  