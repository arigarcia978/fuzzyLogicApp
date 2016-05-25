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