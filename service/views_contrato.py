from pathlib import Path
from docxtpl import DocxTemplate
from django.shortcuts import render,redirect
from .models import Clientes, Inmueble

def index_contrato(req, id_cliente, id_propietario):
    cliente = Clientes.objects.get(id_cliente=id_cliente)
    inmueble = Inmueble.objects.get(id_propietario=id_propietario)

    context={
        "cliente": cliente,
        "inmueble": inmueble
    }

    return render(req, "contrato/index.html", context)

def crear_contrato(req):
    doc_Path = Path(__file__).parent #ruta del proyecto
    doc_Arch = doc_Path / 'contrato_plantilla.docx' #ruta del archivo DOCX Plantilla
    doc = DocxTemplate(doc_Arch)

    cliente = 'Fiamma'
    doc_Arch_completo = doc_Path / f'contrato_completo-{cliente}.docx' #ruta del archivo DOCX contrato completo Cliente

    
    context = {
        """ "nom_propietario": propietario,
        "nom_cliente": cliente,
        "rg_cliente ": rg_cliente,
        "dni_cliente": dni_cliente,
        "dir_cliente": dir_cliente,
        "ciudad_cliente": ciudad_cliente,
        "tel_cliente": tel_cliente,
        "email_cliente": email_cliente,
        "nombre_inmueble": nombre_inmueble,
        "dir_inmueble": dir_inmueble,
        "ciudad_inmueble": ciudad_inmueble,
        "pass_hall1": pass_hall1,
        "pass_hall2": pass_hall2,
        "pass_wifi": pass_wifi,
        "num_apto": num_apto,
        "fecha_ing": fecha_ing,
        "fecha_salida": fecha_salida,
        "valor_inmueble": valor_inmueble,
        "valor_inmueble_palabras": valor_inmueble_palabras,
        "cant_dias": cant_dias,
        "valor_total": valor_total,
        "valor_total_palabras": valor_total_palabras,
        "monto_reserva": monto_reserva,
        "monto_reserva_palabras": monto_reserva_palabras,
        "fecha_reserva": fecha_reserva,
        "datos_envio": datos_envio,
        "saldo_pendiente": saldo_pendiente,
        "habitac_maxima": habitac_maxima,
        "fecha_contrato": fecha_contrato, """
        }

    doc.render(context)
    doc.save(doc_Arch_completo)