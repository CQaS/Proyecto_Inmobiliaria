//Recibos de empleados 

function generarRecibo() {
    //var fecha = document.getElementById('fecha').value;
   var nom_empleado = document.getElementById('nom_empleado').value;
   var codigo_referencia = document.getElementById('codigo_referencia').value;
   var concepto = document.getElementById('concepto').value;
   var cant_horas = parseFloat(document.getElementById('cant_horas').value);
   var monto_hora = parseFloat(document.getElementById('monto_hora').value);
   var monto_total = cant_horas * monto_hora;

   var fechaActual = new Date(); // Obtiene la fecha actual
   var fechaFormatted = fechaActual.toLocaleDateString(); // Formatea la fecha a string

   var reciboTexto = `
   Recibo de pagamento de Funcionário
                                                        Data: ${fechaFormatted}.
Recebi de ${nom_empleado} o valor total de $ ${monto_total.toFixed(2)} por ${concepto}.
Código de referência: ${codigo_referencia}
Número de horas:  ${cant_horas}
Valor por hora: $${monto_hora.toFixed(2)}
Valor Total: $${monto_total.toFixed(2)}

                                               María Eugenia Cáceres
                                               CRECI 1111
Obrigado pelo seu pagamento.
   `;

   document.getElementById('recibo').innerText = reciboTexto;
   document.getElementById('monto_total').value = monto_total.toFixed(2);

   // Generar y descargar archivo de texto
   descargarTexto(reciboTexto, 'recibo_pago.txt');

}

// Recibo para cliente
function generarRecibo() {
    var nom_cliente = document.getElementById('nom_cliente').value;
    var cod_referencia = document.getElementById('cod_referencia').value;
    var nombre_red = document.getElementById('nombre_red').value;
    var clave_Wifi = document.getElementById('clave_Wifi').value;
    var fecha_ing = document.getElementById('fecha_ing').value;
    var fecha_salida = document.getElementById('fecha_salida').value;
    var monto = document.getElementById('monto').value;

    var fechaActual = new Date(); // Obtiene la fecha actual
    var fechaFormatted = fechaActual.toLocaleDateString(); // Formatea la fecha a string

    var reciboTexto = `
    Recibo de pagamento
                                                                        Data: ${fechaFormatted}.

    Recebi de ${nom_cliente} o valor total de $${monto} para pagamento da sua estadia a partir de ${fecha_ing} até ${fecha_salida}.
    Código de referência: ${cod_referencia}
    Nome Rede: ${nombre_red}
    Senha WI-FI: ${clave_Wifi}


                                                    María Eugenia Cáceres
                                                    CRECI 1111
    Obrigado pelo seu pagamento.
    `;

    document.getElementById('recibo').innerText = reciboTexto;

    // Generar y descargar archivo de texto
    descargarTexto(reciboTexto, 'recibo_pago.txt');
}

// funcion para generar PDF     
function genPDF() {
var doc = new jsPDF(); // Crea un nuevo documento jsPDF

var textoRecibo = document.getElementById('recibo').innerText; // Obtén el texto del recibo

// Agrega el texto del recibo al documento
doc.text(20, 20, textoRecibo);

// Guarda el documento como un archivo PDF
doc.save('ReciboPago.pdf');
}
