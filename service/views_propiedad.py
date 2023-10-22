import json
import uuid
import os
from datetime import date
from django.shortcuts import render, redirect
from django.db import models, connection, IntegrityError
from django.core import serializers
from django.core.serializers import serialize
from django.http import HttpResponse
from .forms import InmuebleForm
from .models import *

# query = "SELECT * FROM inmueble i WHERE (SELECT COUNT(c.id_contrato) AS contID FROM contrato c WHERE c.inmueble_id = i.id_inmueble AND ((c.fecha_ing BETWEEN @inicio AND @fin) OR (c.fecha_salida BETWEEN @inicio AND @fin) OR (c.fecha_ing < @inicio AND c.fecha_salida > @fin))) = 0 AND i.estado = 1"

# "SELECT * FROM inmueble i WHERE (SELECT COUNT(c.id_contrato) AS contID FROM contrato c WHERE c.inmueble_id = i.id_inmueble AND ((c.fecha_ing BETWEEN '2023-10-01' AND '2023-10-31') OR (c.fecha_salida BETWEEN '2023-10-01' AND '2023-10-31') OR (c.fecha_ing > '2023-10-01' AND c.fecha_salida < '2023-10-31'))) = 0 AND i.id_inmueble = 10 AND i.estado = 1"

""" from django.db.models import Q, Count, F
from .models import Inmueble, Contrato

resultado = Inmueble.objects.annotate(
    num_contratos=Count('contrato', filter=(
        Q(contrato__fecha_ing__range=['2023-10-01', '2023-10-31']) |
        Q(contrato__fecha_salida__range=['2023-10-01', '2023-10-31']) |
        Q(contrato__fecha_ing__lt='2023-10-01', contrato__fecha_salida__gt='2023-10-31')
    ))
).filter(num_contratos=0, id_inmueble=10, estado=1) """


def serialize_date(obj):
    if isinstance(obj, date):
        return obj.strftime('%Y-%m-%d')
    raise TypeError("Type not serializable")


def index_propiedad(req):
    list = Inmueble.objects.all()
    return render(req, 'propiedad/index.html')


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
        inmueble_form.instance.tipo_servicio = T_list

        try:
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


def editar_propiedad(req, id_inmueble):
    ERR = ''
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

        # print(clientes)

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contanto con Admin'
        print("Error:", e)

    inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
    formulario = InmuebleForm(
        req.POST or None, req.FILES or None, instance=inmueble)
    if formulario.is_valid() and req.POST:
        try:
            formulario.save()
            print('Inmueble, OK')
            return redirect('editar_propiedad')

        except Exception as e:
            error_message = f"Error al guardar el Inmueble: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
            return redirect('editar_propiedad')
    else:
        for field_name, error_msgs in formulario.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    return render(req, 'propiedad/editar.html', {'formulario': formulario, 'clientes': lista, 'error': ERR})


def detalles_propiedad(req, id_inmueble):
    un_detalle = Inmueble.objects.filter(
        id_inmueble__icontains=id_inmueble)
    print(un_detalle)
    for d in un_detalle:
        fotos = Fotos.objects.filter(
            inmueble_id=d.id_inmueble).values('image', 'inmueble_id')

    for foto in fotos:
        foto['image'] = foto['image'].replace('webapp', '')
    print(fotos)

    return render(req, 'propiedad/inmueble.html', {'detalle': un_detalle, 'fotos': fotos})


def eliminar_propiedad(req, id_inmueble):
    inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
    inmueble.delete()
    return redirect('index_propiedad')


def buscar_por_fechas(req):
    if req.method == 'POST':
        print(req.POST['origen'])
        # query =
        """SELECT * FROM clientes WHERE id_cliente = {0} AND pais_cliente = '{1}'""".format(
            '4', 'algo')
        # print(query)
        # cursor.execute(query)
        """ try:
        with connection.cursor() as cursor:
            cursor.execute("select * from clientes")
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
        R = json.dumps(lista, default=serialize_date)

        #print(R)

    except IntegrityError as e:
        print("Error:", e) """
        return HttpResponse('POST')
    else:
        print('GET ')
        return HttpResponse('GET')


def propiedad_por_tipo(req, tipo_o, tipo_p):

    fecha_hoy = date.today()
    fecha_formateada = fecha_hoy.strftime('%Y-%m-%d')  # fecha de hoy

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
