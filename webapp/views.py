from datetime import date
from decouple import config
from django.http.response import JsonResponse
from django.core.exceptions import ValidationError
from django.http import HttpResponseServerError
from django.shortcuts import render, redirect
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib.auth import logout
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

    # Convertir los resultados a una lista de diccionarios
    lista = []
    for row in res:
        row_dict = {}
        for i, value in enumerate(row):
            column_name = columns[i]
            row_dict[column_name] = value
        lista.append(row_dict)

    # Convertir a formato JSON
    # json_result = json.dumps(lista, default=serialize_date)

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

    print(len(resultado))

    form = ContactForm(request.POST or None, request.FILES or None)
    context = {
        'categoria': True,
        'error': ERR,
        'form': form,
        'exclusivos_lista': resultado,
        'total_exclusivos': len(resultado),
    }
    return render(request, 'index.html', context)


def msg(req):
    try:
        print(req.POST)

        if req.method == 'POST':
            nombre = req.POST['nombre']
            email = req.POST['email']
            tel = req.POST['tel']
            mensaje = req.POST['mensaje']

            # Crear un objeto EmailMessage
            subject = 'E-mail del Cliente {nombre}'.format(nombre=nombre)
            context = {
                'nombre': nombre,
                'email': email,
                'tel': tel,
                'mensaje': mensaje
            }
            print(context)
            message = render_to_string('email_template.html', context)
            email = EmailMessage(subject, message, email, [
                config('EMAIL_HOST_USER')])
            email.content_subtype = "html"  # Establecer el contenido como HTML

            # Enviar el correo electrónico
            email.send()
            return JsonResponse({'success': True})

    except ValidationError as e:
        print(e)
        # Maneja las excepciones de validación, si ocurren
        return JsonResponse({'error': False})
    except Exception as e:
        print(e)
        return JsonResponse({'error': False})
    # return redirect('index')


def login(req):
    print(req.POST)

    if req.method == 'POST':
        nombre = req.POST['usuario']
        email = req.POST['password']
        msg = f'{nombre} {email}'
        print(msg)
    return redirect('index')


def salir(req):
    logout(req)
    return redirect('index')


def notFound(req, err=None):
    return render(req, '404.html')
