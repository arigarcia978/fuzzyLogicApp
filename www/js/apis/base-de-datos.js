/*
   Esto en realidad es una api que se conecta con el servidor a pedirle
   datos a la verdadera BD usando una interfaz REST.
*/

/*
   Este objeto tiene que desaparecer. Los nombres acá son solo para 
   reducir un poco los errores en cuanto a los nombres. Pero los que
   enrealidad se usan en toda la aplicación son los que provienen de
   Google Places api.

   Por ahora lo dejo porque creo se está referenciando en varios lados.
*/
var NEGOCIOS = {
   BURGER_KING: 'BurgerKing',
   LA_PIZZADA: 'LaPizzada',
   MCDONALD: 'McDonalds',
   MIL99: 'Mil99',
   EL_BALON: 'ElBalón',
   CARREFOUR: 'Carrefour',
   VEA: 'Vea',
   ATLAS: 'Atlas',
   EL_ATENEO: 'ElAteneo',
   LANCASTER: 'Lancaster',
   RECORCHOLIS: 'Recorcholis'
}
/*
var baseDeDatos = {
   sexo: {
      MASCULINO: 'Masculino',
      FEMENINO: 'Femenino',
   },
   usuarios: {

   }
}

var SEXO = {
   MASCULINO: 'Masculino',
   FEMENINO: 'Femenino'
}
*/

function BaseDeDatos() {
   var bd = this;
   this.constantes = {
      TABLAS: {
         USUARIOS: 'usuarios'
      },
      sexo: {
         MASCULINO: 'Masculino',
         FEMENINO: 'Femenino'
      }
   }
   this.tablas = [{
      nombreTabla: bd.constantes.TABLAS.USUARIOS,
      //La ubicacion en las visitas ver qué onda....
      //El place id lo puse por si se quieren detalles
      
datos: [{
         id: "1121",
         nombre: "Matias",
         sexo: bd.constantes.sexo.MASCULINO,
         fechaN: '11/04/1993',
         urlImagenDePerfil:"",
         ultimaUbicacionConocida: {
            //24 de Septiembre y maipu
            fecha: "05/31/2016 11:15:04",
            latitud: -26.830420,
            longitud: -65.207850
         },
         visitas: [{
            historial: [
               "04/29/2016 23:59:09",
               "05/06/2016 22:43:51",
               "05/13/2016 23:12:24"
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.RECORCHOLIS,
               ubicacion: {
                  latitud: -26.813362,
                  longitud: -65.291265
               }
            }
         },{
            historial: [
               "05/15/2016 22:37:25",
               "05/20/2016 22:23:34"
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.LA_PIZZADA,
               ubicacion: {
                  latitud: -26.830821,
                  longitud: -65.204742
               }
            }
         }],
         lugaresConMeGusta: [
            NEGOCIOS.RECORCHOLIS, NEGOCIOS.VEA, NEGOCIOS.CARREFOUR
         ]
      },{
         id: "1122",
         nombre: "Ariana",
         sexo: bd.constantes.sexo.FEMENINO,
         fechaN: '12/07/1993',
         urlImagenDePerfil:"",
         ultimaUbicacionConocida: {
            //San Juan y Virgen de la Merced
            fecha: "05/30/2016 16:30:00",
            latitud: -26.826225,
            longitud: -65.200443
         },
         visitas: [{
            historial: [
               "04/09/2016 11:03:09",
               "04/13/2016 09:43:51",
               "04/15/2016 21:12:24",
               "04/22/2016 20:21:24"
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.CARREFOUR,
               ubicacion: {
                  latitud: -26.814933,
                  longitud: -65.209499
               }
            }
         },{
            historial: [
               "05/12/2016 22:00:25",
               "05/19/2016 22:00:34",
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.ATLAS,
               ubicacion: {
                  latitud: -26.828476,
                  longitud: -65.199654
               }
            }
         }],
         lugaresConMeGusta: [
            NEGOCIOS.RECORCHOLIS, NEGOCIOS.MCDONALD, NEGOCIOS.BURGER_KING, NEGOCIOS.LA_PIZZADA
         ]
      },{
         id: "1123",
         nombre: "Franco",
         sexo: bd.constantes.sexo.MASCULINO,
         fechaN: '09/23/1992',
         urlImagenDePerfil:"",
         ultimaUbicacionConocida: {
            //Virgen de la Merced y Sarmiento.
            fecha: "05/29/2016 18:22:00",
            latitud: -26.819201, 
            longitud: -65.198844
         },
         visitas: [{
            historial: [
               "05/23/2016 12:30:09",
               "05/25/2016 13:43:51",
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.MIL99,
               ubicacion: {
                  latitud: -26.816691,
                  longitud: -65.197985
               }
            }
         },{
            historial: [
               "05/12/2016 22:00:25",
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.BURGER_KING,
               ubicacion: {
                  latitud: -26.824049,
                  longitud: -65.202997
               }
            }
         }],
         lugaresConMeGusta: [
            NEGOCIOS.EL_BALON, NEGOCIOS.ATLAS, NEGOCIOS.MIL99
         ]
      },{
      nombreTabla: 'Pensar uno',
      datos: {}
   }]}];}

