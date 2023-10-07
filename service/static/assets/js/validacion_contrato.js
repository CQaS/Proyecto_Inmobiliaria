/* formulario tri_Partito */

/* datos INMUEBLE */
let cod_referencia = document.getElementById('cod_referencia')
let dir_inmueble = document.getElementById('dir_inmueble')
let ciudad_inmueble = document.getElementById('ciudad_inmueble')
let num_apto = document.getElementById('num_apto')
let habitac_maxima = document.getElementById('habitac_maxima')
let pass_hall1 = document.getElementById('pass_hall1')
let pass_hall2 = document.getElementById('pass_hall2')
let pass_wifi = document.getElementById('pass_wifi')
let valor_inmueble = document.getElementById('valor_inmueble')

/* datos CLIENTE */
let nom_cliente = document.getElementById('nom_cliente')
let rg_cliente = document.getElementById('rg_cliente')
let dni_cliente = document.getElementById('dni_cliente')
let ciudad_cliente = document.getElementById('ciudad_cliente')
let tel_cliente = document.getElementById('tel_cliente')
let email_cliente = document.getElementById('email_cliente')
let dir_cliente = document.getElementById('dir_cliente')
let id_cliente = document.getElementById('id_cliente')

/* fechas CONTRATO */

let datos_envio = document.getElementById('datos_envio')
let cant_dias = document.getElementById('cant_dias')
let taxa_limpeza = document.getElementById('taxa_limpeza')
let valor_total = document.getElementById('valor_total')
let saldo_pendiente = document.getElementById('saldo_pendiente')

// Obtén la fecha actual en el formato YYYY-MM-DD
let fechaActual = new Date().toISOString().split("T")[0]

// Establece la fecha actual como el valor mínimo
let f_in = document.getElementById("fecha_ing")
let f_sal = document.getElementById("fecha_salida")
f_in.setAttribute("min", fechaActual)
f_sal.setAttribute("min", fechaActual)

const inmueble_1 = document.querySelector('.inmueble_1')
const inquilino_2 = document.querySelector('.inquilino_2')
const confirmar_3 = document.querySelector('.confirmar_3')

const form_1 = document.querySelector('.form_1')
const form_2 = document.querySelector('.form_2')
const form_3 = document.querySelector('.form_3')

const btn_volver_1 = document.querySelector('.btn_volver_1')
const btn_volver_2 = document.querySelector('.btn_volver_2')
const btn_siguiente = document.querySelector('.btn_siguiente')

btn_siguiente.addEventListener("click", function (event) {
  event.preventDefault()
  if (inmueble_1.className == 'inmueble_1 active') {
    event.preventDefault()

    inmueble_1.classList.remove('active')
    inquilino_2.classList.add('active')

    form_1.classList.remove('active')
    form_2.classList.add('active')

    btn_volver_1.classList.add('active')
    btn_volver_1.addEventListener("click", function (event) {
      event.preventDefault()

      inmueble_1.classList.add('active')
      inquilino_2.classList.remove('active')

      form_1.classList.add('active')
      form_2.classList.remove('active')

      btn_volver_1.classList.remove('active')

    })

  } else if (inquilino_2.className == 'inquilino_2 active') {
    event.preventDefault()

    inquilino_2.classList.remove('active')
    confirmar_3.classList.add('active')

    form_2.classList.remove('active')
    form_3.classList.add('active')

    btn_volver_1.classList.remove('active')
    btn_siguiente.style.display = 'none'

    btn_volver_2.classList.add('active')
    btn_volver_2.addEventListener("click", function (event) {
      event.preventDefault()

      inquilino_2.classList.add('active')
      confirmar_3.classList.remove('active')

      form_2.classList.add('active')
      form_3.classList.remove('active')
      btn_siguiente.textContent = 'Siguiente'

      btn_volver_2.classList.remove('active')
      btn_volver_1.classList.add('active')

      btn_siguiente.style.display = ''
    })
  }
})

/* formulario tri_Partito */

$(() => {
  Buscar()
  $("#contrato_nombre_cliente").keyup(() => {
    Buscar()
  })
})

