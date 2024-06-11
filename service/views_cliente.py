import json
import re
from datetime import datetime
from django.shortcuts import render, redirect
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
import logging

# Configurar el logger
logger = logging.getLogger(__name__)

# LOGIN
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import *
from .forms import *


def JSONclientes_Inq(request, Name):
    try:
        list = Clientes.objects.filter(
            categoria='Locatario', nom_cliente__icontains=Name)
        return HttpResponse(serialize('json', list), content_type='application/json')
    except ObjectDoesNotExist:
        return JsonResponse({'erro': 'Nenhum cliente encontrado com os critérios especificados'}, status=404)
    except Exception as e:
        logger.error(f"Erro inesperado: {e}")
        return JsonResponse({'erro': 'Ocorreu um erro inesperado'}, status=500)


def JSONclientes_dni_Inq(request, dni):
    try:
        list = Clientes.objects.filter(
            categoria='Locatario', dni_cliente__icontains=dni)
        return HttpResponse(serialize('json', list), 'application/json')
    except ObjectDoesNotExist:
        return JsonResponse({'erro': 'Nenhum cliente encontrado com os critérios especificados'}, status=404)
    except Exception as e:
        logger.error(f"Erro inesperado: {e}")
        return JsonResponse({'erro': 'Ocorreu um erro inesperado'}, status=500)


def JSONclientes_Prop(request, Name):
    try:
        lista = Clientes.objects.filter(
            categoria='Propietario', nom_cliente__icontains=Name).values('id_cliente', 'nom_cliente')
        return JsonResponse(list(lista), safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'erro': 'Nenhum cliente encontrado com os critérios especificados'}, status=404)
    except Exception as e:
        logger.error(f"Erro inesperado: {e}")
        return JsonResponse({'erro': 'Ocorreu um erro inesperado'}, status=500)


@login_required(login_url='/#modal-opened')
def index_cliente(req):
    try:
        list = Clientes.objects.all()
        return render(req, 'cliente/index.html', {'list': list})
    except ObjectDoesNotExist:
        return render(req, 'cliente/index.html', {'erro': 'Nenhum cliente encontrado'}, status=404)
    except Exception as e:
        logger.error(f"Erro inesperado: {e}")
        return render(req, 'cliente/index.html', {'erro': 'Ocorreu um erro inesperado'}, status=500)
    finally:
        # Código opcional que siempre se ejecuta
        pass


