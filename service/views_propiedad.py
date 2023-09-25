import json
import uuid
import os
from datetime import date
from django.shortcuts import render, redirect
from django.db import connection, IntegrityError
from django.http import HttpResponse
from .forms import InmuebleForm
from .models import *

# query = "SELECT * FROM Inmuebles i JOIN Propietarios p ON i.prop_Id = p.id_Prop WHERE (SELECT COUNT(c.id_Cont) AS contID FROM Contratos c WHERE c.inm_Id = i.id_Inm AND ((c.fecha_In BETWEEN @inicio AND @fin) OR (c.fecha_fin BETWEEN @inicio AND @fin) OR (c.fecha_In < @inicio AND c.fecha_fin > @fin))) = 0 AND i.estado = 1 AND i.disponible = 1" % (fecha_inicio, fecha_fin)

# cursor.execute(query)


def serialize_date(obj):
    if isinstance(obj, date):
        return obj.strftime('%Y-%m-%d')
    raise TypeError("Type not serializable")


def index_propiedad(req):
    list = Inmueble.objects.all()
    return render(req, 'propiedad/index.html')


def crear_propiedad(req):
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

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
        print("Error:", e)

    inmueble_form = InmuebleForm(req.POST or None, req.FILES or None)
    if inmueble_form.is_valid():
        try:
            I = inmueble_form.save()
            ultimo_id = I.id_inmueble

            images = req.FILES.getlist('imgs')
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
            return redirect('crear_propiedad')

        except Exception as e:
            error_message = f"Error al guardar el Inmueble: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
    else:
        for field_name, error_msgs in inmueble_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    return render(req, 'propiedad/inmueble_form.html', {'inmueble_form': inmueble_form, 'clientes': lista, 'error': ERR})


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


def eliminar_propiedad(req, id_inmueble):
    inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
    inmueble.delete()
    return redirect('index_propiedad')


def buscar_por(req):
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
