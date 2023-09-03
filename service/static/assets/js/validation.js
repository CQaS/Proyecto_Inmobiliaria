const formulario=document.getElementById('formulario');
const c_name=document.getElementById('nom_cliente').value;
const send=document.getElementById('send');
const c_direccion=document.getElementById('dir_cliente').value;
const c_dni=document.getElementById('dni_cliente').value;

pattern_Nombre = '^[A-Z]*[a-z]{2,}[a-zA-Z ]*$'
pattern_Direccion = '^[A-Z][a-zA-Z0-9 ]*$'
pattern_soloNumeros = '^[0-9][0-9]*$'
pattern_soloLetras = '^[A-Z][a-zA-Z ]*$'

send.addEventListener("click", (e) => {
    e.preventDefault()
    if (c_name.match(pattern_Nombre) && c_name.lenght == 0 && c_direccion.match(pattern_Direccion) && c_direccion.lenght == 0){
        Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe comenzar con Mayúscula'
                });
    }else{
        Swal.fire({
            icon: 'success',
            title: 'OK',
            text: 'Bien!!!!'
            });
    }
})


