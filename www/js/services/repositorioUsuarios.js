var SEXO = {
	MASCULINO: 'Masculino',
	FEMENINO: 'Femenino'
}

function BaseDeDatosDeUsuarios() {
	this.Usuarios = [
		{id: "123", nombre: "Leandro", sexo: SEXO.MASCULINO, src:"", fechaN: '11/27/1992', visitas: [], lugaresConMeGusta: []}, 
		{id: "212", nombre: "Ariana", sexo: SEXO.FEMENINO, src:"", fechaN: '12/07/1993', visitas: [], lugaresConMeGusta: []}
	];

	this.Usuarios[0].visitas.push(
		new Visita(
			'05/28/2016',
			new Lugar(
				[NEGOCIOS.MCDONALD], 
				new Ubicacion("23.56347294", "54.12337982", 
				'Restaurante de Comida Rápida') 
			)
		)
	);

	this.Usuarios[0].visitas.push(
		new Visita(
			'05/28/2016',
			new Lugar(
				[NEGOCIOS.MCDONALD], 
				new Ubicacion("23.56347294", "54.12337982", 
				'Restaurante de Comida Rápida') 
			)
		)
	);

	this.Usuarios[0].visitas.push(
		new Visita(
			'05/28/2016',
			new Lugar(
				[NEGOCIOS.MCDONALD], 
				new Ubicacion("23.56347294", "54.12337982", 
				'Restaurante de Comida Rápida') 
			)
		)
	);

	this.Usuarios[0].visitas.push(
		new Visita(
			'05/28/2016',
			new Lugar(
				[NEGOCIOS.MCDONALD], 
				new Ubicacion("23.56347294", "54.12337982", 
				'Restaurante de Comida Rápida') 
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);

	this.Usuarios[1].visitas.push(
		new Visita(
			'05/25/2016',
			new Lugar(
				[NEGOCIOS.RECORCHOLIS],
				new Ubicacion("23.56589209", "54.12198742"),
				'Discoteca'
			)
		)
	);
	/*
	this.Usuarios[0].visitasUltimoMes[NEGOCIOS.RECORCHOLIS] = 14;
	this.Usuarios[0].visitasUltimoMes[NEGOCIOS.BURGER_KING] = 3;
	this.Usuarios[0].visitasUltimoMes[NEGOCIOS.MCDONALD] = 2;
	this.Usuarios[1].visitasUltimoMes[NEGOCIOS.LA_PIZZADA] = 4;
	this.Usuarios[1].visitasUltimoMes[NEGOCIOS.EL_ATENEO] = 7;

	this.Usuarios[0].visitasSemanales[NEGOCIOS.VEA] = 1;
	this.Usuarios[0].visitasSemanales[NEGOCIOS.CARREFOUR] = 2;
	this.Usuarios[1].visitasSemanales[NEGOCIOS.CARREFOUR] = 5;
	*/
	this.Usuarios[0].lugaresConMeGusta = [NEGOCIOS.RECORCHOLIS, NEGOCIOS.MCDONALD, NEGOCIOS.BURGER_KING];
	this.Usuarios[1].lugaresConMeGusta = [NEGOCIOS.LA_PIZZADA, NEGOCIOS.VEA, NEGOCIOS.CARREFOUR];
}

BaseDeDatosDeUsuarios.prototype.getTodosLosUsuarios = function() {
	return this.Usuarios;
}
BaseDeDatosDeUsuarios.prototype.getUsuarioPorId = function(id) {
	for (var i = 0; i < this.getTodosLosUsuarios().length; i++) {
		if (this.getTodosLosUsuarios()[i].id == id) {
			return this.getTodosLosUsuarios()[i];
		}
	}
}
BaseDeDatosDeUsuarios.prototype.getLugaresConMeGusta = function(id){
	for (var i = 0; i < this.Usuarios.length; i++) {
		if(this.Usuarios[i].id == id){
			return this.Usuarios[i].lugaresConMeGusta;
		}
	}
}
BaseDeDatosDeUsuarios.prototype.visitasAUnLugar = function(id, lugar){
	var usuario = this.getUsuarioPorId(id);
	var contador = 0;

	for(var i = 0; i < usuario.visitas.length; i++){
		var lugarVisitado = usuario.visitas[i].getLugar().getNombre();
		if(lugar.toString().trim() === lugarVisitado.toString().trim()){
			contador++;
		}
	}
	return contador;
}