@login_required(login_url='/#modal-opened')
def crear_cliente(req):
    ERR = ''
    success = ''

    if req.method == 'POST':
        try:
            for nombre_variable, valor_variable in req.POST.items():
                tipo_variable = type(valor_variable)
                print(f"Variable '{nombre_variable}': {valor_variable} (Tipo: {tipo_variable})")

            clientes = ClienteForm(req.POST or None, req.FILES or None)

            """ 
                
                VALIDAR CAMPOS MANUALMETE 
                                            
                                            """

            def validar_nombre(nombre):
                patron = r'^[a-zA-Z\s]+$'
                return bool(re.match(patron, nombre))

            def validar_direccion(direccion):
                patron = r'^[a-zA-Z0-9\s]+$'
                return bool(re.match(patron, direccion))

            def validar_numeros(campo):
                patron = r'^\d+$'
                return bool(re.match(patron, campo))

            def validar_rg(rg):
                patron = r'^[a-zA-Z0-9-]+$'
                return bool(re.match(patron, rg))

            def validar_email(email):
                patron = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                return bool(re.match(patron, email))

            def es_mayor_de_edad(fecha_nacimiento, edad_minima=18):
                fecha_nacimiento = datetime.strptime(
                    fecha_nacimiento, '%Y-%m-%d')
                fecha_actual = datetime.now().date()

                diferencia_anios = fecha_actual.year - fecha_nacimiento.year

                if (fecha_actual.month, fecha_actual.day) < (fecha_nacimiento.month, fecha_nacimiento.day):
                    diferencia_anios -= 1
                return diferencia_anios >= edad_minima

            campos_validos = True

            # Validar nombre
            if 'nom_cliente' in req.POST and campos_validos:
                nombre = req.POST['nom_cliente']
                if not validar_nombre(nombre):
                    campos_validos = False
                    print('Nome do cliente invalido')
                    ERR_validador = 'Nome do cliente invalido'

            # Validar dirección
            if 'dir_cliente' in req.POST and campos_validos:
                direccion = req.POST['dir_cliente']
                if not validar_direccion(direccion):
                    campos_validos = False
                    print('Endereço do cliente invalida')
                    ERR_validador = 'Endereço do cliente invalida'

            # Validar ciudad
            if 'ciudad_cliente' in req.POST and campos_validos:
                ciudad = req.POST['ciudad_cliente']
                if not validar_direccion(ciudad):
                    campos_validos = False
                    print('Cidade do cliente invalido')
                    ERR_validador = 'Cidade do cliente invalido'

            # Validar pais
            if 'pais_cliente' in req.POST and campos_validos:
                pais = req.POST['pais_cliente']
                if not validar_direccion(pais):
                    campos_validos = False
                    print('Pais do cliente invalido')
                    ERR_validador = 'Pais do cliente invalido'

            # Validar DNI
            if 'dni_cliente' in req.POST and campos_validos:
                dni = req.POST['dni_cliente']
                if not validar_numeros(dni):
                    campos_validos = False
                    print('Dni do cliente invalido')
                    ERR_validador = 'Dni do cliente invalido'

            # Validar RG
            if 'rg_cliente' in req.POST and campos_validos:
                rg = req.POST['rg_cliente']
                if not validar_rg(rg):
                    campos_validos = False
                    print('RG do cliente invalido')
                    ERR_validador = 'RG do cliente invalido'

            # Validar teléfono
            if 'tel_cliente' in req.POST and campos_validos:
                telefono = req.POST['tel_cliente']
                if not validar_numeros(telefono):
                    campos_validos = False
                    print('Telefone do clinete invalido')
                    ERR_validador = 'Telefone do clinete invalido'

            # Validar correo electrónico
            if 'email_cliente' in req.POST and campos_validos:
                email = req.POST['email_cliente']
                if not validar_email(email):
                    campos_validos = False
                    print('E-mail do clinete invalido')
                    ERR_validador = 'E-mail do clinete invalido'

            # Validar fecha de nacimiento
            if 'fechnac' in req.POST and campos_validos:
                fecha_nacimiento = req.POST['fechnac']
                if not es_mayor_de_edad(fecha_nacimiento):
                    campos_validos = False
                    print('A data de nascimento do cliente não é maior de idade')
                    ERR_validador = 'A data de nascimento do cliente não é maior de idade'

            if campos_validos:
                print('cliente valido')

                try:
                    # Validar si el DNI, RG o el correo electrónico ya existen en la base de datos

                    if req.POST['dni_cliente'] != '0':
                        if Clientes.objects.filter(dni_cliente=req.POST['dni_cliente']).exists():
                            ERR = 'O DNI já está cadastrado no banco de dados.'
                            contexto = {
                                'clientes': clientes,
                                'error': ERR,
                                'success': success
                            }
                            return render(req, 'cliente/cliente_form.html', contexto)

                    if req.POST['rg_cliente'] != '0':
                        if Clientes.objects.filter(rg_cliente=req.POST['rg_cliente']).exists():
                            ERR = 'O RG já está cadastrado no banco de dados.'
                            contexto = {
                                'clientes': clientes,
                                'error': ERR,
                                'success': success
                            }
                            return render(req, 'cliente/cliente_form.html', contexto)

                    if Clientes.objects.filter(email_cliente=req.POST['email_cliente']).exists():
                        ERR = 'O E-mail já está cadastrado no banco de dados.'
                        contexto = {
                            'clientes': clientes,
                            'error': ERR,
                            'success': success
                        }
                        return render(req, 'cliente/cliente_form.html', contexto)

                    datos_cliente = {
                        'nom_cliente': nombre,
                        'dni_cliente': dni,
                        'rg_cliente': rg,
                        'dir_cliente': direccion,
                        'tel_cliente': telefono,
                        'email_cliente': email,
                        'ciudad_cliente': ciudad,
                        'pais_cliente': pais,
                        'fechnac': fecha_nacimiento,
                        'categoria': req.POST['categoria']
                    }

                    if insertar_cliente(datos_cliente):
                        print('Cliente, OK')
                        success = "Cliente criado com sucesso"
                        contexto = {
                            'error': ERR,
                            'success': success
                        }
                        return render(req, 'cliente/cliente_form.html', contexto)
                    else:
                        ERR = 'Erro ao salvar o cliente!'
                        contexto = {
                            'clientes': clientes,
                            'error': ERR,
                            'success': success
                        }
                        return render(req, 'cliente/cliente_form.html', contexto)

                except Exception as e:
                    error_message = f"Erro ao salvar o cliente: {str(e)}"
                    ERR = error_message
                    print(f"error: {error_message}")
                    contexto = {
                        'clientes': clientes,
                        'error': ERR,
                        'success': success
                    }
                    return render(req, 'cliente/cliente_form.html', contexto)

                except Clientes.DoesNotExist:
                    print("NO ENCONTRADO")
                    return redirect('404')

                except IntegrityError as e:
                    ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
                    print("Error:", e)

            else:
                error_message = f"Erro ao salvar o cliente: {ERR_validador}!"
                ERR = error_message
                print(f"ERROR: {error_message}")
                contexto = {
                    'clientes': clientes,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'cliente/cliente_form.html', contexto)

        except Exception as e:
            error_message = f"Erro ao salvar o cliente: {str(e)}"
            print(f"ERROR: {error_message}")
            error_ = f"Erro ao salvar o cliente"
            ERR = error_

            contexto = {
                'clientes': clientes,
                'error': ERR,
                'success': success
            }
            return render(req, 'cliente/cliente_form.html', contexto)

    contexto = {
        'error': ERR,
        'success': success
    }
    return render(req, 'cliente/cliente_form.html', contexto)


