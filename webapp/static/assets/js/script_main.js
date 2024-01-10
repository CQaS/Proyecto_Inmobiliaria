//Menu de index//
let arrow = document.querySelectorAll(".arrow")
for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement //selecting main parent of arrow
        arrowParent.classList.toggle("showMenu")
    })
}

const pattern_letras_espacios = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ.0-9/ ]*$/
const pattern_solo_numeros = /^[0-9][0-9]*$/
const pattern_mail_m = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
const pattern_cod_ref = /^[a-zA-Z0-9-]*$/
const pattern_num_apto = /^[a-zA-Z0-9 ]*$/

let sidebar = document.querySelector(".sidebar")
let sidebarBtn = document.querySelector(".bx-menu")
let cards = document.querySelector(".cards")
let introsingle = document.querySelector(".intro-single")
let _container = document.querySelector("._container")
let box = document.querySelector(".box")
let tabla = document.querySelector(".tabla")
let _resultados_por = document.getElementById("resultados_por")
let copyrightText = document.querySelector(".copyrightText")
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close1")
    cards ? cards.classList.toggle("cards1") : null
    introsingle ? introsingle.classList.toggle("intro-single1") : null
    _container ? _container.classList.toggle("_container1") : null
    box ? box.classList.toggle("box1") : null
    tabla ? tabla.classList.toggle("tabla1") : null
    copyrightText ? copyrightText.classList.toggle("copyrightText1") : null
    _resultados_por ? _resultados_por.classList.toggle("cards1") : null
})

//////ALERTAS////////

const _alerta = (texto) => {
    Swal.fire({
        icon: 'error',
        title: 'Alerta',
        text: `${texto}`
    })
}

//Search de busqueda //
let resultados_por = document.getElementById('resultados_por')
let propiedad_por_tipo = document.getElementById("propiedad_por_tipo")

let temporada = document.getElementById("temporada")
temporada ? temporada.addEventListener('click', () => {
    tipo_o = null
    tipo_p = null
    venda = false
    anual = false
    temporada = true
    consulta()
}) : null

let anual = document.getElementById("anual")
anual ? anual.addEventListener('click', () => {
    tipo_o = null
    tipo_p = null
    venda = false
    temporada = false
    anual = true
    consulta()
}) : null

let venda = document.getElementById("venda")
venda ? venda.addEventListener('click', () => {
    tipo_o = null
    tipo_p = null
    anual = false
    temporada = false
    venda = true
    consulta()
}) : null

if (propiedad_por_tipo) {
    propiedad_por_tipo.addEventListener("click", () => {

        let por_operacion = document.getElementById("por_operacion")
        let por_propiedad = document.getElementById("por_propiedad")
        tipo_o = por_operacion.options[por_operacion.selectedIndex].value
        tipo_p = por_propiedad.options[por_propiedad.selectedIndex].value

        tipo_o ? console.log(tipo_o) : tipo_o = false
        tipo_p ? console.log(tipo_p) : tipo_p = false
        temporada = false
        anual = false
        venda = false

        if (!tipo_o && !tipo_p) {
            _alerta('Selecciona al menos Un tipo de Busqueda!')
            return
        }

        consulta()
    })

}

