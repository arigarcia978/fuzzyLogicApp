/*
function GoogleMapsService(){}

GoogleMapsService.prototype.getLugaresCercanos = function(ubicacion){}

GoogleMapsService.prototype.getUbicacion = function(){
			 navigator.geolocation.getCurrentPosition(function (pos) {
                    var latitud= pos.coords.latitude;
                    var longitud= pos.coords.longitude;
                    //console.log('longitud = ' + latitud + ',  longitud =' + longitud);
                    var a = new Ubicacion(latitud, longitud, 5);
                    return a;
                })
		}
*/ 

var NEGOCIOS = {
	MCDONALD: 'McDonalds',
	LA_PIZZADA: 'La Pizzada',
	BURGER_KING: 'Burger King',
	RECORCHOLIS: 'Recorcholis',
	EL_ATENEO: 'El Ateneo',
	EL_BALON: 'El Balón',
	MIL99: 'Mil99',
	ATLAS: 'Atlas',
	LANCASTER: 'Lancaster',
	VEA: 'Vea',
	CARREFOUR: 'Carrefour'
}

function AdaptadorGoogleMaps() {
	//this.BDLugares = {};
	/*
		this.BDLugares[NEGOCIOS.MCDONALD] = {
			tipoLugar: 'Restaurante de Comida Rápida',
			ubicacion: new Ubicacion("23.56347294", "54.12337982")
		}
		this.BDLugares[NEGOCIOS.LA_PIZZADA] = {
			tipoLugar: 'Pizzería',
			ubicacion: new Ubicacion("23.56417395", "54.12298572")
		}
		this.BDLugares[NEGOCIOS.BURGER_KING] = {
			tipoLugar: 'Comida Rápida',
			ubicacion: new Ubicacion("23.56353926", "54.12334275")
		}
		this.BDLugares[NEGOCIOS.RECORCHOLIS] = {
			tipoLugar: 'Discoteca',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
		this.BDLugares[NEGOCIOS.EL_BALON] = {
			tipoLugar: 'Bar restaurante',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
		this.BDLugares[NEGOCIOS.MIL99] = {
			tipoLugar: 'Bar restaurante',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
		this.BDLugares[NEGOCIOS.VEA] = {
			tipoLugar: 'Supermercado',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
		this.BDLugares[NEGOCIOS.LANCASTER] = {
			tipoLugar: 'Club nocturno',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
		this.BDLugares[NEGOCIOS.CARREFOUR] = {
			tipoLugar: 'Supermercado',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
		this.BDLugares[NEGOCIOS.ATLAS] = {
			tipoLugar: 'Cine',
			ubicacion: new Ubicacion("23.56589209", "54.12198742")
		}
	*/

	this.BDLugares = [];
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.MCDONALD], 
		new Ubicacion("23.56347294", "54.12337982"), 
		'Restaurante de Comida Rápida'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.LA_PIZZADA],
		new Ubicacion("23.56417395", "54.12298572"),
		'Pizzería'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.BURGER_KING],
		new Ubicacion("23.56353926", "54.12334275"),
		'Comida Rápida'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.RECORCHOLIS],
		new Ubicacion("23.56589209", "54.12198742"),
		'Discoteca'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.EL_BALON],
		new Ubicacion("23.56589209", "54.12198742"),
		'Bar restaurante'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.MIL99],
		new Ubicacion("23.56589209", "54.12198742"),
		'Bar restaurante'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.VEA],
		new Ubicacion("23.56589209", "54.12198742"),
		'Supermercado'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.LANCASTER],
		new Ubicacion("23.56589209", "54.12198742"),
		'Club nocturno'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.CARREFOUR],
		new Ubicacion("23.56589209", "54.12198742"),
		'Supermercado'));
	this.BDLugares.push(new Lugar(
		[NEGOCIOS.ATLAS],
		new Ubicacion("23.56589209", "54.12198742"),
		'Cine'));
}
AdaptadorGoogleMaps.prototype.getTipoLugar = function(nombreLugar) {
	//return this.BDLugares[nombreLugar].tipoLugar;
	for(var i = 0; i < this.BDLugares.length; i++){
		if(this.BDLugares[i].nombre == nombreLugar){
			return this.BDLugares[i].tipoLugar;
		}
	}
}
AdaptadorGoogleMaps.prototype.buscarTodosLosNegociosCercanos = function(ubicacion) {
	/*
		var medioLadoCuadradoDentroDeRadio150m = 0.001;
		var medioLadoCuadradoDentroDeRadio400m = 0.0025;

		var extremoLatitudMayor = parseFloat(ubicacion.getLatitud()) + medioLadoCuadradoDentroDeRadio150m;
		var extremoLatitudMenor = ubicacion.getLatitud() - medioLadoCuadradoDentroDeRadio150m;
		var extremoLongitudMayor = parseFloat(ubicacion.getLongitud()) + medioLadoCuadradoDentroDeRadio150m;
		var extremoLongitudMenor = ubicacion.getLongitud() - medioLadoCuadradoDentroDeRadio150m;

		var negociosCercanos = [];

		for (lugar in this.BDLugares) {
			var lt = this.BDLugares[lugar].ubicacion.getLatitud();
			var ln = this.BDLugares[lugar].ubicacion.getLongitud();
			var ltM = extremoLatitudMayor;
			var ltm = extremoLatitudMenor;
			var lnM = extremoLongitudMayor;
			var lnm = extremoLongitudMenor;

			if (lt <= ltM && lt >= ltm && ln <= lnM && ln >= lnm) {
				//lugar cercano
				negociosCercanos.push(lugar);
			}
		}
		return negociosCercanos;
	*/
	return this.BDLugares;
}