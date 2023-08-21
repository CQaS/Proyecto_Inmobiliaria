from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, verbose_name='Nombre')
    telefono = models.IntegerField(verbose_name='Telefono')
    mail = models.CharField(max_length=20, verbose_name='E-mail')
    mensaje = models.CharField(max_length=20, verbose_name='Mensaje')

    def __str__(self):
        return self.username
    

