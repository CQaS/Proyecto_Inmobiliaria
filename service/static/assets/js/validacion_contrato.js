
    $(() => {
      Buscar();
      $("#contrato_nombre_cliente").keyup(() => {
        Buscar();
      });
    });

    const Buscar = () => {
      let Name = $.trim($("#contrato_nombre_cliente").val())
      if (Name !== null && Name !== "" && Name.length !== 0) {

        let url = `/cliente/json_Inq/${Name}`

        $.get(url).done((res) => {
          console.log(res)

          let select = $("#lista_dinamica")
          select.find("option").remove().end()

          $.each(res, (i, R) => {
            console.log(R.fields)

            select.append($("<option>").val(R.fields.dni_cliente).text(R.fields.nom_cliente))
          })
        })
      }
    }
  