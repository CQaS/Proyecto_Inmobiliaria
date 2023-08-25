from django.db import models

# Create your models here.

class Inmueble(models.Model):
    id_inmueble = models.AutoField(primary_key=True)
    dir_inmueble = models.CharField(max_length=100, null=False, blank=False, verbose_name='Direccion')
    tipo_inmueble = models.CharField(max_length=25, null=False, blank=False, verbose_name='Tipo de Propiedad')
    tipo_operacion = models.CharField(max_length=25, null=False, blank=False, verbose_name='Tipo de Operacion')
    sup_total = models.IntegerField(null=False, blank=False, verbose_name='Superficie')
    sup_cubierta = models.IntegerField(null=False, blank=False, verbose_name='Super. Cubierta')
    sup_semicub = models.IntegerField(null=False, blank=False, verbose_name='Super. Semicubierta')
    cant_plantas = models.IntegerField(null=False, blank=False, verbose_name='Cant. de Plantas')
    cant_dormitorios = models.IntegerField(null=False, blank=False, verbose_name='Cant. de Dormitorios')
    cant_banos = models.IntegerField(null=False, blank=False, verbose_name='Cant. de Baños')
    cochera = models.BooleanField(verbose_name='Cochera', null=False, blank=False,)
    antiguedad = models.IntegerField(null=False, blank=False, verbose_name='Antiguedad')
    condicion = models.IntegerField(null=False, blank=False, verbose_name='Condicion')
    expensas = models.BooleanField(verbose_name='Expensas')
    descripcion = models.TextField(null=False, blank=False, verbose_name='Descripcion')
    tipo_servicio = models.CharField(max_length=45, null=False, blank=False, verbose_name='Tipo de Servicio')
    id_cliente = models.ForeignKey('Clientes',on_delete=models.CASCADE, verbose_name='Num. Cliente')
    imagen1 = models.ImageField(upload_to='img/', null=False, blank=False, verbose_name='Foto 1')
    imagen2 = models.ImageField(upload_to='img/', null=False, blank=False, verbose_name='Foto 2')
    imagen3 = models.ImageField(upload_to='img/', null=False, blank=False, verbose_name='Foto 3')
    valor_inmueble = models.IntegerField(verbose_name='Valor', null=False, blank=False,)

    def __str__(self):
        return self.dir_inmueble
    
    def delete(self, using=None, keep_parents=False):
        self.imagen1.storage.delete(self.imagen1.name)
        self.imagen2.storage.delete(self.imagen2.name)
        self.imagen3.storage.delete(self.imagen3.name)
        super().delete()

class Clientes(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nom_cliente = models.CharField(max_length=70, null=False, blank=False, verbose_name='Nombre de Cliente')
    dni_cliente = models.IntegerField(verbose_name='Dni de Cliente', null=False, blank=False,)
    dir_cliente = models.CharField(max_length=100, verbose_name='Direccion de Cliente', null=False, blank=False,)
    tel_cliente = models.IntegerField(verbose_name='Tel de Cliente', null=False, blank=False,)
    email_cliente = models.EmailField(max_length=45, verbose_name='Email de Cliente', null=False, blank=False,)
    ciudad_cliente = models.CharField(max_length=45, verbose_name='Ciudad de Cliente', null=False, blank=False,)
    pais_cliente = models.CharField(max_length=45, verbose_name='Pais de Cliente', null=False, blank=False,)
    fechnac = models.DateField(verbose_name='Fecha de Nac.', null=False, blank=False,)
    id_catcliente = models.IntegerField(verbose_name='Num. Categ.', null=False, blank=False,)

    def __str__(self):
        return self.nom_cliente
    
    def delete(self, using=None, keep_parents=False):
        super().delete()