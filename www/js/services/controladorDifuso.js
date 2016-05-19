function ControladorDifuso(){

}

ControladorDifuso.prototype.seleccionarPromociones = function(nuevaUbicacion, lugaresCercanos){
	var entradasDeMotorDeInferencia = prepararEntradas(ubicacion, lugaresCercanos);

	var entradasFusificadas = fusificar(entradasDeMotorDeInferencia);
	
	setBaseDeHechosNítida();
	setBaseDeHechosDifusa(entradasFusificadas);
	inferir();
}