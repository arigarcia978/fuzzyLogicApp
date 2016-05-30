function ControladorDifuso(){

}

ControladorDifuso.prototype.seleccionarPromociones = function(entradas){
	var difusor = new Difusor();
	var entradasFusificadas = difusor.fusificar(entradas);
	
	var sistemaExperto = new SistemaExperto();
	var salidas = sistemaExperto.ejecutar(entradas.lugares, entradasFusificadas);
	console.log(salidas);
	var defusificador = new Defusificador();
	var lugarElegido = defusificador.defusificar(salidas);
	
	console.log('Mostrar publicidad de: '+lugarElegido);
	return lugarElegido;
}