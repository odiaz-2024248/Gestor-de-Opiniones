class Publicacion {
  constructor(titulo, categoria, texto, autor) {
    this.titulo = titulo;
    this.categoria = categoria;
    this.texto = texto;
    this.autor = autor;
    this.fecha = new Date();
  }
}

module.exports = Publicacion;