function loadGoogleTranslate()

{

  new google.translate.TranslateElement("myid")

}

// Función para cargar el widget de Google Translate
function loadGoogleTranslate() {
  // Obtener el elemento select del widget
  let select = document.querySelector("#myid select");

  // Recuperar los últimos idiomas seleccionados del almacenamiento local
  let lastLanguages = JSON.parse(localStorage.getItem("lastLanguages")) || [];
  let defaultLanguage = "es"; // Establecer aquí el idioma predeterminado

  // Establecer las opciones predeterminadas
  if (lastLanguages.length > 0) {
    select.value = lastLanguages[lastLanguages.length - 1];
  } else {
    select.value = defaultLanguage;
  }

  // Cargar el widget de Google Translate
  new google.translate.TranslateElement("myid", {
    // Configuración del widget
    includedLanguages: "es,en,fr", // Lista de idiomas permitidos separados por comas
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Diseño del widget
    autoDisplay: false, // No mostrar automáticamente el widget, lo controlaremos manualmente
  });

  // Escuchar el evento de cambio del idioma en el widget
  select.addEventListener("change", function () {
    // Obtener el valor del idioma seleccionado
    let selectedLanguage = select.value;

    // Recuperar los últimos idiomas seleccionados del almacenamiento local
    let lastLanguages = JSON.parse(localStorage.getItem("lastLanguages")) || [];

    // Verificar si el idioma ya está en la lista de últimos idiomas seleccionados
    if (lastLanguages.indexOf(selectedLanguage) === -1) {
      // Si no está en la lista, agregarlo al final de la lista
      lastLanguages.push(selectedLanguage);

      // Limitar la lista a los últimos 2 idiomas seleccionados
      if (lastLanguages.length > 2) {
        lastLanguages.shift(); // Eliminar el primer elemento
      }

      // Guardar los últimos idiomas seleccionados en el almacenamiento local
      localStorage.setItem("lastLanguages", JSON.stringify(lastLanguages));
    }

    // Establecer el idioma seleccionado como opción predeterminada
    select.value = selectedLanguage;
  });
}

const btn_foto = document.getElementById('btn_foto')
const btn_video = document.getElementById('btn_video')
const carrusel = document.getElementById('carrusel')
const video = document.getElementById('video');

if (btn_foto) {
  btn_foto.addEventListener("click", () => {
    console.log('btn_foto')
    mostrarElemento("carrusel");
    ocultarElemento("video");
  });
}

if (btn_video) {
  btn_video.addEventListener("click", () => {
    console.log('btn_video')
    mostrarElemento("video");
    ocultarElemento("carrusel");
  });
}

const mostrarElemento = (id) => {
  let elemento = document.getElementById(id);
  elemento.style.display = "";
}

const ocultarElemento = (id) => {
  let elemento = document.getElementById(id);
  elemento.style.display = "none";
}

let imgElement = document.querySelector('.carruselImagen')
let randomIndex = Math.floor(Math.random() * pictures.length)
imgElement.src = pictures[randomIndex]

let videoElement = document.querySelector('.carruselVideo')

if (videoSrc) {
  let sourceElement = document.createElement('source')
  sourceElement.src = videoSrc
  sourceElement.type = 'video/mp4'
  videoElement.innerHTML = ''
  videoElement.appendChild(sourceElement)
  videoElement.load()
  videoElement.play()
}

let contador = 0
const carrusel2 = (contenedor) => {
  contenedor.addEventListener('click', e => {
    let atras = contenedor.querySelector('.atras'),
      adelante = contenedor.querySelector('.adelante'),
      img = contenedor.querySelector('img'),
      tgt = e.target
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
  carrusel2(contenedor)
})


/* 

                            SCRIPT PARA ELIMINAR FOTOS POR INMUEBLE                             
                            
                            
*/

const confirmarEliminar = (element) => {

  let id_foto = element.id;
  console.log("ID:", id_foto);

  Swal.fire({
    title: '¿Tem certeza?',
    text: "Você não será capaz de reverter isso",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, remova-o',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    if (result.isConfirmed) {

      let url = `/propiedad/eliminarfotosporinmueble/${id_foto}`
      $.get(url).done((res) => {

        if (res.foto_eliminada) {
          // Si el usuario confirma, eliminamos la foto
          element.previousElementSibling.remove(); // Elimina la imagen anterior al botón
          element.remove(); // Elimina el botón
          Swal.fire(
            'Removido!',
            'Sua foto foi excluída.',
            'success'
          );

        } else {

          Swal.fire(
            'Error!',
            'Ocorreu um erro ao excluir a foto.',
            'error'
          )

        }

      })
    }
  });
}