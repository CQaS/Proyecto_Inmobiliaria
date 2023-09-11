const send = document.getElementById('send')
const formulario = document.getElementById('formulario_inmueble')

const i_direccion = document.getElementById("dir_inmueble")
const i_tipo = document.getElementById("tipo_inmueble")
const i_operacion = document.getElementById("tipo_operacion")
const i_suptotal = document.getElementById("sup_total")
const i_supcubierta = document.getElementById("sup_cubierta")
const i_supsemicubierta = document.getElementById("sup_semicub")
const i_cantplantas = document.getElementById("cant_plantas")
const i_cantdormitorios = document.getElementById("cant_dormitorios")
const i_cantbanos = document.getElementById("cant_banos")
const i_antiguedad = document.getElementById("antiguedad")
const i_condicion = document.getElementById("condicion")
const i_descripcion = document.getElementById("descripcion")
const i_valorinmueble = document.getElementById("valor_inmueble")
const i_idcliente = document.getElementById("id_cliente")
const i_img1 = document.getElementById("imagen1")
const i_img2 = document.getElementById("imagen2")
const i_img3 = document.getElementById("imagen3")


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


    if (letras_numero_espacios(i_direccion) == null || i_direccion.value.length < 3) {
        i_direccion.focus()
        _alerta('Direccion del Inmueble solo letras/números y comenzar con MAYUSCULAS!')
        return
    }

    if (i_tipo.value.length == 0) {
        _alerta('Selecciona un Tipo de Inmueble')
        return
    }

    if (i_operacion.value == 'Selecciona') {
        i_operacion.focus()
        _alerta('Selecciona un Tipo de Operación')
        return
    }

    if (solo_numeros(i_suptotal) == null || Number(i_suptotal.value) <= 0) {
        i_suptotal.focus()
        _alerta('Superficie Total de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_supcubierta) == null || Number(i_supcubierta.value) <= 0) {
        i_supsemicubierta.focus()
        _alerta('Superficie Cubierta de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_supsemicubierta) == null || Number(i_supsemicubierta.value) <= 0) {
        i_supsemicubierta.focus()
        _alerta('Superficie Semi Cubierta de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_cantplantas) == null || Number(i_cantplantas.value) <= 0) {
        i_cantplantas.focus()
        _alerta('Cantidad de Plantas de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_cantdormitorios) == null || Number(i_cantdormitorios.value) <= 0) {
        i_cantdormitorios.focus()
        _alerta('Cantidad de dormitorios de Inmueble no valido!')
        return
    }

    if (solo_numeros(i_cantbanos) == null || Number(i_cantbanos.value) <= 0) {
        i_cantbanos.focus()
        _alerta('Cantidad de baños del Inmueble no valido!')
        return
    }

    if (solo_numeros(i_antiguedad) == null || Number(i_antiguedad.value) <= 0) {
        i_antiguedade.focus()
        _alerta('Antiguedad del Inmueble no valido!')
        return
    }

    if (i_condicion.value == 'Selecciona') {
        i_condicion.focus()
        _alerta('Selecciona la Condición del Inmueble')
        return
    }

    if (letras_numero_espacios(i_descripcion) == null || i_descripcion.value.length > 200 || i_descripcion.value.length < 3) {
        i_descripcion.focus()
        _alerta('Descripción del Inmueble solo letras/números y comenzar con MAYUSCULAS, Max. 200 caracteres!')
        return
    }

    if (i_idcliente.value == 'Selecciona') {
        i_idcliente.focus()
        _alerta('Selecciona un Cliente')
        return
    }

    if (solo_numeros(i_valorinmueble) == null || Number(i_valorinmueble.value) <= 0) {
        i_valorinmueble.focus()
        _alerta('Valor del Inmueble no valido!')
        return
    }

    if (i_img1) {
        // Verificar extensión del archivo
        let filePath = i_img1.value
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

        if (!allowedExtensions.exec(filePath)) {
            _alerta('Primera foto no Valida!')
            return
        }

        //Verificar tamaño del archivo(máximo 2 MB) 
        const maxSize = 2 * 1024 * 1024 // 2MB en bytes 

        if (i_img1.files[0].size > maxSize) {
            _alerta('Por favor, seleccione en primer archivos que no excedan los 2MB.')
            return
        }
    }

    if (i_img2) {
        // Verificar extensión del archivo
        let filePath = i_img1.value
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

        if (!allowedExtensions.exec(filePath)) {
            _alerta('Segunda foto no Valida!')
            return
        }

        //Verificar tamaño del archivo(máximo 2 MB) 
        const maxSize = 2 * 1024 * 1024 // 2MB en bytes 

        if (i_img1.files[0].size > maxSize) {
            _alerta('Por favor, seleccione en segunda archivos que no excedan los 2MB.')
            return
        }
    }

    if (i_img3) {
        // Verificar extensión del archivo
        let filePath = i_img1.value
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

        if (!allowedExtensions.exec(filePath)) {
            _alerta('Tercera foto no Valida!')
            return
        }

        //Verificar tamaño del archivo(máximo 2 MB) 2w
        const maxSize = 2 * 1024 * 1024 // 2MB en bytes 

        if (i_img1.files[0].size > maxSize) {
            _alerta('Por favor, seleccione en tercer archivos que no excedan los 2MB.')
            return
        }
    }


    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
    //formulario.submit()
})