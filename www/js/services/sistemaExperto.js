function SistemaExperto() {
	this.engine = new InfernalEngine();
}

SistemaExperto.prototype.setBaseDeHechosNitida = function(entradasNitidas){
	var engine = this.engine;
    engine.set("i", 1);

    //setear me gustas
    //una sola variable de MG. si si le gusta, vale 1, sino le gusta vale 0 o 0.3. algo bajo
}

SistemaExperto.prototype.setBaseDeHechosDifusa = function(entradasFusificadas){
    var engine = this.engine;

    //seteo frecuencia difusa a lugares
    var frecuenciaDeLugares = entradasFusificadas.frecuenciaDeLugares;
    for(var i = 0; i < frecuenciaDeLugares.length; i++){
        var lugar = frecuenciaDeLugares[i];
        
        var nombreDeLugar = lugar.nombre;
        var probabilidades = lugar.probabilidades;
        
        engine.set('visitasPocosFrecuentesA'+nombreDeLugar, probabilidades.pocoFrecuente);  
        engine.set('visitasFrecuentesA'+nombreDeLugar, probabilidades.frecuente);
        engine.set('visitasMuyFrecuentesA'+nombreDeLugar, probabilidades.muyFrecuente);
    }

    //seteo distancia difusa a cada lugar
    var distanciasACadaLugar = entradasFusificadas.distanciasACadaLugar;
    for(var i = 0; i < distanciasACadaLugar.length; i++){
        var lugar = distanciasACadaLugar[i];

        var nombreDeLugar = lugar.nombre;
        var probabilidades = lugar.probabilidades;
        
        engine.set('distanciaMuyCortaA'+nombreDeLugar, probabilidades.muyCorta);
        engine.set('distanciaCortaA'+nombreDeLugar, probabilidades.corta);
        engine.set('distanciaMediaA'+nombreDeLugar, probabilidades.media);
        engine.set('distanciaGrandeA'+nombreDeLugar, probabilidades.grande);//o grande
    }

    //seteo movilidad
    var movilidad = entradasFusificadas.movilidad;
    var probabilidades = movilidad.probabilidades;
    
    engine.set('movilidadLenta', probabilidades.lento);
    engine.set('movilidadRapida', probabilidades.rapido);
}

