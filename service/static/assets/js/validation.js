const $formulario=document.getElementById('formulario');
const $c_name=document.getElementById('c.name');

(function () {
    $formulario.addEventListener('submit', function(e) {
        let nombre=String($c_name.value).trim();
        if(nombre.lenght === 0) {
            alert("El NOMBRE DEL CLIENTE no puede ir vacio");
            e.preventDefault();
        }
        
    });
});
