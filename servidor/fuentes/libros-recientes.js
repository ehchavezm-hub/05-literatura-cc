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

async function buscarGoogleBooks(termino, orderBy = 'newest', maxResults = 15, langRestrict = 'es', minYear = null) {
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const keyParam = key ? `&key=${key}` : '';
  const langParam = langRestrict ? `&langRestrict=${langRestrict}` : '';
  // Pedir el doble para compensar los que filtramos por fecha
  const limit = minYear ? Math.min(maxResults * 2, 40) : maxResults;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termino)}${langParam}&maxResults=${limit}&orderBy=${orderBy}${keyParam}`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.items || [])
      .map(item => {
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
      })
      .filter(item => {
        if (!minYear || !item.fecha) return true;
        return parseInt(item.fecha, 10) >= minYear;
      })
      .slice(0, maxResults);
  } catch {
    return [];
  }
}

module.exports = { buscarOpenLibrary, buscarGoogleBooks };
