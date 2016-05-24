function MotorMatematico() {}

MotorMatematico.prototype.calcularDistancia = function(ubicacion1, ubicacion2){}

MotorMatematico.prototype.calcularDiferenciaDeTiempoEnMinutos = function(tiempo1, tiempo2){}




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