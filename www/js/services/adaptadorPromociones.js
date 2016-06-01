function AdaptadorPromociones(){
	this.promociones = {};
	//agregar id y fotos a promociones
	this.promociones[NEGOCIOS.BURGER_KING] = [
		{"Id":"1","Titulo":"Combo Stacker","Descripcion":"Combo Stacker de 20 hamburguesas a $300"},
		{"Id":"2","Titulo":"Rockles","Descripcion":"Helado Rockles a $45"}
	];
	this.promociones[NEGOCIOS.LA_PIZZADA] = [
		{"Id":"3","Titulo":"Promo Pizzas Locas","Descripcion":"Comprando 3 pizzas Especiales pagas solo 2"}
	];
	this.promociones[NEGOCIOS.MCDONALD] = [
		{"Id":"4","Titulo":"Promo Big Mac","Descripcion":"Combo Big Mac con queso a $120"},
		{"Titulo":"McFlurry","Descripcion":"Descuento de 25% con la compra de un combo Cuarto de Libra"}
	];
	this.promociones[NEGOCIOS.MIL99] = [
		{"Titulo":"Menu del Dia","Descripcion":"Menu del dia $45"},
		{"Titulo":"Licuado","Descripcion":"Licuado con tostado $30"}
	];
	this.promociones[NEGOCIOS.EL_BALON] = [
		{"Titulo":"Milanesa a Caballo","Descripcion":"Milanesa a Caballo para dos personas con gaseosa de litro a $150"},
		{"Titulo":"Pizza","Descripcion":"Pizza de Fruta Wumpa de 6 porciones a $70"}
	];
	this.promociones[NEGOCIOS.CARREFOUR] = [];
	this.promociones[NEGOCIOS.VEA] = [
		{"Titulo":"Turrón navideño","Descripcion": "Turrón navideño a 75% de descuento"},
		{"Titulo":"Arma tu fiesta","Descripcion": "Comprando 2 paquetes de hamburguesas patty te llevas un paquete de 4 panes gratis"}
	];
	this.promociones[NEGOCIOS.ATLAS] = [
		{"Titulo":"Jueves-Viernes-Sabado-Domingo-Lunes y Martes","Descripcion":" 2D: 2 x $ 160 / 3D: 2 x $ 180"},
		{"Titulo":"Miercoles","Descripcion":"2D: $ 45 / 3D: $ 50"}
	];
	this.promociones[NEGOCIOS.EL_ATENEO] = [
		{"Titulo":"Promociones","Descripcion": "%20 de Descuento en la compra de toda la Saga Canción de Hielo y Fuego"}
	];
	this.promociones[NEGOCIOS.LANCASTER] = [
		{"Titulo":"Promo","Descripcion":"Si traes una amiga pasas gratis"}
	];
	this.promociones[NEGOCIOS.RECORCHOLIS] = [
		{"Titulo":"4x1 en bebidas","Descripcion":"Este viernes 4x1 en bebidas hasta 2 am"},
	    {"Titulo":"Listas","Descripcion":"Listas Free"},
	    {"Titulo":"Cumpleaños","Descripcion":"Festeja tu cumpleaños. Lista y Champagne"}
	];
}
AdaptadorPromociones.prototype.getPromocion = function(lugar){
	console.log(lugar);
	var nombreNormalizado = sistemaClasificador.standarizarNombreVariable(lugar.toString());
	var promociones = this.promociones[lugar];
	return promociones[0];
}

