import json
import uuid
import os
from datetime import date, datetime
from django.shortcuts import render, redirect, get_object_or_404
from django.db import models, connection, IntegrityError
from django.db.models import Count, Q
from django.core import serializers
from django.core.serializers import serialize
from django.http import HttpResponse, Http404
from django.http.response import JsonResponse
from django.conf import settings
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


""" from django.db import transaction
@transaction.atomic 

raise"""


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
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)

    inmueble_form = InmuebleForm(req.POST or None, req.FILES or None)
    images = req.FILES.getlist('imgs')

    if inmueble_form.is_valid() and len(images) > 0:
        print(req.POST)

        T = req.POST.getlist('tipo_servicio')
        T_list = ', '.join(T)

        if T_list != '':
            inmueble_form.instance.tipo_servicio = T_list

        try:
            # Validar si el cod_referencia ya existen en la base de datos
            if Inmueble.objects.filter(cod_referencia=req.POST['cod_referencia']).exists():
                ERR = 'O Cód. Referência já está cadastrado no banco de dados.'

                context = {
                    'inmueble': inmueble_form,
                    'clientes': lista,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'propiedad/inmueble_form.html', context)

            I = inmueble_form.save()
            ultimo_id = I.id_inmueble

            try:
                portadaName = req.FILES['imgportada']
                # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                new_fileportadaname = f"PORTADA_{uuid.uuid4().hex}{
                    os.path.splitext(portadaName.name)[1]}"

                # Asigna el nuevo nombre al archivo
                portadaName.name = new_fileportadaname
                foto = Fotos.objects.create(
                    image=portadaName,
                    inmueble_id=ultimo_id
                )

            except IntegrityError as e:
                print(f"Erro ao criar Video: {e}")

            except Exception as e:
                print(f"Erro inesperado - Video: {e}")

            for image in images:
                try:
                    # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                    new_filename = f"{uuid.uuid4().hex}{
                        os.path.splitext(image.name)[1]}"

                    # Asigna el nuevo nombre al archivo
                    image.name = new_filename
                    foto = Fotos.objects.create(
                        image=image,
                        inmueble_id=ultimo_id
                    )

                except IntegrityError as e:
                    print(f"Erro ao criar foto: {e}")

                except Exception as e:
                    print(f"Erro inesperado: {e}")

            try:
                videoName = req.FILES['video']
                # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                new_fileVideoname = f"{uuid.uuid4().hex}{
                    os.path.splitext(videoName.name)[1]}"

                # Asigna el nuevo nombre al archivo
                videoName.name = new_fileVideoname
                foto = Fotos.objects.create(
                    image=videoName,
                    inmueble_id=ultimo_id
                )

            except IntegrityError as e:
                print(f"Erro ao criar Video: {e}")

            except Exception as e:
                print(f"Erro inesperado - Video: {e}")

            print('Inmueble creado, OK')
            success = "Propriedade criada corretamente"
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
                ERR = 'Alguns campos contêm erros'
                print(f"Error en el campo '{field_name}': {error_msg}")

    if ERR != '':
        print(inmueble_form.cleaned_data['cliente_id'].id_cliente)
        context = {
            'clienteseleccionado': inmueble_form.cleaned_data['cliente_id'].id_cliente,
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

    datos_inmueble = Buscar_inmueble(id_inmueble)
    fotos = get_fotos_porinmueble(id_inmueble)

    list_fotos = []
    for foto in fotos:
        if 'PORTADA' not in foto['image'] and not foto['image'].lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
            print(foto['image'])
            foto['image'] = foto['image'].replace('webapp', '')
            list_fotos.append(foto['image'])

    inmueble_form = InmuebleForm(
        req.POST or None, req.FILES or None, instance=datos_inmueble['inmueble'])

    if inmueble_form.is_valid():

        T = req.POST.getlist('tipo_servicio')
        T_list = ', '.join(T)

        if T_list != '':
            inmueble_form.instance.tipo_servicio = T_list

        try:
            instancia_guardada = inmueble_form.save()

            """ 
            
            REEMPLAZO DE FOTO Y VIDEO 
            
                                        """

            if instancia_guardada.id_inmueble and 'imgportada' in req.FILES and req.FILES['imgportada']:
                print('REEMPLAZO DE FOTO PORTADA')

                R = reemplazarFotoPortada(id_inmueble)
                ERR_delete = R['err']
                if R['delete']:
                    print('SE BORRO CORRECTA LA FOTO PORTADA ANTERIOR')

                    try:
                        ruta_foto = os.path.join(settings.MEDIA_ROOT, R['img'])
                        if os.path.isfile(ruta_foto):
                            os.remove(ruta_foto)

                        portadaName = req.FILES['imgportada']
                        # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                        new_fileportadaname = f"PORTADA_{uuid.uuid4().hex}{
                            os.path.splitext(portadaName.name)[1]}"

                        # Asigna el nuevo nombre al archivo
                        portadaName.name = new_fileportadaname
                        foto = Fotos.objects.create(
                            image=portadaName,
                            inmueble_id=id_inmueble
                        )
                        print('A NOVA FOTO DA CAPA FOI SALVA CORRETAMENTE')

                    except IntegrityError as e:
                        print(f"Erro ao criar Portada: {e}")
                        print('A NOVA FOTO DA CAPA NÃO FOI SALVA CORRETAMENTE')
                        ERR = 'A NOVA FOTO DA CAPA NÃO FOI SALVA CORRETAMENTE'

                    except FileNotFoundError as e:
                        print(f"Erro ao criar Portada: {e}")
                        print(
                            'A NOVA FOTO DA CAPA NÃO FOI SALVA CORRETAMENTE, ARRCHIVO NÃO')
                        ERR = 'A NOVA FOTO DA CAPA NÃO FOI SALVA CORRETAMENTE, ARRCHIVO NÃO'

                    except Exception as e:
                        print(f"Erro inesperado - Portada: {e}")
                        ERR = 'A NOVA FOTO DA CAPA NÃO FOI SALVA CORRETAMENTE'
                else:
                    ERR = ERR_delete

            if instancia_guardada.id_inmueble and 'imgs' in req.FILES and req.FILES['imgs']:
                print('REEMPLAZO DE FOTOS')

                images = req.FILES.getlist('imgs')

                for image in images:
                    try:
                        # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                        new_filename = f"{uuid.uuid4().hex}{
                            os.path.splitext(image.name)[1]}"

                        # Asigna el nuevo nombre al archivo
                        image.name = new_filename
                        foto = Fotos.objects.create(
                            image=image,
                            inmueble_id=id_inmueble
                        )

                    except IntegrityError as e:
                        print(f"Erro ao criar foto: {e}")
                        print('Não foi possível salvar algumas das novas fotos')
                        ERR = 'Não foi possível salvar algumas das novas fotos'

                    except Exception as e:
                        print(f"Erro inesperado: {e}")
                        print('Não foi possível salvar algumas das novas fotos')
                        ERR = 'Não foi possível salvar algumas das novas fotos'

            if instancia_guardada.id_inmueble and 'video' in req.FILES and req.FILES['video']:
                print('REEMPLAZO DE VIDEO')

                R = reemplazarVideo(id_inmueble)
                ERR_delete = R['err']
                if R['delete']:

                    try:
                        ruta_video = os.path.join(
                            settings.MEDIA_ROOT, R['video'][0])
                        if os.path.isfile(ruta_video):
                            os.remove(ruta_video)

                        videoName = req.FILES['video']
                        # Genera un nuevo nombre de archivo (por ejemplo, usando un UUID)
                        new_fileVideoname = f"{uuid.uuid4().hex}{
                            os.path.splitext(videoName.name)[1]}"

                        # Asigna el nuevo nombre al archivo
                        videoName.name = new_fileVideoname
                        video = Fotos.objects.create(
                            image=videoName,
                            inmueble_id=id_inmueble
                        )

                    except IntegrityError as e:
                        print(f"Erro ao criar Video: {e}")
                        ERR = 'O NOVO VÍDEO NÃO FOI SALVO CORRETAMENTE'

                    except FileNotFoundError as e:
                        print(f"Erro ao criar Video: {e}")
                        print(
                            'O NOVO VÍDEO NÃO FOI SALVO CORRETAMENTE, ARRCHIVO NÃO')
                        ERR = 'O NOVO VÍDEO NÃO FOI SALVO CORRETAMENTE, ARRCHIVO NÃO'

                    except Exception as e:
                        print(f"Erro inesperado - Video: {e}")
                        ERR = 'O NOVO VÍDEO NÃO FOI SALVO CORRETAMENTE'

            if ERR == '':
                print('Inmueble Editado, OK')
                success = "Propriedade editada corretamente"

        except Exception as e:
            error_message = f"Erro ao salvar o imóvel: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")

    else:
        for field_name, error_msgs in inmueble_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Alguns campos contêm erros'
                print(f"Error en el campo '{field_name}': {error_msg}")

    if ERR != '':
        print(ERR)
        context = {
            'inmuebleClienteId': datos_inmueble['inmueble'].cliente_id.id_cliente,
            'editar': datos_inmueble['inmueble'].id_inmueble,
            'inmueble': inmueble_form,
            'clientes': datos_inmueble['lista'],
            'fotos': list_fotos,
            'error': ERR,
            'success': success
        }
    else:
        context = {
            'editar': datos_inmueble['inmueble'].id_inmueble,
            'inedit': datos_inmueble['inmueble'],
            'clientes': datos_inmueble['lista'],
            'fotos': list_fotos,
            'error': ERR,
            'success': success
        }

    return render(req, 'propiedad/inmueble_form.html', context)


