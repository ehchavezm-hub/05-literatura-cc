(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Guardian = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  // API key pública de The Guardian (test key — documentada y de uso libre)
  const API_KEY = 'test';
  const BASE    = 'https://content.guardianapis.com';

  async function buscar(termino, diasAtras) {
    let dateParam = '';
    if (isFinite(diasAtras)) {
      const desde = new Date();
      desde.setDate(desde.getDate() - diasAtras);
      dateParam = `&from-date=${desde.toISOString().split('T')[0]}`;
    }
    const url = `${BASE}/search?q=${encodeURIComponent(termino)}&section=books|culture|stage|arts&api-key=${API_KEY}&show-fields=headline,trailText,thumbnail&page-size=20${dateParam}&order-by=newest`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.response?.results || []).map(item => ({
        titulo: item.webTitle || '',
        descripcion: item.fields?.trailText || '',
        url: item.webUrl || '',
        fuente: 'The Guardian',
        tipo: 'resena',
        ambito: 'internacional',
        fecha: item.webPublicationDate?.substring(0, 10) || null,
      }));
    } catch {
      return [];
    }
  }

  async function buscarLibros(diasAtras) {
    return buscar('books review literature', diasAtras);
  }

  async function buscarCritica(termino, diasAtras) {
    return buscar(termino + ' review criticism', diasAtras);
  }

  return { buscar, buscarLibros, buscarCritica };
});