const consulta = () => {

    let listaUl = document.querySelector('#resultados_por ul')
    if (listaUl) {
        // Elimina el elemento <ul>
        listaUl.parentNode.removeChild(listaUl);
    }

    let listahr = document.querySelector('#resultados_por hr')
    if (listahr) {
        // Elimina el elemento <hr>
        listahr.parentNode.removeChild(listahr);
    }

    let h2 = resultados_por.querySelector("h2")
    h2 ? resultados_por.removeChild(h2) : null

    let ul = resultados_por.querySelector("ul")
    ul ? resultados_por.removeChild(ul) : null

    let url = `/propiedad/propiedad_por_tipo/${tipo_o}/${tipo_p}/${temporada}/${anual}/${venda}`

    /* let f_ini = document.getElementById("f_ini").value
    let f_fin = document.getElementById("f_fin").value

    console.log(f_ini, f_fin)
    let url2 = `/propiedad/buscar_por_fechas/${f_ini}/${f_fin}` */

    $.get(url).done((res) => {
        console.log(res)

        if (res !== undefined && res !== null && res.length > 0) {

            let h2Element = document.createElement('h2')
            h2Element.textContent = 'Resultados de la Búsqueda'
            h2Element.style.marginLeft = '8%'

            resultados_por.appendChild(h2Element)

            // Crear un elemento <ul>
            let ulElement = document.createElement('ul')
            ulElement.className = 'cards'
            resultados_por.appendChild(ulElement)

            let _cards = document.querySelector('.cards')

            $.each(res, (i, R) => {
                let url = R.fotos[0].image.replace('webapp/', '')

                // HTML con el bloque completo a agregar
                let bloqueCARD = `
                                <li class="cards__item">
                                    <div class="card">
                                        <div class="card__image" style="background-image: url(${url});"></div>
                                        <div class="card__content">
                                            <div class="card__title">
                                                ${R.inmueble.dir_inmueble} - ${R.inmueble.tipo_operacion}
                                            </div>
                                            <p class="card__text">${R.inmueble.tipo_inmueble} - ${R.inmueble.ciudad_inmueble} </p>
                                            <p class="card__text">${R.inmueble.valor_inmueble}</p>
                                            <a href="/propiedad/detalles/${R.fotos[0].inmueble_id}" class="btn btn--block card__btn">Mas Info</a>
                                        </div>
                                    </div>
                                </li>
                                `;

                // Agregar el bloque HTML al contenido del <ul>
                _cards.innerHTML += bloqueCARD

            })

            let hr = document.createElement('hr')
            resultados_por.appendChild(hr)

        } else {

            let h2Element = document.createElement('h2')
            h2Element.textContent = 'Sin Resultados de la Búsqueda'
            h2Element.style.marginLeft = '8%'
            resultados_por.appendChild(h2Element)
        }
    })
}

/*                      script detalles de inmuebles y MAPA                 */

let loadingSpinner = document.getElementById("loading-spinner")
let overlay = document.getElementById("overlay")

let miUbi = L.icon({
    iconUrl: 'https://png.pngtree.com/png-vector/20230130/ourmid/pngtree-location-home-icon-pin-deal-clipart-png-image_6575743.png',

    iconSize: [44, 46], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 44], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
})

