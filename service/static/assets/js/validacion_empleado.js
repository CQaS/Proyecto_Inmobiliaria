const crear_empleado = document.getElementById('crear_empleado')
const formulario_empleado = document.getElementById('formulario_empleado')
const e_nombre = document.getElementById('nom_empleado')
const e_dni = document.getElementById('dni_empleado')
const e_tel = document.getElementById('tel_empleado')
const e_direccion = document.getElementById('dir_empleado')
const e_mail = document.getElementById('email_empleado')
const e_puesto = document.getElementById('nom_puesto')

const pattern_letras_espacios_ = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios_ = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ0-9 ]*$/
const pattern_solo_numeros_ = /^[0-9][0-9]*$/
const pattern_mail_ = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

crear_empleado.addEventListener("click", (e) => {
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

    if (letra_y_espacios(e_nombre) == null || e_nombre.value.length < 3) {
        _alerta('Nome do funcionário apenas em letras e deve começar com letras maiúsculas')
        return
    }

    if (letras_numero_espacios(e_direccion) == null || e_direccion.value.length < 3) {
        _alerta('Endereço do funcionário apenas letras/números e começar com MAIÚSCULAS!')
        return
    }

    if (solo_numeros(e_dni) == null || e_dni.value.length < 6) {
        _alerta('DNI de funcionário inválido!')
        return
    }

    if (solo_numeros(e_tel) == null || e_tel.value.length < 10) {
        _alerta('Telefono de funcionário inválido!')
        return
    }

    if (mail(e_mail) == null) {
        _alerta('E-mail de funcionário inválido!')
        return
    }


    if (e_puesto.value.length == 0) {
        _alerta('Selecione um cargo de funcionário')
        return
    }

    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
    formulario_empleado.submit()

})

const mostrarCampoUsername = () => {
    let select = document.getElementById("nom_puesto");
    let campoUsername = document.getElementById("campo_username");

    if (select.value === "Administracion") {
        campoUsername.style.display = "block";
    } else {
        campoUsername.style.display = "none";
    }
}