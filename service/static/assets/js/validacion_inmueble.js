const send = document.getElementById('send')
const formulario = document.getElementById('formulario_inmueble')

const i_direccion = document.getElementById("dir_inmueble")
const i_tipo = document.getElementById("tipo_inmueble")
const i_operacion = document.getElementById("tipo_operacion")
const i_suptotal = document.getElementById("sup_total")
const i_supcubierta = document.getElementById("sup_cubierta")
const i_supsemicubierta = document.getElementById("sup_semicub")
const i_cantplantas = document.getElementById("cant_plantas")
const i_cantdormitorios = document.getElementById("cant_dormitorios")
const i_cantbanos = document.getElementById("cant_banos")
const i_cod_referencia = document.getElementById("cod_referencia")
const i_condicion = document.getElementById("condicion")
const i_descripcion = document.getElementById("descripcion")
const i_valorinmueble = document.getElementById("valor_inmueble")
const i_idcliente = document.getElementById("cliente_id_")
const imgs = document.getElementById('imgs')
const tipo_servicio = document.getElementsByName('tipo_servicio')
const lati = document.getElementById('lat')
const long = document.getElementById('lon')


const pattern_letras_espacios = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios = /^[A-Z0-9][a-zA-ZñÑáÁéÉíÍúÚóÓ0-9 ]*$/
const pattern_solo_numeros = /^[0-9][0-9]*$/
const pattern_cod_ref = /^[0-9][0-9-]*$/
const pattern_mail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

if (send) {
    send.addEventListener("click", (e) => {
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
            console.log(DATO.value)
            return DATO.value.match(pattern_letras_numero_espacios)
        }

        const solo_numeros = (DATO) => {
            return DATO.value.match(pattern_solo_numeros)
        }

        const cod_ref = (DATO) => {
            return DATO.value.match(pattern_cod_ref)
        }


        if (letras_numero_espacios(i_direccion) == null || i_direccion.value.length < 3) {
            i_direccion.focus()
            _alerta('Direccion del Inmueble solo letras/números y comenzar con MAYUSCULAS!')
            return
        }

        if (i_tipo.value.length == 0) {
            _alerta('Selecciona un Tipo de Inmueble')
            return
        }

        if (tipo_servicio) {
            tipos = ''
            for (var i = 0; i < tipo_servicio.length; i++) {
                tipo_servicio[i].checked == true ? tipos = tipos + tipo_servicio[i].value + ', ' : console.log('NO')
            }

            if (tipos.charAt(tipos.length - 2) == ',') {
                tipos = tipos.slice(0, -2)
            }
            console.log(tipos)
        }

        if (i_operacion.value == 'Selecciona') {
            i_operacion.focus()
            _alerta('Selecciona un Tipo de Operación')
            return
        }

        if (solo_numeros(i_suptotal) == null || Number(i_suptotal.value) <= 0) {
            i_suptotal.focus()
            _alerta('Superficie Total de Inmueble no valido!')
            return
        }

        if (solo_numeros(i_supcubierta) == null || Number(i_supcubierta.value) <= 0) {
            i_supsemicubierta.focus()
            _alerta('Superficie Cubierta de Inmueble no valido!')
            return
        }

        if (solo_numeros(i_supsemicubierta) == null || Number(i_supsemicubierta.value) <= 0) {
            i_supsemicubierta.focus()
            _alerta('Superficie Semi Cubierta de Inmueble no valido!')
            return
        }

        if (solo_numeros(i_cantplantas) == null || Number(i_cantplantas.value) <= 0) {
            i_cantplantas.focus()
            _alerta('Cantidad de Plantas de Inmueble no valido!')
            return
        }

        if (solo_numeros(i_cantdormitorios) == null || Number(i_cantdormitorios.value) <= 0) {
            i_cantdormitorios.focus()
            _alerta('Cantidad de dormitorios de Inmueble no valido!')
            return
        }

        if (solo_numeros(i_cantbanos) == null || Number(i_cantbanos.value) <= 0) {
            i_cantbanos.focus()
            _alerta('Cantidad de baños del Inmueble no valido!')
            return
        }

        if (cod_ref(i_cod_referencia) == null) {
            i_cod_referencia.focus()
            console.log(i_cod_referencia.value)
            _alerta('Cod. Referencia del Inmueble no valido!')
            return
        }

        if (i_condicion.value == 'Selecciona') {
            i_condicion.focus()
            _alerta('Selecciona la Condición del Inmueble')
            return
        }

        if (letras_numero_espacios(i_descripcion) == null || i_descripcion.value.length > 200 || i_descripcion.value.length < 3) {
            i_descripcion.focus()
            _alerta('Descripción del Inmueble solo letras/números y comenzar con MAYUSCULAS, Max. 200 caracteres!')
            return
        }

        if (i_idcliente.value == '') {
            _alerta('Selecciona un Cliente')
            return
        }

        if (solo_numeros(i_valorinmueble) == null || Number(i_valorinmueble.value) <= 0) {
            i_valorinmueble.focus()
            _alerta('Valor del Inmueble no valido!')
            return
        }

        //uploadImg.files: FileList
        for (let i = 0; i < imgs.files.length; i++) {
            let f = imgs.files[i]

            // Verificar extensión del archivo
            let filePath = f.name
            let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

            if (!allowedExtensions.exec(filePath)) {
                console.log(`foto Nro:${i} no Valida!`)
                _alerta(`foto Nro:${i} no Valida!`)
                return
            } else {
                console.log(`ext Nro:${i} ok`)
            }

            //Verificar tamaño del archivo(máximo 2 MB) 2w
            const maxSize = 2 * 1024 * 1024 // 2MB en bytes

            if (f.size > maxSize) {
                console.log(`Por favor, Foto Nro:${i} que no excedan los 2MB.`)
                _alerta(`foto Nro:${i} no Valida!`)
                return
            } else {
                console.log(`size ${i} ok`)
            }
        }

        if (lati.value == '' || long.value == '') {
            _alerta('Selecciona una Ubicacion en el Mapa')
            return
        }

        console.log('OKOKOKOKOKOKO')

        // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
        formulario.submit()
    })
}


