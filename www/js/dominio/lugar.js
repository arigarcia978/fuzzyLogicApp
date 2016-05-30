function Lugar(nombre, ubicacion, tipoLugar){
	this.nombre = nombre;
	this.ubicacion = ubicacion;
	this.tipoLugar = '';
	this.distancia = -1;
	this.cantidadDeVisitasMensuales = -1;
	this.rubro = {};
	this.meGusta = false;
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
Lugar.prototype.getNombre = function(){
	return this.nombre;
}
Lugar.prototype.getMeGusta = function(){
	return this.meGusta;
}