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
let id_inmueble = document.getElementById('id_inmueble')

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

f_sal.addEventListener("change", () => {
  if (f_in.value) {
    console.log(f_in.value, f_sal.value)

    verificar_fechas()

  }
})

const verificar_fechas = () => {

  $.get('/contrato/verificar-fechas/', {
    id_inmueble: id_inmueble.value,
    fecha_in: f_in.value,
    fecha_sal: f_sal.value
  }, function (data) {
    console.log(data.resultado)
    if (data.resultado == 1) {

      console.log('si esta disponible')
      console.log("As datas SI existem")
      $('#crear_contrato').prop('disabled', false)

    } else {

      console.log('no esta disponible')
      $('#crear_contrato').prop('disabled', true)
      _alerta(`Imóvel não disponível entre as datas: "${f_in.value}"  e  "${f_sal.value}"`)

    }
  })
}

const parte_1 = document.querySelector('.parte_1')
const parte_2 = document.querySelector('.parte_2')
const confirmar_3 = document.querySelector('.confirmar_3')

const form_1 = document.querySelector('.form_1')
const form_2 = document.querySelector('.form_2')
const form_3 = document.querySelector('.form_3')

const btn_volver_1 = document.querySelector('.btn_volver_1')
const btn_volver_2 = document.querySelector('.btn_volver_2')
const btn_siguiente = document.querySelector('.btn_siguiente')

