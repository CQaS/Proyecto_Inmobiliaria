from datetime import date
import json
import collections
from django.shortcuts import render
from django.db import connection
from .forms import ContactForm
from .models import *


def serialize_date(obj):
    if isinstance(obj, date):
        return obj.strftime('%Y-%m-%d')
    raise TypeError("Type not serializable")


def index(request):
    R = index_()
    res = R['res']
    columns = R['columns']
    ERR = R['err']

    if not res:
        print("Tuple is empty")
    else:
        print("Tuple is not empty")

    # Convertir los resultados a una lista de diccionarios
    lista = []
    for row in res:
        row_dict = {}
        for i, value in enumerate(row):
            column_name = columns[i]
            row_dict[column_name] = value
        lista.append(row_dict)

    # Convertir a formato JSON
    json_result = json.dumps(lista, default=serialize_date)

    # Crear un conjunto para almacenar los valores únicos de cliente_id
    valores_unicos = set()
    resultado = []

    for item in lista:
        idInm = item['id_inmueble']
        # Verificar si el cliente_id es único
        if idInm not in valores_unicos:
            # Quitar la parte "webapp/" del campo 'image'
            item['image'] = item['image'].replace('webapp/', '')
            resultado.append(item)
            valores_unicos.add(idInm)

    print(resultado)

    form = ContactForm(request.POST or None, request.FILES or None)
    context = {
        'error': ERR,
        'form': form,
        'exclusivos_lista': resultado
    }
    return render(request, 'index.html', context)


def sevice(request):
    return render(request, 'login.html')
