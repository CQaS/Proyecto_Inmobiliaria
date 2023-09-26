// Obtén la fecha actual en el formato YYYY-MM-DD
var fechaActual = new Date().toISOString().split("T")[0]

// Establece la fecha actual como el valor mínimo
document.getElementById("fecha_ing").setAttribute("min", fechaActual)

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

  let nom_cliente = document.getElementById('nom_cliente')

  let lista_dinamica = document.getElementById("lista_dinamica")
  dni_Inq = lista_dinamica.options[lista_dinamica.selectedIndex].value
  console.log(dni_Inq)

  let url = `/cliente/json_dni_Inq/${dni_Inq}`

  $.get(url).done((res) => {

    $.each(res, (i, R) => {
      console.log(R.fields)

      nom_cliente.value = R.fields.nom_cliente

    })
  })
}