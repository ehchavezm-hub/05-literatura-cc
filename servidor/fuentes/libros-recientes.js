const { fetchConLimite } = require('./utilidades');

async function buscarOpenLibrary(termino) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}&limit=15&language=spa`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.docs || []).map(libro => ({
      titulo: libro.title,
      autores: (libro.author_name || []).join(', '),
      url: `https://openlibrary.org${libro.key}`,
      fuente: 'Open Library',
      tipo: 'libro',
      fecha: libro.first_publish_year?.toString() || null,
      editorial: (libro.publisher || [])[0] || '',
    }));
  } catch {
    return [];
  }
}

async function buscarGoogleBooks(termino) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termino)}&langRestrict=es&maxResults=15&orderBy=newest`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.items || []).map(item => {
      const info = item.volumeInfo || {};
      return {
        titulo: info.title || '',
        autores: (info.authors || []).join(', '),
        url: info.infoLink || '',
        fuente: 'Google Books',
        tipo: 'libro',
        fecha: info.publishedDate?.substring(0, 4) || null,
        editorial: info.publisher || '',
      };
    });
  } catch {
    return [];
  }
}

module.exports = { buscarOpenLibrary, buscarGoogleBooks };
