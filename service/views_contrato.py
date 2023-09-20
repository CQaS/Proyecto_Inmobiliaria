from pathlib import Path
from docxtpl import DocxTemplate

doc_Path = Path(__file__).parent #ruta del proyecto
doc_Arch = doc_Path / 'contrato.docx' #ruta del archivo DOCX Plantilla
doc = DocxTemplate(doc_Arch)

cliente = 'Fiamma'
doc_Arch_completo = doc_Path / f'contrato_completo-{cliente}.docx' #ruta del archivo DOCX contrato completo Cliente


nombre = "Fiamma"
edad = 37
direccion = "JKoslay 45"

context = {
    "NOMBRE": nombre,
    "EDAD": edad,
    "DIRECCION": direccion
    }

doc.render(context)
doc.save(doc_Arch_completo)