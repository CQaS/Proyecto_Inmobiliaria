import json
import uuid
import os
from datetime import date
from django.shortcuts import render, redirect, get_object_or_404
from django.db import models, connection, IntegrityError
from django.db.models import Count, Q
from django.core import serializers
from django.core.serializers import serialize
from django.http import HttpResponse, Http404
from django.http.response import JsonResponse
# LOGIN
from django.contrib.auth.decorators import login_required
from .forms import InmuebleForm
from .models import *

# query = "SELECT * FROM inmueble i WHERE (SELECT COUNT(c.id_contrato) AS contID FROM contrato c WHERE c.inmueble_id = i.id_inmueble AND ((c.fecha_ing BETWEEN @inicio AND @fin) OR (c.fecha_salida BETWEEN @inicio AND @fin) OR (c.fecha_ing < @inicio AND c.fecha_salida > @fin))) = 0 AND i.estado = 1"

# "SELECT * FROM inmueble i WHERE (SELECT COUNT(c.id_contrato) AS contID FROM contrato c WHERE c.inmueble_id = i.id_inmueble AND ((c.fecha_ing BETWEEN '2023-10-01' AND '2023-10-31') OR (c.fecha_salida BETWEEN '2023-10-01' AND '2023-10-31') OR (c.fecha_ing > '2023-10-01' AND c.fecha_salida < '2023-10-31'))) = 0 AND i.id_inmueble = 10 AND i.estado = 1"


def serialize_date(obj):
    if isinstance(obj, date):
        return obj.strftime('%Y-%m-%d')
    raise TypeError("Type not serializable")


@login_required(login_url='/#modal-opened')
def index_propiedad(req):
    list = Inmueble.objects.all()
    return render(req, 'propiedad/index.html')


@login_required(login_url='/#modal-opened')
def crear_propiedad(req):
    ERR = ''
    success = ''
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "select * from clientes where categoria = 'Propietario'")
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()

        # Convertir los resultados a una lista de diccionarios
        lista = []
        for row in res:
            row_dict = {}
            for i, value in enumerate(row):
                column_name = columns[i]
                row_dict[column_name] = value
            lista.append(row_dict)

        # Convertir a formato JSON
        clientes = json.dumps(lista, default=serialize_date)

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
        print("Error:", e)

    inmueble_form = InmuebleForm(req.POST or None, req.FILES or None)
    images = req.FILES.getlist('imgs')

    if inmueble_form.is_valid() and len(images) > 0:

        T = req.POST.getlist('tipo_servicio')
        T_list = ', '.join(T)

        if T_list != '':
            inmueble_form.instance.tipo_servicio = T_list

        try:
            # Validar si el cod_referencia ya existen en la base de datos
            if Inmueble.objects.filter(cod_referencia=req.POST['cod_referencia']).exists():
                ERR = 'El cod. referencia ya está registrado en la base de datos.'
                context = {
                    'inmueble': inmueble_form,
                    'clientes': lista,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'propiedad/inmueble_form.html', context)

            I = inmueble_form.save()
            ultimo_id = I.id_inmueble

            for image in images:
                try:
                    # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                    new_filename = f"{uuid.uuid4().hex}{os.path.splitext(image.name)[1]}"

                    # Asigna el nuevo nombre al archivo
                    image.name = new_filename
                    foto = Fotos.objects.create(
                        image=image,
                        inmueble_id=ultimo_id
                    )

                except IntegrityError as e:
                    print(f"Error al crear la foto: {e}")

                except Exception as e:
                    print(f"Error inesperado: {e}")

            print('Inmueble creado, OK')
            success = "Inmueble creado correctamente"
            context = {
                'clientes': lista,
                'error': ERR,
                'success': success
            }
            return render(req, 'propiedad/inmueble_form.html', context)

        except Exception as e:
            error_message = f"Error al guardar el Inmueble: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
    else:
        for field_name, error_msgs in inmueble_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    if ERR != '':
        context = {
            'inmueble': inmueble_form,
            'clientes': lista,
            'error': ERR,
            'success': success
        }
    else:
        context = {
            'clientes': lista,
            'error': ERR,
            'success': success
        }
    return render(req, 'propiedad/inmueble_form.html', context)


