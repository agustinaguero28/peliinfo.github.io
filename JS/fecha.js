 // Obtenemos la fecha actual
 var fecha = new Date();

 // Creamos un string con la fecha actual en el formato deseado
 var fechaActual = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

 // Mostramos la fecha actual en el elemento con el id "fecha"
 document.getElementById("fecha").innerHTML = fechaActual;