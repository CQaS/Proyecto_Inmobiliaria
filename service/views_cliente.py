from django.shortcuts import render, redirect
from django.db import connection
from .models import *
import json
from datetime import date
from .forms import *

def serialize_date(obj):
        if isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        raise TypeError("Type not serializable")

def index_cliente(req):
    list = Cliente.objects.all()
    return render(req, 'cliente/index.html', {'list': list})

def crear_cliente(req):
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from categoria_cliente")
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
        cli = json.dumps(lista, default=serialize_date)

    except Exception as e:
        print("Error:", e)

     
    clientes = ClienteForm(req.POST or None, req.FILES or None)
    if clientes.is_valid():
        clientes.save()
        return redirect('index')
    return render(req, 'cliente/index.html', {'clientes':clientes, 'categoria':lista})

def editar_cliente(req, id_cliente):
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from categoria_cliente")
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
        cli = json.dumps(lista, default=serialize_date)

    except Exception as e:
        print("Error:", e)

     
    cliente = Cliente.objects.get(id_cliente=id_cliente)
    formulario = ClienteForm(req.POST or None, req.FILES or None, instance=cliente)
    if formulario.is_valid() and req.POST:
        formulario.save()
        return redirect('index')
    
    return render(req, 'cliente/editar.html', {'formulario':formulario, 'clientes':lista})

def eliminar_cliente(req, id_cliente):
    cliente = Cliente.objects.get(id_cliente=id_cliente)
    cliente.delete()
    return redirect('index')
