//Menu de index//
let arrow = document.querySelectorAll(".arrow")
for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement //selecting main parent of arrow
        arrowParent.classList.toggle("showMenu")
    })
}

let sidebar = document.querySelector(".sidebar")
let sidebarBtn = document.querySelector(".bx-menu")
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close1")
})

//////////////

//Search de busqueda //
let propiedad_por_tipo = document.getElementById("propiedad_por_tipo")
let resultados_por = document.getElementById('resultados_por')

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