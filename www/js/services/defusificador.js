function Defusificador(){}

Defusificador.prototype.defusificar = function(variables){
	var resultado;
	for(var i = 0; i < variables.length; i++){
		if(resultado === undefined){
			console.log('primera vez');
			resultado = variables[i];
		} else {
			if(resultado.valor < variables[i].valor){
				console.log('cambia de valor');
				resultado = variables[i];
			}
		}
	}
	console.log(resultado);
	return resultado.nombre.replace("ofrecerPromocionesDe", "");
}