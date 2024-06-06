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
    print("Form Contato")

    try:
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

        print(lista)
        if len(lista) == 0:
            context = {
                'error': 'Imóvel não encontrado ou não disponível para Contrato',
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

    except Exception as e:
        error_message = f"Erro ao form o contrato: {str(e)}"
        print(f"ERROR: {error_message}")
        print("NAO CONTRATADO")
        return redirect('404')


@login_required(login_url='/#modal-opened')
def crear_contrato(req):
    print("Crear Contrato")

    # query = "SELECT * FROM inmueble i WHERE (SELECT COUNT(c.id_contrato) AS contID FROM contrato c WHERE c.inmueble_id = i.id_inmueble AND ((c.fecha_ing BETWEEN @inicio AND @fin) OR (c.fecha_salida BETWEEN @inicio AND @fin) OR (c.fecha_ing < @inicio AND c.fecha_salida > @fin))) = 0 AND i.estado = 1"

    # "SELECT COUNT(i.id_inmueble) FROM inmueble i WHERE (SELECT COUNT(c.id_contrato) AS contID FROM contrato c WHERE c.inmueble_id = i.id_inmueble AND ((c.fecha_ing BETWEEN '2023-10-01' AND '2023-10-31') OR (c.fecha_salida BETWEEN '2023-10-01' AND '2023-10-31') OR (c.fecha_ing > '2023-10-01' AND c.fecha_salida < '2023-10-31'))) = 0 AND i.id_inmueble = 10 AND i.estado = 1"
    #
    # COUNT(i.id_inmueble) si es 0 NO ESTA DISPONIBLE PARA ALQUILAR y si es 1 SI ESTA DISPONIBLE PARA ALQUILAR

    # SELECT DISTINCT i.* FROM inmueble i LEFT JOIN contrato c ON i.id_inmueble = c.inmueble_id AND(c.fecha_salida >= '2024-10-02' AND c.fecha_ing <= '2024-10-24') WHERE i.estado = 1 AND c.id_contrato IS NULL AND NOT EXISTS(SELECT 1 FROM contrato c2 WHERE c2.inmueble_id = i.id_inmueble AND(c2.fecha_salida >= '2024-10-02' AND c2.fecha_ing <= '2024-10-24'))

    ERR = ''
    success = ''

    try:

        res = buscarProp_Disponible(
            req.POST['id_inmueble'], req.POST['fecha_ing'], req.POST['fecha_salida'])
        print('resultado: buscarProp_Disponible para Contratar')
        print(res['res'])
        if res['res'] == 1:

            valor_inmueble_palabras = num2words(
                req.POST['valor_inmueble'], lang='pt_BR')
            valor_total_palabras = num2words(
                req.POST['valor_total'], lang='pt_BR')
            monto_reserva_palabras = num2words(
                req.POST['monto_reserva'], lang='pt_BR')
            cod_referencia = req.POST['cod_referencia']

            fecha_hora_hoy = datetime.now()
            formateado = "%d/%m/%Y"
            fecha_hoy = fecha_hora_hoy.strftime(formateado)

            def formatFecha(D):
                # Convierte la cadena en un objeto datetime
                fecha_datetime = datetime.strptime(D, "%Y-%m-%d")

                # Formatea la fecha en "dd/mm/yyyy"
                formato_personalizado = "%d/%m/%Y"
                fecha_formateada = fecha_datetime.strftime(
                    formato_personalizado)
                return fecha_formateada

            cliente_instancia = Clientes.objects.get(
                id_cliente=req.POST['id_cliente'])
            inmueble_instancia = Inmueble.objects.get(
                id_inmueble=req.POST['id_inmueble'])

            C = Contrato.objects.create(
                tipo_operacion='S/D',
                fecha_contrato=fecha_hora_hoy.date(),
                fecha_ing=req.POST['fecha_ing'],
                fecha_salida=req.POST['fecha_salida'],
                cant_dias=req.POST['cant_dias'],
                cliente_id=cliente_instancia,
                valor_total=req.POST['valor_total'],
                monto_reserva=req.POST['monto_reserva'],
                fecha_reserva=fecha_hora_hoy.date(),
                datos_envio=req.POST['datos_envio'],
                inmueble_id=inmueble_instancia
            )

            if C and C.id_contrato:
                # Contexto de datos para llenar el archivo DOCX

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

                try:
                    # Abrir el archivo con la aplicación predeterminada
                    # Abrir el archivo automáticamente dependiendo del sistema operativo
                    abrir_archivo(doc_Arch_completo)
                    success = "Contrato criado com sucesso!"

                except Exception as e:
                    try:
                        # Intentar descargar el archivo
                        success = "Contrato criado com sucesso!"
                        return descargar_archivo(doc_Arch_completo)

                    except Exception as e:
                        print(
                            "Contrato criado com sucesso. Não é possível abrir o arquivo automaticamente neste sistema operacional: " + str(e))
                        success = "Contrato criado com sucesso. Não é possível abrir o arquivo automaticamente neste sistema operacional"

            else:
                print("Error: O contrato não foi criado corretamente")
                ERR = "Error: O contrato não foi criado corretamente"

        else:
            print("Error: O contrato não foi criado Propiedad no Disponible")
            ERR = "Error: O contrato não foi criado Propiedad no Disponible: " + \
                str(req.POST['fecha_ing']) + " : " + \
                str(req.POST['fecha_salida'])
            success = ''

    except IntegrityError as e:
        ERR = f"Error al crear: {e}"
        print(ERR)
    except FileNotFoundError:
        ERR = "El archivo no existe"
        print(ERR)
    except IsADirectoryError:
        ERR = "El archivo es un directorio"
        print(ERR)
    except PermissionError:
        ERR = "No tienes permisos para acceder al archivo"
        print(ERR)
    except Exception as e:
        ERR = f"Ocurrió un error: {e}"
        print(ERR)

    context = {
        'error': ERR,
        'success': success
    }
    return render(req, "contrato/contrato_form.html", context)


def verificar_fechas(req):
    id_inmueble = req.GET.get('id_inmueble')
    fecha_in = req.GET.get('fecha_in')
    fecha_sal = req.GET.get('fecha_sal')
    res = buscarProp_Disponible2(id_inmueble, fecha_in, fecha_sal)
    print('res')
    print(res['res'])
    if res['res'] == 1:
        print('si esta disponible')
        return JsonResponse({'resultado': 1})
    else:
        print('no esta disponible')
        return JsonResponse({'resultado': 0})


def abrir_archivo(ruta):
    if os.name == 'nt':  # Windows
        os.startfile(ruta)
    elif os.name == 'posix':  # Sistemas POSIX (Linux, macOS, etc.)
        if sys.platform == 'darwin':  # macOS
            subprocess.run(["open", ruta], check=True)
        else:  # Asumir Linux u otros sistemas POSIX
            subprocess.run(["xdg-open", ruta], check=True)
    else:
        print("Sistema operacional não suportado")
        ERR = "Sistema operacional não suportado"


def descargar_archivo(ruta):
    try:
        with open(ruta, 'rb') as f:
            response = HttpResponse(f.read(
            ), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = 'attachment; filename="Contrato.docx"'
            return response
    except Exception as e:
        print(f"Erro ao ler arquivo para download: {str(e)}")
        ERR = "Erro ao ler arquivo para download"


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


def condetalles(req, detalleid):
    query = """
     SELECT *, DATE_FORMAT(c.fecha_contrato, 'YYYY-MM-DD') as fecha_contrato, DATE_FORMAT(c.fecha_ing, 'YYYY-MM-DD') as fecha_ing, DATE_FORMAT(c.fecha_salida, 'YYYY-MM-DD') as fecha_salida, DATE_FORMAT(c.fecha_reserva, 'YYYY-MM-DD') as fecha_reserva FROM contrato c JOIN fotos_prop f ON c.inmueble_id = f.inmueble_id JOIN inmueble i ON c.inmueble_id = i.id_inmueble WHERE c.id_contrato = %s
    """

    with connection.cursor() as cursor:
        cursor.execute(query, [detalleid])
        columns = [col[0] for col in cursor.description]
        contrato_data = [dict(zip(columns, row)) for row in cursor.fetchall()]

    if contrato_data:
        contrato_json = json.dumps(contrato_data[0])
        return HttpResponse(contrato_json, content_type='application/json')
    else:
        mensaje_error = {'error': 'Contrato no encontrado'}
        return HttpResponse(json.dumps(mensaje_error), content_type='application/json')