def detalles_propiedad(req, id_inmueble):
    un_detalle = Inmueble.objects.filter(
        id_inmueble__icontains=id_inmueble)

    if un_detalle.exists():

        for d in un_detalle:
            print(d.latitud, d.longitud)
            fotos = get_fotos_porinmueble(id_inmueble)

        list_fotos = []
        portada_foto = ''
        video = ''
        for foto in fotos:
            if 'PORTADA' not in foto['image'] and not foto['image'].lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
                print(foto['image'])
                foto['image'] = foto['image'].replace('webapp', '')
                list_fotos.append(foto['image'])

            if 'PORTADA' in foto['image'] and not foto['image'].lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
                print(foto['image'])
                foto['image'] = foto['image'].replace('webapp', '')
                portada_foto = foto['image']

            if 'PORTADA' not in foto['image'] and foto['image'].lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
                print(foto['image'])
                foto['image'] = foto['image'].replace('webapp', '')
                video = foto['image']
        print(list_fotos)
        print(portada_foto)
        # print(video)

        context = {
            'detalle': un_detalle,
            'fotos': list_fotos,
            'portada': portada_foto,
            'video': video
        }

        return render(req, 'propiedad/inmueble.html', context)
    else:
        return render(req, '404.html')


@login_required(login_url='/#modal-opened')
def eliminar_propiedad(req, id_inmueble):
    try:
        inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
        inmueble.estado = 1 if inmueble.estado == 0 else 0
        inmueble.save()
        return JsonResponse({'excluido': True, 'mensagem': 'Estado do Imóveis alterado!'})

    except Inmueble.DoesNotExist:
        return JsonResponse({'excluido': False, 'mensagem': 'O Imóveis não existe'}, status=404)

    except Exception as e:
        return JsonResponse({'excluido': False, 'mensagem': f'Erro: {str(e)}'}, status=500)


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
def json_liquidacion(req, id_p):
    inmueble = liquidacion(id_p)
    data = {'inmueble': inmueble['res']}
    return JsonResponse(data)


