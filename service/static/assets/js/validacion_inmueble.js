const send = document.getElementById('send')
const formulario = document.getElementById('formulario_inmueble')

const i_direccion = document.getElementById("dir_inmueble")
const i_bloco = document.getElementById("bloco_inmueble")
const i_ciudad = document.getElementById("ciudad_inmueble")
const i_barrio = document.getElementById("barrio_inmueble")
const i_red = document.getElementById("nombre_red")
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
const i_num_apto = document.getElementById("num_apto")
const i_idcliente = document.getElementById("lista_dinamica2")
const imgportada = document.getElementById('imgportada')
const imgs = document.getElementById('imgs')
const video = document.getElementById('video')
const tipo_servicio = document.getElementsByName('tipo_servicio')
const lati = document.getElementById('lat')
const long = document.getElementById('lon')

const pattern_mail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

if (send) {
    send.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(`EDICION ${editar}`)

        const letra_y_espacios = (DATO) => {
            return DATO.value.match(pattern_letras_espacios)
        }

        const letras_numero_espacios = (DATO) => {
            return DATO.value.match(pattern_letras_numero_espacios)
        }

        const solo_numeros = (DATO) => {
            return DATO.value.match(pattern_solo_numeros)
        }

        const cod_ref = (DATO) => {
            return DATO.value.match(pattern_cod_ref)
        }

        const num_apto = (DATO) => {
            return DATO.value.match(pattern_num_apto)
        }


        if (letras_numero_espacios(i_direccion) == null || i_direccion.value.length < 3) {
            i_direccion.focus()
            _alerta('Propriedade Endereço apenas letras/números e começar com MAIÚSCULAS!')
            return
        }

        if (letras_numero_espacios(i_barrio) == null || i_barrio.value.length < 3) {
            i_barrio.focus()
            _alerta('Propriedade Distrito apenas letras/números e começar com LETRAS MAIÚSCULAS!')
            return
        }

        if (letras_numero_espacios(i_ciudad) == null || i_ciudad.value.length < 3) {
            i_ciudad.focus()
            _alerta('Propriedade Cidade apenas letras/números e comece com MAIÚSCULAS!')
            return
        }

        if (letras_numero_espacios(i_red) == null || i_red.value.length < 3) {
            i_red.focus()
            _alerta('Nome da rede Wi-Fi apenas letras/números!')
            return
        }

        if (num_apto(i_num_apto) == null) {
            i_num_apto.value = "0"; // Establecer el valor predeterminado como "0"
            i_num_apto.focus()
            _alerta('Núm da propriedade apenas letras/números!')
            return
        }

        if (i_tipo.value.length == 0) {
            _alerta('Selecione um tipo de propriedadee')
            return
        }

        if (tipo_servicio) {
            tipos = ''
            for (let i = 0; i < tipo_servicio.length; i++) {
                tipo_servicio[i].checked == true ? tipos = tipos + tipo_servicio[i].value + ', ' : console.log(`No se eligio el tipo de servicio numero: ${i}`)
            }

            if (tipos.charAt(tipos.length - 2) == ',') {
                tipos = tipos.slice(0, -2)
            }
            console.log(tipos)
        }

        if (i_operacion.value == 'Selecione') {
            i_operacion.focus()
            _alerta('Selecione um tipo de operação')
            return
        }

        if (solo_numeros(i_suptotal) == null || Number(i_suptotal.value) < 0) {
            i_suptotal.focus()
            _alerta('Área Total do Imóvel não válida!')
            return
        }

        if (solo_numeros(i_supcubierta) == null || Number(i_supcubierta.value) < 0) {
            i_supcubierta.value = "0"; // Establecer el valor predeterminado como "0"
            i_supcubierta.focus()
            _alerta('Superfície Coberta de Propriedade não válida!')
            return
        }

        if (solo_numeros(i_supsemicubierta) == null || Number(i_supsemicubierta.value) < 0) {
            i_supsemicubierta.value = "0"; // Establecer el valor predeterminado como "0"
            i_supsemicubierta.focus()
            _alerta('Superfície de Imóvel Semi Coberta não é válida!')
            return
        }

        if (solo_numeros(i_cantplantas) == null || Number(i_cantplantas.value) < 0) {
            i_cantplantas.value = "0"; // Establecer el valor predeterminado como "0"
            i_cantplantas.focus()
            _alerta('Número de Pisos do Imóvel não válido!')
            return
        }

        if (solo_numeros(i_cantdormitorios) == null || Number(i_cantdormitorios.value) < 0) {
            i_cantdormitorios.value = "0"; // Establecer el valor predeterminado como "0"
            i_cantdormitorios.focus()
            _alerta('Número de quartos do Imóvel não válido!')
            return
        }

        if (solo_numeros(i_cantbanos) == null || Number(i_cantbanos.value) < 0) {
            i_cantbanos.value = "0"; // Establecer el valor predeterminado como "0"
            i_cantbanos.focus()
            _alerta('Número de banheiros na Propriedade não é válido!')
            return
        }

        if (cod_ref(i_cod_referencia) == null) {
            i_cod_referencia.focus()
            console.log(i_cod_referencia.value)
            _alerta('Cod. Referência de propriedade não válida!')
            return
        }

        if (i_condicion.value == 'Selecione') {
            i_condicion.focus()
            _alerta('Selecione a condição do imóvel')
            return
        }

        if (letras_numero_espacios(i_descripcion) == null || i_descripcion.value.length > 200 || i_descripcion.value.length < 3) {
            i_descripcion.focus()
            _alerta('Descrição do Imóvel apenas letras/números e iniciados em LETRAS MAIÚSCULAS, Máx. 200 caracteres!')
            return
        }

        if (i_idcliente.value == '') {
            _alerta('Selecione um cliente')
            return
        }

        if (solo_numeros(i_valorinmueble) == null || Number(i_valorinmueble.value) <= 0) {
            i_valorinmueble.focus()
            _alerta('Valor de propriedade inválido!')
            return
        }

        if (video.files && video.files.length > 0) {
            console.log(video.files)
            console.log(video.files.length)

            // if (!video.type.startsWith('video/')) {
            //     _alerta('Por favor, selecione um arquivo de vídeo.')
            //     return
            // }

            let maxSizeInBytes = 100 * 1024 * 1024 // 100 MB (exemplo)
            if (video.size > maxSizeInBytes) {
                _alerta('O tamanho do arquivo excede o limite permitido.')
                return
            }
        }

        if (!editar && (!imgportada.files && imgportada.files.length === 0)) {
            _alerta('Selecione a foto da capa!')
            console.log('Selecione a foto da capa!')
            return

        }

        if (imgportada.files && imgportada.files.length > 0) {

            let portadaName = imgportada.files[0]
            // Verificar extensión del archivo
            let filePath = portadaName.name
            let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

            if (!allowedExtensions.exec(filePath)) {
                console.log(`foto no Valida!`)
                _alerta(`foto Portada no Valida!`)
                return
            } else {
                console.log(`ext Portada ok`)
            }

            //Verificar tamaño del archivo(máximo 2 MB) 2w
            const maxSize = 2 * 1024 * 1024 // 2MB en bytes

            if (imgportada.size > maxSize) {
                console.log(`Por favor, Foto Portada que não excedam o 2MB.`)
                _alerta(`foto Portada no Valida!`)
                return
            } else {
                console.log(`size Portada ok`)
            }

        }

        if (!editar && (!imgs.files && imgs.files.length === 0)) {
            _alerta('Selecione FOTOS!')
            console.log('Selecione FOTOS!')
            return

        }

        if (imgs.files && imgs.files.length > 0) {
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
                    console.log(`Por favor, Foto Nro:${i} que não excedam o 2MB.`)
                    _alerta(`foto Nro:${i} no Valida!`)
                    return
                } else {
                    console.log(`size ${i} ok`)
                }
            }
        }


        // if (lati.value == '' || long.value == '') {
        //     _alerta('Selecciona una Ubicacion en el Mapa')
        //     return
        // }

        console.log('OK Inmueble FORM')

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

$(() => {
    _Buscar()
    $("#_nombre_propietario").keyup(() => {
        _Buscar()
    })
})

const _Buscar = () => {

    let Name = $.trim($("#_nombre_propietario").val())
    if (Name !== null && Name !== "" && Name.length !== 0) {

        let url = `/cliente/json_Prop/${Name}`

        $.get(url).done((res) => {
            let select = $("#lista_dinamica2")
            select.find("option").remove().end()

            $.each(res, (i, R) => {
                console.log(R)

                select.append($("<option>").val('').text('Seleccionar'))
                select.append($("<option>").val(R.id_cliente).text(R.nom_cliente))
            })
        })
    }
}