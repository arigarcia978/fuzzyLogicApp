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

function BaseDeDatosDeUsuarios() {
   this.Usuarios = [
      {id: "123", nombre: "Leandro", sexo: SEXO.MASCULINO, src:"", fechaN: '11/27/1992', visitasUltimoMes: {}, visitasSemanales: {}, lugaresConMeGusta: []}, 
      {id: "212", nombre: "Ariana", sexo: SEXO.FEMENINO, src:"", fechaN: '12/07/1993', visitasUltimoMes: {}, visitasSemanales: {}, lugaresConMeGusta: []}
   ];

   this.Usuarios[0].visitasUltimoMes[NEGOCIOS.RECORCHOLIS] = 14;
   this.Usuarios[0].visitasUltimoMes[NEGOCIOS.BURGER_KING] = 3;
   this.Usuarios[0].visitasUltimoMes[NEGOCIOS.MCDONALD] = 2;
   this.Usuarios[1].visitasUltimoMes[NEGOCIOS.LA_PIZZADA] = 4;
   this.Usuarios[1].visitasUltimoMes[NEGOCIOS.EL_ATENEO] = 7;

   this.Usuarios[0].visitasSemanales[NEGOCIOS.VEA] = 1;
   this.Usuarios[0].visitasSemanales[NEGOCIOS.CARREFOUR] = 2;
   this.Usuarios[1].visitasSemanales[NEGOCIOS.CARREFOUR] = 5;

   this.Usuarios[0].lugaresConMeGusta = [NEGOCIOS.RECORCHOLIS, NEGOCIOS.MCDONALD, NEGOCIOS.BURGER_KING];
   this.Usuarios[1].lugaresConMeGusta = [NEGOCIOS.LA_PIZZADA, NEGOCIOS.VEA, NEGOCIOS.CARREFOUR];
}
BaseDeDatosDeUsuarios.prototype.getTodosLosUsuarios = function() {
   return this.Usuarios;
}
BaseDeDatosDeUsuarios.prototype.getUsuarioPorId = function(id) {
   for (var i = 0; i < this.getTodosLosUsuarios().length; i++) {
      if (this.getTodosLosUsuarios()[i].id == id) {
         return this.getTodosLosUsuarios()[i];
      }
   }
}
BaseDeDatosDeUsuarios.prototype.getLugaresConMeGusta = function(id){
   for (var i = 0; i < this.Usuarios.length; i++) {
      if(this.Usuarios[i].id == id){
         return this.Usuarios[i].lugaresConMeGusta;
      }
   }
}
*/