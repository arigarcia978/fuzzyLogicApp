function ControladorDifuso(){

}

ControladorDifuso.prototype.seleccionarPromociones = function(entradas){
	var difusor = new Difusor();
	var entradasFusificadas = difusor.fusificar(entradas);
	
	var sistemaExperto = new SistemaExperto();
	sistemaExperto.ejecutar(entradasFusificadas);

}