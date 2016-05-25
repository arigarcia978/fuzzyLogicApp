var SEXO = {
	MASCULINO: 'Masculino',
	FEMENINO: 'Femenino'
}

var variablesMotor = [
    'visitasMensualesAElBalón', 'visitasMensualesAMcDonalds', 'visitasMensualesABurgerKing',
    'visitasMensualesARecorcholis', 'visitasMensualesAMil99', 'visitasMensualesALancaster',
    'visitasMensualesAElAteneo', 'visitasSemanalesAVea', 'visitasSemanalesACarrefour',
    'ElBalónEsBarRestaurante', 'Mil99EsBarRestaurante', 'AtlasEsCine', 'LancasterEsBoliche',
    'McDonaldsEsComidaRapida', 'BurgerKingEsComidaRapida', 'RecorcholisEsBoliche',
    'estaCercaRecorcholis', 'estaCercaElBalón', 'estaCercaMil99', 'estaCercaMcDonalds',
    'estaCercaBurgerKing', 'estaCercaVea', 'estaCercaCarrefour', 'numeroDeLugaresQueLeGustanDeRestaurantes',
    'numeroDeLugaresQueLeGustanDeComidaRapida', 'numeroDeLugaresQueLeGustanDeBoliches',
    'ElBalónEsElBarRestauranteMasCercano', 'Mil99EsElBarRestauranteMasCercano','McDonaldsEsElComidaRapidaMasCercano',
    'BurgerKingEsElComidaRapidaMasCercano', 'AtlasEsElCineMasCercano', 'esViernes', 'esSabado',
    'esJueves', 'esMiercoles', 'edad', 'fechaActualDentroDelRangoDelCumpleaños', 'cantidadMeGustaEnLibros',
    'cantidadMeGustaEnMusicos', 'cantidadMeGustaEnSeries'
];


var NEGOCIOS = {
	MCDONALD: 'McDonalds',
	LA_PIZZADA: 'La Pizzada',
	BURGER_KING: 'Burger King',
	RECORCHOLIS: 'Recorcholis',
	EL_ATENEO: 'El Ateneo',
	EL_BALON: 'El Balón',
	MIL99: 'Mil99',
	ATLAS: 'Atlas',
	LANCASTER: 'Lancaster',
	VEA: 'Vea',
	CARREFOUR: 'Carrefour'
}

var EXTRAS = {
	HARRY_POTTER: 'Harry Potter'
}

var RUBROS = {
	RESTAURANTE: 'Restaurante',
	COMIDA_RAPIDA: 'ComidaRapida',
	SUPERMERCADO: 'Supermercado',
	LIBRERIA: 'Libreria',
	CINE: 'Cine',
	BOLICHE: 'Boliche'
}

matematica = new MotorMatematico(); //Global

var interfazDeUsuario = function() {

}

function BaseDeConocimiento() {

}

function MotorDeInferencias() {

}

function MotorMatematico() {

}
MotorMatematico.prototype.calcularEdad = function(fecha) {
	var edadEnMilisegundos = Date.now() - fecha.getTime();
	var edad = new Date(edadEnMilisegundos);
	return Math.abs(edad.getUTCFullYear() - 1970);
}
MotorMatematico.prototype.convertirKMaMetros = function(km) {
	return km * 1000;
}
MotorMatematico.prototype.calcularDistanciaEnKMEntreUbicaciones = function(ubicacion1, ubicacion2) {
	var radioDeLaTierraEnKM = 6371;
	var distanciaEntreLatitudes = this.gradosARadianes(ubicacion1.getLatitud() - ubicacion2.getLatitud());
	var distanciaEntreLongitudes = this.gradosARadianes(ubicacion1.getLongitud() - ubicacion2.getLongitud());

	var a = Math.sin(distanciaEntreLatitudes/2) * Math.sin(distanciaEntreLatitudes/2) + 
			Math.cos(this.gradosARadianes(ubicacion1.getLatitud())) * Math.cos(this.gradosARadianes(ubicacion2.getLatitud())) * 
			Math.sin(distanciaEntreLongitudes/2) * Math.sin(distanciaEntreLongitudes/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt( 1 - a ));
	return radioDeLaTierraEnKM * c;
}
MotorMatematico.prototype.gradosARadianes = function(grados) {
	return grados * (Math.PI/180);
}

