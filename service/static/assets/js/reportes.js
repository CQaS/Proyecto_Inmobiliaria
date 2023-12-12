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

$alertBtn.click(() => {
    alert('You pressed on Alert')
})

let $reporte1 = $('#reporte1') // reporte de Inmuebles
$reporte1.click(() => {
    
})

let $reporte2 = $('#reporte2') // reporte de Clie
$reporte2.click(() => {
    
})

let $reporte3 = $('#reporte3') // reporte de empleados
$reporte3.click(() => {
    
})

const dataTableOptions = {
    locale: 'es',
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

    if(R == 'I'){
        console.log('I')
        await listInmuebles()
    }
    
    if(R == 'C'){
        console.log('C')
        await listClientes()
    }
    
    if(R == 'E'){
        console.log('E')
        await listEmpleados()
    }


    dataTable = $("#fresh-table").bootstrapTable(dataTableOptions)

    dataTableIsInitialized = true
}

const listInmuebles = async () => {
    try {
        const response = await fetch("/propiedad/reportes_json_i")
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

const listClientes = async () => {
    try {
        const response = await fetch("/propiedad/reportes_json_c")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.cliente.forEach((c, i) => {
            content += `
                <tr>
                    <td >${c.nom_cliente}</td>
                    <td >${c.dir_cliente}</td>
                    <td >${c.dni_cliente}</td>
                    <td >${c.tel_cliente}</td>  
                    <td >${c.email_cliente}</td>
                    <td >${c.fechanac}</td>  
                    <td >${c.categoria}</td>                           
                    <td >
                        <a href='/cliente/editar/${c.id_cliente}'
                        class = 'btn btn-sm btn_pencil'
                        title = 'Edit'><i class='fa-solid fa-pencil'></i></a>
                        <a href='#' class='btn btn-sm btn_trash'><i class='fa-solid fa-trash-can'></i></a>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        alert(ex)
    }
}

const listEmpleados = async () => {
    try {
        const response = await fetch("/propiedad/reportes_json_e")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.empleado.forEach((e, i) => {
            content += `
                <tr>
                    <td >${e.nom_empleado}</td>
                    <td >${e.dni_empleado}</td>
                    <td >${e.tel_empleado}</td>    
                    <td >${e.email_empleado}</td>  
                    <td >${e.dir_empleado}</td>    
                    <td >${e.email_empleado}</td> 
                    <td >${e.nom_puesto}</td>                   
                    <td >
                        <a href='/empleado/editar/${e.id_empleado}' class='btn btn-sm btn_pencil' title='Ver'><i class='fa-solid fa-pencil'></i></a>
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