const Buscar = () => {

  let Name = $.trim($("#contrato_nombre_cliente").val())
  if (Name !== null && Name !== "" && Name.length !== 0) {

    let url = `/cliente/json_Inq/${Name}`

    $.get(url).done((res) => {

      let select = $("#lista_dinamica")
      select.find("option").remove().end()

      $.each(res, (i, R) => {
        console.log(i)
        console.log(R.fields)

        select.append($("<option>").val('').text('Seleccionar'))
        select.append($("<option>").val(R.fields.dni_cliente).text(R.fields.nom_cliente))
      })
    })
  }
}

const seleccionaCliente = () => {

  let lista_dinamica = document.getElementById("lista_dinamica")
  dni_Inq = lista_dinamica.options[lista_dinamica.selectedIndex].value

  let url = `/cliente/json_dni_Inq/${dni_Inq}`

  $.get(url).done((res) => {

    $.each(res, (i, R) => {
      console.log(R)

      nom_cliente.value = R.fields.nom_cliente
      rg_cliente.value = R.fields.rg_cliente
      dni_cliente.value = R.fields.dni_cliente
      ciudad_cliente.value = R.fields.ciudad_cliente
      tel_cliente.value = R.fields.tel_cliente
      email_cliente.value = R.fields.email_cliente
      dir_cliente.value = R.fields.dir_cliente
      id_cliente.value = R.pk
    })
  })
}

/* Validaciones de Contrato */

const crear_contrato = document.getElementById('crear_contrato')
const formulario_contrato = document.getElementById('formulario_contrato')