btn_siguiente.addEventListener("click", function (event) {
  event.preventDefault()
  if (parte_1.className == 'parte_1 active') {
    event.preventDefault()

    parte_1.classList.remove('active')
    parte_2.classList.add('active')

    form_1.classList.remove('active')
    form_2.classList.add('active')

    btn_volver_1.classList.add('active')
    btn_volver_1.addEventListener("click", function (event) {
      event.preventDefault()

      parte_1.classList.add('active')
      parte_2.classList.remove('active')

      form_1.classList.add('active')
      form_2.classList.remove('active')

      btn_volver_1.classList.remove('active')

    })

  } else if (parte_2.className == 'parte_2 active') {
    event.preventDefault()

    parte_2.classList.remove('active')
    confirmar_3.classList.add('active')

    form_2.classList.remove('active')
    form_3.classList.add('active')

    btn_volver_1.classList.remove('active')
    btn_siguiente.style.display = 'none'

    btn_volver_2.classList.add('active')
    btn_volver_2.addEventListener("click", function (event) {
      event.preventDefault()

      parte_2.classList.add('active')
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
  $("#_nombre_cliente").keyup(() => {
    Buscar()
  })
})

const Buscar = () => {

  let Name = $.trim($("#_nombre_cliente").val())
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

const codRef = document.getElementById('codRef')

if (codRef) {
  codRef.addEventListener('click', () => {

    let cod_referencia = document.getElementById("cod_referencia").value

    if (!cod_referencia) {
      _alerta("Cod. Ref invalido")
      return
    }

    Swal.fire({
      title: '¿Quieres dejar Indisponible este Inmueble?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, ingreso fechas',
      cancelButtonText: 'No, hago contrato'
    }).then((result) => {
      if (result.isConfirmed) {
        // Muestra el formulario personalizado
        Swal.mixin({
          title: 'Selecciona las fechas de Ingreso y Finalizado',
          html: '<label for="start">Fecha de Ingreso</label>' +
            '<input type="date" id="start" class="swal2-input" min="' + getFormattedToday() + '">' +
            '<label for="end">Fecha de Finalizado</label>' +
            '<input type="date" id="end" class="swal2-input" min="' + getFormattedToday() + '">',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          focusConfirm: false,
          preConfirm: () => {
            const start = document.getElementById('start').value
            const end = document.getElementById('end').value

            // Obtener la fecha actual
            const today = new Date()
            const todayFormatted = today.toISOString().split('T')[0]

            if (!start || !end) {
              Swal.showValidationMessage('Ambas fechas son requeridas')
            }

            // Validar que ambas fechas no sean menores que hoy
            if (start < todayFormatted || end < todayFormatted) {
              Swal.showValidationMessage('Las fechas no pueden ser menores que hoy')
              return false
            }

            return {
              start,
              end
            }
          }
        }).fire().then((result) => {
          if (result.isConfirmed) {
            const {
              start,
              end
            } = result.value

            // Validar que ambas fechas han sido seleccionadas
            if (start && end) {
              // Hacer algo con las fechas seleccionadas
              console.log('Fecha de Ingreso:', start)
              console.log('Fecha de Finalizado:', end)

              // Calcular la diferencia en milisegundos entre las fechas
              const differenceInMilliseconds = new Date(end) - new Date(start)

              // Convertir la diferencia a días
              const cantidadDeDias = differenceInMilliseconds / (1000 * 60 * 60 * 24)
              console.log(cod_referencia)

              // Obtener el token CSRF del formulario
              let csrfToken = $('#formulario_contrato [name=csrfmiddlewaretoken]').val()

              let data = {
                start: start,
                end: end,
                cantidadDeDias: cantidadDeDias,
                cod_referencia: cod_referencia,
                csrfmiddlewaretoken: csrfToken // Incluye el token CSRF en la solicitud
              }

              // Enviar las fechas a la vista Django usando AJAX
              $.ajax({
                type: 'POST',
                url: '/propiedad/inmueble_indisponible', // La URL que definiste en urls.py
                data: data,
                success: (response) => {
                  _alerta(response.message) // Mensaje recibido desde la vista
                },
                error: (error) => {
                  _alerta('Ocurrio un error!')
                }
              })

            } else {
              // Si no se seleccionaron ambas fechas, puedes mostrar un mensaje o tomar alguna otra acción
              Swal.fire('Por favor, selecciona ambas fechas', '', 'error')
            }
          } else {
            cod_referencia_url()
          }
        })

      } else {
        cod_referencia_url()
      }
    })
  })
}

// Función para obtener la fecha de hoy en formato YYYY-MM-DD
const getFormattedToday = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const cod_referencia_url = () => {

  let url = `/contrato/codRef/${cod_referencia.value}`
  $.get(url).done((res) => {

    if (res != 'null') {

      nom_propietario.value = res[0].nombre_cliente

      resJSON = JSON.parse(res[0].inm)
      $.each(resJSON, (i, R) => {

        dir_inmueble.value = R.fields.dir_inmueble
        ciudad_inmueble.value = R.fields.ciudad_inmueble
        num_apto.value = R.fields.num_apto
        habitac_maxima.value = R.fields.habitac_maxima
        pass_hall1.value = R.fields.clave_puerta_ingreso
        pass_hall2.value = R.fields.clave_puerta_ingreso2
        pass_wifi.value = R.fields.clave_wifi
        valor_inmueble.value = R.fields.valor_inmueble
        id_inmueble.value = R.pk
      })

    } else {
      _alerta('Cod. Ref invalido')
    }

  })
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

const pattern_letras_espacios2 = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios2 = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9 ]*$/
const pattern_datos_envio = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9,.:;\- ]*$/
const pattern_solo_numeros1 = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ0-9-,./ ]*$/
const pattern_solo_numeros2 = /^[0-9][0-9#,.]*$/
const pattern_mail2 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

crear_contrato.addEventListener("click", (e) => {
  e.preventDefault()

  const letra_y_espacios = (DATO) => {
    return DATO.value.match(pattern_letras_espacios2)
  }

  const letras_numero_espacios = (DATO) => {
    return DATO.value.match(pattern_letras_numero_espacios2)
  }

  const solo_numeros = (DATO) => {
    return DATO.value.match(pattern_solo_numeros1)
  }

  const solo_numeros2 = (DATO) => {
    return DATO.value.match(pattern_solo_numeros2)
  }

  const mail = (DATO) => {
    return DATO.value.match(pattern_mail2)
  }

  const d_envio = (DATO) => {
    return DATO.value.match(pattern_datos_envio)
  }

  /* VALIDACIONES INMUEBLE */
  if (solo_numeros(cod_referencia) == null) {
    _alerta('Cód. de referência inválido!')
    return
  }

  if (letras_numero_espacios(dir_inmueble) == null || dir_inmueble.value.length < 3) {
    _alerta('Propriedade Endereço apenas letras/números e começar com MAIÚSCULAS!')
    return
  }

  if (letra_y_espacios(ciudad_inmueble) == null || ciudad_inmueble.value.length < 3) {
    _alerta('Propriedade Cidade apenas letras e deve começar com letras maiúsculas')
    return
  }

  if (solo_numeros(num_apto) == null) {
    _alerta('Núm. Apto inválido!')
    return
  }

  if (solo_numeros(habitac_maxima) == null) {
    _alerta('Máximo de ocupantes do imóvel não é válido!')
    return
  }

  if (solo_numeros2(pass_hall1) == null) {
    _alerta('pass_hall1 de Propriedade inválida!')
    return
  }

  if (solo_numeros2(pass_hall2) == null) {
    _alerta('pass_hall2 Propriedade inválida!')
    return
  }

  if (solo_numeros(pass_wifi) == null) {
    _alerta('Wi-Fi Propriedade inválida!')
    return
  }

  if (solo_numeros(valor_inmueble) == null) {
    _alerta('Valor Propriedade inválida!')
    return
  }

  /* FIN VALIDACIONES INMUEBLE */

  /* VALIDACIONES CLIENTE */

  if (letra_y_espacios(nom_cliente) == null || nom_cliente.value.length < 3) {
    _alerta('Nome do cliente apenas em letras e deve começar com letras maiúsculas')
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
    _alerta('A cidade do cliente contém apenas letras e deve começar com letras maiúsculas')
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
    _alerta('Endereço do cliente apenas letras/números e começar com LETRAS MAIÚSCULAS!')
    return
  }

  /* FIN VALIDACIONES CLIENTE */

  /* VALIDACIONES FECHAS/CONFIRMACION */

  if (!f_in.value) {
    _alerta('Selecione uma data de entrada!')
    return
  }

  if (!f_sal.value) {
    _alerta('Selecione uma data de partida!')
    return
  }

  if (d_envio(datos_envio) == null || datos_envio.value.length < 3) {
    _alerta('Informações de envio inválidas!')
    return
  }

  if (parseFloat(cant_dias.value) < 0 || cant_dias.value === '' || isNaN(cant_dias.value)) {
    _alerta("Número necessário de dias")
    return
  }

  if (parseFloat(taxa_limpeza.value) < 0 || taxa_limpeza.value === '' || isNaN(taxa_limpeza.value)) {
    _alerta("Taxa de limpeza necessária")
    return
  }

  if (parseFloat(valor_total.value) < 0 || valor_total.value === '' || isNaN(valor_total.value)) {
    _alerta("Valor total necessário")
    return
  }

  if (parseFloat(saldo_pendiente.value) < 0 || saldo_pendiente.value === '' || isNaN(saldo_pendiente.value)) {
    _alerta("Valor total necessário")
    return
  }

  /* FIN VALIDACIONES FECHAS/CONFIRMACION */

  // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
  formulario_contrato.submit()

})

/* CAMBIOS EN FECHAS */

const manejarNaN = () => {
  _alerta("O cálculo resultou em um valor não numérico. Verifique os dados inseridos.")
  return "Número NO válido"
}

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
  document.getElementById('saldo_pendiente').value = isNaN(Number(document.getElementById('valor_total').value) -
      Number(document.getElementById('monto_reserva').value)) ? manejarNaN() : Number(document.getElementById('valor_total').value) -
    Number(document.getElementById('monto_reserva').value)
})

document.getElementById('valor_total').addEventListener('keyup', () => {
  document.getElementById('saldo_pendiente').value = isNaN(Number(document.getElementById('valor_total').value) -
      Number(document.getElementById('monto_reserva').value)) ? manejarNaN() : Number(document.getElementById('valor_total').value) -
    Number(document.getElementById('monto_reserva').value)
})

document.getElementById('taxa_limpeza').addEventListener('keyup', () => {
  document.getElementById('valor_total').value = (diferenciaDias * Number(document.getElementById('valor_inmueble').value)) + Number(document.getElementById('taxa_limpeza').value)
  document.getElementById('saldo_pendiente').value = isNaN(Number(document.getElementById('valor_total').value) -
      Number(document.getElementById('monto_reserva').value)) ? manejarNaN() : Number(document.getElementById('valor_total').value) -
    Number(document.getElementById('monto_reserva').value)
})

/* FIN VALIDACIONES FECHAS/CONFIRMACION docx2pdf */

//// boton indisponible reserva de terceros


function guardarBtnIndisponible() {

  const cod_referencia = document.getElementById('cod_referencia').value
  const dir_inmueble = document.getElementById('dir_inmueble').value
  const ciudad_inmueble = document.getElementById('ciudad_inmueble').value
  const num_apto = document.getElementById('num_apto').value
  //const valor_inmueble = document.getElementById('valor_inmueble').value

  const fechaEntrada = document.getElementById('fecha_ing').value
  const fechaSalida = document.getElementById('fecha_salida').value

  // Guardar los datos del inmueble y las fechas de entrada y salida
  console.log('Datos del inmueble:', {
    cod_referencia,
    dir_inmueble,
    ciudad_inmueble,
    num_apto,
    valor_inmueble,
    fechaEntrada,
    fechaSalida
  })
}