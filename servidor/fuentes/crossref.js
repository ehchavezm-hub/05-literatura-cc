const { fetchConLimite } = require('./utilidades');

const REVISTAS_LITERARIAS = [
  'Anales de Literatura Hispanoamericana',
  'Revista Iberoamericana',
  'Bulletin of Spanish Studies',
  'Lexis',
  'Chasqui',
  'Hispania',
  'Latin American Literary Review',
  'Nueva Revista de Filología Hispánica',
];

async function buscarCrossref(termino, diasAtras = 365) {
  const desde = new Date();
  desde.setDate(desde.getDate() - diasAtras);
  const fechaDesde = desde.toISOString().split('T')[0];

  const url = `https://api.crossref.org/works?query=${encodeURIComponent(termino)}&filter=from-pub-date:${fechaDesde}&rows=20&select=DOI,title,author,published,container-title,URL`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.message?.items || []).map(item => ({
      titulo: item.title?.[0] || 'Sin título',
      autores: (item.author || []).map(a => `${a.given || ''} ${a.family || ''}`.trim()).join(', '),
      revista: item['container-title']?.[0] || '',
      url: item.URL || `https://doi.org/${item.DOI}`,
      fuente: 'Crossref',
      tipo: 'ensayo',
      fecha: item.published?.['date-parts']?.[0]?.[0]?.toString() || null,
    }));
  } catch {
    return [];
  }
}

module.exports = { buscarCrossref, REVISTAS_LITERARIAS };
