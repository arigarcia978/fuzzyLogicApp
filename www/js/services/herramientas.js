var global;

function objetoVacio(objeto) {

   if (objeto == null) {
      return true;
   }

   if (objeto instanceof Array && objeto.length > 0) {
      return arrayVacio(objeto, true);
   }

   if (objeto.length === 0) {
      return true;
   }

   for (var clave in objeto) {
      if (hasOwnProperty.call(objeto, clave)) {
         return false;
      }
   }

   if (Object.getOwnPropertyNames(objeto).length > 0) {
      return false;
   }

   return true;
}

function arrayVacio(array, controlarContenido) {
   if (array.length === 0) {
      return true;
   }

   if (controlarContenido) {
      return array.every(function(elemento) {
         return (objetoVacio(elemento));
      });
   }

   return false;
}

function arrayConElementos(array, controlarContenido) {
   return (controlarContenido) ? !arrayVacio(array, true) : !arrayVacio(array);
}

function arrayConUnicoElemento(array) {
   return (array.length === 1);
}

function arrayAgregarElemento(array, elemento) {
   if (existeLaVariable(elemento)) array.push(elemento);
}

function arrayCombinarElementosUnicos(array1, array2) {
   return arrayBorrarElementosDuplicados(array1.concat(array2));
}

function arrayBorrarElementosDuplicados(array) {
   return Array.from(new Set(array));
}

function arrayGetUltimoElemento(array) {
   return arrayConElementos(array) ? array[array.length - 1] : undefined;
}

function arrayExisteElElemento(array, elemento) {
   return (array.indexOf(elemento) !== -1);
}

function arrayClonar(array) {
   return (esUnArray(array)) ? array.concat() : new Array(array);
}

function existeLaVariable(variable, controlarContenido) {
   return (controlarContenido) ? !objetoVacio(variable) : (variable !== undefined);
}
function esUnaInstancia(elemento, objeto) {
   return (elemento instanceof objeto);
}
function esUnArray(elemento) {
   return esUnaInstancia(elemento, Array);
}

function formatearFecha(fecha, tipo) {
   /* Me dio paja hacerlo bien, así que uso tipo
      0: 'MM/dd/yyyy hh:mm:ss' (Por defecto)
      1: 'M/d/yyyy   hh:mm:ss'
      2: 'M/d/yyyy   h:m:s'
      3: 'dd/MM/yyyy hh:mm:ss'
   */

   function agregarSufijoCero(n) {
      return (n < 10) ? ('0' + n) : n.toString();
   }

   function armarCompleto(d, m, a, h, mm, s) {
      return armaFecha(d, m, a) + ' ' + armaHora(h, mm, s);
   }

   function armaFecha(d, m, a) {
      return d + '/' + m + '/' + a;
   }

   function armaHora(h, m, s) {
      return h + ':' + m + ':' + s;
   }

   var dia = fecha.getDate();
   var mes = fecha.getMonth() + 1;     //Enero es 0
   var anio = fecha.getFullYear();
   var hora = fecha.getHours();
   var minutos = fecha.getMinutes();
   var segundos = fecha.getSeconds();

   switch (tipo) {
      case 1:
         return armarCompleto(mes, dia, anio, 
            agregarSufijoCero(hora), 
            agregarSufijoCero(minutos),
            agregarSufijoCero(segundos));
      case 2:
         return armarCompleto(mes, dia, anio, hora, minutos, segundos);
      case 3:
         return armarCompleto(
            agregarSufijoCero(dia), 
            agregarSufijoCero(mes), 
            anio,
            agregarSufijoCero(hora),
            agregarSufijoCero(minutos),
            agregarSufijoCero(segundos));
      default:
         return armarCompleto(
            agregarSufijoCero(mes), 
            agregarSufijoCero(dia), 
            anio,
            agregarSufijoCero(hora),
            agregarSufijoCero(minutos),
            agregarSufijoCero(segundos));
   }

}
