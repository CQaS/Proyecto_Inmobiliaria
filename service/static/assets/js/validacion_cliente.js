const crear_cliente = document.getElementById('crear_cliente')
const formulario = document.getElementById('formulario_cliente')
const c_nombre = document.getElementById('nom_cliente')
const c_direccion = document.getElementById('dir_cliente')
const c_dni = document.getElementById('dni_cliente')
const c_rg_cliente = document.getElementById('rg_cliente')
const c_tel = document.getElementById('tel_cliente')
const c_mail = document.getElementById('email_cliente')
const c_ciudad = document.getElementById('ciudad_cliente')
const c_pais = document.getElementById('pais_cliente')
const c_fecha = document.getElementById('fechnac')
const c_categoria = document.getElementById('categoria')

const pattern_letras_espacios_ = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios_ = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ0-9. ]*$/
const pattern_solo_numeros_ = /^[0-9][0-9]*$/
const pattern_mail_ = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

crear_cliente.addEventListener("click", (e) => {
    e.preventDefault()

    const letra_y_espacios = (DATO) => {
        return DATO.value.match(pattern_letras_espacios_)
    }

    const letras_numero_espacios = (DATO) => {
        return DATO.value.match(pattern_letras_numero_espacios_)
    }

    const solo_numeros = (DATO) => {
        return DATO.value.match(pattern_solo_numeros_)
    }

    const mail = (DATO) => {
        return DATO.value.match(pattern_mail_)
    }

    if (letra_y_espacios(c_nombre) == null || c_nombre.value.length < 3) {
        _alerta('Nombre del Cliente solo letras y debe comenzar con Mayusculas')
        return
    }

    if (letras_numero_espacios(c_direccion) == null) {
        _alerta('Direccion de Cliente solo letras/numeros y comenzar con MAYUSCULAS!')
        return
    }

    if (!c_dni.value && !c_rg_cliente.value) {
        _alerta('Debe ingresar al menos el número de DNI o el número de RG!')

    } else {
        console.log(c_dni.value)

        if (c_dni.value) {
            if (solo_numeros(c_dni) == null || c_dni.value.length < 5) {
                _alerta('DNI de Cliente no valido!')
                return
            }
        }

        if (c_rg_cliente.value) {
            if (solo_numeros(c_rg_cliente) == null || c_rg_cliente.value.length < 5) {
                _alerta('RG de Cliente no valido!')
                return
            }

        }
    }

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

    if (c_categoria.value.length == 0 || c_categoria.value == "Selecciona") {
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

    if (!c_fecha.value) {
        _alerta('Data Nascimento?')
        return
    }

    if (calcularEdad(c_fecha.value) < 18) {
        _alerta('Cliente menor de edad')
        return
    }


    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
    formulario.submit()

})