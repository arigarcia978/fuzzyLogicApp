function InferenceEngine(){
	this.baseDeHechos = {};
	this.reglas = {};
}
InferenceEngine.prototype.get = function(nombre){
	return this.baseDeHechos[nombre];
}
InferenceEngine.prototype.set = function(nombre, valor){
	//comprobar que no existan dos variables con el mismo nombre
	if(this.baseDeHechos[nombre] === undefined){
		this.baseDeHechos[nombre] = valor;
	} else{
		if(this.baseDeHechos[nombre] < valor){
			this.baseDeHechos[nombre] = valor;
		}
	}
}
InferenceEngine.prototype.addRule = function(nombre, funcion){
	this.reglas[nombre] = new Function(funcion);
}
InferenceEngine.prototype.infer = function(){
	console.log('Infiriendo...');
	for(regla in this.reglas) {
		this.reglas[regla].apply(this);
	}
}
InferenceEngine.prototype.getResultados = function(){
	var resultados = [];
	for(hecho in this.baseDeHechos){
		if (hecho.indexOf("ofrecerPromociones") == 0){
			resultados.push({
				nombre: hecho,
				valor: this.baseDeHechos[hecho]
			});
		}
	}
	return resultados;
}

/*
var se = new InferenceEngine();
se.set('i', 0);
se.addRule(
	function(){ 
		console.log(se);
		if(se.get('i') > 1){
			se.set('hola', 2);
		}
	}
);
se.infer();
console.log(se);
*/