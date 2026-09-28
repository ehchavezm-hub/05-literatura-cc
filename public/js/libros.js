(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Libros = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  async function buscarOpenLibrary(termino) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}&limit=12&language=spa`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.docs || []).map(libro => ({
        titulo: libro.title,
        autores: (libro.author_name || []).join(', '),
        url: `https://openlibrary.org${libro.key}`,
        fuente: 'Open Library',
        tipo: 'libro',
        fecha: libro.first_publish_year?.toString() || null,
        editorial: (libro.publisher || [])[0] || '',
        ambito: 'internacional',
      }));
    } catch {
      return [];
    }
  }

  async function buscarGoogleBooks(termino) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termino)}&langRestrict=es&maxResults=12&orderBy=newest`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
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
          portada: info.imageLinks?.thumbnail || null,
          ambito: 'internacional',
        };
      });
    } catch {
      return [];
    }
  }

  return { buscarOpenLibrary, buscarGoogleBooks };
});
