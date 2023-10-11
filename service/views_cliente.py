import json
from datetime import date
from django.shortcuts import render, redirect
from django.core.serializers import serialize
from django.http import HttpResponse
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
    list = Clientes.objects.filter(
        categoria='Propietario', nom_cliente__icontains=Name)
    return HttpResponse(serialize('json', list), 'application/json')


def index_cliente(req):
    list = Clientes.objects.all()
    return render(req, 'cliente/index.html', {'list': list})


def crear_cliente(req):
    ERR = ''
    success = ''

    clientes = ClienteForm(req.POST or None, req.FILES or None)
    if clientes.is_valid():
        try:
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
                'error': ERR,
                'success': success
            }
            return render(req, 'cliente/cliente_form.html', contexto)

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


def editar_cliente(req, id_cliente):
    ERR = ''
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    formulario = ClienteForm(
        req.POST or None, req.FILES or None, instance=cliente)
    if formulario.is_valid() and req.POST:
        try:
            formulario.save()
            print('Cliente, OK')
            return redirect('index_cliente')

        except Exception as e:
            error_message = f"Error al guardar el Cliente: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
            return redirect('index_cliente')

    else:
        print(formulario.errors)
        for field_name, error_msgs in formulario.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    return render(req, 'cliente/editar.html', {'formulario': formulario, 'error': ERR})


def eliminar_cliente(req, id_cliente):
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    cliente.delete()
    return redirect('index_cliente')
