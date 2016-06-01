function Difusor(){}

Difusor.prototype.fusificar = function(entradas){
	var entradasDifusas = {};

	console.log(entradas);
	entradasDifusas.frecuenciaDeLugares = calcularProbabilidadesDeFrecuencia(entradas.lugares);
	entradasDifusas.distanciasACadaLugar = calcularProbabilidadesDeDistancia(entradas.lugares);
	entradasDifusas.movilidad = calcularProbabilidadesDeMovilidad(entradas.velocidadDeMovimiento);

	return entradasDifusas;
}

function calcularProbabilidadesDeFrecuencia(lugares){
	var frecuenciaDeLugares = [];

	for(var i = 0; i < lugares.length; i++){
		var lugar = lugares[i];
		
		var probPocoFrecuente = new Trapezoide(0,0,1,3).calculateIntersection(lugar.cantidadDeVisitasMensuales);
		var probFrecuente = new Triangular(2,4,8).calculateIntersection(lugar.cantidadDeVisitasMensuales);
		var probMuyFrecuente = new Trapezoide(5,7,100,100).calculateIntersection(lugar.cantidadDeVisitasMensuales);

		var nombreDeLugar = lugar.nombre;
		frecuenciaDeLugares.push({
			nombre: nombreDeLugar,
			probabilidades: {
				pocoFrecuente: probPocoFrecuente,
				frecuente: probFrecuente,
				muyFrecuente: probMuyFrecuente
			}
		});
	}
	console.log('frecuencia de lugares');
	console.log(frecuenciaDeLugares);

	return frecuenciaDeLugares;
}

function calcularProbabilidadesDeDistancia(lugares){
	var distanciasALugar = [];

	for( var i = 0; i < lugares.length; i++){
		var lugar = lugares[i];
		var probMuyCorta = new Trapezoide(0, 0, 50, 60).calculateIntersection(lugar.distancia);
		var probCorta = new Trapezoide(40,60,180,250).calculateIntersection(lugar.distancia);
		var probMedia = new Trapezoide(150, 200, 500, 600).calculateIntersection(lugar.distancia);
		var probGrande = new Trapezoide(500, 650, 10000, 10000).calculateIntersection(lugar.distancia);

		var nombreDeLugar = lugar.nombre;
		distanciasALugar.push({
			nombre: nombreDeLugar,
			probabilidades: {
				muyCorta: probMuyCorta,
				corta: probCorta,
				media: probMedia,
				grande: probGrande
			}
		});
	}

	console.log('distancias a lugar');
	console.log(distanciasALugar);

	return distanciasALugar;
}

function calcularProbabilidadesDeMovilidad(velocidad){
	var probLento = new Trapezoide(0, 0, 0.6, 1.1).calculateIntersection(velocidad);
	var probRapido = new Trapezoide(0.6, 1.1, 20, 20).calculateIntersection(velocidad);

	var movilidad = {probabilidades: {
		lento: probLento,
		rapido: probRapido
		}
	};
	
	console.log(movilidad);
	return movilidad;
}