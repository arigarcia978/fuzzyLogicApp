var entradas;

function prepararEntradas(ubicacion, lugaresCercanos){
	calcularVelocidadDeMovimiento(ubicacion);
	calcularDistanciasALugaresCercanos(ubicacion, lugaresCercanos);
	calcularVisitasMensualesALugares(lugaresCercanos);

	return entradas;
};

function calcularVelocidadDeMovimiento() {}

function calcularVisitasMensualesALugares(lugaresCercanos){}

function calcularDistanciasALugaresCercanos(ubicacion, lugaresCercanos){}