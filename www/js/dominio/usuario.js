/*
function Usuario(nombre, fechaNacimiento, sexo) {
	this.nombre = nombre;
	this.fechaNacimiento = fechaNacimiento;
	this.sexo = sexo;
	this.visitas = [];
	this.lugaresQueLeGustan = []; //array de lugares
}
*/
function Usuario(nombre, sexo, fechaNac) {
	var fechaDeNacimiento = new Date(fechaNac);
	this.nombre = nombre;
	this.fechaDeNacimiento = fechaDeNacimiento;
	this.sexo = sexo;
	this.meGustanEnFB = [];
	this.visitasALugaresEnElUltimoMes = [];
	this.ultimaUbicacionConocida;
}
Usuario.prototype.setId = function(id) {
	this.id = id;
}
Usuario.prototype.actualizarUbicacion = function(ubicacion) {
	if (esUnaInstancia(ubicacion, Ubicacion)) {
		this.ultimaUbicacionConocida = ubicacion;
	} else {
		log.seEsperabaUn('Ubicacion', 'actualizarUbicacion', 'Usuario');
	}
}
Usuario.prototype.agregarMeGustaDelFB = function(meGusta) {
	/*if (meGusta instanceof MeGustaEnFB) {
		this.meGustanEnFB.push(meGusta);
	}*/
	this.meGustanEnFB.push(meGusta);
}
Usuario.prototype.agregarCosasQueLeGustanEnFB = function(lista) {
	var clase = this;
	if (esUnArray(lista)) {
		lista.forEach(function (meGusta) {
			clase.agregarMeGustaDelFB(meGusta);
		});
	} else {
		log.seEsperabaUn('Array', 'agregarCosasQueLeGustanEnFB', 'Usuario');
	}
}

Usuario.prototype.getNombre = function() {return this.nombre;}
Usuario.prototype.getFechaDeNacimiento = function() {return this.fechaDeNacimiento;}
Usuario.prototype.getSexo = function() {return this.sexo;}
Usuario.prototype.getMeGustanEnFB = function() {return this.meGustanEnFB;}
Usuario.prototype.getEdad = function() {
	return motorMatematico.calcularEdad(this.fechaDeNacimiento);
}
Usuario.prototype.agregarBaseDeConocimiento = function(baseDeConocimiento) {
	this.baseDeConocimiento = baseDeConocimiento;
}
