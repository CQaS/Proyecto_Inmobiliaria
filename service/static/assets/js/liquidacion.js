//Recibos de empleados 

const generarReciboEmpleado = () => {
  //let fecha = document.getElementById('fecha').value
  let nom_empleado = document.getElementById('nom_empleado').value
  let codigo_referencia = document.getElementById('codigo_referencia').value
  let concepto = document.getElementById('concepto').value
  let cant_horas = parseFloat(document.getElementById('cant_horas').value)
  let monto_hora = parseFloat(document.getElementById('monto_hora').value)
  let monto_total = cant_horas * monto_hora

  let fechaActual = new Date() // Obtiene la fecha actual
  let fechaFormatted = fechaActual.toLocaleDateString() // Formatea la fecha a string

  let reciboTexto = `
   Recibo de pagamento de Funcionário
                                                        Data: ${fechaFormatted}.
Recebi de María Eugenia Cáceres (CRECI 1111) o valor total 
de $ ${monto_total.toFixed(2)} por ${concepto}.
Código de referência: ${codigo_referencia}
Número de horas:  ${cant_horas}
Valor por hora: $${monto_hora.toFixed(2)}
Valor Total: $${monto_total.toFixed(2)}

                                               ${nom_empleado}
                                               
Obrigado pelo seu pagamento.
   `

  document.getElementById('recibo').innerText = reciboTexto
  document.getElementById('monto_total').value = monto_total.toFixed(2)

}

// funcion para generar PDF Empleados    
const genPDFE = () => {
  let doc = new jsPDF() // Crea un nuevo documento jsPDF

  let textoRecibo = document.getElementById('recibo').innerText // Obtén el texto del recibo

  //Defino estilo y formato del texto en el PDF
  doc.setFontSize(12)


  // Agrega el texto del recibo al documento
  doc.text(20, 20, textoRecibo)


  // Guarda el documento como un archivo PDF
  doc.save('ReciboEmpleado.pdf')
}


// Recibo para cliente
const generarReciboCliente = () => {
  let nom_cliente = document.getElementById('nom_cliente').value
  let cod_referencia = document.getElementById('cod_referencia').value
  let nombre_red = document.getElementById('nombre_red').value
  let clave_Wifi = document.getElementById('clave_Wifi').value
  let fecha_ing = document.getElementById('fecha_ing').value
  let fecha_salida = document.getElementById('fecha_salida').value
  let monto = document.getElementById('monto').value

  let fechaActual = new Date() // Obtiene la fecha actual
  let fechaFormatted = fechaActual.toLocaleDateString() // Formatea la fecha a string

  let reciboTexto = `
    Recibo de pagamento
                                                                        Data: ${fechaFormatted}.

    Recebi de ${nom_cliente} o valor total de $${monto} para pagamento da sua estadia a partir 
    de ${fecha_ing} até ${fecha_salida}.
    Código de referência: ${cod_referencia}
    Nome Rede: ${nombre_red}
    Senha WI-FI: ${clave_Wifi}


                                                    María Eugenia Cáceres
                                                    CRECI 1111
    Obrigado pelo seu pagamento.
    `

  document.getElementById('recibo').innerText = reciboTexto

  // // Generar y descargar archivo de texto
  // descargarTexto(reciboTexto, 'recibo_pago.txt')

  let contenedor = document.querySelector('.container_liq')

  // Cambiar el estilo para hacer el contenedor visible
  contenedor.style.display = 'block'

  let salvarPDF = document.getElementById('salvarPDF')

  // Cambiar el estilo para hacer el contenedor visible
  salvarPDF.style.display = 'inline-block'

}

const descargarTexto = (texto, nombreArchivo) => {
  let blob = new Blob([texto], {
    type: 'text/plain'
  })
  let enlace = document.createElement('a')
  enlace.href = window.URL.createObjectURL(blob)
  enlace.download = nombreArchivo

  // Simular clic en el enlace para descargar el archivo
  enlace.click()
}

// funcion para generar PDF     
const genPDFR = () => {
  let doc = new jsPDF() // Crea un nuevo documento jsPDF

  let textoRecibo = document.getElementById('recibo').innerText // Obtén el texto del recibo

  //Defino estilo y formato del texto en el PDF
  doc.setFontSize(12)


  // Agrega el texto del recibo al documento
  doc.text(20, 20, textoRecibo)


  // Guarda el documento como un archivo PDF
  doc.save('ReciboPago.pdf')
}

const mostrarDetallePropiedades = () => {

  const id_p = document.getElementById('id_p').value
  /* const propietarioSeleccionado = document.getElementById('nom_cliente').value */
  /* const fechaInicial = new Date(document.getElementById('fecha1').value)
  const fechaFinal = new Date(document.getElementById('fecha2').value) */

  const tablaDetalle = document.getElementById('detallePropiedades')
  tablaDetalle.innerHTML = '' // Limpiar el contenido actual de la tabla

  let totalIngresos = 0

  /*  const returnFechaFormateada = (D) => {

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
  */
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
    let total = parseFloat(t.innerText)
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
    let total = parseFloat(t.innerText)
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
    let total = parseFloat(t.innerText)
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
    let total = parseFloat(t.innerText)
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
    let total = parseFloat(t.innerText)
    if (!isNaN(total)) {
      totalGeneralLucro += total
    }
  })
  // Actualizar el elemento total general
  document.getElementById('totalGananciaNeta').innerText = totalGeneralLucro


}


const gen_PDFL = () => {
  let doc = new jsPDF();
  let tabla = document.getElementById('propiedades');
  let espacioTabla = document.getElementById('espacioTabla');

  let data = [];
  for (let i = 0; i < tabla.rows.length; i++) {
    let rowData = [];
    for (let j = 0; j < tabla.rows[i].cells.length; j++) {
      rowData.push(tabla.rows[i].cells[j].innerText);
    }
    data.push(rowData);
  }

  let totales = espacioTabla.innerHTML;
  
  doc.setFontSize(12);
  let posY = 10;

  // Agrega los datos de la tabla al PDF con alineación
  for (let row of data) {
    let posX = 10; // Reinicia la posición en X para cada fila
    for (let cell of row) {
      doc.text(posX, posY, cell);
      posX += 28; // Incrementa la posición en X para la siguiente celda
    }
    posY += 10; // Incrementa la posición en Y para la siguiente fila
  }

  // Ajusta la posición antes de agregar "Totales:"
  posY += 10; 

  doc.save('Liquidação de Propriedade.pdf');
}

