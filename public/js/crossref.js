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
    const url = `https://api.crossref.org/works?query=${encodeURIComponent(termino)}${filtroFecha}&rows=15&select=DOI,title,author,published,container-title,URL,license,link`;
    try {
      const resp = await fetch(url);
      const datos = await resp.json();
      return (datos.message?.items || []).map(item => {
        const isOA = (item.license || []).some(l => /creativecommons|open-access|libre/i.test(l.URL || ''));
        const pdfLink = (item.link || []).find(l => l['content-type'] === 'application/pdf' || l['intended-application'] === 'text-mining');
        return {
          titulo: item.title?.[0] || 'Sin título',
          autores: (item.author || []).map(a => `${a.given || ''} ${a.family || ''}`.trim()).join(', '),
          revista: item['container-title']?.[0] || '',
          url: item.URL || `https://doi.org/${item.DOI}`,
          pdf_url: pdfLink?.URL || null,
          fuente: item['container-title']?.[0] || 'Crossref',
          tipo: 'ensayo',
          acceso_abierto: isOA,
          fecha: (function() {
            const p = item.published?.['date-parts']?.[0] || [];
            if (!p[0]) return null;
            const y = p[0], m = p[1], d = p[2];
            if (d)  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            if (m)  return `${y}-${String(m).padStart(2,'0')}`;
            return String(y);
          })(),
          ambito: 'internacional',
        };
      });
    } catch {
      return [];
    }
  }

  return { buscar };
});
