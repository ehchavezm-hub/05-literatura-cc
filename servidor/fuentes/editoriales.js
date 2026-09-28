/**
 * 5 principales editoriales por país — búsqueda via Google Books y Open Library.
 */

const { fetchConLimite } = require('./utilidades');

// 5 editoriales principales por país/región
const EDITORIALES_PAIS = [
  /* ── PERÚ ─────────────────────────── */
  { pais: 'PE', nombre: 'Fondo Editorial PUCP',             lang: 'es' },
  { pais: 'PE', nombre: 'IEP Peru',                         lang: 'es' },
  { pais: 'PE', nombre: 'Milla Batres',                     lang: 'es' },
  { pais: 'PE', nombre: 'Peisa',                            lang: 'es' },
  { pais: 'PE', nombre: 'Sur Libreros Editores',            lang: 'es' },

  /* ── ARGENTINA ─────────────────────── */
  { pais: 'AR', nombre: 'Sudamericana',                     lang: 'es' },
  { pais: 'AR', nombre: 'Emecé',                            lang: 'es' },
  { pais: 'AR', nombre: 'Adriana Hidalgo Editora',          lang: 'es' },
  { pais: 'AR', nombre: 'Losada',                           lang: 'es' },
  { pais: 'AR', nombre: 'Eterna Cadencia',                  lang: 'es' },

  /* ── MÉXICO ────────────────────────── */
  { pais: 'MX', nombre: 'Fondo de Cultura Economica',       lang: 'es' },
  { pais: 'MX', nombre: 'Joaquin Mortiz',                   lang: 'es' },
  { pais: 'MX', nombre: 'Cal y Arena',                      lang: 'es' },
  { pais: 'MX', nombre: 'Era Mexico',                       lang: 'es' },
  { pais: 'MX', nombre: 'Sexto Piso',                       lang: 'es' },

  /* ── COLOMBIA ──────────────────────── */
  { pais: 'CO', nombre: 'Editorial Norma',                  lang: 'es' },
  { pais: 'CO', nombre: 'Panamericana Editorial',           lang: 'es' },
  { pais: 'CO', nombre: 'Rey Naranjo Editores',             lang: 'es' },
  { pais: 'CO', nombre: 'Babel Libros',                     lang: 'es' },
  { pais: 'CO', nombre: 'Laguna Libros',                    lang: 'es' },

  /* ── CHILE ─────────────────────────── */
  { pais: 'CL', nombre: 'LOM Ediciones',                    lang: 'es' },
  { pais: 'CL', nombre: 'Pehuen Editores',                  lang: 'es' },
  { pais: 'CL', nombre: 'Hueders',                          lang: 'es' },
  { pais: 'CL', nombre: 'Alquimia Ediciones',               lang: 'es' },
  { pais: 'CL', nombre: 'Das Kapital Ediciones',            lang: 'es' },

  /* ── VENEZUELA ─────────────────────── */
  { pais: 'VE', nombre: 'Monte Avila Editores',             lang: 'es' },
  { pais: 'VE', nombre: 'Biblioteca Ayacucho',              lang: 'es' },
  { pais: 'VE', nombre: 'Alfadil Ediciones',                lang: 'es' },

  /* ── CUBA ──────────────────────────── */
  { pais: 'CU', nombre: 'Casa de las Americas',             lang: 'es' },
  { pais: 'CU', nombre: 'Letras Cubanas',                   lang: 'es' },

  /* ── URUGUAY ───────────────────────── */
  { pais: 'UY', nombre: 'Trilce',                           lang: 'es' },
  { pais: 'UY', nombre: 'Fin de Siglo',                     lang: 'es' },

  /* ── BRASIL ────────────────────────── */
  { pais: 'BR', nombre: 'Companhia das Letras',             lang: 'pt' },
  { pais: 'BR', nombre: 'Rocco',                            lang: 'pt' },
  { pais: 'BR', nombre: 'Record',                           lang: 'pt' },
  { pais: 'BR', nombre: 'Objetiva',                         lang: 'pt' },
  { pais: 'BR', nombre: 'Intrinseca',                       lang: 'pt' },

  /* ── EE. UU. ───────────────────────── */
  { pais: 'US', nombre: 'Penguin Random House',             lang: 'en' },
  { pais: 'US', nombre: 'HarperCollins',                    lang: 'en' },
  { pais: 'US', nombre: 'Simon Schuster',                   lang: 'en' },
  { pais: 'US', nombre: 'Macmillan Publishers',             lang: 'en' },
  { pais: 'US', nombre: 'Hachette Book Group',              lang: 'en' },

  /* ── CANADÁ ────────────────────────── */
  { pais: 'CA', nombre: 'House of Anansi Press',            lang: 'en' },
  { pais: 'CA', nombre: 'McClelland Stewart',               lang: 'en' },
  { pais: 'CA', nombre: 'Coach House Books',                lang: 'en' },

  /* ── ESPAÑA ────────────────────────── */
  { pais: 'ES', nombre: 'Alfaguara',                        lang: 'es' },
  { pais: 'ES', nombre: 'Anagrama',                         lang: 'es' },
  { pais: 'ES', nombre: 'Tusquets',                         lang: 'es' },
  { pais: 'ES', nombre: 'Alianza Editorial',                lang: 'es' },
  { pais: 'ES', nombre: 'Acantilado',                       lang: 'es' },

  /* ── FRANCE ────────────────────────── */
  { pais: 'FR', nombre: 'Gallimard',                        lang: 'fr' },
  { pais: 'FR', nombre: 'Seuil',                            lang: 'fr' },
  { pais: 'FR', nombre: 'Actes Sud',                        lang: 'fr' },
  { pais: 'FR', nombre: 'Fayard',                           lang: 'fr' },
  { pais: 'FR', nombre: 'Flammarion',                       lang: 'fr' },

  /* ── ALEMANIA ──────────────────────── */
  { pais: 'DE', nombre: 'S Fischer Verlag',                 lang: 'de' },
  { pais: 'DE', nombre: 'Rowohlt',                          lang: 'de' },
  { pais: 'DE', nombre: 'Suhrkamp',                         lang: 'de' },
  { pais: 'DE', nombre: 'Carl Hanser Verlag',               lang: 'de' },
  { pais: 'DE', nombre: 'dtv',                              lang: 'de' },

  /* ── ITALIA ────────────────────────── */
  { pais: 'IT', nombre: 'Einaudi',                          lang: 'it' },
  { pais: 'IT', nombre: 'Mondadori',                        lang: 'it' },
  { pais: 'IT', nombre: 'Feltrinelli',                      lang: 'it' },
  { pais: 'IT', nombre: 'Adelphi',                          lang: 'it' },
  { pais: 'IT', nombre: 'Garzanti',                         lang: 'it' },

  /* ── REINO UNIDO ───────────────────── */
  { pais: 'GB', nombre: 'Faber Faber',                      lang: 'en' },
  { pais: 'GB', nombre: 'Bloomsbury Publishing',            lang: 'en' },
  { pais: 'GB', nombre: 'Jonathan Cape',                    lang: 'en' },
  { pais: 'GB', nombre: 'Virago Press',                     lang: 'en' },
  { pais: 'GB', nombre: 'Granta Publications',              lang: 'en' },

  /* ── PORTUGAL ──────────────────────── */
  { pais: 'PT', nombre: 'Dom Quixote',                      lang: 'pt' },
  { pais: 'PT', nombre: 'Relógio d Água',                   lang: 'pt' },
  { pais: 'PT', nombre: 'Porto Editora',                    lang: 'pt' },
  { pais: 'PT', nombre: 'Leya',                             lang: 'pt' },

  /* ── RUSIA ─────────────────────────── */
  { pais: 'RU', nombre: 'Eksmo',                            lang: 'ru' },
  { pais: 'RU', nombre: 'AST',                              lang: 'ru' },
  { pais: 'RU', nombre: 'Azbooka Atticus',                  lang: 'ru' },

  /* ── SUECIA ────────────────────────── */
  { pais: 'SE', nombre: 'Bonniers',                         lang: 'sv' },
  { pais: 'SE', nombre: 'Norstedts',                        lang: 'sv' },

  /* ── PAÍSES BAJOS ──────────────────── */
  { pais: 'NL', nombre: 'De Bezige Bij',                    lang: 'nl' },
  { pais: 'NL', nombre: 'Atlas Contact',                    lang: 'nl' },

  /* ── INDIA ─────────────────────────── */
  { pais: 'IN', nombre: 'Penguin India',                    lang: 'en' },
  { pais: 'IN', nombre: 'HarperCollins India',              lang: 'en' },
  { pais: 'IN', nombre: 'Rupa Publications',                lang: 'en' },
  { pais: 'IN', nombre: 'Speaking Tiger Books',             lang: 'en' },
  { pais: 'IN', nombre: 'Aleph Book Company',               lang: 'en' },

  /* ── JAPÓN ─────────────────────────── */
  { pais: 'JP', nombre: 'Bungeishunju',                     lang: 'ja' },
  { pais: 'JP', nombre: 'Shinchosha',                       lang: 'ja' },
  { pais: 'JP', nombre: 'Kodansha',                         lang: 'ja' },
  { pais: 'JP', nombre: 'Iwanami Shoten',                   lang: 'ja' },

  /* ── COREA DEL SUR ─────────────────── */
  { pais: 'KR', nombre: 'Minumsa',                          lang: 'ko' },
  { pais: 'KR', nombre: 'Changbi Publishers',               lang: 'ko' },
  { pais: 'KR', nombre: 'Munhakdongne',                     lang: 'ko' },

  /* ── AUSTRALIA ─────────────────────── */
  { pais: 'AU', nombre: 'Text Publishing',                  lang: 'en' },
  { pais: 'AU', nombre: 'Allen Unwin',                      lang: 'en' },
  { pais: 'AU', nombre: 'Scribe Publications',              lang: 'en' },
  { pais: 'AU', nombre: 'University of Queensland Press',   lang: 'en' },

  /* ── SUDÁFRICA ─────────────────────── */
  { pais: 'ZA', nombre: 'Jonathan Ball Publishers',         lang: 'en' },
  { pais: 'ZA', nombre: 'NB Publishers',                    lang: 'en' },
  { pais: 'ZA', nombre: 'Human Rousseau',                   lang: 'en' },

  /* ── NIGERIA ───────────────────────── */
  { pais: 'NG', nombre: 'Cassava Republic Press',           lang: 'en' },
  { pais: 'NG', nombre: 'Farafina Books',                   lang: 'en' },

  /* ── EGIPTO ────────────────────────── */
  { pais: 'EG', nombre: 'Dar Al Shorouk',                   lang: 'ar' },
  { pais: 'EG', nombre: 'Dar Al Adab',                      lang: 'ar' },
];

async function buscarGoogleBooksPorEditorial(editorial) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:"${encodeURIComponent(editorial.nombre)}"&maxResults=10&orderBy=newest`;
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

async function buscarOpenLibraryPorEditorial(editorial) {
  const url = `https://openlibrary.org/search.json?publisher=${encodeURIComponent(editorial.nombre)}&limit=5&fields=title,author_name,key,first_publish_year,publisher`;
  try {
    const datos = await fetchConLimite(url);
    return (datos.docs || []).map(libro => ({
      titulo: libro.title || '',
      autores: (libro.author_name || []).join(', '),
      url: `https://openlibrary.org${libro.key}`,
      fuente: editorial.nombre,
      pais: editorial.pais,
      tipo: 'libro',
      fecha: libro.first_publish_year?.toString() || null,
      editorial: (libro.publisher || [])[0] || editorial.nombre,
    }));
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
