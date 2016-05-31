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
   BURGER_KING: 'Burger King',
   LA_PIZZADA: 'La Pizzada',
   MCDONALD: 'Mc Donalds',
   MIL99: 'Mil99',
   EL_BALON: 'El Balón',
   CARREFOUR: 'Carrefour',
   VEA: 'Vea',
   ATLAS: 'Atlas',
   EL_ATENEO: 'El Ateneo',
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
         id: "123",
         nombre: "Leandro",
         sexo: bd.constantes.sexo.MASCULINO,
         fechaN: '11/27/1992',
         urlImagenDePerfil:"",
         ultimaUbicacionConocida: {
            fecha: "05/29/2016 07:03:01",
            latitud: -26.817087,
            longitud: -65.198544
         },
         visitas: [{
            historial: [
               "05/27/2016 21:37:09",
               "05/21/2016 22:43:51",
               "05/20/2016 23:12:24",
               "05/15/2016 02:37:06",
               "05/13/2016 22:44:31",
               "05/07/2016 23:52:17",
               "05/07/2016 01:04:47"
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.RECORCHOLIS,
               ubicacion: {
                  latitud: "23.56589209",
                  longitud: "54.12198742"
               }
            }
         },{
            historial: [
               "05/15/2016 22:37:25",
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.LA_PIZZADA,
               ubicacion: {
                  latitud: "23.56589209",
                  longitud: "54.12198742"
               }
            }
         }],
         lugaresConMeGusta: [
            NEGOCIOS.LA_PIZZADA, NEGOCIOS.VEA, NEGOCIOS.CARREFOUR
         ]
      },{
         id: "212",
         nombre: "Ariana",
         sexo: bd.constantes.sexo.FEMENINO,
         fechaN: '12/07/1993',
         urlImagenDePerfil:"",
         ultimaUbicacionConocida: {
            fecha: '05/28/2016',
            latitud: -26.822861,
            longitud: -65.199878
         },
         visitas: [{
            historial: [
               "05/28/2016 21:36:03",
               "05/20/2016 23:12:28",
               "05/13/2016 23:15:13",
               "05/04/2016 20:42:46"
            ],
            lugar: {
               place_id: '',
               nombre: NEGOCIOS.MCDONALD,
               ubicacion: {
                  latitud: "23.56589209",
                  longitud: "54.12198742"
               }
            }
         }],
         lugaresConMeGusta: [
            NEGOCIOS.RECORCHOLIS, NEGOCIOS.MCDONALD, NEGOCIOS.BURGER_KING
         ]
      }]
   },{
      nombreTabla: 'Pensar uno',
      datos: {}
   }];
}
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