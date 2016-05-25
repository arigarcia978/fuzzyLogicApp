function AdaptadorFB() {
	this.BDPaginasTipo = {};
	this.BDPaginasTipo[NEGOCIOS.MCDONALD] = 'Hamburguesería';
	this.BDPaginasTipo[NEGOCIOS.LA_PIZZADA] = 'Restaurante';
	this.BDPaginasTipo[NEGOCIOS.BURGER_KING] = 'Comida Rápida';
	this.BDPaginasTipo[NEGOCIOS.RECORCHOLIS] = 'Club Nocturno';
	this.BDPaginasTipo[NEGOCIOS.EL_ATENEO] = 'Libreria';
	this.BDPaginasTipo[EXTRAS.HARRY_POTTER] = 'Libro';
	this.BDPaginasTipo[NEGOCIOS.EL_BALON] = 'Bar Restaurante';
	this.BDPaginasTipo[NEGOCIOS.MIL99] = 'Bar';
	this.BDPaginasTipo[NEGOCIOS.ATLAS] = 'Entretenimiento';
	this.BDPaginasTipo[NEGOCIOS.LANCASTER] = 'Club';
	this.BDPaginasTipo[NEGOCIOS.VEA] = 'Productos';
	this.BDPaginasTipo[NEGOCIOS.CARREFOUR] = 'Mercado';
	/*
	this.BDUsuarios = {
		"Leandro": [NEGOCIOS.RECORCHOLIS, NEGOCIOS.MCDONALD, NEGOCIOS.BURGER_KING],
		"Ariana": [NEGOCIOS.MCDONALD, NEGOCIOS.LA_PIZZADA, EXTRAS.HARRY_POTTER]
	}
	*/
}
AdaptadorFB.prototype.getMeGusta = function(id) {	//De id toy usando el nombre
	return this.BDUsuarios[id];
}
AdaptadorFB.prototype.getTipoPaginaMeGusta = function (nombrePagina) {
	return this.BDPaginasTipo[nombrePagina];
}
AdaptadorFB.prototype.getMeGustanEnFB = function(id) {	//idPerfilFace?
	var meGustan = this.getMeGusta(id); //id es nombre ahora
	var lugares = [];
	for (var i = 0; i < meGustan.length; i++) {
		var nombrePagina = meGustan[i];
		var tipoPagina = this.getTipoPaginaMeGusta(nombrePagina);

		lugares.push(new MeGustaEnFB(nombrePagina, tipoPagina));
	}
	return lugares;
}