@login_required(login_url='/#modal-opened')
def calendar_codRef(req, id_codRef):
    c = calendarCodRef(id_codRef)
    data = {'fechas': c['res']}
    return JsonResponse(data)


@login_required(login_url='/#modal-opened')
def disponibilidad(req):
    return render(req, 'propiedad/disponibilidad.html')


@login_required(login_url='/#modal-opened')
def inmueble_indisponible(req):
    if req.method == 'POST':
        start = req.POST.get('start')
        end = req.POST.get('end')
        cantidadDeDias = req.POST.get('cantidadDeDias')
        cantidadDeDias = req.POST.get('cantidadDeDias')
        cod_referencia = req.POST.get('cod_referencia')

        print('Data de admissão:', start)
        print('Data final:', end)
        print('Dias:', cantidadDeDias)

        fecha_hora_hoy = datetime.now()
        formateado = "%d/%m/%Y"
        fecha_hora_hoy.strftime(formateado)

        try:

            inmueble_instancia = Inmueble.objects.get(
                cod_referencia=cod_referencia)
            print(inmueble_instancia)
            cliente_instancia = Clientes.objects.get(id_cliente=1)
            print(cliente_instancia)

            C = Contrato.objects.create(
                tipo_operacion='S/D',
                fecha_contrato=fecha_hora_hoy.date(),
                fecha_ing=start,
                fecha_salida=end,
                cant_dias=cantidadDeDias,
                valor_total=0,
                monto_reserva=0,
                fecha_reserva=fecha_hora_hoy.date(),
                datos_envio='A cuenta de Propietario',
                inmueble_id=inmueble_instancia,
                cliente_id=cliente_instancia)

            """          
            INSERT INTO `clientes` (`id_cliente`, `nom_cliente`, `dni_cliente`, `rg_cliente`, `dir_cliente`, `tel_cliente`, `email_cliente`, `ciudad_cliente`, `pais_cliente`, `fechnac`, `categoria`, `estado`) VALUES ('0', 'ReservaDeTerceros', '0', '0', 'ReservaDeTerceros', '0', 'ReservaDeTerceros', 'ReservaDeTerceros', 'ReservaDeTerceros', '1900-01-01', 'ReservaDeTerceros', '1')
            """

            return JsonResponse({'message': 'Propriedade indisponível com sucesso'}, status=200)
        except IntegrityError as e:
            ERR = f"Error al crear"
            print(e)
            return JsonResponse({'message': ERR}, status=405)
        except Exception as e:
            ERR = f"Um erro ocorreu"
            print(e)
            return JsonResponse({'message': ERR}, status=405)

    return JsonResponse({'message': 'Método não permitido'}, status=405)
