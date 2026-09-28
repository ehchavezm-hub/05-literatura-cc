(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Libros = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  async function buscarOpenLibrary(termino, limite = 40) {
    // Sin filtro de idioma para cubrir ediciones en cualquier lengua
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}&limit=${limite}&fields=title,author_name,key,first_publish_year,publisher,language`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.docs || []).map(libro => ({
        titulo: libro.title,
        autores: (libro.author_name || []).join(', '),
        url: `https://openlibrary.org${libro.key}`,
        fuente: 'Open Library',
        tipo: 'libro',
        acceso_abierto: true,
        fecha: libro.first_publish_year?.toString() || null,
        editorial: (libro.publisher || [])[0] || '',
        ambito: 'internacional',
      }));
    } catch {
      return [];
    }
  }

  async function buscarGoogleBooks(termino, orden = 'relevance', limite = 40) {
    // Sin langRestrict para no perder ediciones de autores no hispanohablantes
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termino)}&maxResults=${limite}&orderBy=${orden}`;
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
          fecha: info.publishedDate || null,
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
