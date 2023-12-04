/* DATA TABLE */

if (typeof inmueble_Form == "undefined") {
    window.addEventListener("load", async () => {
        await initDataTable()
    })
}

let dataTable
let dataTableIsInitialized = false

const dataTableOptions = {
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"


    },
    scrollX: "2000px",
    lengthMenu: [5, 10, 20, 50, 100],
    columnDefs: [{
            className: "centered",
            targets: [0, 1, 2, 3, 4, 5, 6]
        },
        {
            orderable: false,
            targets: [5, 6]
        },
        {
            searchable: false,
            targets: [0, 5, 6]
        },
        {
            width: '10%',
            targets: [0]
        }
    ],
    pageLength: 10,
    destroy: true
}

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy()
    }

    await listInmuebles()

    dataTable = $("#datatable-reportes").DataTable(dataTableOptions)

    dataTableIsInitialized = true
}

const listInmuebles = async () => {
    try {
        const response = await fetch("/propiedad/reportes_json")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.inmueble.forEach((p, i) => {
            content += `
                <tr>
                    <td  class="centered">${p.cod_referencia}</td>
                    <td  class="centered">${p.dir_inmueble}</td>
                    <td  class="centered">${p.tipo_inmueble}</td>
                    <td  class="centered">${p.valor_inmueble}</td>
                    <td  class="centered">${p.habitac_maxima}</td>
                    <td  class="centered">${p.tipo_servicio}</td>                    
                    <td  class="centered">
                        <button class='btn btn-sm'><i class='fa-solid fa-pencil'></i></button>
                        <button class='btn btn-sm'><i class='fa-solid fa-trash-can'></i></button>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        alert(ex)
    }
}

porFecha.addEventListener('click', async () => {
    f_i = f_ini.value
    f_f = f_fin.value

    if (f_i == '' || f_f == '') {
        _alerta('Seleção de data')
        return
    }

    let url = `/propiedad/buscar_por_fechas/${f_i}/${f_f}`

    if (dataTableIsInitialized) {
        dataTable.destroy()
    }

    await listInmueblesDisponibles(url)

    dataTable = $("#datatable-reportes").DataTable(dataTableOptions)

    dataTableIsInitialized = true
})

const listInmueblesDisponibles = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        let content = ``
        data.forEach((p, i) => {
            content += `
                <tr>
                    <td  class="centered">${p.inmueble.cod_referencia}</td>
                    <td  class="centered">${p.inmueble.dir_inmueble}</td>
                    <td  class="centered">${p.inmueble.tipo_inmueble}</td>
                    <td  class="centered">${p.inmueble.valor_inmueble}</td>
                    <td  class="centered">${p.inmueble.habitac_maxima}</td>
                    <td  class="centered">${p.inmueble.tipo_servicio}</td>                    
                    <td  class="centered">
                        <a href="/propiedad/detalles/${p.fotos[0].inmueble_id}" class='btn btn-info'><i class="fa-solid fa-eye"></i></a>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        _alerta(ex)
    }
}