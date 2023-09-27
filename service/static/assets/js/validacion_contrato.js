// Obtén la fecha actual en el formato YYYY-MM-DD
var fechaActual = new Date().toISOString().split("T")[0]

// Establece la fecha actual como el valor mínimo
document.getElementById("fecha_ing").setAttribute("min", fechaActual)
document.getElementById("fecha_salida").setAttribute("min", fechaActual)
document.getElementById("fecha_reserva").setAttribute("min", fechaActual)

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
  console.log(dni_Inq)
  
  let url = `/cliente/json_dni_Inq/${dni_Inq}`
  
  $.get(url).done((res) => {
    
    $.each(res, (i, R) => {
      console.log(R.fields)
      
      nom_cliente.value = R.fields.nom_cliente
      rg_cliente.value = R.fields.dni_cliente
      dni_cliente.value = R.fields.dni_cliente
      ciudad_cliente.value = R.fields.ciudad_cliente
      tel_cliente.value = R.fields.tel_cliente
      email_cliente.value = R.fields.email_cliente
      dir_cliente.value = R.fields.dir_cliente
    })
  })
}

/* Validaciones de Contrato */

const crear_contrato = document.getElementById('crear_contrato')
const formulario_contrato = document.getElementById('formulario_contrato')

const pattern_letras_espacios = /^[A-Z][a-zA-Z ]*$/
const pattern_letras_numero_espacios = /^[A-Z][a-zA-Z0-9 ]*$/
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
    return DATO.value.match(pattern_solo_numeros)
  }
  
  const mail = (DATO) => {
    return DATO.value.match(pattern_mail)
  }
  
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

  if (mail(email_cliente) == null) {
    _alerta('E-mail de Cliente no valido!')
    return
  }


  /* if (e_puesto.value.length == 0) {
    _alerta('Selecciona un Puesto de Empleado')
    return
  } */

  // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
  //formulario_contrato.submit()

})