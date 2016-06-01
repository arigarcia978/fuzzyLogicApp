function Promocion(titulo, descripcion) {
   this.titulo = titulo;
   this.descripcion = descripcion;
}
Promocion.prototype.getTitulo = function() {return this.titulo;};
Promocion.prototype.getDescripcion = function() {return this.descripcion;};