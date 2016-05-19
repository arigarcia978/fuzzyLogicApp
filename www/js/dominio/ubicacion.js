function Ubicacion(latitud, longitud, momento) {
  this.latitud = latitud;
  this.longitud = longitud;
  this.momento = momento;
}

Ubicacion.prototype.getLatitud = function(){
  	return this.latitud;
}

Ubicacion.prototype.getLongitud = function(){
	return this.longitud;
}

Ubicacion.prototype.getMomento = function(){
	return this.momento;
}

/*
Ubicacion.prototype.agregarMomento = function(momento){
	this.momento = momento;
}
*/
