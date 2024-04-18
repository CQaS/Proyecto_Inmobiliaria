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

btn_foto.addEventListener("click", () => {
  console.log('btn_foto')
  mostrarElemento("carrusel");
  ocultarElemento("video");
});

btn_video.addEventListener("click", () => {
  console.log('btn_video')
  mostrarElemento("video");
  ocultarElemento("carrusel");
});

const mostrarElemento = (id) => {
  let elemento = document.getElementById(id);
  elemento.style.display = "block";
}

const ocultarElemento = (id) => {
  let elemento = document.getElementById(id);
  elemento.style.display = "none";
}