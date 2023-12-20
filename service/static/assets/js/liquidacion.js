const datosPropietarios = {
    "propietario1": {
      propiedades: [
        {
          nombre: "Departamento 1",
          ingresosTotales: 10000,
          gastosMantenimiento: 2000,
          comision: 5,
          fechaActual: "2023-07-20"
        },
        {
          nombre: "Departamento 2",
          ingresosTotales: 20000,
          gastosMantenimiento: 4000,
          comision: 7,
          fechaActual: "2023-07-21"
        }
      ]
    },
    "propietario2": {
      propiedades: [
        {
          nombre: "Casa 1",
          ingresosTotales: 30000,
          gastosMantenimiento: 6000,
          comision: 10,
          fechaActual: "2023-07-22"
        }
      ]
    }
  };
  
  function mostrarDetallePropiedades() {
    const propietarioSeleccionado = document.getElementById('propietario').value;
    const fechaInicial = new Date(document.getElementById('fecha1').value);
    const fechaFinal = new Date(document.getElementById('fecha2').value);
  
    const propiedades = datosPropietarios[propietarioSeleccionado].propiedades;
  
    const filtradasPorFecha = propiedades.filter(propiedad => {
      const fechaPropiedad = new Date(propiedad.fechaActual);
      return fechaPropiedad >= fechaInicial && fechaPropiedad <= fechaFinal;
    });
  
    const tablaDetalle = document.getElementById('detallePropiedades');
    tablaDetalle.innerHTML = ''; // Limpiar el contenido actual de la tabla
  
    let totalIngresos = 0;
    let totalGastosMantenimiento = 0;
    let totalGananciaNeta = 0;
    let totalComision = 0;
  
    filtradasPorFecha.forEach(propiedad => {
      const row = document.createElement('tr');
      const montoComision = (propiedad.ingresosTotales * propiedad.comision) / 100;
      const gananciaNeta = propiedad.ingresosTotales - montoComision - propiedad.gastosMantenimiento;
  
      totalIngresos += propiedad.ingresosTotales;
      totalGastosMantenimiento += propiedad.gastosMantenimiento;
      totalGananciaNeta += gananciaNeta;
      totalComision += montoComision;
  
      row.innerHTML = `
        <td>${propiedad.nombre}</td>
        <td>${propiedad.ingresosTotales}</td>
        <td contenteditable="true" oninput="actualizarGananciaNeta(this.parentElement)">${propiedad.comision}</td>
        <td>${montoComision.toFixed(2)}</td>
        <td contenteditable="true" oninput="actualizarGananciaNeta(this.parentElement)">${propiedad.gastosMantenimiento}</td>
        <td>${gananciaNeta.toFixed(2)}</td>
        <td>${new Date().toLocaleDateString()}</td>
      `;
      tablaDetalle.appendChild(row);
    });
  
    // Agregar fila con totales al final de la tabla
    const rowTotal = document.createElement('tr');
    rowTotal.innerHTML = `
      <td><strong>Totales:</strong></td>
      <td>${totalIngresos}</td>
      <td></td>
      <td>${totalComision.toFixed(2)}</td>
      <td>${totalGastosMantenimiento}</td>
      <td>${totalGananciaNeta.toFixed(2)}</td>
      <td></td>
    `;
    tablaDetalle.appendChild(rowTotal);
  }
  
  // funcion para generar PDF     
  function genPDF() {
    var doc = new jsPDF(); // Crea un nuevo documento jsPDF
    var tabla = document.getElementById('propiedades'); // Obtén la tabla de propiedades
    var espacioTabla = document.getElementById('espacioTabla'); // Obtén el div de espacio de tabla para obtener los totales
  
    // Recorre la tabla y obtén sus datos en un array
    var data = [];
    for (var i = 0; i < tabla.rows.length; i++) {
      var rowData = [];
      for (var j = 0; j < tabla.rows[i].cells.length; j++) {
        rowData.push(tabla.rows[i].cells[j].innerText);
      }
      data.push(rowData);
    }
  
    // Obtiene los totales debajo de la tabla
    var totales = espacioTabla.innerHTML;

    //Defino estilo y formato del texto en el PDF
    doc.setFontSize(12);

    // Define la posición y tamaño del texto en el PDF
    var posY = 10;
    var textoRecibo = 'Liquidação de Propriedade\n\n'; // Agrega un encabezado al PDF
  
    // Agrega los datos de la tabla al texto del PDF
    for (var row of data) {
      textoRecibo += row.join('\t') + '\n';
    }
  
    // Agrega los totales debajo de la tabla al texto del PDF
    textoRecibo += '\n\nTotales:\n' + totales;
  
    // Agrega el texto al documento
    doc.text(10, posY, textoRecibo);
  
    // Guarda el documento como un archivo PDF
    doc.save('Liquidação de Propriedade.pdf');
  }
  