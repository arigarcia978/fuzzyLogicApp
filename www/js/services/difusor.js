var fuzzylogic= require("fuzzylogic");
var $ = require('jquery-browserify');

function Difusor(){}

Difusor.prototype.fusificar = function(entradas){

}

var threatCalc = function(threat) {
    var probabNoAttack          = fuzzylogic.triangle(threat, 0, 20, 40);
    var probabNormalAttack      = fuzzylogic.trapezoid(threat, 20, 30, 90, 100);
    var probabEnragedAttack     = fuzzylogic.grade(threat, 90, 100);
    sys.log('Threat: ' + threat);
    sys.log('no attack: '       + probabNoAttack);
    sys.log('normal attack: '   + probabNormalAttack);
    sys.log('enraged attack: '  + probabEnragedAttack);
};

var fusificarVisitasMensuales = function(visitas){
	var pocoFrecuente = fuzzylogic.trapezoid(visitas, 0, 0, 2, 3);
	var frecuente = fuzzylogic.triangle(visitas, 2, 4, 7);
	var muyFrecuente = fuzzylogic.trapezoid(visitas, 5, 7, 100);

	console.log('visitas: '+visitas);
	console.log('pocoFrecuente: '+pocoFrecuente);
	console.log('frecuente: '+frecuente);
	console.log('muyFrecuente: '+muyFrecuente);
}

fusificarVisitasMensuales(20);