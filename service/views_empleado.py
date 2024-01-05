import json
from datetime import date
from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.db import connection
from django.contrib.auth.models import User
from django.http.response import JsonResponse

# LOGIN
from django.contrib.auth.decorators import login_required


@login_required(login_url='/#modal-opened')
def index_empleado(req):
    list = Empleados.objects.all()
    return render(req, 'empleado/index.html', {'list': list})


@login_required(login_url='/#modal-opened')
def crear_empleado(req):
    ERR = ''
    success = ''
    empleado_form = EmpleadoForm(req.POST or None, req.FILES or None)
    if empleado_form.is_valid():
        email_empleado = empleado_form.cleaned_data['email_empleado']
        nom_empleado = empleado_form.cleaned_data['nom_empleado']
        dni_empleado = empleado_form.cleaned_data['dni_empleado']
        tel_empleado = empleado_form.cleaned_data['tel_empleado']
        dir_empleado = empleado_form.cleaned_data['dir_empleado']
        nom_puesto = empleado_form.cleaned_data['nom_puesto']
        username_empleado = req.POST['username_empleado']
        context_emp = {
            'email_empleado': email_empleado,
            'nom_empleado': nom_empleado,
            'dni_empleado': dni_empleado,
            'tel_empleado': tel_empleado,
            'dir_empleado': dir_empleado,
            'nom_puesto': nom_puesto,
        }

        try:
            # Validar si el DNI o el correo electrónico ya existen en la base de datos
            if Empleados.objects.filter(dni_empleado=req.POST['dni_empleado']).exists():
                ERR = 'O DNI já está cadastrado no banco de dados.'
                contexto = {
                    'empleado': context_emp,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'empleado/empleado_form.html', contexto)

            # Validar si el DNI o el correo electrónico ya existen en la base de datos
            if Empleados.objects.filter(email_empleado=req.POST['email_empleado']).exists():
                ERR = 'O E-mail já está cadastrado no banco de dados.'
                contexto = {
                    'empleado': context_emp,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'empleado/empleado_form.html', contexto)
        except Empleados.DoesNotExist:
            # Si no se encuentra ningún usuario con el correo electrónico, todo está bien
            pass

        try:
            empleado_form.save()
            if nom_puesto == 'Administracion':
                password = username_empleado + str(dni_empleado)
                # Crea un nuevo usuario
                nuevo_usuario = User.objects.create_user(
                    username_empleado, email_empleado, password)
                nuevo_usuario.first_name = nom_empleado
                nuevo_usuario.save()

            print('Empleado, OK')
            success = "Empregado criado com sucesso"
            contexto = {
                'error': ERR,
                'success': success
            }
            return render(req, 'empleado/empleado_form.html', contexto)

        except Exception as e:
            ERR = f"Error al Crear el empleado"
            print(f"error: {str(e)}")
            contexto = {
                'empleado': context_emp,
                'error': ERR,
                'success': success
            }
            return render(req, 'empleado/empleado_form.html', contexto)

    else:
        for field_name, error_msgs in empleado_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Alguns campos contêm erros'
                print(f"Error en el campo '{field_name}': {error_msg}")

    contexto = {
        'error': ERR,
        'success': success
    }

    return render(req, 'empleado/empleado_form.html', contexto)


@login_required(login_url='/#modal-opened')
def editar_empleado(req, id_empleado=None):
    ERR = ''
    success = ''
    try:
        empleado = Empleados.objects.get(id_empleado=id_empleado)

        # Validar si el DNI o el correo electrónico ya existen en la base de datos
        if req.method == 'POST' and str(empleado.dni_empleado) != req.POST['dni_empleado']:

            if Empleados.objects.filter(dni_empleado=req.POST['dni_empleado']).exists():
                ERR = 'O DNI já está cadastrado no banco de dados.'
                contexto = {
                    'empledit': empleado,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'empleado/empleado_form.html', contexto)

        # Validar si el DNI o el correo electrónico ya existen en la base de datos
        if req.method == 'POST' and empleado.email_empleado != req.POST['email_empleado']:
            if Empleados.objects.filter(email_empleado=req.POST['email_empleado']).exists():
                ERR = 'O E-mail já está cadastrado no banco de dados.'
                contexto = {
                    'empledit': empleado,
                    'error': ERR,
                    'success': success
                }
                return render(req, 'empleado/empleado_form.html', contexto)

    except Empleados.DoesNotExist:
        print("NO ENCONTRADO")
        return redirect('404')

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)

    empleado_form = EmpleadoForm(
        req.POST or None, req.FILES or None, instance=empleado)
    if empleado_form.is_valid() and req.POST:

        try:
            empleado_form.save()
            print('Empleado, OK')
            success = "Empregado editado corretamente"
            contexto = {
                'empledit': empleado,
                'error': ERR,
                'success': success
            }
            return render(req, 'empleado/empleado_form.html', contexto)

        except Exception as e:
            error_message = f"Error al guardar el empleado: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
            contexto = {
                'empledit': empleado,
                'error': ERR,
                'success': success
            }
            return render(req, 'empleado/empleado_form.html', contexto)

    else:
        for field_name, error_msgs in empleado_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Alguns campos contêm erros'
                print(f"Error en el campo '{field_name}': {error_msg}")

    contexto = {
        'empledit': empleado,
        'error': ERR,
        'success': success
    }

    return render(req, 'empleado/empleado_form.html', contexto)


@login_required(login_url='/#modal-opened')
def recibo_empleado(req, id_empleado):
    empleado = Empleados.objects.get(id_empleado=id_empleado)
    context = {
        'empleado': empleado
    }
    print(empleado)
    return render(req, 'empleado/recibo_empleado.html', context)


@login_required(login_url='/#modal-opened')
def eliminar_empleado(req, id_empleado):
    empleado = Empleados.objects.get(id_empleado=id_empleado)
    empleado.delete()
    return redirect('index_empleado')


@login_required(login_url='/#modal-opened')
def reportes_json_e(req):
    empleado = list(Empleados.objects.values())
    data = {'empleado': empleado}
    return JsonResponse(data)
