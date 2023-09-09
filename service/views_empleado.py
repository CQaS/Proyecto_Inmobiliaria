from django.shortcuts import render, redirect
from django.db import connection
from .models import *
import json
from datetime import date
from .forms import *

def index_empleado(req):
    list = Empleados.objects.all()
    return render(req, 'empleado/index.html', {'list': list})

def crear_empleado(req):
    ERR = ''     
    empleado_form = EmpleadoForm(req.POST or None, req.FILES or None)
    if empleado_form.is_valid():
        try:
            empleado_form.save()
            print('Empleado, OK')
            return redirect('crear_empleado')
        
        except Exception as e:
            error_message = f"Error al guardar el empleado: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
            return redirect('crear_empleado')
    
    else:
        for field_name, error_msgs in empleado_form.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")

    return render(req, 'empleado/empleado_form.html', {'empleado_form':empleado_form, 'error':ERR})

def editar_empleado(req, id_empleado):
    ERR = ''     
    empleado = Empleados.objects.get(id_empleado=id_empleado)
    formulario = EmpleadoForm(req.POST or None, req.FILES or None, instance=empleado)
    if formulario.is_valid() and req.POST:
        try:
            formulario.save()
            print('Empleado, OK')
            return redirect('editar_empleado')
        
        except Exception as e:
            error_message = f"Error al guardar el empleado: {str(e)}"
            ERR = error_message
            print(f"error: {error_message}")
            return redirect('editar_empleado')
        
    else:
        for field_name, error_msgs in empleado.errors.items():
            for error_msg in error_msgs:
                ERR = 'Algun campo contiene Errores'
                print(f"Error en el campo '{field_name}': {error_msg}")
    
    return render(req, 'empleado/empleado_form.html', {'formulario':formulario, 'error': ERR})

def eliminar_empleado(req, id_empleado):
    empleado = Empleados.objects.get(id_empleado=id_empleado)
    empleado.delete()
    return redirect('index_empleado')