const pattern_letras_espacios = /^[A-Z][a-zA-Z ]*$/
const pattern_letras_numero_espacios = /^[A-Z][a-zA-Z0-9 ]*$/
const pattern_datos_envio = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\- ]*$/
const pattern_solo_numeros = /^[0-9][0-9-]*$/
const pattern_solo_numeros2 = /^[0-9][0-9#]*$/
const pattern_mail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

crear_contrato.addEventListener("click", (e) => {
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

  const solo_numeros2 = (DATO) => {
    return DATO.value.match(pattern_solo_numeros2)
  }

  const mail = (DATO) => {
    return DATO.value.match(pattern_mail)
  }

  const d_envio = (DATO) => {
    return DATO.value.match(pattern_datos_envio)
  }

  /* VALIDACIONES INMUEBLE */
  if (solo_numeros(cod_referencia) == null || cod_referencia.value.length < 6) {
    _alerta('Cod referencia no valido!')
    return
  }

  if (letras_numero_espacios(dir_inmueble) == null || dir_inmueble.value.length < 3) {
    _alerta('Direccion de Inmueble solo letras/numeros y comenzar con MAYUSCULAS!')
    return
  }

  if (letra_y_espacios(ciudad_inmueble) == null || ciudad_inmueble.value.length < 3) {
    _alerta('Ciudad del Inmueble solo letras y debe comenzar con Mayusculas')
    return
  }

  if (solo_numeros(num_apto) == null) {
    _alerta('Num Apto de Inmueble no valido!')
    return
  }

  if (solo_numeros(habitac_maxima) == null) {
    _alerta('Ocupantes Max de Inmueble no valido!')
    return
  }

  if (solo_numeros2(pass_hall1) == null) {
    _alerta('pass_hall1 de Inmueble no valido!')
    return
  }

  if (solo_numeros2(pass_hall2) == null) {
    _alerta('pass_hall2 de Inmueble no valido!')
    return
  }

  if (solo_numeros(pass_wifi) == null) {
    _alerta('Wi-Fi de Inmueble no valido!')
    return
  }

  if (solo_numeros(valor_inmueble) == null) {
    _alerta('Valor de Inmueble no valido!')
    return
  }

  /* FIN VALIDACIONES INMUEBLE */

  /* VALIDACIONES CLIENTE */

  if (letra_y_espacios(nom_cliente) == null || nom_cliente.value.length < 3) {
    _alerta('Nombre Cliente solo letras y debe comenzar con Mayusculas')
    return
  }

  if (solo_numeros(rg_cliente) == null) {
    _alerta('RG no valido!')
    return
  }

  if (solo_numeros(dni_cliente) == null) {
    _alerta('RG no valido!')
    return
  }

  if (letra_y_espacios(ciudad_cliente) == null || ciudad_cliente.value.length < 3) {
    _alerta('Ciudad del Cliente solo letras y debe comenzar con Mayusculas')
    return
  }

  if (solo_numeros(tel_cliente) == null) {
    _alerta('Telefono Cliente no valido!')
    return
  }

  if (mail(email_cliente) == null) {
    _alerta('E-mail de Cliente no valido!')
    return
  }

  if (letras_numero_espacios(dir_cliente) == null || dir_cliente.value.length < 3) {
    _alerta('Direccion de Cliente solo letras/numeros y comenzar con MAYUSCULAS!')
    return
  }

  /* FIN VALIDACIONES CLIENTE */

  /* VALIDACIONES FECHAS/CONFIRMACION */

  if (!f_in.value) {
    _alerta('Selecciona una fecha de Ingreso!')
    return
  }

  if (!f_sal.value) {
    _alerta('Selecciona una fecha de Salida!')
    return
  }

  if (d_envio(datos_envio) == null || datos_envio.value.length < 3) {
    _alerta('DAtos de Envio no validos!')
    return
  }

  if (parseFloat(cant_dias.value) < 0 || cant_dias.value === '' || isNaN(cant_dias.value)) {
    _alerta("Cantidad de Dias necesaria")
    return
  }

  if (parseFloat(taxa_limpeza.value) < 0 || taxa_limpeza.value === '' || isNaN(taxa_limpeza.value)) {
    _alerta("Taxa de Limpeza necesaria")
    return
  }

  if (parseFloat(valor_total.value) < 0 || valor_total.value === '' || isNaN(valor_total.value)) {
    _alerta("Valor Total necesaria")
    return
  }

  if (parseFloat(saldo_pendiente.value) < 0 || saldo_pendiente.value === '' || isNaN(saldo_pendiente.value)) {
    _alerta("Valor Total necesaria")
    return
  }

  /* FIN VALIDACIONES FECHAS/CONFIRMACION */

  // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
  formulario_contrato.submit()

})

/* CAMBIOS EN FECHAS */

let fechaSeleccionada = 0

f_in.addEventListener('change', () => {

  fechaSeleccionada = new Date(f_in.value)

  fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1)

  const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0]

  f_sal.min = fechaFormateada

})

let diferenciaDias = 0
f_sal.addEventListener('change', () => {
  const fechaSeleccionada2 = new Date(f_sal.value)
  let unDia = 24 * 60 * 60 * 1000
  diferenciaDias = Math.floor((fechaSeleccionada2 - fechaSeleccionada) / unDia) + 1

  // Muestra la diferencia en días en el elemento de salida
  document.getElementById('cant_dias').value = diferenciaDias
  document.getElementById('valor_total').value = (diferenciaDias * Number(document.getElementById('valor_inmueble').value)) + Number(document.getElementById('taxa_limpeza').value)
})

document.getElementById('monto_reserva').addEventListener('keyup', () => {
  document.getElementById('saldo_pendiente').value = Number(document.getElementById('valor_total').value) -
    Number(document.getElementById('monto_reserva').value)
})

document.getElementById('valor_total').addEventListener('keyup', () => {
  document.getElementById('saldo_pendiente').value = Number(document.getElementById('valor_total').value) -
    Number(document.getElementById('monto_reserva').value)
})

document.getElementById('taxa_limpeza').addEventListener('keyup', () => {
  document.getElementById('valor_total').value = (diferenciaDias * Number(document.getElementById('valor_inmueble').value)) + Number(document.getElementById('taxa_limpeza').value)
  document.getElementById('saldo_pendiente').value = Number(document.getElementById('valor_total').value) -
    Number(document.getElementById('monto_reserva').value)
})

/* FIN VALIDACIONES FECHAS/CONFIRMACION docx2pdf */