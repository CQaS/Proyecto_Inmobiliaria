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
    path('propiedad/disponibilidad',
         views_propiedad.disponibilidad, name="disponibilidad"),
    ##### FIN RUTAS PROPIEDADES #####
    ##### RUTAS REPORTES #####
    path('reportes/<str:R>',
         views_propiedad.reportes, name="reportes"),
    path('reportes_json_i',
         views_propiedad.reportes_json_i, name="reportes_json_i"),
    path('reportes_json_c',
         views_propiedad.reportes_json_c, name="reportes_json_c"),
    path('reportes_json_e',
         views_propiedad.reportes_json_e, name="reportes_json_e"),
    ##### FIN RUTAS REPORTES #####
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
    path('contrato/',
         views_contrato.contrato_codRef, name="contrato_codRef"),
    path('contrato/codRef/<str:codRef>',
         views_contrato.contrato_codRef2, name="contrato_codRef2"),
    path('contrato/<int:id_inmueble>/',
         views_contrato.contrato_idInmueble, name="contrato_idInmueble"),
    path('contrato/crear', views_contrato.crear_contrato, name="crear_contrato"),
    ##### FIN RUTAS CONTRATOS #####
    ##### RESET PASSWORD #####
    path('reset_password/', views_cliente.reset_password, name="reset_password"),
    ##### FIN RESET PASSWORD #####


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
