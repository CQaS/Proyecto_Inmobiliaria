from django.urls import path
from service import views_propiedad, views_cliente, views_empleado
from django.conf import settings
from django.contrib.staticfiles.urls import static

urlpatterns = [
    ##### RUTAS PROPIEDADES #####
    path('propiedad', views_propiedad.index_propiedad, name="index_propiedad"),
    path('propiedad/crear', views_propiedad.crear_propiedad, name="crear_propiedad"),
    path('propiedad/editar/<int:id_inmueble>', views_propiedad.editar_propiedad, name="editar_propiedad"),
    path('propiedad/eliminar/<int:id_inmueble>', views_propiedad.eliminar_propiedad, name="eliminar_propiedad"),
    path('propiedad/buscar_por', views_propiedad.buscar_por, name="buscar_por"),
    ##### FIN RUTAS PROPIEDADES #####
    ##### RUTAS CLIENTES #####
    path('cliente', views_cliente.index_cliente, name="index_cliente"),
    path('cliente/crear', views_cliente.crear_cliente, name="crear_cliente"),
    path('cliente/editar/<int:id_cliente>', views_cliente.editar_cliente, name="editar_cliente"),
    path('cliente/eliminar/<int:id_cliente>', views_cliente.eliminar_cliente, name="eliminar_cliente"),
    ##### FIN RUTAS CLIENTES #####
    ##### RUTAS EMPLEADOS #####
    path('empleado', views_empleado.index_empleado, name="index_empleado"),
    path('empleado/crear', views_empleado.crear_empleado, name="crear_empleado"),
    path('empleado/editar/<int:id_empleado>', views_empleado.editar_empleado, name="editar_empleado"),
    path('empleado/eliminar/<int:id_empleado>', views_empleado.eliminar_empleado, name="eliminar_empleado"),
    ##### FIN RUTAS EMPLEADOS #####
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  