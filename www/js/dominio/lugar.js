/*
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
*/

function Lugar(nombre, ubicacion) {
	this.place_id;
	this.nombre = nombre;
	this.ubicacion = ubicacion;
	this.tipos = [];
	this.promociones = [];
	//El rubro lo usamos más adelante para unificar FB y GPlaces
	this.rubro = '';
	//A Remover
	this.distancia = -1;
	this.cantidadDeVisitasMensuales = -1;
	this.meGusta = false;
}
Lugar.prototype.setId = function(id) {
	this.place_id = id;
}
Lugar.prototype.setUbicacion = function(ubicacion) {
	if (esUnaInstancia(ubicacion, Ubicacion)) {
		this.ubicacion = ubicacion;
	} else {
		log.seEsperabaUn('Ubicacion', 'setUbicacion', 'Lugar');
	}
};
Lugar.prototype.agregarTipo = function(tipoLugar) {
	this.tipos.push(tipoLugar);
};
Lugar.prototype.agregarTipos = function(listaTipos) {
	var clase = this;
	if (esUnArray(listaTipos)) {
		listaTipos.forEach(function (tipo) {
			clase.agregarTipo(tipo);
		});
	} else {
		log.seEsperabaUn('Array', 'agregarTipo', 'Lugar');
	}
};
Lugar.prototype.agregarPromocion = function(promocion) {
	if (esUnaInstancia(promocion, Promocion)) {
		this.promociones.push(promocion);
	} else {
		log.seEsperabaUn('Promocion', 'agregarPromocion', 'Lugar');
	}
};
Lugar.prototype.agregarPromociones = function(listaPromociones) {
	var clase = this;
	if (esUnArray(listaPromociones)) {
		listaPromociones.forEach(function (promocion) {
			clase.agregarPromocion(promocion);
		});
	} else {
		log.seEsperabaUn('Array', 'agregarPromociones', 'Lugar');
	}
};
Lugar.prototype.setRubro = function(rubro){
	if (esUnaInstancia(rubro, Rubro)){
		this.rubro = rubro;
	}
}
Lugar.prototype.setDistancia = function(distancia) {
	this.distancia = distancia;
}
Lugar.prototype.setCantidadDeVisitasMensuales = function(cantidad) {	
	this.cantidadDeVisitasMensuales = cantidad;
}
Lugar.prototype.getNombre = function(){
	return this.nombre;
}
Lugar.prototype.getMeGusta = function(){
	return this.meGusta;
}