function loadGoogleTranslate()

{

  new google.translate.TranslateElement("myid")

}

// Función para cargar el widget de Google Translate
function loadGoogleTranslate() {
  // Obtener el elemento select del widget
  var select = document.querySelector("#myid select");

  // Recuperar los últimos idiomas seleccionados del almacenamiento local
  var lastLanguages = JSON.parse(localStorage.getItem("lastLanguages")) || [];
  var defaultLanguage = "es"; // Establecer aquí el idioma predeterminado

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
    var selectedLanguage = select.value;

    // Recuperar los últimos idiomas seleccionados del almacenamiento local
    var lastLanguages = JSON.parse(localStorage.getItem("lastLanguages")) || [];

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

  console.log(username_re, email_re, password_re)


  if (password_re == RePassword_re || username_re != '' || email_re != '') {

    $.ajax({
      url: 'reset_password/',
      type: 'POST',
      contentType: 'application/json',
      headers: {
        'X-CSRFToken': csrfToken
      },
      data: JSON.stringify({
        'username': username_re,
        'email': email_re,
        'password': password_re
      }),
      success: (data) => {
        $('#info_reset').text(data.message)
        $('#error_reset').text(data.error)
      },
      error: (xhr, status, error) => {
        let errorMessage = xhr.responseJSON ? xhr.responseJSON.error : 'Error desconhecido'
        $('#error_reset').text('Error: ' + errorMessage)
      }
    })
  } else {
    $('#error_reset').text('Usuário ou senha incorretos')
  }
})