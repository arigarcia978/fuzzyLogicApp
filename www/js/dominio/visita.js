function Visita(fecha, lugar) {
	this.fecha = fecha;
	this.lugar = lugar;
}
Visita.prototype.getLugar = function(){
	return this.lugar;
}