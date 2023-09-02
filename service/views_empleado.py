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
    empleado = EmpleadoForm(req.POST or None, req.FILES or None)
    if empleado.is_valid():
        empleado.save()
        return redirect('index_empleado')
    else:
        for field_name, error_msgs in empleado.errors.items():
            for error_msg in error_msgs:
                print(f"Error en el campo '{field_name}': {error_msg}")

    return render(req, 'empleado/index.html', {'empleado':empleado})

def editar_empleado(req, id_empleado):     
    empleado = Empleados.objects.get(id_empleado=id_empleado)
    formulario = EmpleadoForm(req.POST or None, req.FILES or None, instance=empleado)
    if formulario.is_valid() and req.POST:
        formulario.save()
        return redirect('index_empleado')
    else:
        for field_name, error_msgs in empleado.errors.items():
            for error_msg in error_msgs:
                print(f"Error en el campo '{field_name}': {error_msg}")
    
    return render(req, 'empleado/editar.html', {'formulario':formulario})

def eliminar_empleado(req, id_empleado):
    empleado = Empleados.objects.get(id_empleado=id_empleado)
    empleado.delete()
    return redirect('index_empleado')
