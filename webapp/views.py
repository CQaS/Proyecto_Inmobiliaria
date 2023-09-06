from django.shortcuts import render
from .forms import ContactForm
from django.db import connection
import json, collections
from datetime import date

def serialize_date(obj):
        if isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        raise TypeError("Type not serializable")

# Create your views here.
def index(request):   
    
    try:
        with connection.cursor() as cursor:
            p='Argentina'
            query = """
                    SELECT * FROM clientes WHERE id_cliente = {0} AND pais_cliente = '{1}'
                    """.format('4', p)
            print(query)
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

        # Convertir los resultados a una lista de diccionarios
        results_as_dicts = []
        for row in res:
            row_dict = {}
            for i, value in enumerate(row):
                column_name = columns[i]
                row_dict[column_name] = value
            results_as_dicts.append(row_dict)

        # Convertir a formato JSON
        json_result = json.dumps(results_as_dicts, default=serialize_date)

        print(results_as_dicts)
        print(json_result)

    except Exception as e:
        print("Error:", e)    

    form = ContactForm(request.POST or None, request.FILES or None)
    return render(request, 'index.html', {'form': form})

def sevice(request):
    return render(request, 'login.html')