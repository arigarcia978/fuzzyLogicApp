function MotorMatematico() {

}

MotorMatematico.prototype.calcularEdad = function(fecha) {
	var edadEnMilisegundos = Date.now() - (esUnaFecha(fecha) ? fecha.getTime() : new Date(fecha).getTime());
	var edad = new Date(edadEnMilisegundos);
	return Math.abs(edad.getUTCFullYear() - 1970);
}
MotorMatematico.prototype.tiempoTranscurridoEnHoras = function(date1, date2){
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var horas = timeDiff / (1000*3600); 
	return horas;
}
MotorMatematico.prototype.convertirKMaMetros = function(km) {
	return km * 1000;
}
MotorMatematico.prototype.convertirHorasASegundos = function(horas){
	return horas * 3600;
}
MotorMatematico.prototype.calcularDistanciaEnMetrosEntreUbicaciones = function(ubicacion1, ubicacion2) {
	return this.convertirKMaMetros(this.calcularDistanciaEnKMEntreUbicaciones(ubicacion1, ubicacion2));
};
MotorMatematico.prototype.calcularDistanciaEnKMEntreUbicaciones = function(ubicacion1, ubicacion2) {
	if (esUnaInstancia(ubicacion1, Ubicacion) && esUnaInstancia(ubicacion2, Ubicacion)) {
		var radioDeLaTierraEnKM = 6371;
		var distanciaEntreLatitudes = this.gradosARadianes(ubicacion1.getLatitud() - ubicacion2.getLatitud());
		var distanciaEntreLongitudes = this.gradosARadianes(ubicacion1.getLongitud() - ubicacion2.getLongitud());

		var a = Math.sin(distanciaEntreLatitudes/2) * Math.sin(distanciaEntreLatitudes/2) + 
				Math.cos(this.gradosARadianes(ubicacion1.getLatitud())) * Math.cos(this.gradosARadianes(ubicacion2.getLatitud())) * 
				Math.sin(distanciaEntreLongitudes/2) * Math.sin(distanciaEntreLongitudes/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt( 1 - a ));
		return radioDeLaTierraEnKM * c;
	} else {
		console.error('Se esperaban objetos del tipo ubicación como entradas');
	}
}
MotorMatematico.prototype.gradosARadianes = function(grados) {
	return grados * (Math.PI/180);
}
MotorMatematico.prototype.realizarAND = function(numeros){
	var menor = 1;
	for(var i = 0; i < numeros.length; i++){
		if(numeros[i] < menor){
			menor = numeros[i];
		}
	}
	return menor;
}
MotorMatematico.prototype.calcularVelocidadDeMovimiento = function(ubicacion1, ubicacion2){
	var distanciaEnKM = this.calcularDistanciaEnKMEntreUbicaciones(ubicacion1, ubicacion2);
	var momento1 = ubicacion1.getMomento();
	var momento2 = ubicacion2.getMomento();
	var horasTranscurridas = this.tiempoTranscurridoEnHoras(momento1, momento2);
	return (this.convertirKMaMetros(distanciaEnKM)/this.convertirHorasASegundos(horasTranscurridas));
}

var motorMatematico = new MotorMatematico();