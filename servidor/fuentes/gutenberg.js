const { fetchConLimite } = require('./utilidades');

async function buscarGutenberg(termino) {
  const url = `https://gutendex.com/books/?search=${encodeURIComponent(termino)}&languages=es,en`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.results || []).map(libro => ({
      titulo: libro.title,
      autores: libro.authors.map(a => a.name).join(', '),
      url: libro.formats['text/html'] || libro.formats['application/epub+zip'] || `https://www.gutenberg.org/ebooks/${libro.id}`,
      fuente: 'Project Gutenberg',
      tipo: 'clasico',
      acceso: 'libre',
      fecha: libro.copyright ? String(libro.copyright) : null,
    }));
  } catch {
    return [];
  }
}

module.exports = { buscarGutenberg };
