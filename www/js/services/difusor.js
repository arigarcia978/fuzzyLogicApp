function Difusor(){}

Difusor.prototype.fusificar = function(entradas){
	var entradasDifusas;

	entradasDifusas.frecuenciaDeLugares = calcularProbabilidadesDeFrecuencia(entradas.lugares);
	entradasDifusas.distanciasACadaLugar = calcularProbabilidadesDeDistancia(entradas.lugares);
	entradasDifusas.movilidad = calcularProbabilidadesDeMovilidad(entradas.velocidadDeMovimiento);

	return entradasDifusas;
}

function calcularProbabilidadesDeFrecuencia(lugares){
	var frecuenciaDeLugares = [];

	for (lugar in lugares){
		var probPocoFrecuente = new Trapezoide(0,0,2,3).calculateIntersection(lugar.cantidadDeVisitasMensuales);
		var probFrecuente = new Triangular(2,4,7).calculateIntersection(lugar.cantidadDeVisitasMensuales);
		var probMuyFrecuente = new Trapezoide(5,7,100,100).calculateIntersection(lugar.cantidadDeVisitasMensuales);

		var nombreDeLugar = lugar.nombre;
		frecuenciaDeLugares.push({nombreDeLugar: [
			{'pocoFrecuente': probPocoFrecuente},
			{'frecuente': probFrecuente},
			{'muyFrecuente': probMuyFrecuente}
		]});
	}

	return frecuenciaDeLugares;
}

function calcularProbabilidadesDeDistancia(lugares){
	var distanciasALugar = [];

	for(lugar in entradas.lugares){
		var probMuyCorta = new Trapezoide(0, 0, 50, 60).calculateIntersection(lugar.distancia);
		var probCorta = new Trapezoide(40,60,180,250).calculateIntersection(lugar.distancia);
		var probMedia = new Trapezoide(150, 200, 500, 600).calculateIntersection(lugar.distancia);
		var probLejos = new Trapezoide(500, 650, 1000, 1000).calculateIntersection(lugar.distancia);

		var nombreDeLugar = lugar.nombre;
		distanciasALugar.push({nombreDeLugar: [
			{'muyCorta': probMuyCorta},
			{'corta': probCorta},
			{'media': probMedia},
			{'lejos': probLejos}
		]});
	}

	return distanciasALugar;
}

function calcularProbabilidadesDeMovilidad(velocidad){
	var probLento = new Trapezoide(0, 0, 0.6, 1.1).calculateIntersection(velocidad);
	var probRapido = new Trapezoide(0.6, 1.1, 10, 10).calculateIntersection(velocidad);

	var movilidad = {'movilidad': [
			{'lento': probLento},
			{'rapido': probRapido}
		]};
	
	return movilidad;
}