const send = document.getElementById('send')
const formulario = document.getElementById('formulario')
const c_nombre = document.getElementById('nom_cliente')
const c_direccion = document.getElementById('dir_cliente')
const c_dni = document.getElementById('dni_cliente')
const c_tel = document.getElementById('tel_cliente')
const c_mail = document.getElementById('email_cliente')
const c_ciudad = document.getElementById('ciudad_cliente')
const c_pais = document.getElementById('pais_cliente')
const c_fecha = document.getElementById('fechnac')
const c_categoria = document.getElementById('categoria')

const pattern_letras_espacios = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ0-9 ]*$/
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

    if (letra_y_espacios(c_nombre) == null || c_nombre.value.length < 3) {
        _alerta('Nombre del Cliente solo letras y debe comenzar con Mayusculas')
        return
    }

    if (letras_numero_espacios(c_direccion) == null) {
        _alerta('Direccion de Cliente solo letras/numeros y comenzar con MAYUSCULAS!')
        return
    }
    // || c_direccion.value.length < 3
    if (solo_numeros(c_dni) == null || c_dni.value.length < 8) {
        _alerta('DNI de Cliente no valido!')
        return
    }
    //

    if (solo_numeros(c_tel) == null || c_tel.value.length < 10) {
        _alerta('Telefono de Cliente no valido!')
        return
    }

    if (mail(c_mail) == null) {
        _alerta('E-mail de Cliente no valido!')
        return
    }

    if (letra_y_espacios(c_ciudad) == null || c_ciudad.value.length < 3) {
        _alerta('Ciudad de Cliente solo letras y comenzar con MAYUSCULAS!')
        return
    }

    if (letra_y_espacios(c_pais) == null || c_pais.value.length < 3) {
        _alerta('Pais de Cliente solo letras y comenzar con MAYUSCULAS!')
        return
    }

    if (c_categoria.value.length == 0) {
        _alerta('Selecciona una Categoria de Cliente')
        return
    }

    const calcularEdad = (fecha_nacimiento) => {
        let hoy = new Date()
        let cumpleanos = new Date(fecha_nacimiento)
        let edad = hoy.getFullYear() - cumpleanos.getFullYear()
        let m = hoy.getMonth() - cumpleanos.getMonth()
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
        }
        return edad
    }

    if (calcularEdad(c_fecha.value) < 18) {
        _alerta('Cliente menor de edad')
        return
    }


    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
    formulario.submit()

})