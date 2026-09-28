(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Crossref = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  async function buscar(termino, diasAtras = 365) {
    let filtroFecha = '';
    if (isFinite(diasAtras)) {
      const desde = new Date();
      desde.setDate(desde.getDate() - diasAtras);
      filtroFecha = `&filter=from-pub-date:${desde.toISOString().split('T')[0]}`;
    }
    const url = `https://api.crossref.org/works?query=${encodeURIComponent(termino)}${filtroFecha}&rows=15&select=DOI,title,author,published,container-title,URL`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.message?.items || []).map(item => ({
        titulo: item.title?.[0] || 'Sin título',
        autores: (item.author || []).map(a => `${a.given || ''} ${a.family || ''}`.trim()).join(', '),
        revista: item['container-title']?.[0] || '',
        url: item.URL || `https://doi.org/${item.DOI}`,
        fuente: item['container-title']?.[0] || 'Crossref',
        tipo: 'ensayo',
        fecha: item.published?.['date-parts']?.[0]?.[0]?.toString() || null,
        ambito: 'internacional',
      }));
    } catch {
      return [];
    }
  }

  return { buscar };
});
