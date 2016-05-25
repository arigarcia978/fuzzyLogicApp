function Lugar(nombre, ubicacion){
	this.nombre = nombre;
	this.ubicacion = ubicacion;
	this.distancia = -1;
	this.cantidadDeVisitasMensuales = -1;
	this.rubro = {};
}
Lugar.prototype.setDistancia = function(distancia) {
	this.distancia = distancia;
}
Lugar.prototype.setCantidadDeVisitasMensuales = function(cantidad) {	
	this.cantidadDeVisitasMensuales = cantidad;
}
Lugar.prototype.setRubro = function(rubro){
	if (rubro instanceof Rubro){
		this.rubro = rubro;
	}
}