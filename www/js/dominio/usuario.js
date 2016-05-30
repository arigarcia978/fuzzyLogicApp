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
	//this.id;
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
Usuario.prototype.getNombre = function() {
	return this.nombre;
}
Usuario.prototype.getFechaDeNacimiento = function() {
	return this.fechaDeNacimiento;
}
Usuario.prototype.getEdad = function() {
	return matematica.calcularEdad(fechaDeNacimiento);			//TODO: Calcular en base a la fechaNac
}
Usuario.prototype.getSexo = function() {
	return this.sexo;
}
Usuario.prototype.agregarMeGustaEnFB = function(meGusta) {
	if (meGusta instanceof MeGustaEnFB) {
		this.meGustanEnFB.push(meGusta);
	}
}
Usuario.prototype.agregarCosasQueLeGustanEnFB = function(lista) {
	for (var i = 0; i < lista.length; i++) {
		this.agregarMeGustaEnFB(lista[i]);
	}
}
Usuario.prototype.agregarBaseDeConocimiento = function(baseDeConocimiento) {
	this.baseDeConocimiento = baseDeConocimiento;
}
Usuario.prototype.getMeGustanEnFB = function() {
	return this.meGustanEnFB;
}
