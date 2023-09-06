const send = document.getElementById('send')
const formulario = document.getElementById('formulario')
const e_nombre = document.getElementById('nom_empleado')
const e_dni = document.getElementById('dni_empleado')
const e_tel = document.getElementById('tel_empleado')
const e_mail = document.getElementById('email_empleado')

const e_puesto = document.getElementById('nom_puesto')

const pattern_letras_espacios = /^[A-Z][a-zA-Z ]*$/
const pattern_letras_numero_espacios = /^[A-Z][a-zA-Z0-9 ]*$/
const pattern_solo_numeros = /^[0-9][0-9]*$/
const pattern_mail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

send.addEventListener("click", (e) => {
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

    const mail = (DATO) => {
        return DATO.value.match(pattern_mail)
    }

    if (letra_y_espacios(e_nombre) == null || e_nombre.value.length < 3) {
        _alerta('Nombre del Empleado solo letras y debe comenzar con Mayusculas')
        return
    }

    if (letras_numero_espacios(e_direccion) == null || e_direccion.value.length < 3) {
        _alerta('Direccion de Empleado solo letras/numeros y comenzar con MAYUSCULAS!')
        return
    }

    if (solo_numeros(e_dni) == null || e_dni.value.length < 8) {
        _alerta('DNI de Empleado no valido!')
        return
    }

    if (solo_numeros(e_tel) == null || e_tel.value.length < 10) {
        _alerta('Telefono de Empleado no valido!')
        return
    }

    if (mail(e_mail) == null) {
        _alerta('E-mail de Empleado no valido!')
        return
    }

   
    if (e_puesto.value.length == 0) {
        _alerta('Selecciona un Puesto de Empleado')
        return
    }

    


    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
    formulario.submit()

})