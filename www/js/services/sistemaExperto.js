function SistemaExperto() {
	//this.engine = new InfernalEngine();
    this.engine = new InferenceEngine();
}

SistemaExperto.prototype.setBaseDeHechosNitida = function(lugares){
	/*
        var engine = this.engine;
        engine.set("i", 1);
    */
    //setear me gustas
    //una sola variable de MG. si si le gusta, vale 1, sino le gusta vale 0 o 0.3. algo bajo
    var engine = this.engine;
    //+ el nombre del lugar aqui abajo
    engine.set('leGusta', 0.5);
    for(var i = 0; i < lugares.length; i++){
        var variable = 'leGustaEnFB'+lugares[i].getNombre().toString();
        var valor = lugares[i].getMeGusta();
        engine.set(variable, valor);
    }
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

SistemaExperto.prototype.agregarReglas = function(entradasFusificadas){
    var engine = this.engine;
    
    //reglas de le gusta mucho, poco, normal
    var frecuenciaDeLugares = entradasFusificadas.frecuenciaDeLugares;

    for(var i = 1; i <= frecuenciaDeLugares.length; i++){
        var nombreDeLugar = frecuenciaDeLugares[i-1].nombre;
        var pocoFrecuente = engine.get('visitasPocosFrecuentesA'+nombreDeLugar);
        var frecuente = engine.get('visitasFrecuentesA'+nombreDeLugar);
        var muyFrecuente = engine.get('visitasMuyFrecuentesA'+nombreDeLugar);

        var aBuscar = 'leGustaEnFB'+nombreDeLugar;
        var leGusta = engine.get(aBuscar);
        var funcionLeGustaPoco = function(){
            var variable = 'leGustaPoco'+nombreDeLugar;
            if(pocoFrecuente && leGusta){
                var valor = motorMatematico.realizarAND([pocoFrecuente, leGusta]);
                engine.set(variable, valor);
            } else {
                engine.set(variable, 0);
            }
        }

        var funcionLeGustaMasomenos = function(){
            var variable = 'leGustaMasomenos'+nombreDeLugar;
            if(frecuente && leGusta){
                var valor = motorMatematico.realizarAND([frecuente, leGusta]);
                engine.set(variable, valor);
            } else {
                engine.set(variable, 0);
            }
        }

        var funcionLeGustaMucho = function(){
            var variable = 'leGustaMucho'+nombreDeLugar;
            if(muyFrecuente && leGusta){
                var valor = motorMatematico.realizarAND([muyFrecuente, leGusta]);
                engine.set(variable, valor);
            } else {
                engine.set(variable, 0);
            }
        }
        
        engine.addRule('reglasMeGustaPoco'+i, funcionLeGustaPoco);
        engine.addRule('reglasMeGustaMasomenos'+i, funcionLeGustaMasomenos);
        engine.addRule('reglasMeGustaMucho3'+i, funcionLeGustaMucho);

        var leGustan = [
            engine.get('leGustaPoco'+nombreDeLugar), 
            engine.get('leGustaMasomenos'+nombreDeLugar), 
            engine.get('leGustaMucho'+nombreDeLugar)
        ];

        var cercania = [
            engine.get('distanciaMuyCortaA'+nombreDeLugar), 
            engine.get('distanciaCortaA'+nombreDeLugar), 
            engine.get('distanciaMediaA'+nombreDeLugar), 
            engine.get('distanciaGrandeA'+nombreDeLugar)
        ];

        var movilidad = [
            engine.get('movilidadLenta'), 
            engine.get('movilidadRapida')
        ];

        //reglas que relacionan leGusta, cercania y movilidad
        for(var w = 0; w < leGustan.length; w++){
            for(var j = 0; j < cercania.length; j++){
                for(var k = 0; k < movilidad.length; k++){
                    var nombreDeRegla = 'ofrecerPromocionesDe'+nombreDeLugar+'CuandoMG'+w+'Cerca'+j+'Mov'+k;
                    var funcion = function(){
                        var variable = 'ofrecerPromocionesDe'+nombreDeLugar;
                        if(leGustan[w] && cercania[j] && movilidad[k]){
                            var valor = motorMatematico.realizarAND([leGustan[w], cercania[j], movilidad[k]]);
                            engine.set(variable, valor);
                        } else {
                            engine.set(variable, 0);
                        }
                    }
                    engine.addRule(nombreDeRegla, funcion);
                }
            }
        }
    }
}

SistemaExperto.prototype.inferir = function(){
    /*
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
    */
    return this.engine.getResultados();
}

SistemaExperto.prototype.ejecutar = function(lugares, entradasFusificadas){
    this.setBaseDeHechosDifusa(entradasFusificadas);
    this.setBaseDeHechosNitida(lugares);
    this.agregarReglas(entradasFusificadas);
    var resultados = this.inferir();
    console.log(this);    
    return resultados;
}