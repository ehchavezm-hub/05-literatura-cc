/**
 * 50 editoriales más representativas del mundo — búsqueda via Google Books.
 * Seleccionadas por impacto global, premios literarios y diversidad geográfica.
 */

const { fetchConLimite } = require('./utilidades');

const EDITORIALES_PAIS = [
  /* ── LATINOAMÉRICA ──────────────────── */
  { pais: 'MX', nombre: 'Fondo de Cultura Economica',       lang: 'es' },
  { pais: 'ES', nombre: 'Alfaguara',                        lang: 'es' },
  { pais: 'ES', nombre: 'Anagrama',                         lang: 'es' },
  { pais: 'AR', nombre: 'Adriana Hidalgo Editora',          lang: 'es' },
  { pais: 'AR', nombre: 'Eterna Cadencia',                  lang: 'es' },
  { pais: 'MX', nombre: 'Sexto Piso',                       lang: 'es' },
  { pais: 'MX', nombre: 'Era Mexico',                       lang: 'es' },
  { pais: 'CL', nombre: 'LOM Ediciones',                    lang: 'es' },
  { pais: 'PE', nombre: 'Peisa',                            lang: 'es' },
  { pais: 'CO', nombre: 'Editorial Norma',                  lang: 'es' },

  /* ── ESPAÑA ─────────────────────────── */
  { pais: 'ES', nombre: 'Acantilado',                       lang: 'es' },
  { pais: 'ES', nombre: 'Tusquets',                         lang: 'es' },
  { pais: 'ES', nombre: 'Alianza Editorial',                lang: 'es' },
  { pais: 'ES', nombre: 'Pre-Textos',                       lang: 'es' },
  { pais: 'ES', nombre: 'Impedimenta',                      lang: 'es' },

  /* ── BRASIL / PORTUGAL ──────────────── */
  { pais: 'BR', nombre: 'Companhia das Letras',             lang: 'pt' },
  { pais: 'BR', nombre: 'Rocco',                            lang: 'pt' },
  { pais: 'PT', nombre: 'Dom Quixote',                      lang: 'pt' },
  { pais: 'PT', nombre: 'Relógio d Água',                   lang: 'pt' },

  /* ── ESTADOS UNIDOS ─────────────────── */
  { pais: 'US', nombre: 'Penguin Random House',             lang: 'en' },
  { pais: 'US', nombre: 'Farrar Straus Giroux',             lang: 'en' },
  { pais: 'US', nombre: 'Knopf',                            lang: 'en' },
  { pais: 'US', nombre: 'W W Norton',                       lang: 'en' },
  { pais: 'US', nombre: 'Archipelago Books',                lang: 'en' },

  /* ── REINO UNIDO ────────────────────── */
  { pais: 'GB', nombre: 'Faber Faber',                      lang: 'en' },
  { pais: 'GB', nombre: 'Bloomsbury Publishing',            lang: 'en' },
  { pais: 'GB', nombre: 'Granta Publications',              lang: 'en' },
  { pais: 'GB', nombre: 'Jonathan Cape',                    lang: 'en' },
  { pais: 'GB', nombre: 'Pushkin Press',                    lang: 'en' },

  /* ── FRANCIA ────────────────────────── */
  { pais: 'FR', nombre: 'Gallimard',                        lang: 'fr' },
  { pais: 'FR', nombre: 'Seuil',                            lang: 'fr' },
  { pais: 'FR', nombre: 'Actes Sud',                        lang: 'fr' },

  /* ── ALEMANIA ───────────────────────── */
  { pais: 'DE', nombre: 'Suhrkamp',                         lang: 'de' },
  { pais: 'DE', nombre: 'S Fischer Verlag',                 lang: 'de' },
  { pais: 'DE', nombre: 'Carl Hanser Verlag',               lang: 'de' },

  /* ── ITALIA ─────────────────────────── */
  { pais: 'IT', nombre: 'Einaudi',                          lang: 'it' },
  { pais: 'IT', nombre: 'Adelphi',                          lang: 'it' },
  { pais: 'IT', nombre: 'Feltrinelli',                      lang: 'it' },

  /* ── NÓRDICOS ───────────────────────── */
  { pais: 'SE', nombre: 'Bonniers',                         lang: 'sv' },
  { pais: 'NO', nombre: 'Gyldendal Norway',                 lang: 'no' },

  /* ── EUROPA DEL ESTE ────────────────── */
  { pais: 'PL', nombre: 'Wydawnictwo Literackie',           lang: 'pl' },
  { pais: 'RO', nombre: 'Polirom Romania',                  lang: 'ro' },

  /* ── INDIA ──────────────────────────── */
  { pais: 'IN', nombre: 'Penguin India',                    lang: 'en' },
  { pais: 'IN', nombre: 'Speaking Tiger Books',             lang: 'en' },

  /* ── JAPÓN ──────────────────────────── */
  { pais: 'JP', nombre: 'Bungeishunju',                     lang: 'ja' },
  { pais: 'JP', nombre: 'Shinchosha',                       lang: 'ja' },

  /* ── COREA ──────────────────────────── */
  { pais: 'KR', nombre: 'Changbi Publishers',               lang: 'ko' },

  /* ── ÁFRICA ─────────────────────────── */
  { pais: 'NG', nombre: 'Cassava Republic Press',           lang: 'en' },
  { pais: 'EG', nombre: 'Dar Al Shorouk',                   lang: 'ar' },

  /* ── MUNDO ÁRABE ────────────────────── */
  { pais: 'LB', nombre: 'Dar Al Adab',                      lang: 'ar' },
];

async function buscarGoogleBooksPorEditorial(editorial) {
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const keyParam = key ? `&key=${key}` : '';
  const url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:"${encodeURIComponent(editorial.nombre)}"&maxResults=10&orderBy=newest${keyParam}`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.items || []).map(item => {
      const info = item.volumeInfo || {};
      return {
        titulo: info.title || '',
        autores: (info.authors || []).join(', '),
        url: info.infoLink || '',
        fuente: editorial.nombre,
        pais: editorial.pais,
        tipo: 'libro',
        fecha: info.publishedDate?.substring(0, 4) || null,
        editorial: info.publisher || editorial.nombre,
        descripcion: info.description?.substring(0, 300) || '',
      };
    });
  } catch {
    return [];
  }
}

async function obtenerLibrosEditoriales() {
  const resultados = await Promise.allSettled(
    EDITORIALES_PAIS.map(ed => buscarGoogleBooksPorEditorial(ed))
  );

  const todos = [];
  for (const r of resultados) {
    if (r.status === 'fulfilled') todos.push(...r.value);
  }
  return todos.filter(item => item.titulo);
}

module.exports = { obtenerLibrosEditoriales, EDITORIALES_PAIS };
