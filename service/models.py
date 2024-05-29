import re
from PIL import Image
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import connection, IntegrityError
from django.shortcuts import redirect

pattern_Nombre = r'^[A-Z]*[a-z]{2,}[a-zA-ZñÑáÁéÉíÍúÚóÓ. ]*$'
pattern_Direccion = r'^[a-zA-Z0-9\-.,:*+()sàèìòùáéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ!?\s/]+$'
pattern_Datos_envio = r'^[A-Z0-9][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\ -]*$'
pattern_soloNumeros = r'^[0-9][0-9,.]*$'
pattern_cod_ = r'^[a-zA-Z0-9-]*$'
pattern_soloLetras = r'^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓA-Z- ]*$'


def validar_nombre(value):
    if not re.match(pattern_Nombre, value):
        raise ValidationError(
            'El valor debe comenzar con una letra Mayuscula y un minimo de dos letras')


def validar_Datos_envio(value):
    if not re.match(pattern_Datos_envio, value):
        raise ValidationError(
            'El valor de Datos de envio no valido')


def validar_direccion(value):
    if not re.match(pattern_Direccion, value):
        raise ValidationError('El valor debe comenzar con una Letra o Numero')


def validar_numero(value):
    value = str(value)
    if not re.match(pattern_soloNumeros, value):
        raise ValidationError('El valor debe contener solo numeros')


def validar_codigo(value):
    value = str(value)
    if not re.match(pattern_cod_, value):
        raise ValidationError('El valor del codigo no es valido')


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
    dir_inmueble = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Direccion', validators=[validar_direccion])
    barrio_inmueble = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Barrio', validators=[validar_direccion])
    bloco_inmueble = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Bloco', validators=[validar_direccion])
    ciudad_inmueble = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Ciudad', validators=[validar_direccion])
    nombre_red = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Red WiFi', validators=[validar_direccion])
    num_apto = models.CharField(
        max_length=3, null=False, blank=False, verbose_name='Apto')
    tipo_inmueble = models.CharField(max_length=25, null=False, blank=False,
                                     verbose_name='Tipo de Propiedad', validators=[validar_letras])
    tipo_operacion = models.CharField(
        max_length=25, null=False, blank=False, verbose_name='Tipo de Operacion', validators=[validar_letras])
    sup_total = models.CharField(max_length=15, 
                                    null=False, blank=False, verbose_name='Superficie', validators=[validar_numero])
    sup_cubierta = models.CharField(max_length=15,
                                       null=False, blank=False, verbose_name='Super. Cubierta', validators=[validar_numero])
    sup_semicub = models.CharField(max_length=15,
                                      null=False, blank=False, verbose_name='Super. Semicubierta', validators=[validar_numero])
    cant_plantas = models.IntegerField(
        null=False, blank=False, verbose_name='Cant. de Plantas', validators=[validar_numero])
    cant_dormitorios = models.IntegerField(
        null=False, blank=False, verbose_name='Cant. de Dormitorios', validators=[validar_numero])
    cant_banos = models.IntegerField(
        null=False, blank=False, verbose_name='Cant. de Baños', validators=[validar_numero])
    cochera = models.BooleanField(
        verbose_name='Cochera', null=True, blank=True, default=False)
    cochera_rotativa = models.BooleanField(
        verbose_name='Cochera Rotativa', null=True, blank=True, default=False)
    cod_referencia = models.CharField(max_length=100,
                                      null=False, blank=False, verbose_name='Cod. Referencia', validators=[validar_codigo])
    condicion = models.CharField(max_length=100, null=False, blank=False,
                                 verbose_name='Condicion', validators=[validar_letras])
    expensas = models.BooleanField(
        verbose_name='Expensas', null=True, blank=True, default=False)
    descripcion = models.TextField(
        null=False, blank=False, verbose_name='Descripcion')
    clave_puerta_ingreso = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Clave Puerta Ingreso', validators=[validar_codigo])
    clave_puerta_ingreso2 = models.CharField(
        max_length=100, null=False, blank=False, verbose_name='Clave Puerta Ingreso 2', validators=[validar_codigo])
    clave_wifi = models.CharField(max_length=50, null=False, blank=False,
                                  verbose_name='Clave Wi-Fi')
    tipo_servicio = models.CharField(max_length=45, null=True, blank=True,
                                     default='SD', verbose_name='Tipo de Servicio')
    cliente_id = models.ForeignKey('Clientes',
                                   verbose_name='cliente_id', on_delete=models.CASCADE, unique=False, db_column='cliente_id')
    valor_inmueble = models.CharField(max_length=15,
        verbose_name='Valor', null=False, blank=False, validators=[validar_numero])
    exclusividad = models.BooleanField(
        verbose_name='Exclusividad', null=True, blank=True, default=False)
    habitac_maxima = models.IntegerField(
        verbose_name='Hab. max.', null=False, blank=False, validators=[validar_numero])
    estado = models.IntegerField(
        # Estado = 1 seria Disponible
        null=True, default=1, blank=True, verbose_name='Estado')
    latitud = models.CharField(max_length=100, null=False, blank=False,
                               default='0.0', verbose_name='Latitud')
    longitud = models.CharField(max_length=100, null=False, blank=False,
                                default='0,0', verbose_name='Longitud')

    def __str__(self):
        return self.dir_inmueble

    def delete(self, using=None, keep_parents=False):
        self.imagen.storage.delete(self.imagen1.name)
        super().delete()

    class Meta:
        db_table = 'inmueble'


