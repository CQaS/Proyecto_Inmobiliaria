import json
import os
from datetime import date, datetime
from pathlib import Path
from docxtpl import DocxTemplate
from num2words import num2words
from django.shortcuts import render, redirect
from django.db import connection, IntegrityError
from django.core.serializers import serialize
from django.http import HttpResponse
from django.http import HttpResponse, JsonResponse
# LOGIN
from django.contrib.auth.decorators import login_required
from .models import *


def serialize_date(obj):
    if isinstance(obj, date):
        return obj.strftime('%Y-%m-%d')
    raise TypeError("Type not serializable")


@login_required(login_url='/#modal-opened')
def contrato_codRef(req):
    context = {
        'codRef': True,
        'error': '',
        'success': '',
    }
    return render(req, "contrato/contrato_form.html", context)


@login_required(login_url='/#modal-opened')
def contrato_codRef2(req, codRef):
    try:
        R = Inmueble.objects.prefetch_related(
            'cliente_id').get(cod_referencia=codRef)
        nombre_cliente = R.cliente_id.nom_cliente
        inm = serialize('json', [R,])
        data = {
            'inm': inm,
            'nombre_cliente': nombre_cliente
        }
        D = []
        D.append(data)

        return HttpResponse(json.dumps(D), 'application/json')

    except Inmueble.DoesNotExist:
        return HttpResponse(status=200, content='null')


@login_required(login_url='/#modal-opened')
def contrato_idInmueble(req, id_inmueble):

    R = buscarProp_ID(id_inmueble)
    res = R['res']
    columns = R['columns']
    ERR = R['ERR']
    success = ''

    # Convertir los resultados a una lista de diccionarios
    lista = []
    for row in res:
        row_dict = {}
        for i, value in enumerate(row):
            column_name = columns[i]
            row_dict[column_name] = value
        lista.append(row_dict)

    # Convertir a formato JSON
    res_JSON = json.dumps(lista, default=serialize_date)

    print(lista)
    if len(lista) == 0:
        context = {
            'error': 'Inmueble no econtrado',
            'success': success
        }
    else:
        context = {
            'error': ERR,
            'success': success,
            "id_inmueble": lista[0]['id_inmueble'],
            "nom_propietario": lista[0]['nom_cliente'],
            "cod_referencia": lista[0]['cod_referencia'],
            "dir_inmueble": lista[0]['dir_inmueble'],
            "ciudad_inmueble": lista[0]['ciudad_inmueble'],
            "pass_hall1": lista[0]['clave_puerta_ingreso'],
            "pass_hall2": lista[0]['clave_puerta_ingreso2'],
            "pass_wifi": lista[0]['clave_wifi'],
            "num_apto": lista[0]['num_apto'],
            "valor_inmueble": lista[0]['valor_inmueble'],
            "habitac_maxima": lista[0]['habitac_maxima'],
        }

    return render(req, "contrato/contrato_form.html", context)


