(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Gutenberg = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  async function buscar(termino) {
    const url = `https://gutendex.com/books/?search=${encodeURIComponent(termino)}&languages=es,en`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.results || []).map(libro => ({
        titulo: libro.title,
        autores: libro.authors.map(a => a.name).join(', '),
        url: libro.formats['text/html'] || libro.formats['application/epub+zip'] || `https://www.gutenberg.org/ebooks/${libro.id}`,
        fuente: 'Project Gutenberg',
        tipo: 'clasico',
        acceso: 'libre',
        fecha: libro.copyright ? String(libro.copyright) : null,
        ambito: 'internacional',
      }));
    } catch {
      return [];
    }
  }

  return { buscar };
});
