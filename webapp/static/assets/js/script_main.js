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
    let por_operacion = document.getElementById("por_operacion")
    let por_propiedad = document.getElementById("por_propiedad")
    tipo_o = por_operacion.options[por_operacion.selectedIndex].value
    tipo_p = por_propiedad.options[por_propiedad.selectedIndex].value

    let resultados_por = document.getElementById('resultados_por')
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
            resultados_por.appendChild(ulElement);

            let _cards = document.querySelector('.cards');

            $.each(res, (i, R) => {
                console.log(R)

                // HTML con el bloque completo a agregar
                var bloqueCARD = `
                                <li class="cards__item">
                                    <div class="card">
                                        <div class="card__image" style="background-image: url(https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80);"></div>
                                        <div class="card__content">
                                            <div class="card__title">
                                                ${R.fields.dir_inmueble} - ${R.fields.tipo_operacion}
                                            </div>
                                            <p class="card__text">${R.fields.tipo_inmueble} - ${R.fields.ciudad_inmueble} </p>
                                            <p class="card__text">${R.fields.valor_inmueble}</p>
                                            <a href="/propiedad/detalles/${R.pk}" class="btn btn--block card__btn">Mas Info</a>
                                        </div>
                                    </div>
                                </li>
                                `;

                // Agregar el bloque HTML al contenido del <ul>
                _cards.innerHTML += bloqueCARD;

            })
        }
    })
})