@login_required(login_url='/#modal-opened')
def editar_cliente(req, id_cliente=None):

    ERR = ''
    success = ''
    try:
        cliente = Clientes.objects.get(id_cliente=id_cliente)

        if req.method == 'POST' and cliente.email_cliente != req.POST['email_cliente']:
            if Clientes.objects.filter(email_cliente=req.POST['email_cliente']).exists():
                ERR = 'El correo electrónico ya está registrado en la base de datos.'
                context = {
                    'cliedit': cliente,
                    'error': ERR,
                    'success': success
                }

                return render(req, 'cliente/cliente_form.html', context)

        if req.method == 'POST' and cliente.dni_cliente != req.POST['dni_cliente'] and req.POST['dni_cliente'] != '0':
            if Clientes.objects.filter(dni_cliente=req.POST['dni_cliente']).exists():
                ERR = 'El DNI ya está registrado en la base de datos.'
                contexto = {
                    'cliedit': cliente,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'cliente/cliente_form.html', contexto)

        if req.method == 'POST' and cliente.rg_cliente != req.POST['rg_cliente'] and req.POST['rg_cliente'] != '0':
            if Clientes.objects.filter(rg_cliente=req.POST['rg_cliente']).exists():
                ERR = 'El RG ya está registrado en la base de datos.'
                contexto = {
                    'cliedit': cliente,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'cliente/cliente_form.html', contexto)

    except Clientes.DoesNotExist:
        print("NO ENCONTRADO")
        return redirect('404')

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
        print("Error:", e)

    cliente_form = ClienteForm(
        req.POST or None, req.FILES or None, instance=cliente)
    if cliente_form.is_valid() and req.POST:
        try:

            cliente_form.save()
            print('Cliente, OK')
            success = "Cliente editado correctamente"
            context = {
                'cliedit': cliente,
                'error': ERR,
                'success': success
            }

            return render(req, 'cliente/cliente_form.html', context)

        except Exception as e:
            error_message = f"Erro ao salvar o cliente: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")

    else:
        print(cliente_form.errors)
        for field_name, error_msgs in cliente_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    print(cliente.fechnac)
    if ERR != '':
        context = {
            'formulario': cliente_form,
            'error': ERR
        }
    else:
        context = {
            'cliedit': cliente,
            'error': ERR,
            'success': success
        }

    return render(req, 'cliente/cliente_form.html', context)


