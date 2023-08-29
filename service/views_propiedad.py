from django.shortcuts import render, redirect
from django.db import connection
from .models import *
import json
from datetime import date
from .forms import InmuebleForm

#query = "SELECT * FROM Inmuebles i JOIN Propietarios p ON i.prop_Id = p.id_Prop WHERE (SELECT COUNT(c.id_Cont) AS contID FROM Contratos c WHERE c.inm_Id = i.id_Inm AND ((c.fecha_In BETWEEN @inicio AND @fin) OR (c.fecha_fin BETWEEN @inicio AND @fin) OR (c.fecha_In < @inicio AND c.fecha_fin > @fin))) = 0 AND i.estado = 1 AND i.disponible = 1" % (fecha_inicio, fecha_fin)

#cursor.execute(query)

def serialize_date(obj):
        if isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        raise TypeError("Type not serializable")

def index_propiedad(req):
    list = Inmueble.objects.all()
    return render(req, 'propiedad/index.html')

def crear_propiedad(req):
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from clientes")
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

    except Exception as e:
        print("Error:", e)

     
    formulario = InmuebleForm(req.POST or None, req.FILES or None)
    if formulario.is_valid():
        formulario.save()
        return redirect('index_propiedad')
    return render(req, 'propiedad/crear.html', {'formulario':formulario, 'clientes':lista})

def editar_propiedad(req, id_inmueble):
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from clientes")
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

        #print(clientes)

    except Exception as e:
        print("Error:", e)

     
    inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
    formulario = InmuebleForm(req.POST or None, req.FILES or None, instance=inmueble)
    if formulario.is_valid() and req.POST:
        formulario.save()
        return redirect('index_propiedad')
    
    return render(req, 'propiedad/editar.html', {'formulario':formulario, 'clientes':lista})

def eliminar_propiedad(req, id_inmueble):
    inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
    inmueble.delete()
    return redirect('index_propiedad')
