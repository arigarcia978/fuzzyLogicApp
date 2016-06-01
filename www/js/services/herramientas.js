var global;

var log = {
   seEsperabaUn: function(obj, metodo, clase) {
      console.error('Se esperaba un objeto ' + obj + ' para el metodo ' + metodo + ' de la clase ' + clase);
   }
}

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
   var aux = [];
   for (var i = 0; i < array.length; i++) {
      var agregar = true;
      for (var j = 0; j < aux.length; j++){
         if (aux[j] === array[i]) {
            agregar = false;
            break;
         }
      }
      if (agregar) {
         aux.push(array[i]);
      }
   }
   return aux;
   //return Array.from(new Set(array));
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
function esUnArray(posibleArray) {
   return esUnaInstancia(posibleArray, Array);
}

//No usar esto a la ligera porque todo lo no primitivo es un objeto
function esUnObjeto(posibleObjeto) {
   return esUnaInstancia(posibleObjeto, Object);
}

function sonObjetosIguales(objeto1, objeto2, importaOrden) {
   if(!existeLaVariable(importaOrden)) {
      return (JSON.stringify(objeto1) === JSON.stringify(objeto2));
   }
}

/* No lo estoy usando
function convertirObjetoEnArray(objeto) {
   var array = [];
   for (var clave in objeto) {
   eval("array.push({"+clave+": objeto[clave]})");
   }
   return array;
}
*/


function esUnaFecha(posibleFecha) {
   return esUnaInstancia(posibleFecha, Date);
}

function formatearFecha(fecha, tipo) {
   /* Me dio paja hacerlo bien, así que uso tipo
      0: 'MM/dd/yyyy hh:mm:ss' (Por defecto)
      1: 'M/d/yyyy   hh:mm:ss'
      2: 'M/d/yyyy   h:m:s'
      3: 'dd/MM/yyyy hh:mm:ss'
      4: 'dd/MM/yyyy'
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
      case 4:
         return armaFecha(
            agregarSufijoCero(dia), 
            agregarSufijoCero(mes), 
            anio);
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
