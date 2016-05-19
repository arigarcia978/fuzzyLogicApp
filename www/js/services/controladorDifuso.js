function ControladorDifuso(){

}

ControladorDifuso.prototype.seleccionarPromociones = function(entradas){
	var entradasFusificadas = fusificar(entradas);
	
	var sistemaExperto = new SistemaExperto();
	sistemaExperto.ejecutar();
	sistemaExperto.agregarReglas();
	sistemaExperto.setBaseDeHechosNítida();
	sistemaExperto.setBaseDeHechosDifusa(entradasFusificadas);
	sistemaExperto.inferir();

}