BaseDeDatos.prototype.seleccionarColumnas = function(tabla, columnasASeleccionar) {
   var datos = tabla.map(function(fila) {
      var nuevaFila = {};
      columnasASeleccionar.forEach(function(columna) {
         var campo = fila[columna];
         if (existeLaVariable(campo)) {
            nuevaFila[columna] = campo;
         }
      });
      return nuevaFila
   });
   return arrayVacio(datos, true) ? [] : datos;
};
BaseDeDatos.prototype.getTabla = function(nombreTabla, callback, arrayColumnas) {
   var tablaCompleta = this.tablas.filter(function(tabla) {
      return tabla.nombreTabla === nombreTabla;
   });
   if (arrayConUnicoElemento(tablaCompleta)) {
      tablaCompleta = tablaCompleta[0].datos;
      if (esUnArray(arrayColumnas) && arrayConElementos(arrayColumnas, true)) {
         callback(this.seleccionarColumnas(
            tablaCompleta, 
            arrayBorrarElementosDuplicados(arrayColumnas)));
      } else {
         callback(tablaCompleta);
      }
   } else {
      callback([]);
   }
}
BaseDeDatos.prototype.getFila = function(nombreTabla, nombreColumna, valor, callback, arrayColumnas) {
   var columnasFiltro = [];
   if (existeLaVariable(arrayColumnas, true)) {
      columnasFiltro = arrayCombinarElementosUnicos(arrayColumnas, nombreColumna);
   }
   this.getTabla(nombreTabla, function(datosTabla) {
      if (arrayConElementos(datosTabla)) {
         datosTabla.some(function(fila) {
            var campo = fila[nombreColumna];
            if (existeLaVariable(campo) && existeLaVariable(valor, true)) {
               if (campo == valor) {
                  callback(fila);
                  return true;
               }
            }
         });
      }
   }, columnasFiltro);
}


/*
this.Usuarios[0].visitas.push(new Visita('05/28/2016',new Lugar([NEGOCIOS.MCDONALD],new Ubicacion("23.56347294", "54.12337982",'Restaurante de Comida Rápida'))));
this.Usuarios[0].visitas.push(new Visita('05/28/2016',new Lugar([NEGOCIOS.MCDONALD],new Ubicacion("23.56347294", "54.12337982",'Restaurante de Comida Rápida'))));
this.Usuarios[0].visitas.push(new Visita('05/28/2016',new Lugar([NEGOCIOS.MCDONALD],new Ubicacion("23.56347294", "54.12337982",'Restaurante de Comida Rápida'))));
this.Usuarios[0].visitas.push(new Visita('05/28/2016',new Lugar([NEGOCIOS.MCDONALD],new Ubicacion("23.56347294", "54.12337982",'Restaurante de Comida Rápida'))));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
this.Usuarios[1].visitas.push(new Visita('05/25/2016',new Lugar([NEGOCIOS.RECORCHOLIS],new Ubicacion("23.56589209", "54.12198742"),'Discoteca')));
*/