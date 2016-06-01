function SistemaClasificador() {
	this.clasificaciones = {};
	this.clasificaciones[RUBROS.COMIDA_RAPIDA] = ['Hamburguesería', 'Hamburgueseria', 'Comida Rápida', 'Comida Rapida'];
	this.clasificaciones[RUBROS.RESTAURANTE] = ['Restaurante', 'Pizzería', 'Pizzeria', 'Bar'];
	this.clasificaciones[RUBROS.SUPERMERCADO] = ['Supermercado', 'Productos', 'Mercado'];
	this.clasificaciones[RUBROS.LIBRERIA] = ['Libreria'];
	this.clasificaciones[RUBROS.CINE] = ['Cine', 'Entretenimiento'];
	this.clasificaciones[RUBROS.BOLICHE] = ['Club Nocturno', 'Discoteca'];

	this.fallas = [];

}
SistemaClasificador.prototype.clasificar = function(tipoAClasificar) {
	for (var rubro in this.clasificaciones) {
		for (var i = 0, l = this.clasificaciones[rubro].length; i < l; i++) {
			var tipoConocido = this.clasificaciones[rubro][i];
			if (tipoConocido.search(new RegExp(tipoAClasificar, "i")) != -1) {
				return rubro;
			}
		}
	}
	this.fallas.push('El tipo: ' + tipoAClasificar + ' no pudo ser clasificado');
}
SistemaClasificador.prototype.removerEspacios = function(texto) {
	return texto.replace(/ /g, "");
}
SistemaClasificador.prototype.standarizarNombreVariable = function(nombre) {
	return this.removerEspacios(this.capitalizarPalabras(this.reemplazarCaracteresAcentuados(nombre)));
}
SistemaClasificador.prototype.reemplazarCaracteresAcentuados = function(texto) {
	texto = texto.replace(/á/ig, "a");
	texto = texto.replace(/é/ig, "e");
	texto = texto.replace(/í/ig, "i");
	texto = texto.replace(/ó/ig, "o");
	return texto.replace(/ú/ig, "u");
}
SistemaClasificador.prototype.capitalizarPalabras = function(texto) {
	return texto.replace(/\w\S*/g, function(palabra){
		return palabra.charAt(0).toUpperCase() + palabra.substr(1);
	});
}
var sistemaClasificador = new SistemaClasificador();