/* formulario tri-partido */

const parte_1 = document.querySelector('.parte_1')
const parte_2 = document.querySelector('.parte_2')
const confirmar_3 = document.querySelector('.confirmar_3')

const form_1 = document.querySelector('.form_1')
const form_2 = document.querySelector('.form_2')
const form_3 = document.querySelector('.form_3')

const btn_volver_1 = document.querySelector('.btn_volver_1')
const btn_volver_2 = document.querySelector('.btn_volver_2')
const btn_siguiente = document.querySelector('.btn_siguiente')

if (btn_siguiente) {
    btn_siguiente.addEventListener("click", function (event) {
        event.preventDefault()
        if (parte_1.className == 'parte_1 active') {
            event.preventDefault()

            parte_1.classList.remove('active')
            parte_2.classList.add('active')

            form_1.classList.remove('active')
            form_2.classList.add('active')

            btn_volver_1.classList.add('active')
            btn_volver_1.addEventListener("click", function (event) {
                event.preventDefault()

                parte_1.classList.add('active')
                parte_2.classList.remove('active')

                form_1.classList.add('active')
                form_2.classList.remove('active')

                btn_volver_1.classList.remove('active')

            })

        } else if (parte_2.className == 'parte_2 active') {
            event.preventDefault()

            parte_2.classList.remove('active')
            confirmar_3.classList.add('active')

            form_2.classList.remove('active')
            form_3.classList.add('active')

            btn_volver_1.classList.remove('active')
            btn_siguiente.style.display = 'none'

            btn_volver_2.classList.add('active')
            btn_volver_2.addEventListener("click", function (event) {
                event.preventDefault()

                parte_2.classList.add('active')
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
}


/* DATA TABLE */

let dataTable
let dataTableIsInitialized = false

const dataTableOptions = {
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    },
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
                    <td>${i + 1}</td>
                    <td>${p.dir_inmueble}</td>
                    <td>${p.tipo_inmueble}</td>
                    <td>${p.valor_inmueble}</td>
                    <td>${p.habitac_maxima}</td>
                    <td>${p.cant_plantas >= 2 
                        ? "<i class='fa-solid fa-check' style='color: green;'></i>" 
                        : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}
                    </td>
                    <td>
                        <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
                        <button class='btn btn-sm btn-danger'><i class='fa-solid fa-trash-can'></i></button>
                    </td>
                </tr>`;
        })
        tableBody_reportes.innerHTML = content
    } catch (ex) {
        alert(ex)
    }
}

if (!inmueble_Form) {
    window.addEventListener("load", async () => {
        await initDataTable()
    })
}