class Fotos(models.Model):
    image = models.ImageField(
        upload_to='webapp/static/assets/img/', null=False, blank=False, validators=[validar_imagen])
    inmueble_id = models.IntegerField(
        null=False, blank=False, verbose_name='Inmueble Id')

    class Meta:
        db_table = 'fotos_prop'


class Clientes(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nom_cliente = models.CharField(max_length=70, null=False, blank=False,
                                   verbose_name='Nombre de Cliente', validators=[validar_nombre])
    dni_cliente = models.IntegerField(
        verbose_name='Dni de Cliente', null=True, blank=True, validators=[validar_direccion])
    rg_cliente = models.CharField(max_length=100,
                                  verbose_name='RG Cliente', null=True, blank=True, validators=[validar_direccion])
    dir_cliente = models.CharField(max_length=100, verbose_name='Direccion de Cliente',
                                   null=False, blank=False, validators=[validar_direccion])
    tel_cliente = models.BigIntegerField(
        verbose_name='Tel de Cliente', null=False, blank=False, validators=[validar_numero])
    email_cliente = models.EmailField(
        max_length=45, verbose_name='Email de Cliente', null=False, blank=False, validators=[validate_email])
    ciudad_cliente = models.CharField(
        max_length=45, verbose_name='Ciudad de Cliente', null=False, blank=False, validators=[validar_nombre])
    pais_cliente = models.CharField(
        max_length=45, verbose_name='Pais de Cliente', null=False, blank=False, validators=[validar_letras])
    fechnac = models.DateField(
        verbose_name='Fecha de Nac.', null=False, blank=False,)
    categoria = models.CharField(max_length=45, verbose_name='Categoria',
                                 null=False, blank=False, validators=[validar_letras])
    estado = models.IntegerField(
        # Estado = 1 seria Disponible
        null=True, default=1, blank=True, verbose_name='Estado')

    def __str__(self):
        return self.nom_cliente

    def delete(self, using=None, keep_parents=False):
        super().delete()

    class Meta:
        db_table = 'clientes'


class Empleados(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nom_empleado = models.CharField(max_length=70, null=False, blank=False,
                                    verbose_name='Nombre de empleado', validators=[validar_nombre])
    dni_empleado = models.IntegerField(
        null=False, blank=False, verbose_name='DNI de empleado', validators=[validar_numero])
    tel_empleado = models.BigIntegerField(
        null=False, blank=False, verbose_name='Tel. de empleado', validators=[validar_numero])
    dir_empleado = models.CharField(max_length=100, null=False, blank=False,
                                    verbose_name='Direccion de Empleado', validators=[validar_direccion])
    email_empleado = models.EmailField(
        null=False, blank=False, verbose_name='Mail de empleado', validators=[validate_email])
    nom_puesto = models.CharField(max_length=45, null=False, blank=False,
                                  verbose_name='Nombre de puesto', validators=[validar_letras])
    estado = models.IntegerField(
        # Estado = 1 seria Disponible
        null=True, default=1, blank=True, verbose_name='Estado')

    def __str__(self):
        return self.nom_empleado

    def delete(self, using=None, keep_parents=False):
        super().delete()

    class Meta:
        db_table = 'empleados'


class Contrato(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    tipo_operacion = models.CharField(
        max_length=45, null=True, blank=True, verbose_name='Tipo operacion', default='S/D')
    fecha_contrato = models.DateField(
        auto_now_add=True, null=False, blank=False, verbose_name='Fecha de Contrato')
    fecha_ing = models.DateField(
        null=False, blank=False, verbose_name='Fecha de Ingreso')
    fecha_salida = models.DateField(
        null=False, blank=False, verbose_name='Fecha de Salida')
    cant_dias = models.IntegerField(
        null=False, blank=False, verbose_name='Cant. de Dias', validators=[validar_numero])
    cliente_id = models.ForeignKey(
        'Clientes', on_delete=models.CASCADE, verbose_name='Num. Cliente', db_column='cliente_id', unique=False)
    valor_total = models.IntegerField(
        null=False, blank=False, verbose_name='Valor Total', validators=[validar_numero])
    monto_reserva = models.IntegerField(
        null=False, blank=False, verbose_name='Monto reserva', validators=[validar_numero])
    fecha_reserva = models.DateField(
        null=False, blank=False, verbose_name='Fecha de Reserva')
    datos_envio = models.CharField(max_length=250, null=False, blank=False,
                                   verbose_name='Datos de envio', validators=[validar_Datos_envio])
    inmueble_id = models.ForeignKey(
        'Inmueble', unique=False, on_delete=models.CASCADE, verbose_name='Inmueble id', db_column='inmueble_id')

    def __str__(self):
        return self.valor_total

    def delete(self, using=None, keep_parents=False):
        super().delete()

    class Meta:
        db_table = 'contrato'


def buscarProp_ID(id_inmueble):
    query = """
        SELECT i.*, c.nom_cliente, c.id_cliente FROM inmueble i JOIN clientes c ON i.cliente_id = c.id_cliente WHERE i.id_inmueble = {0} AND (i.tipo_operacion = 'Alquiler temporario' OR i.tipo_operacion = 'Alquiler permanente')
        """.format(id_inmueble)

    ERR = ''
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

            return {'res': res, 'columns': columns, 'ERR': ERR}

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        return {'ERR': ERR}

    finally:
        connection.close()


def insertar_cliente(datos_cliente):

    try:
        query = "INSERT INTO clientes (nom_cliente, dni_cliente, rg_cliente, dir_cliente, tel_cliente, email_cliente, ciudad_cliente, pais_cliente, fechnac, categoria) VALUES (%(nom_cliente)s, %(dni_cliente)s, %(rg_cliente)s, %(dir_cliente)s, %(tel_cliente)s, %(email_cliente)s, %(ciudad_cliente)s, %(pais_cliente)s, %(fechnac)s, %(categoria)s)"

        with connection.cursor() as cursor:
            cursor.execute(query, datos_cliente)

        connection.commit()

        print("¡Cliente criado com sucesso!")
        return True

    except Exception as e:

        print('Algo deu errado, tente novamente ou entre em contato com o administrador')
        print("Error:", e)
        return False

    finally:
        connection.close()


def liquidacion(id_p):
    query = """
        SELECT inm.dir_inmueble, con.valor_total FROM clientes cli JOIN inmueble inm ON cli.id_cliente = inm.cliente_id JOIN contrato con ON con.inmueble_id = inm.id_inmueble WHERE cli.id_cliente = {0} AND cli.categoria = 'Propietario'
        """.format(id_p)

    ERR = ''
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

            return {'res': res, 'columns': columns, 'ERR': ERR}

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        return {'ERR': ERR}

    finally:
        connection.close()


def reciboCliente(id_cliente):
    query = """
        SELECT cli.nom_cliente, inm.cod_referencia, inm.cliente_id as idPropietario, inm.nombre_red, inm.clave_wifi, con.fecha_ing, con.fecha_salida, (con.valor_total - con.monto_reserva) AS saldo 
        FROM clientes cli 
        JOIN contrato con ON cli.id_cliente = con.cliente_id 
        JOIN inmueble inm ON con.inmueble_id = inm.id_inmueble 
        WHERE cli.id_cliente = {0}
        """.format(id_cliente)

    ERR = ''
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

            return {'res': res, 'columns': columns, 'ERR': ERR}

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        return {'ERR': ERR}

    finally:
        connection.close()


def calendarCodRef(id_codRef):
    print(id_codRef)
    query = """
        SELECT con.fecha_ing, con.fecha_salida, con.cliente_id, inm.dir_inmueble FROM inmueble inm JOIN contrato con ON inm.id_inmueble = con.inmueble_id WHERE inm.cod_referencia = '{0}'
        """.format(id_codRef)

    ERR = ''
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

            return {'res': res, 'columns': columns, 'ERR': ERR}

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        return {'ERR': ERR}

    finally:
        connection.close()


def reemplazarFotoPortada(idInmueble):
    ERR = ''
    delete = ''
    try:
        with connection.cursor() as cursor:
            queryimg = """
                    SELECT f.image FROM fotos_prop f WHERE f.inmueble_id = {0} AND f.image LIKE '%PORTADA%'
                    """.format(idInmueble)
            cursor.execute(queryimg)
            img = cursor.fetchone()

            query = """
                    DELETE FROM fotos_prop WHERE inmueble_id = {0} AND image LIKE '%PORTADA%'
                    """.format(idInmueble)
            cursor.execute(query)
            cursor.close()
        delete = True
        ERR = 'OK'

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        delete = False

    finally:
        connection.close()

    return {'delete': delete, 'err': ERR, 'img': img[0]}


def eliminarUnaFoto(idFoto):
    ERR = ''
    delete = ''
    img = ''
    try:
        with connection.cursor() as cursor:
            queryimg = """
                    SELECT f.image FROM fotos_prop f WHERE f.id_foto = {0}
                    """.format(idFoto)
            cursor.execute(queryimg)
            img = cursor.fetchone()

            query = """
                    DELETE FROM fotos_prop WHERE id_foto = {0}
                    """.format(idFoto)
            cursor.execute(query)

            cursor.close()

        ERR = 'Foto excluída com sucesso do banco de dados'
        delete = True

    except IntegrityError as e:

        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        delete = False

    finally:
        connection.close()

    return {'delete': delete, 'err': ERR, 'img': img}


def reemplazarVideo(idInmueble):
    ERR = ''
    delete = ''
    try:
        with connection.cursor() as cursor:
            queryvideo = """
                    SELECT f.image FROM fotos_prop f WHERE f.inmueble_id = {0} AND image LIKE '%mp4%'
                    """.format(idInmueble)
            cursor.execute(queryvideo)
            video = cursor.fetchone()

            query = """
                    DELETE FROM fotos_prop WHERE inmueble_id = {0} AND image LIKE '%mp4%'
                    """.format(idInmueble)
            cursor.execute(query)
            cursor.close()
        delete = True
        ERR = 'OK'

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        delete = False

    finally:
        connection.close()

    return {'delete': delete, 'err': ERR, 'video': video}


def Buscar_inmueble(id_inmueble):
    try:
        inmueble = Inmueble.objects.get(id_inmueble=id_inmueble)
        with connection.cursor() as cursor:
            cursor.execute(
                "select * from clientes where categoria = 'Propietario'")
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()

        # Convertir los resultados a una lista de diccionarios
        lista = []
        for row in res:
            row_dict = {}
            for i, value in enumerate(row):
                column_name = columns[i]
                row_dict[column_name] = value
            lista.append(row_dict)

    except Inmueble.DoesNotExist:
        print("NAO ENCONTRADO")
        return redirect('404')

    except IntegrityError as e:
        print("Error:", e)
        print('Algo deu errado, tente novamente ou entre em contato com o administrador')
        return redirect('404')

    finally:
        connection.close()

    return {'inmueble': inmueble, 'lista': lista}


def get_fotos_porinmueble(id_inmueble):
    try:

        query = """
        SELECT * FROM fotos_prop WHERE inmueble_id = {0}
        """.format(id_inmueble)

        with connection.cursor() as cursor:
            cursor.execute(query)
            columns = [col[0] for col in cursor.description]
            res = cursor.fetchall()
            cursor.close()

        resultados_mapeados = []
        for fila in res:
            fila_mapeada = {}
            for i, valor in enumerate(fila):
                fila_mapeada[columns[i]] = valor
            resultados_mapeados.append(fila_mapeada)

        return {'fotos_mapeados': resultados_mapeados}

    except Inmueble.DoesNotExist:
        print("NAO ENCONTRADO")
        return redirect('404')

    except IntegrityError as e:
        ERR = 'Algo deu errado, tente novamente ou entre em contato com o administrador'
        print("Error:", e)
        return {'ERR': ERR}

    finally:
        connection.close()
