from django.db import models
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from PIL import Image
import re

pattern_Nombre = r'^[A-Z]*[a-z]{2,}[a-zA-Z ]*$'
pattern_Direccion = r'^[A-Z][a-zA-Z0-9 ]*$'
pattern_soloNumeros = r'^[0-9][0-9]*$'
pattern_soloLetras = r'^[A-Z][a-zA-Z ]*$'

def validar_nombre(value):
    if not re.match(pattern_Nombre, value):
        raise ValidationError('El valor debe comenzar con una letra Mayuscula y un minimo de dos letras')
    
def validar_direccion(value):
    if not re.match(pattern_Direccion, value):
        raise ValidationError('El valor debe comenzar con una letra Mayuscula')

def validar_numero(value):
    value = str(value)
    if not re.match(pattern_soloNumeros, value):
        raise ValidationError('El valor debe contener solo numeros')

def validar_letras(value):
    if not re.match(pattern_soloLetras, value):
        raise ValidationError('El valor debe contener solo Letras')

def validar_imagen(value):
    formato = ['jpeg', 'jpg', 'gif', 'png']
    tamanio = 2 * 1024 * 1024  # 2MB

    img = Image.open(value)
    img_format = img.format.lower()

    if img_format not in formato:
        raise ValidationError('El formato de la imagen no es válido.')

    if len(value) > tamanio:
        raise ValidationError('La imagen es demasiado grande (máximo 2MB).')

class Inmueble(models.Model):
    id_inmueble = models.AutoField(primary_key=True)
    dir_inmueble = models.CharField(max_length=100, null=False, blank=False, verbose_name='Direccion', validators=[validar_direccion])
    tipo_inmueble = models.CharField(max_length=25, null=False, blank=False, verbose_name='Tipo de Propiedad', validators=[validar_letras])
    tipo_operacion = models.CharField(max_length=25, null=False, blank=False, verbose_name='Tipo de Operacion', validators=[validar_letras])
    sup_total = models.IntegerField(null=False, blank=False, verbose_name='Superficie', validators=[validar_numero])
    sup_cubierta = models.IntegerField(null=False, blank=False, verbose_name='Super. Cubierta', validators=[validar_numero])
    sup_semicub = models.IntegerField(null=False, blank=False, verbose_name='Super. Semicubierta', validators=[validar_numero])
    cant_plantas = models.IntegerField(null=False, blank=False, verbose_name='Cant. de Plantas', validators=[validar_numero])
    cant_dormitorios = models.IntegerField(null=False, blank=False, verbose_name='Cant. de Dormitorios', validators=[validar_numero])
    cant_banos = models.IntegerField(null=False, blank=False, verbose_name='Cant. de Baños', validators=[validar_numero])
    cochera = models.BooleanField(verbose_name='Cochera', null=False, blank=False, default=False,)
    cod_referencia = models.IntegerField(null=False, blank=False, verbose_name='Cod. Referencia', validators=[validar_numero])
    condicion = models.IntegerField(null=False, blank=False, verbose_name='Condicion', validators=[validar_numero])
    expensas = models.BooleanField(verbose_name='Expensas', null=False, blank=False, default=False,)
    descripcion = models.TextField(null=False, blank=False, verbose_name='Descripcion', validators=[validar_direccion])
    clave_puerta_ingreso = models.CharField(max_length=100, null=False, blank=False, verbose_name='Clave Puerta Ingreso', validators=[validar_direccion])
    clave_wifi = models.CharField(max_length=50, null=False, blank=False, verbose_name='Clave Wi-Fi', validators=[validar_direccion])
    tipo_servicio = models.CharField(max_length=45, null=False, blank=False, verbose_name='Tipo de Servicio', validators=[validar_letras])
    id_cliente = models.ForeignKey('Clientes',on_delete=models.CASCADE, verbose_name='Num. Cliente')
    valor_inmueble = models.IntegerField(verbose_name='Valor', null=False, blank=False, validators=[validar_numero])
    exclusividad = models.BooleanField(verbose_name='Exclusividad', null=False, blank=False, default=False,)
    estado = models.IntegerField(null=False, default=1, blank=False, verbose_name='Estado', validators=[validar_numero])
    # Estado = 1 seria Disponible
    def __str__(self):
        return self.dir_inmueble
    
    def delete(self, using=None, keep_parents=False):
        self.imagen.storage.delete(self.imagen1.name)
        super().delete()

    class Meta:
        db_table = 'inmueble'

class Fotos(models.Model):
    image = models.ImageField(upload_to='img/', null=False, blank=False, validators=[validar_imagen])
    inmueble_id = models.ForeignKey(Inmueble, on_delete=models.SET_NULL, null=False, blank=False)

class Clientes(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nom_cliente = models.CharField(max_length=70, null=False, blank=False, verbose_name='Nombre de Cliente', validators=[validar_nombre])
    dni_cliente = models.IntegerField(verbose_name='Dni de Cliente', null=False, blank=False, validators=[validar_numero])
    dir_cliente = models.CharField(max_length=100, verbose_name='Direccion de Cliente', null=False, blank=False, validators=[validar_direccion])
    tel_cliente = models.BigIntegerField(verbose_name='Tel de Cliente', null=False, blank=False, validators=[validar_numero])
    email_cliente = models.EmailField(max_length=45, verbose_name='Email de Cliente', null=False, blank=False, validators=[validate_email])
    ciudad_cliente = models.CharField(max_length=45, verbose_name='Ciudad de Cliente', null=False, blank=False, validators=[validar_nombre])
    pais_cliente = models.CharField(max_length=45, verbose_name='Pais de Cliente', null=False, blank=False, validators=[validar_letras])
    fechnac = models.DateField(verbose_name='Fecha de Nac.', null=False, blank=False,)
    categoria = models.CharField(max_length=45, verbose_name='Categoria', null=False, blank=False, validators=[validar_letras])

    def __str__(self):
        return self.nom_cliente
    
    def delete(self, using=None, keep_parents=False):
        super().delete()

    class Meta:
        db_table = 'clientes'

class Empleados(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nom_empleado = models.CharField(max_length=70, null=False, blank=False, verbose_name='Nombre de empleado', validators=[validar_nombre])    
    dni_empleado = models.IntegerField(null=False, blank=False, verbose_name='DNI de empleado', validators=[validar_numero])  
    tel_empleado = models.BigIntegerField(null=False, blank=False, verbose_name='Tel. de empleado', validators=[validar_numero])  
    dir_empleado = models.CharField(max_length=100, null=False, blank=False, verbose_name='Direccion de Empleado', validators=[validar_direccion])  
    email_empleado = models.EmailField(null=False, blank=False, verbose_name='Mail de empleado', validators=[validate_email])    
    nom_puesto = models.CharField(max_length=45, null=False, blank=False, verbose_name='Nombre de puesto', validators=[validar_letras])

    def __str__(self):
        return self.nom_empleado
    
    def delete(self, using=None, keep_parents=False):
        super().delete()

    class Meta:
        db_table = 'empleados'