if (typeof inmueble_html !== "undefined") {
    console.log('Detalles')

    let contador = 0

    const carrusel = (contenedor) => {

        img = contenedor.querySelector('img')
        img.src = pictures[Math.floor(Math.random() * pictures.length)]

        contenedor.addEventListener('click', e => {

            let atras = contenedor.querySelector('.atras'),
                adelante = contenedor.querySelector('.adelante'),
                tgt = e.target //Identificar elemento que hace click
            console.log(tgt)

            if (tgt == atras) {
                if (contador > 0) {
                    img.src = pictures[contador - 1]
                    contador--
                } else {
                    img.src = pictures[pictures.length - 1]
                    contador = pictures.length - 1
                }

            } else if (tgt == adelante) {
                if (contador < pictures.length - 1) {
                    img.src = pictures[contador + 1]
                    contador++
                } else {
                    img.src = pictures[0]
                    contador = 0
                }
            }

        })
    }

    document.addEventListener("DOMContentLoaded", () => {
        /* let contenedor = document.querySelector('.carrusel')
        contenedor ? carrusel(contenedor) : null */

        document.getElementById('next').onclick = () => {
            let lists = document.querySelectorAll('.itemCarrusel');
            document.getElementById('slide').appendChild(lists[0]);
        }
        /* document.getElementById('prev').onclick = () => {
            let lists = document.querySelectorAll('.itemCarrusel');
            document.getElementById('slide').prepend(lists[lists.length - 1]);
        } */

        /* codigo del mapa */

        let direccionYciudad = direccion + ' ' + ciudad
        console.log(encodeURIComponent(direccionYciudad))

        // Utiliza el servicio de geocodificación de OpenStreetMap (Nominatim)
        fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(direccionYciudad))
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {

                    let map = L.map('map').setView([data[0].lat, data[0].lon], 14) // Inicializa el mapa en un punto central

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map)

                    let lat = data[0].lat
                    let lon = data[0].lon
                    map.setView([lat, lon], 14)
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(direccion)
                        .openPopup()
                } else {

                    let l1 = -27.15982337628752
                    let l2 = -48.5075014570202

                    let map = L.map('map').setView([l1, l2], 10) // Inicializa el mapa en un punto central por defecto

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map)
                }
            })
    })

} else if (typeof inmueble_Form !== "undefined") {
    console.log('FORM')

    document.getElementById('lat').value = -27.15982337628752
    document.getElementById('lon').value = -48.5075014570202

    /* document.addEventListener("DOMContentLoaded", () => {
        let contenedor = document.querySelector('.carrusel')
        contenedor ? carrusel(contenedor) : null

        codigo del mapa

        const locationInfo = document.getElementById("location-info")
        loadingSpinner ? loadingSpinner.style.display = "block" : null

        if ("geolocation" in navigator) {
            console.log('Geolocalización OK')

            new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                })
                .then((position) => {
                    loadingSpinner.style.display = "none"

                    let l1 = position.coords.latitude
                    let l2 = position.coords.longitude

                    let map = L.map('map').setView([l1, l2], 16) 

                    let marker = L.marker([l1, l2], {
                        icon: miUbi
                    }).addTo(map) 
                    marker.bindPopup('Aqui!', {
                        offset: [3, 45]
                    })
                    marker.on('click', () => {
                        this.openPopup()
                    })

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map)

                    let lat = document.getElementById('lat')
                    let lon = document.getElementById('lon')
                    let marca = null

                    map.on('click', (e) => {
                        let popup = L.popup({
                                offset: [0, -20]
                            })
                            .setLatLng([e.latlng.lat, e.latlng.lng])
                            .setContent('<p>Seleccionaste<br />esta Propiedad!</p>')
                            .openOn(map)

                        marca ? map.removeLayer(marca) : null

                        marca = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)

                        lat.value = e.latlng.lat
                        lon.value = e.latlng.lng

                        console.log(e.latlng)
                    })

                })
                .catch((e) => {
                    loadingSpinner.style.display = "none"
                    console.log(`Error al obtener la ubicación: ${e}`)
                })

        } else {
            loadingSpinner.style.display = "none"
            locationInfo.innerHTML = "Geolocalización no está disponible en este navegador."
            console.log('Error en Geolocalización')
        }
    }) */

}

/* SEND E-MAIL */

const btn_msg = document.getElementById('btn_msg')
const formulario_msg = document.getElementById('formulario_msg')
const email = document.getElementById('email')
const tel = document.getElementById('tel')
const nombre = document.getElementById('nombre')
const mensaje = document.getElementById('mensaje')

