/* fresh-bootstrap */

if (typeof inmueble_Form == "undefined") {
    window.addEventListener("load", async () => {
        await initDataTable()
    })
}

let dataTable
let dataTableIsInitialized = false
let $table = $('#fresh-table')

let $reporte_i = $('#reporte_i') // reporte de Inmuebles
$reporte_i.click(() => {
    window.location.href = '/reportes/I'
})

let $reporte_c = $('#reporte_c') // reporte de Cliente
$reporte_c.click(() => {
    window.location.href = '/reportes/C'
})

let $reporte_p = $('#reporte_p') // reporte de Propietarios
$reporte_p.click(() => {
    window.location.href = '/reportes/P'
})

let $reporte_e = $('#reporte_e') // reporte de Empleados
$reporte_e.click(() => {
    window.location.href = '/reportes/E'
})

let $reporte_con = $('#reporte_t') // reporte de Contratos
$reporte_con.click(() => {
    window.location.href = '/reportes/T'
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

    (R == 'I') ? await listInmuebles(): (R == 'C') ? await listClientes() : (R == 'P') ? await listPropietario() : (R == 'E') ? await listEmpleados() : (R == 'T') ? await listContrato() : null


    dataTable = $("#fresh-table").bootstrapTable(dataTableOptions)

    dataTableIsInitialized = true
}

const listInmuebles = async () => {
    try {
        const response = await fetch("/reportes_json_i")
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
        _alerta('Algo errado, entre em contato com o administrador!')
    }
}

const listClientes = async () => {
    try {
        const response = await fetch("/reportes_json_c")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.cliente.forEach((c, i) => {
            content += `
                <tr>
                    <td >${c.nom_cliente}</td>
                    <td >${c.dir_cliente}</td>
                    <td >${c.dni_cliente}</td>
                    <td >${c.rg_cliente}</td>  
                    <td >${c.tel_cliente}</td>
                    <td >${c.email_cliente}</td>  
                    <td >${c.fechnac}</td>                           
                    <td >${c.categoria}</td>                           
                    <td >
                        <a href='/cliente/editar/${c.id_cliente}'
                        class = 'btn btn-sm btn_pencil'
                        title = 'Edit'><i class='fa-solid fa-pencil'></i></a>
                        <a href='#' class='btn btn-sm btn_trash'><i class='fa-solid fa-trash-can'></i></a>
                        <a href='/cliente/recibo/${c.id_cliente}' class='btn btn-sm btn_file'><i class="fa-solid fa-file-invoice-dollar"></i></a>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        alert(ex)
    }
}

const listPropietario = async () => {
    try {
        const response = await fetch("/reportes_json_p")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.cliente.forEach((p, i) => {
            // filtrar por categoria propietario
            if (p.categoria === 'Propietario') {
                content += `
                <tr>
                    <td >${p.nom_cliente}</td>
                    <td >${p.dir_cliente}</td>
                    <td >${p.dni_cliente}</td>
                    <td >${p.rg_cliente}</td>  
                    <td >${p.tel_cliente}</td>
                    <td >${p.email_cliente}</td>  
                    <td >${p.fechnac}</td>                           
                    <td >${p.categoria}</td>                           
                    <td >
                        <a href='/cliente/editar/${p.id_cliente}'
                        class = 'btn btn-sm btn_pencil'
                        title = 'Edit'><i class='fa-solid fa-pencil'></i></a>
                        <a href='#' class='btn btn-sm btn_trash'><i class='fa-solid fa-trash-can'></i></a>
                        <a href='/cliente/liquidacion/${p.id_cliente}' ></a>
                    </td>
                </tr>`;
            }
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        _alerta('Algo errado, entre em contato com o administrador!')
    }
}

const listEmpleados = async () => {
    try {
        const response = await fetch("/reportes_json_e")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.empleado.forEach((e, i) => {
            content += `
                <tr>
                    <td >${e.nom_empleado}</td>
                    <td >${e.dni_empleado}</td>
                    <td >${e.tel_empleado}</td>    
                    <td >${e.dir_empleado}</td>    
                    <td >${e.email_empleado}</td>  
                    <td >${e.nom_puesto}</td>                   
                    <td >
                        <a href='/empleado/editar/${e.id_empleado}' class='btn btn-sm btn_pencil' title='Ver'><i class='fa-solid fa-pencil'></i></a>
                        <a href='#' class='btn btn-sm btn_trash'><i class='fa-solid fa-trash-can'></i></a>
                        <a href='/empleado/recibo/${e.id_empleado}' class='btn btn-sm btn_file'><i class="fa-solid fa-file-invoice-dollar"></i></a>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        _alerta('Algo errado, entre em contato com o administrador!')
    }
}

const listContrato = async () => {
    try {
        const response = await fetch("/reportes_json_t")
        const data = await response.json()
        console.log(data)

        let content = ``
        data.contrato.forEach((t, i) => {
            content += `
                <tr>
                    <td >${t.cod_referencia}</td>
                    <td >${t.dir_inmueble}</td>
                    <td >${t.nom_prop}</td>
                    <td >${t.nom_cliente}</td>
                    <td >${t.fecha_ing}</td>
                    <td >${t.fecha_salida}</td>
                    <td >${t.cant_dias}</td> 
                    <td >${t.valor_total}</td>                   
                    <td >
                        <button onclick='condetalles(${t.id_contrato})' class='btn btn-sm btn_pencil' title='Ver'><i class='fa-solid fa-file-invoice-dollar'></i></button>
                        <a href='#' class='btn btn-sm btn_trash'><i class='fa-solid fa-trash-can'></i></a>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        _alerta('Algo errado, entre em contato com o administrador!')
    }
}

const condetalles = (v) => {
    let url = `/contrato/condetalles/${v}`
    $.get(url).done((res) => {
            console.log(res)

            if (res && Object.keys(res).length > 0 && res.datos_envio != undefined) {

                let img = res.image.replace('webapp', '')

                Swal.fire({
                    title: 'Informação detalhada',
                    html: `
                        <div class="center">
                            <div class="property-card">
                                <a href="#">
                                <div class="property-image" style="background-image: url('${img}');">
                                    <div class="property-image-title">
                                    </div>
                                </div></a>
                                <div class="property-description">
                                <h5 class='h5'> ${res.dir_inmueble} </h5>
                                <p class='p'>${res.tipo_inmueble}</p>
                                <p class='p'>${res.tipo_operacion}</p>
                                <h5 class='h5'>$${res.valor_inmueble} </h5>
                                </div>
                            </div>
                        </div>
                        `,
                    showCloseButton: true,
                    showConfirmButton: false,
                })

            } else {
                _alerta(res.error)
            }
        })
        .fail((e) => {
            _alerta('Error al buscar el contrato!')
        })


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
        _alerta('Algo errado, entre em contato com o administrador!')
    }
}