@login_required(login_url='/#modal-opened')
def editar_propiedad(req, id_inmueble=None):
    ERR = ''
    success = ''
    try:
        inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)

        with connection.cursor() as cursor:
            cursor.execute(
                "select * from clientes where categoria = 'Propietario'")
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()

        # Convertir los resultados a una lista de diccionarios
        lista = []
        for row in res:
            row_dict = {}
            for i, value in enumerate(row):
                column_name = columns[i]
                row_dict[column_name] = value
            lista.append(row_dict)

        # Convertir a formato JSON
        clientes = json.dumps(lista, default=serialize_date)

    except Inmueble.DoesNotExist:
        print("NO ENCONTRADO")
        return redirect('404')

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
        print("Error:", e)

    inmueble_form = InmuebleForm(
        req.POST or None, req.FILES or None, instance=inmueble)
    # images = req.FILES.getlist('imgs')

    if inmueble_form.is_valid():

        T = req.POST.getlist('tipo_servicio')
        T_list = ', '.join(T)

        if T_list != '':
            inmueble_form.instance.tipo_servicio = T_list

        try:
            I = inmueble_form.save()
            """ ultimo_id = I.id_inmueble

            for image in images:
                try:
                    # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                    new_filename = f"{uuid.uuid4().hex}{os.path.splitext(image.name)[1]}"

                    # Asigna el nuevo nombre al archivo
                    image.name = new_filename
                    foto = Fotos.objects.create(
                        image=image,
                        inmueble_id=ultimo_id
                    )

                except IntegrityError as e:
                    print(f"Error al crear la foto: {e}")

                except Exception as e:
                    print(f"Error inesperado: {e}") """

            print('Inmueble Editado, OK')
            success = "Propriedade editada corretamente"
            context = {
                'clientes': lista,
                'error': ERR,
                'success': success
            }
            return render(req, 'propiedad/inmueble_form.html', context)

        except Exception as e:
            error_message = f"Erro ao salvar o imóvel: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
    else:
        for field_name, error_msgs in inmueble_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    if ERR != '':
        context = {
            'inmueble': inmueble_form,
            'clientes': lista,
            'error': ERR,
            'success': success
        }
    else:
        context = {
            'inedit': inmueble,
            'clientes': lista,
            'error': ERR,
            'success': success
        }

    print(inmueble.cliente_id.id_cliente)
    print(lista)
    return render(req, 'propiedad/inmueble_form.html', context)


def detalles_propiedad(req, id_inmueble):
    un_detalle = Inmueble.objects.filter(
        id_inmueble__icontains=id_inmueble)

    for d in un_detalle:
        print(d.latitud, d.longitud)
        fotos = Fotos.objects.filter(
            inmueble_id=d.id_inmueble).values('image', 'inmueble_id')

    list_fotos = []
    for foto in fotos:
        foto['image'] = foto['image'].replace('webapp', '')
        list_fotos.append(foto['image'])
    print(list_fotos)

    return render(req, 'propiedad/inmueble.html', {'detalle': un_detalle, 'fotos': list_fotos})


@login_required(login_url='/#modal-opened')
def eliminar_propiedad(req, id_inmueble):
    inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
    inmueble.delete()
    return redirect('index_propiedad')


@login_required(login_url='/#modal-opened')
def buscar_por_fechas(req, f_ini, f_fin):
    try:
        print(f_ini, f_fin)

        list = Inmueble.objects.annotate(
            num_contratos=Count('contrato', filter=Q(
                contrato__fecha_ing__range=[f_ini, f_fin]) |
                Q(contrato__fecha_salida__range=[f_ini, f_fin]) |
                Q(contrato__fecha_ing__gt=f_ini,
                  contrato__fecha_salida__lt=f_fin)
            )
        ).filter(num_contratos=0, estado=1)

        data = []

        for inmueble in list:
            fotos = Fotos.objects.filter(
                inmueble_id=inmueble.id_inmueble).values('image', 'inmueble_id')

            # Convierte el QuerySet en una lista de diccionarios
            fotos_data = [{'image': foto['image'],
                           'inmueble_id': foto['inmueble_id']} for foto in fotos]

            # Convierte la lista en formato JSON
            response_data = json.dumps(fotos_data)

            # Serializar los objetos Inmueble y Fotos a formato JSON
            inmueble_json = serializers.serialize('json', [inmueble])

            # Convertir JSON a diccionarios
            inmueble_data = json.loads(inmueble_json)[0]['fields']

            data.append({
                'inmueble': inmueble_data,
                'fotos': fotos_data
            })

        # Convertir la lista de datos a JSON
        response_data = json.dumps(data)
        return HttpResponse(response_data, 'application/json')
    except Exception as e:
        print(e)


