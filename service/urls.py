from django.urls import path
from service import views_propiedad, views_cliente, views_empleado, views_contrato
from django.conf import settings
from django.contrib.staticfiles.urls import static
from django.contrib.auth.decorators import login_required

urlpatterns = [
    ##### RUTAS PROPIEDADES #####
    path('propiedad', views_propiedad.index_propiedad, name="index_propiedad"),
    path('propiedad/crear', views_propiedad.crear_propiedad, name="crear_propiedad"),
    path('propiedad/editar/<int:id_inmueble>',
         views_propiedad.editar_propiedad, name="editar_propiedad"),
    path('propiedad/detalles/<int:id_inmueble>',
         views_propiedad.detalles_propiedad, name="detalles_propiedad"),
    path('propiedad/eliminar/<int:id_inmueble>',
         views_propiedad.eliminar_propiedad, name="eliminar_propiedad"),
    path('propiedad/buscar_por_fechas/<str:f_ini>/<str:f_fin>',
         views_propiedad.buscar_por_fechas, name="buscar_por_fechas"),
    path('propiedad/propiedad_por_tipo/<str:tipo_o>/<str:tipo_p>',
         views_propiedad.propiedad_por_tipo, name="propiedad_por_tipo"),
    path('propiedad/reportes',
         views_propiedad.reportes, name="reportes"),
    path('propiedad/reportes_json',
         views_propiedad.reportes_json, name="reportes_json"),
    ##### FIN RUTAS PROPIEDADES #####
    ##### RUTAS CLIENTES #####
    path('cliente', views_cliente.index_cliente, name="index_cliente"),
    path('cliente/crear', views_cliente.crear_cliente, name="crear_cliente"),
    path('cliente/editar/<int:id_cliente>',
         views_cliente.editar_cliente, name="editar_cliente"),
    path('cliente/eliminar/<int:id_cliente>',
         views_cliente.eliminar_cliente, name="eliminar_cliente"),
    path('cliente/json_Inq/<str:Name>', views_cliente.JSONclientes_Inq,
         name="JSON_clientes_Inq"),
    path('cliente/json_dni_Inq/<int:dni>', views_cliente.JSONclientes_dni_Inq,
         name="JSON_clientes_dni_Inq"),
    path('cliente/json_Prop/<str:Name>', views_cliente.JSONclientes_Prop,
         name="JSON_clientes_Prop"),
    ##### FIN RUTAS CLIENTES #####
    ##### RUTAS EMPLEADOS #####
    path('empleado', views_empleado.index_empleado, name="index_empleado"),
    path('empleado/crear', views_empleado.crear_empleado, name="crear_empleado"),
    path('empleado/editar/<int:id_empleado>',
         views_empleado.editar_empleado, name="editar_empleado"),
    path('empleado/eliminar/<int:id_empleado>',
         views_empleado.eliminar_empleado, name="eliminar_empleado"),
    ##### FIN RUTAS EMPLEADOS #####
    ##### RUTAS CONTRATOS #####
    path('contrato/<int:id_inmueble>/',
         views_contrato.index_contrato, name="index_contrato"),
    path('contrato/crear', views_contrato.crear_contrato, name="crear_contrato"),
    ##### FIN RUTAS CONTRATOS #####


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
