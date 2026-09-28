(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_DOAJ = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const BASE = 'https://doaj.org/api/search/articles';

  async function buscar(termino, diasAtras) {
    let filtroFecha = '';
    if (isFinite(diasAtras)) {
      const desde = new Date();
      desde.setDate(desde.getDate() - diasAtras);
      filtroFecha = `&fqv=year:${desde.getFullYear()}`;
    }
    const url = `${BASE}/${encodeURIComponent(termino)}?pageSize=20&sort=created_date:desc${filtroFecha}`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.results || []).map(item => {
        const bib = item.bibjson || {};
        const journal = (bib.journal || {});
        const enlace = (bib.link || []).find(l => l.type === 'fulltext') || {};
        const autores = (bib.author || []).map(a => a.name).join(', ');
        return {
          titulo: bib.title || '',
          autores,
          revista: journal.title || '',
          url: enlace.url || `https://doaj.org/article/${item.id}`,
          pdf_url: enlace.url && enlace.url.endsWith('.pdf') ? enlace.url : null,
          fuente: journal.title || 'DOAJ',
          tipo: 'ensayo',
          acceso_abierto: true,
          fecha: (bib.year || '').toString() || null,
          ambito: 'internacional',
        };
      }).filter(i => i.titulo);
    } catch {
      return [];
    }
  }

  async function buscarCritica(diasAtras) {
    return buscar('literary criticism review literatura', diasAtras);
  }

  async function buscarLatinoamerica(diasAtras) {
    return buscar('literatura latinoamerica critica hispanica', diasAtras);
  }

  return { buscar, buscarCritica, buscarLatinoamerica };
});
