const send = document.getElementById('send')
const formulario = document.getElementById('formulario')
const i_direccion = document.getElementById("dir_inmueble")
const i_tipo = document.getElementById("tipo_inmueble")
const i_operacion = document.getElementById("tipo_operacion")
const i_suptotal = document.getElementById("sup_total")
const i_supcubierta = document.getElementById("sup_cubierta")
const i_supsemicubierta = document.getElementById("sup_semicub")
const i_cantplantas = document.getElementById("cant_plantas")
const i_cantdormitorios = document.getElementById("cant_dormitorios")
const i_cantbanos = document.getElementById("cant_banos")
const i_cochera = document.getElementById("cochera")
const i_antiguedad = document.getElementById("antiguedad")
const i_condicion = document.getElementById("condicion") //que era la condicion???
const i_expensas = document.getElementById("expensas")
const i_descripcion = document.getElementById("descripcion")
const i_tiposervicio = document.getElementById("tipo_servicio")
const i_valorinmueble = document.getElementById("valor_inmueble")




const pattern_letras_espacios = /^[A-Z][a-zA-Z ]*$/
const pattern_letras_numero_espacios = /^[A-Z][a-zA-Z0-9 ]*$/
const pattern_solo_numeros = /^[0-9][0-9]*$/
const pattern_mail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

send.addEventListener("click", (e)=> {
    e.preventDefault() 

    const _alerta = (texto) => {
        Swal.fire({
            icon: 'error',
            title: 'Alerta',
            text: `${texto}`
        })
    }

    const letra_y_espacios = (DATO) => {
        return DATO.value.match(pattern_letras_espacios)
    }

    const letras_numero_espacios = (DATO) => {
        return DATO.value.match(pattern_letras_numero_espacios)
    }

    const solo_numeros = (DATO) => {
        return DATO.value.match(pattern_solo_numeros)
    }

    
    if (letras_numero_espacios(i_direccion) == null || i_direccion.value.length < 3) {
        _alerta('Direccion del Inmueble solo letras/números y comenzar con MAYUSCULAS!')
        return
    }

    if (i_tipo.value.length == 0) {
        _alerta('Selecciona un Tipo de Inmueble')
        return
    }

    if (i_operacion.value.length == 0) {
        _alerta('Selecciona un Tipo de Operación')
        return
    }

    if (solo_numeros(i_suptotal) == null || i_suptotal.value.length < 5) {
        _alerta('Superficie Total de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_supcubierta) == null || i_supcubierta.value.length < 5) {
        _alerta('Superficie Cubierta de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_supsemicubierta) == null || i_supsemicubierta.value.length < 5) {
        _alerta('Superficie Semi Cubierta de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_cantplantas) == null || i_cantplantas.value.length > 0) {
        _alerta('Cantidad de Plantas de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_cantdormitorios) == null || i_cantdormitorios.value.length > 0) {
        _alerta('Cantidad de dormitorios de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_cantbanos) == null || i_cantbanos.value.length > 0) {
        _alerta('Cantidad de baños del Inmueble no valido!')
        return
    }

    if (!i_cochera.checked)  {
        _alerta('Cochera debe estar seleccionado')
        return
    }

    if (solo_numeros(i_antiguedad) == null || i_antiguedad.value.length > 0) {
        _alerta('Antiguedad del Inmueble no valido!')
        return
    }

    if (i_condicion.value.length == 0) {
        _alerta('Selecciona la Condición de Empleado')
        return
    }

    if (solo_numeros(i_expensas) == null || i_expensas.value.length > 0) {
        _alerta('Expensas del Inmueble no valido!')
        return
    }
    
    if (letras_numero_espacios(i_descripcion) == null || i_descripcion.value.length <= 200) {
        _alerta('Descripción del Inmueble solo letras/números y comenzar con MAYUSCULAS!')
        return
    }

    if (i_tiposervicio.length == 0) {
        _alerta('Selecciona un Tipo de Servicio')
        return
    }



    /// ME FALTA TOMAR EL ID DE CLIENTE Y LAS 3 IMAGNES ///


    
    if (solo_numeros(i_valorinmueble) == null || i_valorinmueble.value.length > 0) {
        _alerta('Valor del Inmueble no valido!')
        return
    }

    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
    formulario.submit()
})