@login_required(login_url='/#modal-opened')
def crear_contrato(req):

    ERR = ''
    success = ''

    valor_inmueble_palabras = num2words(
        req.POST['valor_inmueble'], lang='pt_BR')
    valor_total_palabras = num2words(req.POST['valor_total'], lang='pt_BR')
    monto_reserva_palabras = num2words(req.POST['monto_reserva'], lang='pt_BR')
    cod_referencia = req.POST['cod_referencia']

    fecha_hora_hoy = datetime.now()
    formateado = "%d/%m/%Y"
    fecha_hoy = fecha_hora_hoy.strftime(formateado)

    def formatFecha(D):
        # Convierte la cadena en un objeto datetime
        fecha_datetime = datetime.strptime(D, "%Y-%m-%d")

        # Formatea la fecha en "dd/mm/yyyy"
        formato_personalizado = "%d/%m/%Y"
        fecha_formateada = fecha_datetime.strftime(formato_personalizado)
        return fecha_formateada

    try:
        C = Contrato.objects.create(
            tipo_operacion='S/D',
            fecha_contrato=fecha_hora_hoy.date(),
            fecha_ing=req.POST['fecha_ing'],
            fecha_salida=req.POST['fecha_salida'],
            cant_dias=req.POST['cant_dias'],
            cliente_id=int(req.POST['id_cliente']),
            valor_total=req.POST['valor_total'],
            monto_reserva=req.POST['monto_reserva'],
            fecha_reserva=fecha_hora_hoy.date(),
            datos_envio=req.POST['datos_envio'],
            inmueble_id=int(req.POST['id_inmueble'])
        )

        context = {
            "id_contrato": C.id_contrato,
            "nom_propietario": req.POST['nom_propietario'],
            "nom_cliente": req.POST['nom_cliente'],
            "rg_cliente": req.POST['rg_cliente'],
            "dni_cliente": req.POST['dni_cliente'],
            "dir_cliente": req.POST['dir_cliente'],
            "ciudad_cliente": req.POST['ciudad_cliente'],
            "tel_cliente": req.POST['tel_cliente'],
            "email_cliente": req.POST['email_cliente'],
            "cod_referencia": cod_referencia,
            "dir_inmueble": req.POST['dir_inmueble'],
            "ciudad_inmueble": req.POST['ciudad_inmueble'],
            "pass_hall1": req.POST['pass_hall1'],
            "pass_hall2": req.POST['pass_hall2'],
            "pass_wifi": req.POST['pass_wifi'],
            "num_apto": req.POST['num_apto'],
            "fecha_ing": formatFecha(req.POST['fecha_ing']),
            "fecha_salida": formatFecha(req.POST['fecha_salida']),
            "valor_inmueble": req.POST['valor_inmueble'],
            "valor_inmueble_palabras": valor_inmueble_palabras,
            "cant_dias": req.POST['cant_dias'],
            "valor_total": req.POST['valor_total'],
            "valor_total_palabras": valor_total_palabras,
            "monto_reserva": req.POST['monto_reserva'],
            "monto_reserva_palabras": monto_reserva_palabras,
            "fecha_reserva": fecha_hoy,
            "datos_envio": req.POST['datos_envio'],
            "saldo_pendiente": req.POST['saldo_pendiente'],
            "habitac_maxima": req.POST['habitac_maxima'],
            "fecha_contrato": fecha_hoy
        }

        doc_Path = Path(__file__).parent  # ruta del proyecto
        doc_Arch = doc_Path / 'static'/'contratos_guardados' / \
            'contrato_plantilla.docx'  # ruta del archivo DOCX Plantilla

        # ruta del archivo DOCX contrato completo Cliente
        doc = DocxTemplate(doc_Arch)
        doc.render(context)
        fecha_hora_actual = datetime.now()
        formato_personalizado = "%Y-%m-%d_%H-%M-%S"
        fecha_hora_formateada = fecha_hora_actual.strftime(
            formato_personalizado)
        doc_Arch_completo = doc_Path / 'static'/'contratos_guardados' / \
            f'contrato_REF-{cod_referencia}-{fecha_hora_formateada}.docx'
        doc.save(doc_Arch_completo)

        # Abrir el archivo con la aplicación predeterminada
        os.startfile(doc_Arch_completo)

    except IntegrityError as e:
        print(f"Error al crear: {e}")
    except FileNotFoundError:
        print("El archivo no existe")
    except IsADirectoryError:
        print("El archivo es un directorio")
    except PermissionError:
        print("No tienes permisos para acceder al archivo")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

    success = 'Contrato creado con Exito!'
    context = {
        'error': ERR,
        'success': success
    }
    return render(req, "contrato/contrato_form.html", context)


@login_required(login_url='/#modal-opened')
def reportes_json_t(req):
    # Utiliza raw para realizar una consulta SQL personalizada
    query = '''
        SELECT c.*, cl.*, i.*, clP.nom_cliente as nom_prop
        FROM contrato c 
        JOIN clientes cl ON c.cliente_id = cl.id_cliente 
        JOIN inmueble i ON c.inmueble_id = i.id_inmueble
        JOIN clientes clP ON clP.id_cliente = i.cliente_id
    '''

    contratos = Contrato.objects.raw(query)
    # Convierte los resultados a una lista
    contratos_list = []
    for contrato in contratos:
        contrato_dict = contrato.__dict__
        contrato_dict.pop('_state', None)
        contratos_list.append(contrato_dict)

    print(contratos_list)
    data = {'contrato': contratos_list}
    return JsonResponse(data)
