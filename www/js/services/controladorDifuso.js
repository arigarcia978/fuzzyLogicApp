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

	var lugarFinal;
	
	//repositorioLugares.getLugarPorNombre(lugarElegido);
	entradas.lugares.forEach(function(lugar){
		var cochinada = sistemaClasificador.standarizarNombreVariable(lugar.nombre);
		if(cochinada == lugarElegido){
			lugarFinal = lugar;
		}
	})
	
	return lugarFinal;
}