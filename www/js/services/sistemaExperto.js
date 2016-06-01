
    function SistemaExperto() {
    	//this.engine = new InfernalEngine();
        this.engine = new InferenceEngine();
    }
    SistemaExperto.prototype.setBaseDeHechosNitida = function(lugares){
        //una sola variable de MG. si si le gusta, vale 1, sino le gusta vale 0 o 0.3. algo bajo
        var engine = this.engine;
        global = engine;
        //+ el nombre del lugar aqui abajo
        //engine.set('leGusta', 0.5);
        for(var i = 0; i < lugares.length; i++){
            var variable = 'leGustaEnFB'+sistemaClasificador.standarizarNombreVariable(lugares[i].getNombre().toString());
            var valor = lugares[i].getMeGusta();
            if(valor){
                engine.set(variable, 0.7);
            } else {
                engine.set(variable, 0.3);
            }
        }
    }

    SistemaExperto.prototype.setBaseDeHechosDifusa = function(entradasFusificadas){
        var engine = this.engine;

        //seteo frecuencia difusa a lugares
        var frecuenciaDeLugares = entradasFusificadas.frecuenciaDeLugares;
        for(var i = 0; i < frecuenciaDeLugares.length; i++){
            var lugar = frecuenciaDeLugares[i];
            
            var nombreDeLugar = sistemaClasificador.standarizarNombreVariable(lugar.nombre.toString());
            var probabilidades = lugar.probabilidades;
            
            engine.set('visitasPocosFrecuentesA'+nombreDeLugar, probabilidades.pocoFrecuente);  
            engine.set('visitasFrecuentesA'+nombreDeLugar, probabilidades.frecuente);
            engine.set('visitasMuyFrecuentesA'+nombreDeLugar, probabilidades.muyFrecuente);
        }

        //seteo distancia difusa a cada lugar
        var distanciasACadaLugar = entradasFusificadas.distanciasACadaLugar;
        for(var i = 0; i < distanciasACadaLugar.length; i++){
            var lugar = distanciasACadaLugar[i];

            var nombreDeLugar = sistemaClasificador.standarizarNombreVariable(lugar.nombre.toString());
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

    SistemaExperto.prototype.agregarReglasDeLeGusta = function(entradasFusificadas){
        var engine = this.engine;
        //reglas de le gusta mucho, poco, normal
        var frecuenciaDeLugares = entradasFusificadas.frecuenciaDeLugares;
        for(var i = 1; i <= frecuenciaDeLugares.length; i++){
            var nombreDeLugar = sistemaClasificador.standarizarNombreVariable(frecuenciaDeLugares[i-1].nombre.toString());
            var pocoFrecuente = engine.get('visitasPocosFrecuentesA'+nombreDeLugar);
            var frecuente = engine.get('visitasFrecuentesA'+nombreDeLugar);
            var muyFrecuente = engine.get('visitasMuyFrecuentesA'+nombreDeLugar);
            var leGustaEnFB = engine.get('leGustaEnFB'+nombreDeLugar);

            var funcionLeGustaPoco = 'if(pocoFrecuente && leGustaEnFB){ console.log("ohlix"); var valor = motorMatematico.realizarAND([pocoFrecuente, leGustaEnFB]); this.set("variable", valor);} else {this.set("variable", 0);}';

            funcionLeGustaPoco = funcionLeGustaPoco.replace(new RegExp('variable', 'g'), eval("'leGustaPoco'+nombreDeLugar"));
            funcionLeGustaPoco = funcionLeGustaPoco.replace(new RegExp('pocoFrecuente', 'g'), pocoFrecuente);
            funcionLeGustaPoco = funcionLeGustaPoco.replace(new RegExp('leGustaEnFB', 'g'), leGustaEnFB);
            
            engine.addRule('reglasMeGustaPoco'+i, funcionLeGustaPoco);

            var funcionLeGustaMasomenos = 'if(frecuente && leGustaEnFB){var valor = motorMatematico.realizarAND([frecuente, leGustaEnFB]);this.set("variable", valor);} else {this.set("variable", 0);}';

            funcionLeGustaMasomenos = funcionLeGustaMasomenos.replace(new RegExp('variable', 'g'), eval("'leGustaMasomenos'+nombreDeLugar"));
            funcionLeGustaMasomenos = funcionLeGustaMasomenos.replace(new RegExp('frecuente', 'g'), frecuente);
            funcionLeGustaMasomenos = funcionLeGustaMasomenos.replace(new RegExp('leGustaEnFB', 'g'), leGustaEnFB);

            engine.addRule('funcionLeGustaMasomenos'+i, funcionLeGustaMasomenos);
            
            var funcionLeGustaMucho = 'if(muyFrecuente && leGustaEnFB){ var valor = motorMatematico.realizarAND([muyFrecuente, leGustaEnFB]); this.set("variable", valor); } else { this.set("variable", 0);}';

            funcionLeGustaMucho = funcionLeGustaMucho.replace(new RegExp('variable', 'g'), eval("'leGustaMucho'+nombreDeLugar"));
            funcionLeGustaMucho = funcionLeGustaMucho.replace(new RegExp('muyFrecuente', 'g'), muyFrecuente);
            funcionLeGustaMucho = funcionLeGustaMucho.replace(new RegExp('leGustaEnFB', 'g'), leGustaEnFB);
            
            engine.addRule('reglasMeGustaMucho3'+i, funcionLeGustaMucho);
        }
    }
        //agregar funcion o algo
    SistemaExperto.prototype.agregarReglasDeOfrecerPromociones = function(entradasFusificadas){
        var engine = this.engine;
        
        //reglas de le gusta mucho, poco, normal
        var frecuenciaDeLugares = entradasFusificadas.frecuenciaDeLugares;
        for(var i = 1; i <= frecuenciaDeLugares.length; i++){
            var nombreDeLugar = sistemaClasificador.standarizarNombreVariable(frecuenciaDeLugares[i-1].nombre.toString());

            var leGustan = [
                engine.get('leGustaPoco'+nombreDeLugar),
                engine.get(eval("'leGustaPoco'+nombreDeLugar")), 
                engine.get(eval("'leGustaMasomenos'+nombreDeLugar")), 
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

                        var leGustaLugar = leGustan[w];
                        var cercaniaDeLugar = cercania[j];
                        var movilidadDeUsuario = movilidad[k];
                        var funcion = 'if(leGustaLugar && cercaniaDeLugar && movilidadDeUsuario){var valor = motorMatematico.realizarAND([leGustaLugar, cercaniaDeLugar, movilidadDeUsuario]); this.set("variable", valor);} else { this.set("variable", 0);}';

                        funcion = funcion.replace(new RegExp('variable', 'g'), eval("'ofrecerPromocionesDe'+nombreDeLugar"));
                        funcion = funcion.replace(new RegExp('leGustaLugar', 'g'), leGustaLugar);
                        funcion = funcion.replace(new RegExp('cercaniaDeLugar', 'g'), cercaniaDeLugar);
                        funcion = funcion.replace(new RegExp('movilidadDeUsuario', 'g'), movilidadDeUsuario);

                        engine.addRule(nombreDeRegla, funcion);
                    }
                }
            }
        }
    }

    SistemaExperto.prototype.inferir = function(){
    	var engine = this.engine;
    	engine.infer();
        return this.engine.getResultados();
    }

    SistemaExperto.prototype.ejecutar = function(lugares, entradasFusificadas){
        var se = this;
        this.setBaseDeHechosDifusa(entradasFusificadas);
        this.setBaseDeHechosNitida(lugares);
        this.agregarReglasDeLeGusta(entradasFusificadas);
        this.inferir();
        this.agregarReglasDeOfrecerPromociones(entradasFusificadas);
        this.inferir();
        console.log(this);
        
        var resultados = this.inferir();
        return resultados;
    }