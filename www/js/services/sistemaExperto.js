function SistemaExperto() {
	this.engine = new InfernalEngine();
}

SistemaExperto.prototype.setBaseDeHechosNítida = function(){
	// Set a value to the fact "i"
	this.engine.set("i", 1);
}

SistemaExperto.prototype.setBaseDeHechosDifusa = function(entradasFusificadas){}

SistemaExperto.prototype.agregarReglas = function(){
	// Adds a rule named "increment" to increment the value of 'i' up to 5.
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
}

SistemaExperto.prototype.inferir = function(){
	// launches inference
	var engine = this.engine;
	engine.infer(function(err) {
	    if (err) {
	        console.log(err);
	        return;
	    }

	    // will print "5"
	    console.log(engine.get("i"));
	});
}

SistemaExperto.prototype.ejecutar = function(entradasFusificadas){
	this.agregarReglas();
	this.setBaseDeHechosNítida();
	this.setBaseDeHechosDifusa(entradasFusificadas);
	this.inferir();
}

var se = new SistemaExperto();
se.agregarReglas();
se.setBaseDeHechosNítida();
se.inferir();