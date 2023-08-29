from django.shortcuts import render, redirect
from django.db import connection
from .models import *
import json
from datetime import date
from .forms import *

def index_cliente(req):
    list = Clientes.objects.all()
    return render(req, 'cliente/index.html', {'list': list})

def crear_cliente(req):     
    clientes = ClienteForm(req.POST or None, req.FILES or None)
    if clientes.is_valid():
        clientes.save()
        return redirect('index_cliente')
    return render(req, 'cliente/index.html', {'clientes':clientes})


def editar_cliente(req, id_cliente):
     
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    formulario = ClienteForm(req.POST or None, req.FILES or None, instance=cliente)
    if formulario.is_valid() and req.POST:
        formulario.save()
        return redirect('index_cliente')
    
    return render(req, 'cliente/editar.html', {'formulario':formulario})

def eliminar_cliente(req, id_cliente):
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    cliente.delete()
    return redirect('index_cliente')
