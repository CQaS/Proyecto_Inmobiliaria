from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, verbose_name='Nombre', null=False, blank=False)
    telefono = models.IntegerField(verbose_name='Telefono', null=False, blank=False)
    mail = models.CharField(max_length=20, verbose_name='E-mail', null=False, blank=False)
    mensaje = models.CharField(max_length=20, verbose_name='Mensaje', null=False, blank=False)

    def __str__(self):
        return self.username