SistemaExperto.prototype.agregarReglas = function(entradasFusificadas, entradasNitidas, callback){
    var engine = this.engine;
    
    //reglas de le gusta mucho, poco, normal
    var frecuenciaDeLugares = entradasFusificadas.frecuenciaDeLugares;

    engine.addRule('holix', function(done){
        if(this.get('visitasFrecuentesACarrefour')){
            engine.set('bai', 5);
        }
        done();
    });

    for(var i = 1; i <= frecuenciaDeLugares.length; i++){
        var nombreDeLugar = frecuenciaDeLugares[i-1].nombre;
        console.log(nombreDeLugar);
        var pocoFrecuente = engine.get('visitasPocosFrecuentesA'+nombreDeLugar);
        console.log(pocoFrecuente);
        var frecuente = engine.get('visitasFrecuentesA'+nombreDeLugar);
        var muyFrecuente = engine.get('visitasMuyFrecuentesA'+nombreDeLugar);
        //var leGusta = engine.get('leGustaEnFB'+nombreDeLugar);
            
        engine.set('leGusta', 0.5);
        var leGusta = engine.get('leGusta');

        engine.addRule('reglasMeGustaPoco'+i, function(done){
            var pocoFrecuente = engine.get('visitasPocosFrecuentesA'+nombreDeLugar);
            var leGusta = engine.get('leGusta');
            if(pocoFrecuente && leGusta){
                if(pocoFrecuente <= leGusta){
                    this.set('leGustaPoco'+nombreDeLugar, pocoFrecuente);
                } else {
                    this.set('leGustaPoco'+nombreDeLugar, leGusta);
                }
            }
            console.log('visitas'+i);
            done();
        });

        engine.addRule('reglasMeGustaMasomenos'+i, function(done){
            var frecuente = engine.get('visitasFrecuentesA'+nombreDeLugar);
            var leGusta = engine.get('leGusta');
            if(engine.get('visitasFrecuentesA'+nombreDeLugar) && engine.get('leGusta')){
                if(engine.get('visitasFrecuentesA'+nombreDeLugar) <= engine.get('leGusta')){
                    this.set('leGustaMasomenos'+nombreDeLugar, engine.get('visitasFrecuentesA'+nombreDeLugar));
                } else {
                    this.set('leGustaMasomenos'+nombreDeLugar, engine.get('leGusta'));
                }
            }
            done();
        });

        engine.addRule('reglasMeGustaMucho3'+i, function(done){
            if(muyFrecuente && leGusta){
                if(muyFrecuente <= leGusta){
                    this.set('leGustaMucho'+nombreDeLugar, muyFrecuente);
                } else {
                    this.set('leGustaMucho'+nombreDeLugar, leGusta);
                }
            }
            done();
        });

        var leGustaPoco = engine.get('leGustaPoco'+nombreDeLugar);
        var leGustaMasomenos = engine.get('leGustaMasomenos'+nombreDeLugar);
        var leGustaMucho = engine.get('leGustaMucho'+nombreDeLugar);

        var estaMuyCerca = engine.get('distanciaMuyCortaA'+nombreDeLugar);
        var estaCerca = engine.get('distanciaCortaA'+nombreDeLugar);
        var estaMasomenosLejos = engine.get('distanciaMediaA'+nombreDeLugar);
        var estaLejos = engine.get('distanciaGrandeA'+nombreDeLugar);

        var vaLento = engine.get('movilidadLenta');
        var vaRapido = engine.get('movilidadRapida');

        engine.addRule('gettingOfrecerPromociones'+i, function(done){
            if(leGustaPoco && vaLento){
                if(leGustaPoco <= vaLento){
                    this.set('ofrecerPromociones'+nombreDeLugar, leGustaPoco);
                } else {
                    this.set('ofrecerPromociones'+nombreDeLugar, vaLento);
                }
            }
        });


    }

    callback(entradasNitidas, entradasFusificadas, this, this.inferir);
    //numeroDeLugaresDeXTipoQueLeGustan???
    //estaCercaAlgunLugarDeXRubro???


	// Adds a rule named "increment" to increment the value of 'i' up to 5.
	/*
    	var engine = this.engine;

    	engine.addRule("increment", function(done) {
    	    var i = this.get("i");
    	    if (i < 5) {
    	        i++;
    	    } else if (i > 5) {
    	        done(new Error("'i' must be lower or equal to 5."));
    	        return;
    	    }
    	    this.set("i", i);
    	    done();
    	});
    */

	// ------------------------------------ BAR RESTAURANTE ------------------------------------     
    // Adds a rule named "increment" to increment the value of 'i' up to 5.


/*
    engine.addRule('regla7', function(done) {
        if(this.get('estaCercaElBalón') || this.get('estaCercaMil99') && this.get('ElBalónEsBarRestaurante')) {
            this.set('estaCercaBarRestaurante', true);
        } else {
            this.set('estaCercaBarRestaurante', false);
        }
        done();
    });

    engine.addRule('regla8', function(done){
        if(this.get('leGustaElBalón') && this.get('estaCercaBarRestaurante') && this.get('ElBalónEsElBarRestauranteMasCercano')) {
            this.set('ofrecerPromocionesDeElBalón', true);
        } else {
            this.set('ofrecerPromocionesDeElBalón', false);
        }
        done();
    });

    engine.addRule('regla9', function(done){
        if(this.get('leGustaMil99') && this.get('estaCercaBarRestaurante') && this.get('Mil99EsElBarRestauranteMasCercano')) {
            this.set('ofrecerPromocionesDeMil99', true);
        } else {
            this.set('ofrecerPromocionesDeMil99', false);
        }
        done();
    });

    // ------------------------------------ COMIDA RAPIDA ------------------------------------
    engine.addRule("regla10", function(done) {
        if(this.get('visitasMensualesAMcDonalds') >= 2) {
            this.set('leGustaMcDonalds', true);
        } else {
            this.set('leGustaMcDonalds', false);
        }
        done();
    });

    engine.addRule('comprobarSiLeGustaCR', function(done){
        if(this.get('leGustaMcDonalds') && this.get('McDonaldsEsComidaRapida')) {
            var numero = this.get('numeroDeLugaresQueLeGustanDeComidaRapida');
            this.set('numeroDeLugaresQueLeGustanDeComidaRapida', numero + 1); 
            done();    
        }
        done();
    });

    engine.addRule('comprobarSiLeGustaComidaRapida', function(done) {
        if(this.get('numeroDeLugaresQueLeGustanDeComidaRapida') > 1) {
            this.set('leGustaComidaRapida', true);
        } else {
            this.set('leGustaComidaRapida', false);
        }
        done();
    });
          
    engine.addRule("comprobarSileGustaBurgerKing", function(done) {
        if(this.get('visitasMensualesABurgerKing') > 2) {
            this.set('leGustaBurgerKing', true);
        } else {
            this.set('leGustaBurgerKing', false);
        }
        done();
    });

    engine.addRule('comprobarNroLugaresDeCR', function(done){
        if(this.get('leGustaBurgerKing') && this.get('BurgerKingEsComidaRapida')) {
            var numero = this.get('numeroDeLugaresQueLeGustanDeComidaRapida');
            this.set('numeroDeLugaresQueLeGustanDeComidaRapida', numero+1);
            done();        
        }
        done();
    });

    engine.addRule('comprobarSiEstaCercaComidaRapida', function(done) {
        if((this.get('estaCercaMcDonalds') || this.get('estaCercaBurgerKing')) && this.get('McDonaldsEsComidaRapida') && this.get('BurgerKingEsComidaRapida')) {
            this.set('estaCercaComidaRapida', true);
        } else {
            this.set('estaCercaComidaRapida', false);
        }
        done();
    });

    engine.addRule('regla2', function(done){
        if(this.get('leGustaMcDonalds') && this.get('estaCercaMcDonalds')) {
            this.set('ofrecerPromocionesDeMcDonalds', true);
        } else {
            this.set('ofrecerPromocionesDeMcDonalds', false);
        }
        done();
    });

    engine.addRule('regla4543', function(done){
        if(this.get('leGustaBurgerKing') && this.get('estaCercaBurgerKing')) {
            this.set('ofrecerPromocionesDeBurgerKing', true);
        } else {
            this.set('ofrecerPromocionesDeBurgerKing', false);
        }
        done();
    });

    engine.addRule('ComprobarSiOfrecerPromocionesDeBurgerKing', function(done){
        if(this.get('leGustaBurgerKing') && this.get('estaCercaComidaRapida') && this.get('BurgerKingEsElComidaRapidaMasCercano')) {
            this.set('ofrecerPromocionesDeBurgerKing', true);
        } else {
            this.set('ofrecerPromocionesDeBurgerKing', false);
        }
        done();
    });

    // ------------------------------------ BOLICHES ------------------------------------
    engine.addRule('ComprobarSileGustaRecorcholis', function(done){
        if(this.get('visitasMensualesARecorcholis') > 2) {
            this.set('leGustaRecorcholis', true);
        } else {
            this.set('leGustaRecorcholis', false);
        }
        done();
    });

    engine.addRule('AgregarNumerosDeBoliche', function(done){
        if(this.get('leGustaRecorcholis') && this.get('RecorcholisEsBoliche')) {
            var numero= this.get('numeroDeLugaresQueLeGustanDeBoliches')
            this.set('numeroDeLugaresQueLeGustanDeBoliches', numero +1);
        }   
        done();
    });

    engine.addRule('ComprobarsiLeGustanBoliches', function(done){
        if(this.get('numeroDeLugaresQueLeGustanDeBoliches') > 3 ) {
            this.set('leGustaBoliches', true);
        } else {
            this.set('leGustaBoliches', false);
        }
        done();
    });

    engine.addRule('ComprobarSiOfrecerPromocionesDeRecorcholis', function(done){
        if(this.get('leGustaRecorcholis') && this.get('esViernes') && this.get('edad') >21 ) {
            this.set('ofrecerPromocionesDeRecorcholis', true);
        } else {
            this.set('ofrecerPromocionesDeRecorcholis', false);
        }   
        done();
    });

    engine.addRule('ComprobarSileGustaLancaster', function(done){
        if(this.get('visitasMensualesALancaster') > 2) {
            this.set('leGustaLancaster', true);
        } else {
            this.set('leGustaLancaster', false);
        }
        done();
    });

    engine.addRule('AgregarNumerosDeBoliche', function(done){
        if(this.get('leGustaLancaster') && this.get('LancasterEsBoliche')) {
            var numero= this.get('numeroDeLugaresQueLeGustanDeBoliches')
            this.set('numeroDeLugaresQueLeGustanDeBoliches', numero +1);
        }   
        done();
    });

    engine.addRule('ComprobarSiOfrecerPromocionesDeLancaster', function(done){
        if(this.get('leGustaLancaster') && this.get('esSabado') && this.get('edad') >21 ) {
            this.set('ofrecerPromocionesDeLancaster', true);
        } else {
            this.set('ofrecerPromocionesDeLancaster', false);
        }   
        done();
    });

    // ------------------------------------ CINE ------------------------------------
    engine.addRule('ComprobarSiEsDiaDeEstrenoDeCine', function(done){
        if(this.get('esJueves')){
            this.set('esDiaDeEstrenoDeCine', true);
        } else{
            this.set('esDiaDeEstrenoDeCine', false);
        }
        done();
    });

    engine.addRule('ComprobarSiOfrecerPromocionesDeCine', function(done){
        if(this.get('AtlasEsCine') && this.get('AtlasEsElCineMasCercano') && this.get('esDiaDeEstrenoDeCine')){
            this.set('ofrecerCarteleraDeCine', true);
            this.set('ofrecerPromocionesDeCine', true);
        } else {
            this.set('ofrecerCarteleraDeCine', false);
            this.set('ofrecerPromocionesDeCine', false);
        }
        done();
    });

    // ------------------------------------ CUMPLEAÑOS ------------------------------------
    engine.addRule('ComprobarSiCumpleAños', function(done){
        if(this.get('fechaActualDentroDelRangoDelCumpleaños')) {
            this.set('ofrecerPromocionesParaCumpleaños', true)
        }
        done();
    });

    engine.addRule('OfrecerLugarParaCumpleañosRecorcholis', function(done){
        if(this.get('fechaActualDentroDelRangoDelCumpleaños') && this.get('leGustaRecorcholis') && this.get('edad') >= 20 ) {
            this.set('ofrecerPromocionesParaCumpleañosEnRecorcholis', true)
        }   
        done();
    });

    engine.addRule('OfrecerLugarParaCumpleañosLancaster', function(done){
        if(this.get('fechaActualDentroDelRangoDelCumpleaños') && this.get('leGustaLancaster') && this.get('edad') >= 20 ) {
            this.set('ofrecerPromocionesParaCumpleañosEnLancaster', true)
        }   
        done();
    });

    engine.addRule('OfrecerLugarParaCumpleañosMcDonalds', function(done){
        if(this.get('fechaActualDentroDelRangoDelCumpleaños') && this.get('leGustaMcDonalds')) {
            this.set('ofrecerPromocionesParaCumpleañosEnMcDonalds', true)
        }   
        done();
    });

    engine.addRule('OfrecerLugarParaCumpleañosElBalón', function(done){
        if(this.get('fechaActualDentroDelRangoDelCumpleaños') && this.get('leGustaElBalón')) {
            this.set('ofrecerPromocionesParaCumpleañosEnElBalón', true)
        }   
        done();
    });

    engine.addRule('OfrecerLugarParaCumpleañosBK', function(done){
        if(this.get('fechaActualDentroDelRangoDelCumpleaños') && this.get('leGustaBurgerKing')) {
            this.set('ofrecerPromocionesParaCumpleañosEnBurguerKing', true)
        }   
        done();
    });
          
    // ------------------------------------ EL ATENEO ------------------------------------
    engine.addRule('comprobarSiLeGustaElAteneo', function(done){
        if(this.get('visitasMensualesAElAteneo') > 10) {
            this.set('leGustaElAteneo', true);
        } else {
            this.set('leGustaElAteneo', false);
        }
        done();
    });

    engine.addRule('comprobarSiLeGustaElAteneoPorMusicos', function(done){
        if(this.get('leGustanMusicos') && this.get('visitasMensualesAElAteneo') > 4) {
            this.set('leGustaElAteneo', true);
        } else {
            this.set('leGustaElAteneo', false);
        }
        done();
    });

    engine.addRule('comprobarSiLeGustaElAteneoPorLibros', function(done){
        if(this.get('leGustanLibros') && this.get('visitasMensualesAElAteneo') > 4) {
            this.set('leGustaElAteneo', true);
        } else {
            this.set('leGustaElAteneo', false);
        }
        done();
    });

    engine.addRule('comprobarSiLeGustaElAteneoPorSeries', function(done){
        if(this.get('leGustanSeries') && this.get('visitasMensualesAElAteneo') > 4) {
            this.set('leGustaElAteneo', true);
        } else {
            this.set('leGustaElAteneo', false);
        }
        done();
    });

    engine.addRule('comprobarSiLeGustanLosMusicos', function(done){
        if(this.get('cantidadMeGustaEnMusicos') > 10) {
            this.set('leGustanMusicos', true);
        } else {
            this.set('leGustanMusicos', false);
        }
        done();
    });

    engine.addRule('comprobarSiLeGustanLasSeries', function(done){
        if(this.get('cantidadMeGustaEnSeries') > 10) {
            this.set('leGustanSeries', true);
        } else {
            this.set('leGustanSeries', false);
        }
        done();
    });

    engine.addRule('comprobarSiMostrarNuevosLibros', function(done){
        if(this.get('leGustaElAteneo') && this.get('leGustanLibros')) {
            this.set('mostrarNuevosLibros', true);
        } else {
            this.set('mostrarNuevosLibros', false);
        }
        done();
    });

          engine.addRule('comprobarSiMostrarNuevosAlbumes', function(done){
              if(this.get('leGustaElAteneo') && this.get('leGustanMusicos')) {
                  this.set('mostrarNuevosAlbumes', true);
              } else {
                  this.set('mostrarNuevosAlbumes', false);
              }
              done();
          });

          engine.addRule('comprobarSiMostrarNuevasSeries', function(done){
              if(this.get('leGustaElAteneo') && this.get('leGustanSeries')) {
                  this.set('mostrarNuevosDVDSeries', true);
              } else {
                  this.set('mostrarNuevosDVDSeries', false);
              }
              done();
          });
          
          engine.addRule('comprobarSiMostrarPromocionesAteneo', function(done){
              if(this.get('leGustaElAteneo') && this.get('visitasMensualesAElAteneo') > 4) {
                  this.set('mostrarPromocionesDeElAteneo', true);
              } else {
                  this.set('mostrarPromocionesDeElAteneo', false);
              }
              done();
          });

      // ------------------------------------- SUPER ---------------------------------
          engine.addRule('comprobarSiLeGustaVea', function(done){
              if(this.get('visitasSemanalesAVea') >= 1) {
                  this.set('leGustaVea', true);
              } else {
                  this.set('leGustaVea', false);
              }
              done();
          });

          engine.addRule('comprobarSiOfrecerPromocionesVea', function(done){
              if(this.get('leGustaVea') && this.get('estaCercaVea')) {
                  this.set('ofrecerPromocionesVea', true);
              } else {
                  this.set('ofrecerPromocionesVea', false);
              }
              done();
          });

          engine.addRule('comprobarSiEsDiaDeDescuentosEnVea', function(done){
              if(this.get('esMiercoles')) {
                  this.set('esDiaDeDescuentosEnVea', true);
              } else {
                  this.set('esDiaDeDescuentosEnVea', false);
              }
              done();
          });

          engine.addRule('comprobarSiMostrarDescuentosLosMiercolesEnVea', function(done){
              if(this.get('leGustaVea') && this.get('esDiaDeDescuentosEnVea')) {
                  this.set('mostrarDescuentosDeMiercolesEnVea', true);
              } else {
                  this.set('mostrarDescuentosDeMiercolesEnVea', false);
              }
              done();
          });

          engine.addRule('comprobarSiLeGustaCarrefour', function(done){
              if(this.get('visitasSemanalesACarrefour') >= 1) {
                  this.set('leGustaCarrefour', true);
              } else {
                  this.set('leGustaCarrefour', false);
              }
              done();
          });

          engine.addRule('comprobarSiConcurreASupermercados', function(done){
              if(this.get('leGustaVea') && this.get('leGustaCarrefour')) {
                  this.set('concurreASupermercados', true);
              } else {
                  this.set('concurreASupermercados', false);
              }
              done();
          });

          engine.addRule('comprobarSiOfrecerPromocionesDeVea', function(done){
              if(this.get('concurreASupermercados') && this.get('estaCercaVea')) {
                  this.set('ofrecerPromocionesVea', true);
              } else {
                  this.set('ofrecerPromocionesVea', false);
              }
              done();
          });

          engine.addRule('comprobarSiOfrecerPromocionesCarrefour', function(done){
              if(this.get('concurreASupermercados') && this.get('estaCercaCarrefour')) {
                  this.set('ofrecerPromocionesCarrefour', true);
              } else {
                  this.set('ofrecerPromocionesCarrefour', false);
              }
              done();
          });

          engine.addRule('comprobarSiOfrecerPromocionesDeCarrefour', function(done){
              if(this.get('leGustaCarrefour') && this.get('estaCercaCarrefour')) {
                  this.set('ofrecerPromocionesCarrefour', true);
              } else {
                  this.set('ofrecerPromocionesCarrefour', false);
              }
              done();
          });

          engine.addRule('comprobarSiOfrecerPromocionesVeaYCarrefour', function(done){
              if(this.get('concurreASupermercados')) {
                  this.set('ofrecerPromocionesVea', true);
                  this.set('ofrecerPromocionesCarrefour', true);
              } else {
                  this.set('ofrecerPromocionesVea', false);
                  this.set('ofrecerPromocionesCarrefour', false)
              }
              done();
          });
*/
}

