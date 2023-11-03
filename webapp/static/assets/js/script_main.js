//Menu de index//
let arrow = document.querySelectorAll(".arrow")
for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement //selecting main parent of arrow
        arrowParent.classList.toggle("showMenu")
    })
}

const pattern_letras_espacios = /^[A-Z][a-zA-ZñÑáÁéÉíÍúÚóÓ ]*$/
const pattern_letras_numero_espacios = /^[a-zA-ZñÑáÁéÉíÍúÚóÓ0-9 ]*$/
const pattern_solo_numeros = /^[0-9][0-9]*$/
const pattern_mail_m = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

let sidebar = document.querySelector(".sidebar")
let sidebarBtn = document.querySelector(".bx-menu")
let cards = document.querySelector(".cards")
let _container = document.querySelector("._container")
let box = document.querySelector(".box")
let tabla = document.querySelector(".tabla")
let _resultados_por = document.getElementById("resultados_por")
let copyrightText = document.querySelector(".copyrightText")
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close1")
    cards ? cards.classList.toggle("cards1") : null
    _container ? _container.classList.toggle("_container1") : null
    box ? box.classList.toggle("box1") : null
    tabla ? tabla.classList.toggle("tabla1") : null
    copyrightText ? copyrightText.classList.toggle("copyrightText1") : null
    _resultados_por ? _resultados_por.classList.toggle("cards1") : null
})

//////////////

//Search de busqueda //
let propiedad_por_tipo = document.getElementById("propiedad_por_tipo")
let resultados_por = document.getElementById('resultados_por')
if (propiedad_por_tipo) {
    propiedad_por_tipo.addEventListener("click", () => {

        let h2 = resultados_por.querySelector("h2")
        h2 ? resultados_por.removeChild(h2) : null

        let ul = resultados_por.querySelector("ul")
        ul ? resultados_por.removeChild(ul) : null

        let por_operacion = document.getElementById("por_operacion")
        let por_propiedad = document.getElementById("por_propiedad")
        tipo_o = por_operacion.options[por_operacion.selectedIndex].value
        tipo_p = por_propiedad.options[por_propiedad.selectedIndex].value

        let url = `/propiedad/propiedad_por_tipo/${tipo_o}/${tipo_p}`

        $.get(url).done((res) => {
            console.log(res)

            if (res !== undefined && res !== null && res.length) {

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
                resultados_por.appendChild(h2Element)
            }
        })
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

    //Arreglo de imagenes
    let pictures = [
        '/static/assets/img/prueba01.jpg',
        '/static/assets/img/prueba02.jpg',
        '/static/assets/img/prueba03.jpg',
        '/static/assets/img/prueba04.jpg',
        '/static/assets/img/prueba05.jpg',
        '/static/assets/img/prueba06.jpg',
        '/static/assets/img/prueba07.jpg'
    ]
    let contador = 0

    const carrusel = (contenedor) => {
        img = contenedor.querySelector('img')
        img.src = pictures[0]
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
        let contenedor = document.querySelector('.carrusel')
        contenedor ? carrusel(contenedor) : null

        /* codigo del mapa */

        let map = L.map('map').setView([l1, l2], 16) //centra el mapa
        //map.dragging.disable() //oculta la manito sobre el mapa

        let marker = L.marker([l1, l2], {
            icon: miUbi
        }).addTo(map) //agrega un marcador con mi ubicacion
        marker.bindPopup(d_InmuebleOnPin, {
            offset: [3, 45]
        })
        marker.on('click', () => {
            this.openPopup()
        })

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map)
    })

} else if (typeof inmueble_Form !== "undefined") {
    console.log('FORM')

    document.addEventListener("DOMContentLoaded", () => {
        let contenedor = document.querySelector('.carrusel')
        contenedor ? carrusel(contenedor) : null

        /* codigo del mapa */

        const locationInfo = document.getElementById("location-info")
        loadingSpinner ? loadingSpinner.style.display = "block" : null

        if ("geolocation" in navigator) {

            new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                })
                .then((position) => {
                    loadingSpinner.style.display = "none"

                    let l1 = position.coords.latitude
                    let l2 = position.coords.longitude

                    let map = L.map('map').setView([l1, l2], 16) //centra el mapa

                    let marker = L.marker([l1, l2], {
                        icon: miUbi
                    }).addTo(map) //agrega un marcador con mi ubicacion
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

                    /* let puntos = JSON.parse(document.getElementById('puntos_json').textContent)

                    puntos.forEach(P => {
                        L.marker([P.latitude, P.longitude]).addTo(map)
                    }) */

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

                    // Aquí puedes continuar con el código que depende de la ubicación
                })
                .catch((e) => {
                    loadingSpinner.style.display = "none"
                    console.log(`Error al obtener la ubicación: ${e}`)
                })

        } else {
            loadingSpinner.style.display = "none"
            locationInfo.innerHTML = "Geolocalización no está disponible en este navegador."
        }
    })

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
    formulario_msg.submit()
})