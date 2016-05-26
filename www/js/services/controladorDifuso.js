function ControladorDifuso(){

}

ControladorDifuso.prototype.seleccionarPromociones = function(entradas){
	var difusor = new Difusor();
	var entradasFusificadas = difusor.fusificar(entradas.aFusificar);
	
	var sistemaExperto = new SistemaExperto();
	sistemaExperto.ejecutar(entradas.nitidas, entradasFusificadas);

}