/* fresh-bootstrap */

if (typeof inmueble_Form == "undefined") {
    window.addEventListener("load", async () => {
        await initDataTable()
    })
}

let dataTable
let dataTableIsInitialized = false
let $table = $('#fresh-table')
let $alertBtn = $('#alertBtn')

const dataTableOptions = {
    locale:'es',
    classes: 'table table-hover table-striped',
    toolbar: '.toolbar',
    search: true,
    pagination: true,
    striped: true,
    sortable: true,

    formatShowingRows: function (pageFrom, pageTo, totalRows) {
        return ''
    },
    formatRecordsPerPage: function (pageNumber) {
        return pageNumber + ' rows visible'
    }
}

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.bootstrapTable('destroy')
    }

    await listInmuebles()

    dataTable = $("#fresh-table").bootstrapTable(dataTableOptions)

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
                    <td >${p.cod_referencia}</td>
                    <td >${p.dir_inmueble}</td>
                    <td >${p.tipo_inmueble}</td>
                    <td >${p.valor_inmueble}</td>
                    <td >${p.habitac_maxima}</td>
                    <td >${p.tipo_servicio}</td>                    
                    <td >
                        <a href='/propiedad/detalles/${p.id_inmueble}' class='btn btn-sm btn_pencil' title='Ver'><i class='fa-solid fa-pencil'></i></a>
                        <a href='#' class='btn btn-sm btn_trash'><i class='fa-solid fa-trash-can'></i></a>
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
        dataTable.bootstrapTable('destroy')
    }

    await listInmueblesDisponibles(url)

    dataTable = $("#fresh-table").bootstrapTable(dataTableOptions)

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
                    <td >${p.inmueble.cod_referencia}</td>
                    <td >${p.inmueble.dir_inmueble}</td>
                    <td >${p.inmueble.tipo_inmueble}</td>
                    <td >${p.inmueble.valor_inmueble}</td>
                    <td >${p.inmueble.habitac_maxima}</td>
                    <td >${p.inmueble.tipo_servicio}</td>                    
                    <td >
                        <a href="/propiedad/detalles/${p.fotos[0].inmueble_id}" class='btn btn-info'><i class="fa-solid fa-eye"></i></a>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        _alerta(ex)
    }
}