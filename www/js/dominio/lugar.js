function Lugar(nombre, ubicacion){
	this.nombre = nombre;
	this.ubicacion = ubicacion;
	this.distancia = -1;
	this.cantidadDeVisitasMensuales = -1;
}
Lugar.prototype.setDistancia = function(distancia) {
	this.distancia = distancia;
}
Lugar.prototype.setCantidadDeVisitasMensuales = function(cantidad) {
	this.cantidadDeVisitasMensuales = cantidad;
}