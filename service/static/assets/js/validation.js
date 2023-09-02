const $formulario=document.getElementById('formulario');
const $c_name=document.getElementById('nom_cliente');

pattern_Nombre = '^[A-Z]*[a-z]{2,}[a-zA-Z ]*$'
pattern_Direccion = '^[A-Z][a-zA-Z0-9 ]*$'
pattern_soloNumeros = '^[0-9][0-9]*$'
pattern_soloLetras = '^[A-Z][a-zA-Z ]*$'

(function () {
    console.log("estamos yendo")
    $formulario.addEventListener('submit', function(e) {
        let nombre=String($c_name.value).trim();
        if(nombre.lenght === 0) {
            alert("El NOMBRE DEL CLIENTE no puede ir vacio");
            e.preventDefault();
        }
        
    });
});