@login_required(login_url='/#modal-opened')
def recibo_cliente(req, id_cliente):

    cliente_I = reciboCliente(id_cliente)

    resultados = cliente_I['res']
    columnas = cliente_I['columns']
    if len(resultados) > 0:

        datos_finales = []
        id_cliente_P = 0
        for resultado in resultados:
            # Formatear la fecha de entrada en el formato "YYYY-MM-DD"
            fecha_ing_formateada = resultado[columnas.index(
                'fecha_ing')].isoformat()

            # Formatear la fecha de salida en el formato "YYYY-MM-DD"
            fecha_salida_formateada = resultado[columnas.index(
                'fecha_salida')].isoformat()
            id_cliente_P = resultado[columnas.index('idPropietario')]

            # Crear el diccionario con las fechas formateadas
            dato = dict(zip(columnas, resultado))
            dato['fecha_ing'] = fecha_ing_formateada
            dato['fecha_salida'] = fecha_salida_formateada

            # Agregar el diccionario a la lista
            datos_finales.append(dato)

        cliente_P = Clientes.objects.get(id_cliente=id_cliente_P)

        context = {
            'cliente': datos_finales,
            'cliente_P': cliente_P
        }
        return render(req, 'cliente/recibo_cliente.html', context)

    else:
        return render(req, '404.html')


@login_required(login_url='/#modal-opened')
def eliminar_cliente(req, id_cliente):
    try:
        cliente = Clientes.objects.get(id_cliente=id_cliente)
        cliente.estado = 1 if cliente.estado == 0 else 0
        cliente.save()
        return JsonResponse({'excluido': True, 'mensagem': 'Estado do Cliente alterado!'})

    except Clientes.DoesNotExist:
        return JsonResponse({'excluido': False, 'mensagem': 'O Cliente não existe'}, status=404)

    except Exception as e:
        return JsonResponse({'excluido': False, 'mensagem': f'Erro: {str(e)}'}, status=500)


""" 

        APARTADO LOGICA DE RECUPERAR PASSWORD DE USUARIO 
        
        
                                                                """


def reset_password(req):
    print("reset")
    if req.method == 'POST':
        try:
            data = json.loads(req.body)
            u = data.get('username')
            e = data.get('email')
            p = data.get('password')
            print(p)

            # Validar que los campos no estén en blanco o sean nulos
            if not all([u, e, p]):
                return JsonResponse({'error': 'Todos os campos são obrigatórios.'})

            user = get_user_model().objects.get(username=u, email=e, is_superuser=True)

            user.set_password(p)
            user.save()

            print('Senha alterada com sucesso.')
            return JsonResponse({'message': 'Senha alterada com sucesso.'})
        except User.DoesNotExist:
            print('Usuário não encontrado.')
            return JsonResponse({'error': 'Usuário não encontrado.'})
    else:
        print('no POST')
        return JsonResponse({'error': 'Error desconhecido.'})


@login_required(login_url='/#modal-opened')  # Cliente Locatario
def reportes_json_c(req):
    try:
        cliente = list(Clientes.objects.filter(categoria='Locatario').values())
        data = {'cliente': cliente}
        return JsonResponse(data)
    except ObjectDoesNotExist:
        return JsonResponse({'erro': 'Nenhum cliente encontrado'}, status=404)
    except Exception as e:
        logger.error(f"Erro inesperado: {e}")
        return JsonResponse({'erro': 'Ocorreu um erro inesperado'}, status=500)


@login_required(login_url='/#modal-opened')  # Cliente Propietario
def reportes_json_p(req):
    try:
        cliente = list(Clientes.objects.filter(categoria='Propietario').values())
        data = {'cliente': cliente}
        return JsonResponse(data)
    except ObjectDoesNotExist:
        return JsonResponse({'erro': 'Nenhum cliente encontrado'}, status=404)
    except Exception as e:
        logger.error(f"Erro inesperado: {e}")
        return JsonResponse({'erro': 'Ocorreu um erro inesperado'}, status=500)
