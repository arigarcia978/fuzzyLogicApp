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