def propiedad_por_tipo(req, tipo_o, tipo_p, temporada, anual, venda):

    fecha_hoy = date.today()
    fecha_formateada = fecha_hoy.strftime('%Y-%m-%d')  # fecha de hoy

    if tipo_o == 'false':
        print('Tipo P')
        list = Inmueble.objects.annotate(
            num_contratos=models.Count('contrato', filter=(
                models.Q(contrato__fecha_ing__gt=fecha_formateada,
                         contrato__fecha_salida__lt=fecha_formateada)
            ))
        ).filter(num_contratos=0, tipo_inmueble__icontains=tipo_p, estado=1)

    elif tipo_p == 'false':
        print('Tipo O')
        list = Inmueble.objects.annotate(
            num_contratos=models.Count('contrato', filter=(
                models.Q(contrato__fecha_ing__gt=fecha_formateada,
                         contrato__fecha_salida__lt=fecha_formateada)
            ))
        ).filter(num_contratos=0, tipo_operacion__icontains=tipo_o, estado=1)

    elif temporada == 'true':
        print('Tipo temporada')
        list = Inmueble.objects.annotate(
            num_contratos=models.Count('contrato', filter=(
                models.Q(contrato__fecha_ing__gt=fecha_formateada,
                         contrato__fecha_salida__lt=fecha_formateada)
            ))
        ).filter(num_contratos=0, tipo_operacion__icontains='Alquiler temporario', estado=1)

    elif anual == 'true':
        print('Tipo anual')
        list = Inmueble.objects.annotate(
            num_contratos=models.Count('contrato', filter=(
                models.Q(contrato__fecha_ing__gt=fecha_formateada,
                         contrato__fecha_salida__lt=fecha_formateada)
            ))
        ).filter(num_contratos=0, tipo_operacion__icontains='Alquiler permanente', estado=1)

    elif venda == 'true':
        print('Tipo venta')
        list = Inmueble.objects.annotate(
            num_contratos=models.Count('contrato', filter=(
                models.Q(contrato__fecha_ing__gt=fecha_formateada,
                         contrato__fecha_salida__lt=fecha_formateada)
            ))
        ).filter(num_contratos=0, tipo_operacion__icontains='Venta', estado=1)

    else:
        print('Tipo O P')
        list = Inmueble.objects.annotate(
            num_contratos=models.Count('contrato', filter=(
                models.Q(contrato__fecha_ing__gt=fecha_formateada,
                         contrato__fecha_salida__lt=fecha_formateada)
            ))
        ).filter(num_contratos=0, tipo_operacion__icontains=tipo_o, tipo_inmueble__icontains=tipo_p, estado=1)

    # list = Inmueble.objects.filter(
    #   tipo_operacion__icontains=tipo_o, tipo_inmueble__icontains=tipo_p)

    data = []

    for inmueble in list:
        fotos = Fotos.objects.filter(
            inmueble_id=inmueble.id_inmueble).values('image', 'inmueble_id')

        # Convierte el QuerySet en una lista de diccionarios
        fotos_data = [{'image': foto['image'],
                       'inmueble_id': foto['inmueble_id']} for foto in fotos]

        # Convierte la lista en formato JSON
        response_data = json.dumps(fotos_data)

        # Serializar los objetos Inmueble y Fotos a formato JSON
        inmueble_json = serializers.serialize('json', [inmueble])

        # Convertir JSON a diccionarios
        inmueble_data = json.loads(inmueble_json)[0]['fields']

        data.append({
            'inmueble': inmueble_data,
            'fotos': fotos_data
        })

    # Convertir la lista de datos a JSON
    response_data = json.dumps(data)
    return HttpResponse(response_data, 'application/json')


@login_required(login_url='/#modal-opened')
def reportes(req, R):
    return render(req, 'propiedad/reportes.html', {'R': R})


@login_required(login_url='/#modal-opened')
def reportes_json_i(req):
    inmueble = list(Inmueble.objects.values())
    data = {'inmueble': inmueble}
    return JsonResponse(data)


@login_required(login_url='/#modal-opened')
def disponibilidad(req):
    return render(req, 'propiedad/disponibilidad.html')
