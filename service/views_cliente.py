import json
from datetime import date
from django.shortcuts import render, redirect
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
# LOGIN
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import *
from .forms import *


def JSONclientes_Inq(request, Name):
    list = Clientes.objects.filter(
        categoria='Inquilino', nom_cliente__icontains=Name)
    return HttpResponse(serialize('json', list), 'application/json')


def JSONclientes_dni_Inq(request, dni):
    list = Clientes.objects.filter(
        categoria='Inquilino', dni_cliente__icontains=dni)
    return HttpResponse(serialize('json', list), 'application/json')


def JSONclientes_Prop(request, Name):
    lista = Clientes.objects.filter(
        categoria='Propietario', nom_cliente__icontains=Name).values('id_cliente', 'nom_cliente')
    return JsonResponse(list(lista), safe=False)


@login_required(login_url='/#modal-opened')
def index_cliente(req):
    list = Clientes.objects.all()
    return render(req, 'cliente/index.html', {'list': list})


@login_required(login_url='/#modal-opened')
def crear_cliente(req):
    ERR = ''
    success = ''

    clientes = ClienteForm(req.POST or None, req.FILES or None)
    if clientes.is_valid():
        try:
            # Validar si el DNI o el correo electrónico ya existen en la base de datos

            if req.POST['dni_cliente'] != '0':
                if Clientes.objects.filter(dni_cliente=req.POST['dni_cliente']).exists():
                    ERR = 'El DNI ya está registrado en la base de datos.'
                    contexto = {
                        'clientes': clientes,
                        'error': ERR,
                        'success': success
                    }
                    return render(req, 'cliente/cliente_form.html', contexto)

            if req.POST['rg_cliente'] != '0':
                if Clientes.objects.filter(rg_cliente=req.POST['rg_cliente']).exists():
                    ERR = 'El RG ya está registrado en la base de datos.'
                    contexto = {
                        'clientes': clientes,
                        'error': ERR,
                        'success': success
                    }
                    return render(req, 'cliente/cliente_form.html', contexto)

            if Clientes.objects.filter(email_cliente=req.POST['email_cliente']).exists():
                ERR = 'El correo electrónico ya está registrado en la base de datos.'
                contexto = {
                    'clientes': clientes,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'cliente/cliente_form.html', contexto)

            C = clientes.save()
            print(f'Cliente id: {C.id_cliente}')
            print('Cliente, OK')
            success = "Cliente creado correctamente"
            contexto = {
                'error': ERR,
                'success': success
            }
            return render(req, 'cliente/cliente_form.html', contexto)

        except Exception as e:
            error_message = f"Error al guardar el Cliente: {str(e)}"
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
        print(clientes.errors)
        for field_name, error_msgs in clientes.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

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
            error_message = f"Error al guardar el Cliente: {str(e)}"
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
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    context = {
        'cliente': cliente
    }
    print(cliente)
    return render(req, 'cliente/recibo_cliente.html', context)

@login_required(login_url='/#modal-opened')
def liq_propietario(req, id_cliente):
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    context = {
        'cliente': cliente
    }
    print(cliente)
    return render(req, 'cliente/liq_propietario.html', context)

@login_required(login_url='/#modal-opened')
def eliminar_cliente(req, id_cliente):
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    cliente.delete()
    return redirect('index_cliente')


""" 

        APARTADO LOGICA DE RECUPERAR PASSWORD DE USUARIO 
        
        
                                                                """


def reset_password(req):
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
        return JsonResponse({'error': 'Error desconhecido.'})


@login_required(login_url='/#modal-opened')
def reportes_json_c(req):
    cliente = list(Clientes.objects.values())
    data = {'cliente': cliente}
    return JsonResponse(data)
