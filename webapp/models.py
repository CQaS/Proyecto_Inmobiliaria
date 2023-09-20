from django.db import models, connection, IntegrityError

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, verbose_name='Nombre', null=False, blank=False)
    telefono = models.IntegerField(verbose_name='Telefono', null=False, blank=False)
    mail = models.CharField(max_length=20, verbose_name='E-mail', null=False, blank=False)
    mensaje = models.CharField(max_length=20, verbose_name='Mensaje', null=False, blank=False)

    def __str__(self):
        return self.username

def index_():
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
            return {'res':res, 'columns' : columns}

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
        print("Error:", e)