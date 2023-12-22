const mostrarDetallePropiedades = () => {

  const propietarioSeleccionado = document.getElementById('nom_cliente').value
  const id_p = document.getElementById('id_p').value
  const fechaInicial = new Date(document.getElementById('fecha1').value)
  const fechaFinal = new Date(document.getElementById('fecha2').value)

  const tablaDetalle = document.getElementById('detallePropiedades')
  tablaDetalle.innerHTML = '' // Limpiar el contenido actual de la tabla

  let totalIngresos = 0

  const returnFechaFormateada = (D) => {

    let year = D.getFullYear()
    let month = String(D.getMonth() + 1).padStart(2, '0')
    let day = String(D.getDate()).padStart(2, '0')
    let fechaFormateada = year + '-' + month + '-' + day

    // Mostrar la fecha formateada
    return fechaFormateada
  }

  let fecha_inicial = returnFechaFormateada(fechaInicial)
  let fecha_Final = returnFechaFormateada(fechaFinal)

  console.log(fecha_inicial, fecha_Final)

  let url = `/propiedad/json_liquidacion/${id_p}`
  $.get(url).done((res) => {

    if (res && res.inmueble.length > 0) {

      $.each(res, (j, R) => {

        $.each(R, (k, v) => {
          console.log(v)
          const row = document.createElement('tr')
          //const montoComision = (propiedad.ingresosTotales * propiedad.comision) / 100

          row.innerHTML = `
          <td>${v[0]}</td>
          <td class='rendimento'>${v[1]}</td>
          <td contenteditable="true" oninput="actualizarTotal(this)" class='comision'>0</td>
          <td class='porcentaje'>0</td>
          <td contenteditable="true" oninput="actualizarTotal(this)" class='mantenimiento'>0</td>
          <td class='lucro'>0</td>
          <td></td>
        `
          totalIngresos = totalIngresos + v[1]
          tablaDetalle.appendChild(row)
        })
      })

      // Agregar fila con totales al final de la tabla
      const rowTotal = document.createElement('tr')
      rowTotal.innerHTML = `
        <td><strong>Totales:</strong></td>
        <td id='totalGeneral'>0</td>
        <td id='totalComision'>0</td>
        <td id='totalPorcentaje'>0</td>
        <td id='totalGastosMantenimiento'></td>
        <td id='totalGananciaNeta'>0</td>
        <td>${new Date().toLocaleDateString()}</td>
      `
      tablaDetalle.appendChild(rowTotal)
    } else {
      // Si no hay elementos, mostrar un alert
      _alerta('No hay resultados para mostrar');
    }

  }).fail(() => {
    // Manejar cualquier error en la petición AJAX
    _alerta('Hubo un error al obtener los datos');
  })
}

const actualizarTotal = (e) => {
  let fila = e.parentNode
  // Obtener los elementos de la tabla
  let rendimentoTXT = fila.querySelector('.rendimento')
  let comisionTXT = fila.querySelector('.comision')
  let mantenimientoTXT = fila.querySelector('.mantenimiento')
  let porcentajeTXT = fila.querySelector('.porcentaje')
  let lucro = fila.querySelector('.lucro')

  let rendimento = parseFloat(rendimentoTXT.innerText)
  let comision = parseFloat(comisionTXT.innerText)
  let mantenimiento = parseFloat(mantenimientoTXT.innerText)

  porcentajeTXT.innerText = !isNaN(rendimento * comision / 100) ? rendimento * comision / 100 : 0
  lucro.innerText = !isNaN(rendimento - comision - mantenimiento) ? rendimento - comision - mantenimiento : 0

  // Actualizar el total general
  actualizarTotalGeneral()
}

const actualizarTotalGeneral = () => {
  let total_rendimento = document.querySelectorAll('.rendimento')
  let totalGeneral = 0
  // Sumar los totales de todas las filas
  total_rendimento.forEach((t) => {
    var total = parseFloat(t.innerText)
    if (!isNaN(total)) {
      totalGeneral += total
    }
  })
  // Actualizar el elemento total general
  document.getElementById('totalGeneral').innerText = totalGeneral

  let total_comision = document.querySelectorAll('.comision')
  let totalGeneralComision = 0
  // Sumar los totales de todas las filas
  total_comision.forEach((t) => {
    var total = parseFloat(t.innerText)
    if (!isNaN(total)) {
      totalGeneralComision += total
    }
  })
  // Actualizar el elemento total general
  document.getElementById('totalComision').innerText = totalGeneralComision

  let total_Porcentaje = document.querySelectorAll('.porcentaje')
  let totalGeneralPorcentaje = 0
  // Sumar los totales de todas las filas
  total_Porcentaje.forEach((t) => {
    var total = parseFloat(t.innerText)
    if (!isNaN(total)) {
      totalGeneralPorcentaje += total
    }
  })
  // Actualizar el elemento total general
  document.getElementById('totalPorcentaje').innerText = totalGeneralPorcentaje

  let total_mantenimiento = document.querySelectorAll('.mantenimiento')
  let totalGeneralMantenimiento = 0
  // Sumar los totales de todas las filas
  total_mantenimiento.forEach((t) => {
    var total = parseFloat(t.innerText)
    if (!isNaN(total)) {
      totalGeneralMantenimiento += total
    }
  })
  // Actualizar el elemento total general
  document.getElementById('totalGastosMantenimiento').innerText = totalGeneralMantenimiento

  let total_lucro = document.querySelectorAll('.lucro')
  let totalGeneralLucro = 0
  // Sumar los totales de todas las filas
  total_lucro.forEach((t) => {
    var total = parseFloat(t.innerText)
    if (!isNaN(total)) {
      totalGeneralLucro += total
    }
  })
  // Actualizar el elemento total general
  document.getElementById('totalGananciaNeta').innerText = totalGeneralLucro


}

// funcion para generar PDF     
const genPDF = () => {
  let doc = new jsPDF() // Crea un nuevo documento jsPDF
  let tabla = document.getElementById('propiedades') // Obtén la tabla de propiedades
  let espacioTabla = document.getElementById('espacioTabla') // Obtén el div de espacio de tabla para obtener los totales

  // Recorre la tabla y obtén sus datos en un array
  let data = []
  for (let i = 0; i < tabla.rows.length; i++) {
    let rowData = []
    for (let j = 0; j < tabla.rows[i].cells.length; j++) {
      rowData.push(tabla.rows[i].cells[j].innerText)
    }
    data.push(rowData)
  }

  // Obtiene los totales debajo de la tabla
  let totales = espacioTabla.innerHTML

  //Defino estilo y formato del texto en el PDF
  doc.setFontSize(12)

  // Define la posición y tamaño del texto en el PDF
  let posY = 10
  let textoRecibo = 'Liquidação de Propriedade\n\n' // Agrega un encabezado al PDF

  // Agrega los datos de la tabla al texto del PDF
  for (let row of data) {
    textoRecibo += row.join('\t') + '\n'
  }

  // Agrega los totales debajo de la tabla al texto del PDF
  textoRecibo += '\n\nTotales:\n' + totales

  // Agrega el texto al documento
  doc.text(10, posY, textoRecibo)

  // Guarda el documento como un archivo PDF
  doc.save('Liquidação de Propriedade.pdf')
}