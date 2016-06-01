/*
   Esto en realidad es una api que se conecta con el servidor a pedirle
   datos a la verdadera BD usando una interfaz REST.
*/

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
         USUARIOS: 'usuarios',
         PROMOCIONES: 'promociones'
      },
      sexo: {
         MASCULINO: 'Masculino',
         FEMENINO: 'Femenino'
      }
   }
   this.tablas = [
      {
         nombreTabla: bd.constantes.TABLAS.USUARIOS,
         //La ubicacion en las visitas ver qué onda....
         //El place id lo puse por si se quieren detalles
         
         datos: [{
            id: "1121",
            nombre: "Leandro",
            sexo: bd.constantes.sexo.MASCULINO,
            fechaN: '11/04/1993',
            urlImagenDePerfil:"",
            ultimaUbicacionConocida: {
               //Santiago y muñecas
               fecha: "05/31/2016 11:15:04",
               latitud: -26.823910,
               longitud: -65.204414
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
                  "05/20/2016 22:23:34"
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
                     latitud: "23.56589209",
                     longitud: "54.12198742"
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
                     latitud: "23.56589209",
                     longitud: "54.12198742"
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
                     latitud: "23.56589209",
                     longitud: "54.12198742"
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
                     latitud: "23.56589209",
                     longitud: "54.12198742"
                  }
               }
            }],
            lugaresConMeGusta: [
               NEGOCIOS.EL_BALON, NEGOCIOS.ATLAS, NEGOCIOS.MIL99
            ]
         }]
      },{
         nombreTabla: bd.constantes.TABLAS.PROMOCIONES,
         datos: [{
            lugar: {
               place_id: '734634',
               nombre: NEGOCIOS.BURGER_KING
            },
            ofertas: [{
               titulo: "Combo Stacker",
               descripcion: "Combo Stacker de 20 hamburguesas a $300"
            },{
               titulo: "Rockles",
               descripcion:"Helado Rockles a $45"
            }]
         },{
            lugar: {
               place_id: '623526',
               nombre: NEGOCIOS.LA_PIZZADA
            },
            ofertas: [{
               titulo: "Promo Pizzas Locas",
               descripcion: "Comprando 3 pizzas Especiales pagas solo 2"
            }]
         },{
            lugar: {
               place_id: '389274',
               nombre: NEGOCIOS.MCDONALD
            },
            ofertas: [{
               titulo: "Promo Big Mac",
               descripcion: "Combo Big Mac con queso a $120"
            },{
               titulo: "McFlurry",
               descripcion: "Descuento de 25% con la compra de un combo Cuarto de Libra"
            }]
         },{
            lugar: {
               place_id: '287456',
               nombre: NEGOCIOS.MIL99
            },
            ofertas: [{
               titulo: "Menu del Dia",
               descripcion: "Menu del dia $45"
            },{
               titulo: "Licuado",
               descripcion: "Licuado con tostado $30"
            }]
         },{
            lugar: {
               place_id: '345786',
               nombre: NEGOCIOS.EL_BALON
            },
            ofertas: [{
               titulo: "Milanesa a Caballo",
               descripcion: "Milanesa a Caballo para dos personas con gaseosa de litro a $150"
            },{
               titulo: "Pizza",
               descripcion: "Pizza de Fruta Wumpa de 6 porciones a $70"
            }]
         },{
            lugar: {
               place_id: '567895',
               nombre: NEGOCIOS.CARREFOUR
            },
            ofertas: []
         },{
            lugar: {
               place_id: '287964',
               nombre: NEGOCIOS.VEA
            },
            ofertas: [{
               titulo: "Turrón navideño",
               descripcion: "Turrón navideño a 75% de descuento"
            },{
               titulo: "Arma tu fiesta",
               descripcion: "Comprando 2 paquetes de hamburguesas patty te llevas un paquete de 4 panes gratis" 
            }]
         },{
            lugar: {
               place_id: '867456',
               nombre: NEGOCIOS.ATLAS
            },
            ofertas: [{
               titulo: "Jueves-Viernes-Sabado-Domingo-Lunes y Martes",
               descripcion: " 2D: 2 x $ 160 / 3D: 2 x $ 180"
            },{
               titulo: "Miercoles",
               descripcion: "2D: $ 45 / 3D: $ 50"
            }]
         },{
            lugar: {
               place_id: '155358',
               nombre: NEGOCIOS.EL_ATENEO
            },
            ofertas: [{
               titulo: "Promociones",
               descripcion: "%20 de Descuento en la compra de toda la Saga Canción de Hielo y Fuego"
            }]
         },{
            lugar: {
               place_id: '419783',
               nombre: NEGOCIOS.LANCASTER
            },
            ofertas: [{
               titulo: "Promo",
               descripcion: "Si traes una amiga pasas gratis"
            }]
         },{
            lugar: {
               place_id: '347346',
               nombre: NEGOCIOS.RECORCHOLIS
            },
            ofertas: [{
               titulo: "4x1 en bebidas", 
               descripcion:"Este viernes 4x1 en bebidas hasta 2 am"
            },{
               titulo: "Listas", 
               descripcion:"Listas Free"
            },{
               titulo: "Cumpleaños", 
               descripcion: "Festeja tu cumpleaños. Lista y Champagne"
            }]
         }]
      },{
         nombreTabla: '',
         datos: []
      }
   ];
};

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
BaseDeDatos.prototype.getFiltro = function(filtro) {
   var columnasFiltro = [];
   if (existeLaVariable(filtro, true)) {
      columnasFiltro = arrayCombinarElementosUnicos(filtro, nombreColumna);
   }
   return columnasFiltro;
};
BaseDeDatos.prototype.getFila = function(nombreTabla, nombreColumna, valor, callback, arrayColumnas) {
   this.getTabla(nombreTabla, function(datosTabla) {
      if (arrayConElementos(datosTabla)) {
         datosTabla.some(function(fila) {
            var campo = fila[nombreColumna];
            if (existeLaVariable(campo) && existeLaVariable(valor, true)) {
               if (campo == valor) {
                  callback(fila);
                  return true;
               } else if (esUnObjeto(campo) && sonObjetosIguales(campo, valor)) {
                  //Este if es una COCHINADA pero ya exagerado.
                  callback(fila);
                  return true
               }
            }
         });
      }
   }, this.getFiltro(arrayColumnas));
}
//Me dio paja terminarlo porque no lo necesitaba ahora
BaseDeDatos.prototype.getFilas = function(nombreTabla, restricciones, valores, callback, arrayColumnas) {
   this.getTabla(nombreTabla, function(datosTabla) {
      if (arrayConElementos(datosTabla)) {
         datosTabla.forEach(function(fila) {

         });
      }
   }, this.getFiltro(arrayColumnas));
};


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