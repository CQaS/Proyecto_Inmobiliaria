let arrow = document.querySelectorAll(".arrow")
for (var i = 0; i < arrow.length; i++) {
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

let propiedad_por_tipo = document.getElementById("propiedad_por_tipo")

propiedad_por_tipo.addEventListener("click", () => {

    if (propiedad_por_tipo) {
        // Verifica si el elemento <section> existe

        // Verifica si el elemento <section> tiene hijos
        if (propiedad_por_tipo.hasChildNodes()) {
            // Obtén una lista de todas las etiquetas dentro del elemento <section>
            let etiquetas = propiedad_por_tipo.getElementsByTagName("*");
            console.log(etiquetas);

            // Itera a través de la lista de etiquetas y elimínalas una por una
            for (let i = etiquetas.length - 1; i >= 0; i--) {
                propiedad_por_tipo.removeChild(etiquetas[i]);
            }
        }
    }

    let por_operacion = document.getElementById("por_operacion")
    let por_propiedad = document.getElementById("por_propiedad")
    tipo_o = por_operacion.options[por_operacion.selectedIndex].value
    tipo_p = por_propiedad.options[por_propiedad.selectedIndex].value

    let resultados_por = document.getElementById('resultados_por')
    let url = `/propiedad/propiedad_por_tipo/${tipo_o}/${tipo_p}`

    $.get(url).done((res) => {

        if (res !== undefined && res !== null && res.length) {

            let h2Element = document.createElement('h2')
            h2Element.textContent = 'Resultados de la Búsqueda'
            resultados_por.appendChild(h2Element)

            // Crear un elemento <ul>
            let ulElement = document.createElement('ul')
            ulElement.className = 'cards'
            resultados_por.appendChild(ulElement);

            let _cards = document.querySelector('.cards');

            $.each(res, (i, R) => {
                console.log(R.fotos[0])
                let url = R.fotos[0].image.replace('webapp/', '')

                // HTML con el bloque completo a agregar
                var bloqueCARD = `
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
                _cards.innerHTML += bloqueCARD;

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