btn_msg.addEventListener("click", (e) => {
    e.preventDefault()

    const _alerta = (texto) => {
        Swal.fire({
            icon: 'error',
            title: 'Alerta',
            text: `${texto}`
        })
    }

    if (nombre.value == "") {
        _alerta('Ingresa tu Nombre')
        return
    }
    if (email.value == "") {
        _alerta('Ingresa tu E-mail')
        return
    }
    if (tel.value == "") {
        _alerta('Ingresa tu Telefono')
        return
    }

    if (mensaje.value == "") {
        _alerta('Ingresa tu Mensaje')
        return
    }

    // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...

    // Obtener el token CSRF del formulario
    let csrfToken = $("input[name='csrfmiddlewaretoken']").val()
    if (!csrfToken) {
        console.log("No se pudo obtener el token CSRF.")
        return
    }

    // Agregar el token CSRF a los datos de la solicitud
    let formData = ''
    formData += "&csrfmiddlewaretoken=" + csrfToken + "&nombre=" + nombre.value + "&email=" + email.value + "&tel=" + tel.value + "&mensaje=" + mensaje.value

    $.ajax({
        type: "POST",
        url: "/msg",
        data: formData,
        success: (res) => {
            // Limpiar los campos del formulario
            $("#nombre").val("")
            $("#tel").val("")
            $("#email").val("")
            $("#mensaje").val("")
            console.log(res)
            _alerta("E-mail de contato enviado com sucesso!")
        },
        error: (res) => {
            console.log(res)
            _alerta("¡Ocorreu um erro ao enviar o e-mail de contato!")
        }
    })
})

let contactar = document.getElementById("contactar")

if (contactar) {
    contactar.addEventListener("click", () => {
        let cod_ref = document.getElementById("cod_ref").value
        let mensaje = document.getElementById("mensaje")
        let msg_contactar = `Desejo mais informações sobre o imóvel: ${cod_ref}.`
        mensaje.value = msg_contactar

        document.getElementById('ir_a_msg').scrollIntoView({
            behavior: 'smooth'
        })
    })
}

/* 
    ** ** ** ** ** ** ** ** ** ** * LOGIN MODAL ** ** ** ** ** ** ** ** ** ** *

 */

/* HASH PASS */
let btn_login = document.getElementById("btn_login")
let form_login = document.getElementById("form_login")

btn_login.addEventListener("click", (e) => {
  e.preventDefault()
  
  let password = document.getElementById("password").value
  let username = document.getElementById("username").value

  if (username != '' || password != '') {
    
    const hashHex_password = sha3_256(password)
    document.getElementById('password').value = hashHex_password
    
  } else {
    $('#error_log').text('Usuário ou senha incorretos')
    return
  }
  
  // SI ESTA TODO BIEN SE ENVIA EL FORMULARIO...
  form_login.submit()
  
})

/* RESET PASSWORD */
let btn_reset = document.getElementById("btn_reset")
let btn_noreset = document.getElementById("btn_noreset")
let sec_login = document.getElementById("sec_login")
let sec_reset = document.getElementById("sec_reset")
let btn_login_re = document.getElementById("btn_login_re")

btn_reset.addEventListener("click", () => {
    sec_login.classList.toggle("oculto")
    sec_reset.classList.toggle("oculto")
})

btn_noreset.addEventListener("click", () => {
    sec_login.classList.toggle("oculto")
    sec_reset.classList.toggle("oculto")
})

btn_login_re.addEventListener("click", () => {


    let csrfToken = $('#form_login [name=csrfmiddlewaretoken]').val()
    let username_re = $('#username_re').val()
    let email_re = $("#email_re").val()
    let password_re = $("#password_re").val()
    let RePassword_re = $("#RePassword_re").val()
    
    
    if (password_re == RePassword_re || username_re != '' || email_re != '') {
        
        console.log(username_re, email_re, password_re)
        const hashHex_password_re = sha3_256(password_re)
        $("#password_re").val(hashHex_password_re) 
        $("#RePassword_re").val(hashHex_password_re)

        $.ajax({
            url: '/reset_password',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': csrfToken
            },
            data: JSON.stringify({
                'username': username_re,
                'email': email_re,
                'password': hashHex_password_re
            }),
            success: (data) => {
                console.log(data)
                $('#info_reset').text(data.message)
                $('#error_reset').text(data.error)
            },
            error: (xhr, status, error) => {
                console.log(xhr.responseJSON.error)
                let errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'Error desconhecido'
                $('#error_reset').text('Error: ' + errorMessage)
            }
        })
    } else {
        alert('Error')
        $('#error_reset').text('Usuário ou senha incorretos')
    }
})