function Ubicacion(latitud, longitud) {
	this.latitud = latitud;
	this.longitud = longitud;
}
Ubicacion.prototype.getLatitud = function() {
	return this.latitud;
}
Ubicacion.prototype.getLongitud = function() {
	return this.longitud;
}

function MeGustaEnFB(nombre, tipo) {
	this.nombre = nombre;
	this.tipo = tipo;
}
MeGustaEnFB.prototype.getNombre = function() {
	return this.nombre;
}
MeGustaEnFB.prototype.getTipo = function() {
	return this.tipo;
}

function Perfil(nombre, sexo, fechaNac, ubicacion) {
	this.id;
	var fechaDeNacimiento = new Date(fechaNac);
	this.nombre = nombre;
	this.fechaDeNacimiento = fechaDeNacimiento;
	this.edad = matematica.calcularEdad(fechaDeNacimiento);
	this.sexo = sexo;
	this.ubicacionActual = ubicacion;
	this.lugaresCercanosEnGMaps = [];
	this.meGustanEnFB = [];
	this.baseDeConocimiento = [];
}
Perfil.prototype.setId = function(id) {
	this.id = id;
}
Perfil.prototype.getNombre = function() {
	return this.nombre;
}
Perfil.prototype.getFechaDeNacimiento = function() {
	return this.fechaDeNacimiento;
}
Perfil.prototype.getEdad = function() {
	return this.edad;						//TODO: Calcular en base a la fechaNac
}
Perfil.prototype.getSexo = function() {
	return this.sexo;
}
Perfil.prototype.getUbicacionActual = function() {
	return this.ubicacionActual;
}
Perfil.prototype.setUbicacionActual = function(ubicacion) {
	if (ubicacion instanceof Ubicacion) {
		this.ubicacionActual = ubicacion;
	}
}
Perfil.prototype.agregarLugaresCercanos = function(lugares) {
	this.lugaresCercanosEnGMaps = lugares;
}
Perfil.prototype.getLugaresCercanos = function() {
	return this.lugaresCercanosEnGMaps;
}
Perfil.prototype.agregarMeGustaEnFB = function(meGusta) {
	if (meGusta instanceof MeGustaEnFB) {
		this.meGustanEnFB.push(meGusta);
	}
}
Perfil.prototype.agregarCosasQueLeGustanEnFB = function(lista) {
	for (var i = 0; i < lista.length; i++) {
		this.agregarMeGustaEnFB(lista[i]);
	}
}
Perfil.prototype.agregarBaseDeConocimiento = function(baseDeConocimiento) {
	this.baseDeConocimiento = baseDeConocimiento;
}
Perfil.prototype.getMeGustanEnFB = function() {
	return this.meGustanEnFB;
}



function AdaptadorFB() {
	this.BDPaginasTipo = {};
	this.BDPaginasTipo[NEGOCIOS.MCDONALD] = 'Hamburguesería';
	this.BDPaginasTipo[NEGOCIOS.LA_PIZZADA] = 'Restaurante';
	this.BDPaginasTipo[NEGOCIOS.BURGER_KING] = 'Comida Rápida';
	this.BDPaginasTipo[NEGOCIOS.RECORCHOLIS] = 'Club Nocturno';
	this.BDPaginasTipo[NEGOCIOS.EL_ATENEO] = 'Libreria';
	this.BDPaginasTipo[EXTRAS.HARRY_POTTER] = 'Libro';
	this.BDPaginasTipo[NEGOCIOS.EL_BALON] = 'Bar Restaurante';
	this.BDPaginasTipo[NEGOCIOS.MIL99] = 'Bar';
	this.BDPaginasTipo[NEGOCIOS.ATLAS] = 'Entretenimiento';
	this.BDPaginasTipo[NEGOCIOS.LANCASTER] = 'Club';
	this.BDPaginasTipo[NEGOCIOS.VEA] = 'Productos';
	this.BDPaginasTipo[NEGOCIOS.CARREFOUR] = 'Mercado';

	this.BDUsuarios = {
		"Leandro": [NEGOCIOS.RECORCHOLIS, NEGOCIOS.MCDONALD, NEGOCIOS.BURGER_KING],
		"Ariana": [NEGOCIOS.MCDONALD, NEGOCIOS.LA_PIZZADA, EXTRAS.HARRY_POTTER]
	}
}
AdaptadorFB.prototype.getMeGusta = function(id) {	//De id toy usando el nombre
	return this.BDUsuarios[id];
}
AdaptadorFB.prototype.getTipoPaginaMeGusta = function (nombrePagina) {
	return this.BDPaginasTipo[nombrePagina];
}
AdaptadorFB.prototype.getMeGustanEnFB = function(id) {	//idPerfilFace?
	var meGustan = this.getMeGusta(id); //id es nombre ahora
	var lugares = [];
	for (var i = 0; i < meGustan.length; i++) {
		var nombrePagina = meGustan[i];
		var tipoPagina = this.getTipoPaginaMeGusta(nombrePagina);

		lugares.push(new MeGustaEnFB(nombrePagina, tipoPagina));
	}
	return lugares;
}

