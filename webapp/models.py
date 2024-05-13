from django.db import models, connection, IntegrityError

# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(
        max_length=20, verbose_name='Nombre', null=False, blank=False)
    telefono = models.IntegerField(
        verbose_name='Telefono', null=False, blank=False)
    mail = models.CharField(
        max_length=20, verbose_name='E-mail', null=False, blank=False)
    mensaje = models.CharField(
        max_length=20, verbose_name='Mensaje', null=False, blank=False)

    def __str__(self):
        return self.username


def index_():
    ERR = ''
    columns = ''
    res = ''
    exclusivos = 0
    try:
        with connection.cursor() as cursor:
            query = """
                    SELECT * FROM inmueble i JOIN fotos_prop f ON i.id_inmueble = f.inmueble_id WHERE exclusividad = {0} AND estado = {1} AND f.image LIKE '%PORTADA%'
                    """.format('1', '1')
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

        if len(res) > 0:
            exclusivos = len(res)
            print('exclusivos: ' + str(exclusivos))
        else:
            with connection.cursor() as cursor:
                query = """
                        SELECT * FROM inmueble i JOIN fotos_prop f ON i.id_inmueble = f.inmueble_id WHERE estado = {0} AND f.image LIKE '%PORTADA%' ORDER BY RAND() LIMIT 6
                        """.format('1')
                cursor.execute(query)
                columns = [col[0] for col in cursor.description]
                res = cursor.fetchall()
                cursor.close()

    except IntegrityError as e:
        ERR = 'Algo fallo, intenta nuevamente o ponte en contacto con Admin'
        print("Error:", e)

    return {'res': res, 'columns': columns, 'err': ERR, 'exclusivos': exclusivos}