SistemaExperto.prototype.inferir = function(se){
    console.log(se);
	// launches inference
	var engine = se.engine;
	engine.infer(function(err) {
	    if (err) {
	        console.log(err);
	        return;
	    }

	    // will print "5"
	    console.log(engine.get("i"));
        console.log(engine.get("bai"));
        console.log(engine.get('leGustaPoco'));
	});
}

SistemaExperto.prototype.setBaseDeHechos = function(entradasNitidas, entradasFusificadas, se, callback){
    se.setBaseDeHechosDifusa(entradasFusificadas);
    se.setBaseDeHechosNitida(entradasNitidas);
    console.log(se);
    callback(se);
}

SistemaExperto.prototype.ejecutar = function(entradasNitidas, entradasFusificadas){
    this.agregarReglas(entradasFusificadas, entradasNitidas, this.setBaseDeHechos);
    this.setBaseDeHechosDifusa(entradasFusificadas);
    this.setBaseDeHechosNitida(entradasNitidas);
    //this.agregarReglas(entradasFusificadas, entradasNitidas, this.setBaseDeHechos);
    
    console.log(this.engine);
	//this.inferir();
}

/*
var se = new SistemaExperto();
se.agregarReglas();
se.setBaseDeHechosNítida();
se.inferir();
*/