function AdaptadorGoogleMaps() {
	this.BDLugares = {};
	this.BDLugares[NEGOCIOS.MCDONALD] = {
		tipoLugar: 'Restaurante de Comida Rápida',
		ubicacion: new Ubicacion("23.56347294", "54.12337982")
	}
	this.BDLugares[NEGOCIOS.LA_PIZZADA] = {
		tipoLugar: 'Pizzería',
		ubicacion: new Ubicacion("23.56417395", "54.12298572")
	}
	this.BDLugares[NEGOCIOS.BURGER_KING] = {
		tipoLugar: 'Comida Rápida',
		ubicacion: new Ubicacion("23.56353926", "54.12334275")
	}
	this.BDLugares[NEGOCIOS.RECORCHOLIS] = {
		tipoLugar: 'Discoteca',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
	this.BDLugares[NEGOCIOS.EL_BALON] = {
		tipoLugar: 'Bar restaurante',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
	this.BDLugares[NEGOCIOS.MIL99] = {
		tipoLugar: 'Bar restaurante',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
	this.BDLugares[NEGOCIOS.VEA] = {
		tipoLugar: 'Supermercado',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
	this.BDLugares[NEGOCIOS.LANCASTER] = {
		tipoLugar: 'Club nocturno',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
	this.BDLugares[NEGOCIOS.CARREFOUR] = {
		tipoLugar: 'Supermercado',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
	this.BDLugares[NEGOCIOS.ATLAS] = {
		tipoLugar: 'Cine',
		ubicacion: new Ubicacion("23.56589209", "54.12198742")
	}
}
AdaptadorGoogleMaps.prototype.getTipoLugar = function(nombreLugar) {
	return this.BDLugares[nombreLugar].tipoLugar;
}
AdaptadorGoogleMaps.prototype.buscarTodosLosNegociosCercanos = function(ubicacion) {
	var medioLadoCuadradoDentroDeRadio150m = 0.001;
	var medioLadoCuadradoDentroDeRadio400m = 0.0025;

	var extremoLatitudMayor = parseFloat(ubicacion.getLatitud()) + medioLadoCuadradoDentroDeRadio150m;
	var extremoLatitudMenor = ubicacion.getLatitud() - medioLadoCuadradoDentroDeRadio150m;
	var extremoLongitudMayor = parseFloat(ubicacion.getLongitud()) + medioLadoCuadradoDentroDeRadio150m;
	var extremoLongitudMenor = ubicacion.getLongitud() - medioLadoCuadradoDentroDeRadio150m;

	var negociosCercanos = [];

	for (lugar in this.BDLugares) {
		var lt = this.BDLugares[lugar].ubicacion.getLatitud();
		var ln = this.BDLugares[lugar].ubicacion.getLongitud();
		var ltM = extremoLatitudMayor;
		var ltm = extremoLatitudMenor;
		var lnM = extremoLongitudMayor;
		var lnm = extremoLongitudMenor;

		if (lt <= ltM && lt >= ltm && ln <= lnM && ln >= lnm) {
			//lugar cercano
			negociosCercanos.push(lugar);
		}
	}
	return negociosCercanos;
}

function BaseDeDatosDeUsuarios() {
	this.Usuarios = [
		{id: "123", nombre: "Leandro", sexo: SEXO.MASCULINO, src:"", fechaN: '11/27/1992', visitasUltimoMes: {}, visitasSemanales: {}}, 
		{id: "212", nombre: "Ariana", sexo: SEXO.FEMENINO, src:"", fechaN: '12/07/1993', visitasUltimoMes: {}, visitasSemanales: {}}
	];

	this.Usuarios[0].visitasUltimoMes[NEGOCIOS.RECORCHOLIS] = 14;
	this.Usuarios[0].visitasUltimoMes[NEGOCIOS.BURGER_KING] = 3;
	this.Usuarios[0].visitasUltimoMes[NEGOCIOS.MCDONALD] = 2;
	this.Usuarios[1].visitasUltimoMes[NEGOCIOS.LA_PIZZADA] = 4;
	this.Usuarios[1].visitasUltimoMes[NEGOCIOS.EL_ATENEO] = 7;

	this.Usuarios[0].visitasSemanales[NEGOCIOS.VEA] = 1;
	this.Usuarios[0].visitasSemanales[NEGOCIOS.CARREFOUR] = 2;
	this.Usuarios[1].visitasSemanales[NEGOCIOS.CARREFOUR] = 5;


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

function AdaptadorAplicacion(id, ubicacion) {
	this.BDUsuariosNuestraAplicacion = new BaseDeDatosDeUsuarios();
	this.perfil = this.crearPerfil(this.getUsuario(id), ubicacion);
}
AdaptadorAplicacion.prototype.getUsuario = function(id) {
	return this.BDUsuariosNuestraAplicacion.getUsuarioPorId(id);
}
AdaptadorAplicacion.prototype.crearPerfil = function(usuario, ubicacion) {
	return new Perfil(usuario.nombre, usuario.sexo, usuario.fechaN, ubicacion);
}
AdaptadorAplicacion.prototype.getPerfilDeUsuario = function() {
	return this.perfil;
}

function controladorPrincipal(id, ubicacion) {

	this.facebook = new AdaptadorFB();
	this.gmaps = new AdaptadorGoogleMaps();

	this.generador = new GeneradorDeVariables();

	this.aplicacionDelCelular = new AdaptadorAplicacion(id, ubicacion);
	this.perfil = this.aplicacionDelCelular.getPerfilDeUsuario();
	this.perfil.setId(id);

	this.completarPerfilConFB();
	this.completarPerfilConLugaresCercanos();
	this.completarPerfilConBaseDeConocimientoPropio();

}
controladorPrincipal.prototype.completarPerfilConFB = function() {
	var cosasQueLeGustanEnFacebook = this.facebook.getMeGustanEnFB(this.aplicacionDelCelular.getPerfilDeUsuario().getNombre());
	this.aplicacionDelCelular.getPerfilDeUsuario().agregarCosasQueLeGustanEnFB(cosasQueLeGustanEnFacebook);
}
controladorPrincipal.prototype.completarPerfilConLugaresCercanos = function() {
	var negociosCercanos = this.gmaps.buscarTodosLosNegociosCercanos(this.aplicacionDelCelular.getPerfilDeUsuario().getUbicacionActual());
	this.aplicacionDelCelular.getPerfilDeUsuario().agregarLugaresCercanos(negociosCercanos);
}
controladorPrincipal.prototype.completarPerfilConBaseDeConocimientoPropio = function() {
	this.generador.generarTodasLasVariablesDeUsuario(this.getPerfilCompletoDelUsuario(), this.aplicacionDelCelular.BDUsuariosNuestraAplicacion, this.facebook.BDPaginasTipo);
	this.aplicacionDelCelular.getPerfilDeUsuario().agregarBaseDeConocimiento(this.generador.variablesGeneradas);
}
controladorPrincipal.prototype.getPerfilCompletoDelUsuario = function() {
	return this.perfil;
}


//Información que vendría desde el celular
var Leandro = {
	id: "123",
	ubicacion: new Ubicacion("23.56642394", "54.12099344")
}
var Ariana = {
	id: "212",
	ubicacion: new Ubicacion("23.56378364", "54.12377878")
}

function SistemaClasificador() {
	this.clasificaciones = {};
	this.clasificaciones[RUBROS.COMIDA_RAPIDA] = ['Hamburguesería', 'Hamburgueseria', 'Comida Rápida', 'Comida Rapida'];
	this.clasificaciones[RUBROS.RESTAURANTE] = ['Restaurante', 'Pizzería', 'Pizzeria', 'Bar'];
	this.clasificaciones[RUBROS.SUPERMERCADO] = ['Supermercado', 'Productos', 'Mercado'];
	this.clasificaciones[RUBROS.LIBRERIA] = ['Libreria'];
	this.clasificaciones[RUBROS.CINE] = ['Cine', 'Entretenimiento'];
	this.clasificaciones[RUBROS.BOLICHE] = ['Club Nocturno', 'Discoteca'];

	this.fallas = [];

}
SistemaClasificador.prototype.clasificar = function(tipoAClasificar) {
	for (var rubro in this.clasificaciones) {
		for (var i = 0, l = this.clasificaciones[rubro].length; i < l; i++) {
			var tipoConocido = this.clasificaciones[rubro][i];
			if (tipoConocido.search(new RegExp(tipoAClasificar, "i")) != -1) {
				return rubro;
			}
		}
	}
	this.fallas.push('El tipo: ' + tipoAClasificar + ' no pudo ser clasificado');
}

function Variable(identificador, tipo) {
	this.identificador = identificador;
	this.tipo = tipo;
	this.valor;
}
Variable.prototype.getValor = function() {
	return this.valor;
}
Variable.prototype.setValor = function(valor) {
	this.valor = valor;
}
function GeneradorDeVariables() {
	this.TIPO_VAR = {
		BOOLEANO: 'Booleano', 
		ENTERO: 'Entero'
	};
	this.clasificador = new SistemaClasificador();
	this.variablesGeneradas = [];
}
GeneradorDeVariables.prototype.capitalizarPalabras = function(texto) {
	return texto.replace(/\w\S*/g, function(palabra){
		return palabra.charAt(0).toUpperCase() + palabra.substr(1);
	});
}
GeneradorDeVariables.prototype.removerEspacios = function(texto) {
	return texto.replace(/ /g, "");
}
GeneradorDeVariables.prototype.reemplazarCaracteresAcentuados = function(texto) {
	texto = texto.replace(/á/ig, "a");
	texto = texto.replace(/é/ig, "e");
	texto = texto.replace(/í/ig, "i");
	texto = texto.replace(/ó/ig, "o");
	return texto.replace(/ú/ig, "u");
}
GeneradorDeVariables.prototype.standarizarNombreVariable = function(nombre) {
	return this.removerEspacios(this.capitalizarPalabras(this.reemplazarCaracteresAcentuados(nombre)));
}
GeneradorDeVariables.prototype.agregarVariable = function(variable) {
	if (variable instanceof Variable) {
		this.variablesGeneradas.push(variable);
	} else {
		console.log('Moco con una variable que contiene: ' + variable);
	}
}
GeneradorDeVariables.prototype.conseguirVariablesX = function(listaDeMeGustaEnFB) {
	var variablesX = [];
	for (var i = 0, n = listaDeMeGustaEnFB.length; i < n; i++) {
		variablesX.push({
			origen: listaDeMeGustaEnFB[i].getNombre(),
			tipoFB: listaDeMeGustaEnFB[i].getTipo(),
			standarizado: this.standarizarNombreVariable(listaDeMeGustaEnFB[i].getNombre())
		});
	}
	return variablesX;
}
GeneradorDeVariables.prototype.generarVariablesTipoLeGustaX = function(listaDeX) {
	var varLeGusta = "leGusta";
	for (var i = 0, n = listaDeX.length; i < n; i++) {
		var variableGenerada = new Variable(varLeGusta + listaDeX[i].standarizado, this.TIPO_VAR.BOOLEANO);
		this.agregarVariable(variableGenerada);
	}
}
GeneradorDeVariables.prototype.generarVariablesTipoXesY = function(bdFacebook) {
	var varEs = "Es";
	for (negocio in NEGOCIOS) {
		var varX = this.standarizarNombreVariable(NEGOCIOS[negocio]);
		var varY = this.clasificador.clasificar(bdFacebook[NEGOCIOS[negocio]]);
		if (varY != undefined) {
			var variableGenerada = new Variable(varX + varEs + varY, this.TIPO_VAR.BOOLEANO);
			this.agregarVariable(variableGenerada);
		}
	}
}
GeneradorDeVariables.prototype.generarVariablesTipoXesElYMasCercano = function(listaDeX) {
	var varEsEl = "esEl";
	var varMasCercano = "MasCercano";
	for (var i = 0, n = listaDeX.length; i < n; i++) {

		var varX = listaDeX[i].standarizado;
		listaDeX[i].Y = this.clasificador.clasificar(listaDeX[i].tipoFB);
		if (varY != undefined) {

		}
	}
}
GeneradorDeVariables.prototype.generarVariablesTipoVisitasMensualesAX = function(visitasEnElMes) {
	var varVisitasMensualesA = "visitasMensualesA";
	for (var negocio in NEGOCIOS) {
		for (var visita in visitasEnElMes) {
			if (visita == NEGOCIOS[negocio]) {
				var variableGenerada = new Variable(
					varVisitasMensualesA + this.standarizarNombreVariable(NEGOCIOS[negocio]),
					this.TIPO_VAR.ENTERO);
				variableGenerada.setValor(visitasEnElMes[visita]);
				this.agregarVariable(variableGenerada);
			}
		}
	}
}
GeneradorDeVariables.prototype.generarVariablesTipoVisitasSemanalesAX = function(visitasEnLaSemana) {
	var varVisitasSemanalesA = "visitasSemanalesA";
	for (negocio in NEGOCIOS) {
		for (var visita in visitasEnLaSemana) {
			if (visita == NEGOCIOS[negocio]) {
				var variableGenerada = new Variable(
					varVisitasSemanalesA + this.standarizarNombreVariable(NEGOCIOS[negocio]),
					this.TIPO_VAR.ENTERO);
				variableGenerada.setValor(visitasEnLaSemana[visita]);
				this.agregarVariable(variableGenerada);
			}
		}

	}
}
GeneradorDeVariables.prototype.generarVariablesTipoEsDia = function() {
	var dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
	var fechaDeHoy = new Date().getDay();
	var varEs = "es";
	var variableGenerada = new Variable(varEs + dias[fechaDeHoy], this.TIPO_VAR.BOOLEANO);
	this.agregarVariable(variableGenerada);
}
GeneradorDeVariables.prototype.generarVariablesTipoEsSexo = function(sexo) {
	var varEs = "es";
	var variableGenerada;
	if (sexo == SEXO.MASCULINO) {
		variableGenerada = new Variable(varEs + SEXO.MASCULINO, this.TIPO_VAR.BOOLEANO);
	} else if (sexo == SEXO.FEMENINO) {
		variableGenerada = new Variable(varEs + SEXO.FEMENINO, this.TIPO_VAR.BOOLEANO);
	}
	this.agregarVariable(variableGenerada);
}
GeneradorDeVariables.prototype.generarVariablesTipoEstaCercaX = function(lugaresCercanosEnGMaps) {
	var varEstaCerca = "estaCerca";
	for (var i = 0, n = lugaresCercanosEnGMaps.length; i < n; i++) {
		var varX = this.standarizarNombreVariable(lugaresCercanosEnGMaps[i]);
		var variableGenerada = new Variable(varEstaCerca + varX, this.TIPO_VAR.BOOLEANO);
		this.agregarVariable(variableGenerada);
	}
}
GeneradorDeVariables.prototype.generarVariableRangoCumple = function(fechaNac) {
	var fechaHoy = new Date();
	var anoActual = fechaHoy.getFullYear();

	var fechaCumpleanos = new Date((fechaNac.getMonth() + 1) + '/' + fechaNac.getDate() + '/' + fechaHoy.getFullYear());

	var tresDiasEnMilisegundos = 259200000;

	var diferenciaEnMilisegundos = fechaCumpleanos.getTime() - fechaHoy.getTime();
	if (diferenciaEnMilisegundos < tresDiasEnMilisegundos && diferenciaEnMilisegundos > 0) {
		var varNombre = 'fechaActualDentroDelRangoDelCumple';
		var variableGenerada = new Variable(varNombre, this.TIPO_VAR.BOOLEANO);
		this.agregarVariable(variableGenerada);
	}
}
GeneradorDeVariables.prototype.generarTodasLasVariablesDeUsuario = function(perfil, bdUsuarios, bdFacebook) {
	
	var variablesX = this.conseguirVariablesX(perfil.getMeGustanEnFB());
	this.generarVariablesTipoLeGustaX(variablesX);
	this.generarVariablesTipoXesY(bdFacebook);
	this.generarVariablesTipoVisitasSemanalesAX(bdUsuarios.getUsuarioPorId(perfil.id).visitasSemanales);
	this.generarVariablesTipoVisitasMensualesAX(bdUsuarios.getUsuarioPorId(perfil.id).visitasUltimoMes);
	this.generarVariablesTipoEsDia();
	this.generarVariablesTipoEsSexo(perfil.getSexo());
	this.generarVariableRangoCumple(perfil.getFechaDeNacimiento());
	this.generarVariablesTipoEstaCercaX(perfil.getLugaresCercanos());

}
GeneradorDeVariables.prototype.generarTodaVariablePosible = function(bdFacebook, bdGoogleMaps) {
	this.variablesGeneradas = [];
	var meGustanEnFB = [];
	for (each in bdFacebook) {
		meGustanEnFB.push(new MeGustaEnFB(each, bdFacebook[each]));
	}
	var variablesX = this.conseguirVariablesX(meGustanEnFB);
	this.generarVariablesTipoLeGustaX(variablesX);
	this.generarVariablesTipoXesY(bdFacebook);
	var visitasSemanales = {};
	for (each in NEGOCIOS) {
		visitasSemanales[NEGOCIOS[each]] = 0;
	}
	this.generarVariablesTipoVisitasSemanalesAX(visitasSemanales);

	var visitasMensuales = {};
	for (each in NEGOCIOS) {
		visitasMensuales[NEGOCIOS[each]] = 0;
	}
	this.generarVariablesTipoVisitasMensualesAX(visitasMensuales);
	this.generarVariablesTipoEsSexo(SEXO.MASCULINO);
	this.generarVariablesTipoEsSexo(SEXO.FEMENINO);
	var hoy = new Date();
	hoy.setDate(hoy.getDate() + 1);
	this.generarVariableRangoCumple(hoy);

	var lugares = [];
	for (each in bdGoogleMaps) {
		lugares.push(each);
	}
	this.generarVariablesTipoEstaCercaX(lugares);

	var dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
	for (var i = 0; i < dias.length; i++) {
		this.agregarVariable(new Variable('es' + dias[i], this.TIPO_VAR.BOOLEANO));
	}
}

//Arranque
var principal = new controladorPrincipal(Leandro.id, Leandro.ubicacion);
//var principal = new controladorPrincipal(Ariana.id, Ariana.ubicacion);

//principal.generador.generarTodaVariablePosible(principal.facebook.BDPaginasTipo, principal.gmaps.BDLugares)
//principal.generador.variablesGeneradas

/*
var aplicacionDelCelular = new AdaptadorAplicacion(Ariana.id, Ariana.ubicacion);

var perfil = aplicacionDelCelular.getPerfilDeUsuario();
var lugaresQueLeGustanEnFacebook = facebook.getMeGustanLugares(perfil.getNombre());
perfil.agregarLugaresQueLeGustanEnFB(lugaresQueLeGustanEnFacebook);

var negociosCercanosAlUsuario = gmaps.buscarTodosLosNegociosCercanos(perfil.getUbicacionActual());
*/


