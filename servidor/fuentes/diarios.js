/**
 * 5 principales diarios por país — sección cultura / libros / literatura.
 * Se obtiene el RSS de cada fuente; los errores se ignoran silenciosamente.
 */

const FUENTES_DIARIOS = [
  /* ── PERÚ ───────────────────────────────────────────── */
  { pais: 'PE', nombre: 'Casa de la Literatura Peruana',    url: 'https://www.casadelaliteratura.gob.pe/feed/',                ambito: 'nacional' },
  { pais: 'PE', nombre: 'El Dominical – El Comercio',       url: 'https://elcomercio.pe/rss/cultural.xml',                    ambito: 'nacional' },
  { pais: 'PE', nombre: 'La República Cultura',             url: 'https://larepublica.pe/rss/cultura',                         ambito: 'nacional' },
  { pais: 'PE', nombre: 'Peru21 Cultura',                   url: 'https://peru21.pe/rss/variedades',                           ambito: 'nacional' },
  { pais: 'PE', nombre: 'Andina – Cultura',                 url: 'https://andina.pe/rss/cultura.xml',                          ambito: 'nacional' },

  /* ── ARGENTINA ──────────────────────────────────────── */
  { pais: 'AR', nombre: 'La Nación Cultura',                url: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/categoria/cultura/', ambito: 'internacional' },
  { pais: 'AR', nombre: 'Clarín Cultura',                   url: 'https://www.clarin.com/rss/cultura/',                        ambito: 'internacional' },
  { pais: 'AR', nombre: 'Infobae Cultura',                  url: 'https://www.infobae.com/feeds/rss/cultura-y-entretenimiento/', ambito: 'internacional' },
  { pais: 'AR', nombre: 'Página 12 Cultura',                url: 'https://www.pagina12.com.ar/rss/cultura.rss',                ambito: 'internacional' },
  { pais: 'AR', nombre: 'Télam Cultura',                    url: 'https://www.telam.com.ar/rss/seccion/cultura.rss',           ambito: 'internacional' },

  /* ── MÉXICO ─────────────────────────────────────────── */
  { pais: 'MX', nombre: 'La Jornada Cultura',               url: 'https://www.jornada.com.mx/rss/cultura.xml',                 ambito: 'internacional' },
  { pais: 'MX', nombre: 'El Universal Cultura',             url: 'https://www.eluniversal.com.mx/rss/cultura.xml',             ambito: 'internacional' },
  { pais: 'MX', nombre: 'Letras Libres',                    url: 'https://letraslibres.com/feed/',                             ambito: 'internacional' },
  { pais: 'MX', nombre: 'Milenio Cultura',                  url: 'https://www.milenio.com/rss',                                ambito: 'internacional' },
  { pais: 'MX', nombre: 'Proceso Cultura',                  url: 'https://www.proceso.com.mx/?cat=40&feed=rss2',              ambito: 'internacional' },

  /* ── COLOMBIA ───────────────────────────────────────── */
  { pais: 'CO', nombre: 'El Tiempo Cultura',                url: 'https://www.eltiempo.com/rss/cultura.xml',                   ambito: 'internacional' },
  { pais: 'CO', nombre: 'El Espectador Cultura',            url: 'https://www.elespectador.com/cultura-y-entretenimiento/feed/', ambito: 'internacional' },
  { pais: 'CO', nombre: 'Semana Cultura',                   url: 'https://www.semana.com/rss/cultura/',                        ambito: 'internacional' },
  { pais: 'CO', nombre: 'El Colombiano Cultura',            url: 'https://www.elcolombiano.com/rss/cultura',                   ambito: 'internacional' },
  { pais: 'CO', nombre: 'El Heraldo Cultura',               url: 'https://www.elheraldo.co/rss/feeds/cultura',                 ambito: 'internacional' },

  /* ── CHILE ──────────────────────────────────────────── */
  { pais: 'CL', nombre: 'La Tercera Cultura',               url: 'https://www.latercera.com/feed/',                            ambito: 'internacional' },
  { pais: 'CL', nombre: 'El Mostrador Cultura',             url: 'https://www.elmostrador.cl/feed/',                           ambito: 'internacional' },
  { pais: 'CL', nombre: 'El Desconcierto',                  url: 'https://www.eldesconcierto.cl/feed/',                        ambito: 'internacional' },
  { pais: 'CL', nombre: 'Cooperativa Cultura',              url: 'https://cooperativa.cl/noticias/site/tax/port/all/rss.xml',  ambito: 'internacional' },
  { pais: 'CL', nombre: 'Emol Cultura',                     url: 'https://www.emol.com/rss/Espectaculos.xml',                  ambito: 'internacional' },

  /* ── VENEZUELA ──────────────────────────────────────── */
  { pais: 'VE', nombre: 'El Nacional Cultura',              url: 'https://www.el-nacional.com/feed/',                          ambito: 'internacional' },
  { pais: 'VE', nombre: 'TalCual Cultura',                  url: 'https://talcualdigital.com/feed/',                           ambito: 'internacional' },

  /* ── ECUADOR ────────────────────────────────────────── */
  { pais: 'EC', nombre: 'El Comercio Ecuador',              url: 'https://www.elcomercio.com/rss',                             ambito: 'internacional' },
  { pais: 'EC', nombre: 'El Universo Ecuador',              url: 'https://www.eluniverso.com/rss.xml',                         ambito: 'internacional' },

  /* ── BOLIVIA ────────────────────────────────────────── */
  { pais: 'BO', nombre: 'Los Tiempos Bolivia',              url: 'https://www.lostiempos.com/rss',                             ambito: 'internacional' },

  /* ── PARAGUAY ───────────────────────────────────────── */
  { pais: 'PY', nombre: 'ABC Color Paraguay',               url: 'https://www.abc.com.py/rss/nacionales.xml',                  ambito: 'internacional' },

  /* ── URUGUAY ────────────────────────────────────────── */
  { pais: 'UY', nombre: 'El País Uruguay Cultura',          url: 'https://www.elpais.com.uy/rss/cultura',                      ambito: 'internacional' },
  { pais: 'UY', nombre: 'El Observador Cultura',            url: 'https://www.elobservador.com.uy/rss',                        ambito: 'internacional' },

  /* ── CUBA ───────────────────────────────────────────── */
  { pais: 'CU', nombre: 'Granma Cultura',                   url: 'http://www.granma.cu/rss/rss2.0.xml',                        ambito: 'internacional' },
  { pais: 'CU', nombre: 'Juventud Rebelde Cultura',         url: 'http://www.juventudrebelde.cu/rss.xml',                      ambito: 'internacional' },

  /* ── COSTA RICA ─────────────────────────────────────── */
  { pais: 'CR', nombre: 'La Nación Costa Rica',             url: 'https://www.nacion.com/rss/',                                ambito: 'internacional' },

  /* ── REP. DOMINICANA ────────────────────────────────── */
  { pais: 'DO', nombre: 'Listín Diario Cultura',            url: 'https://listindiario.com/rss',                               ambito: 'internacional' },

  /* ── BRASIL ─────────────────────────────────────────── */
  { pais: 'BR', nombre: 'Folha de S.Paulo Cultura',         url: 'https://feeds.folha.uol.com.br/ilustrada/rss091.xml',        ambito: 'internacional' },
  { pais: 'BR', nombre: 'O Globo Cultura',                  url: 'https://oglobo.globo.com/rss.xml',                           ambito: 'internacional' },
  { pais: 'BR', nombre: 'UOL Cultura',                      url: 'https://rss.uol.com.br/feed/noticias/entretenimento.xml',    ambito: 'internacional' },

  /* ── EE. UU. ────────────────────────────────────────── */
  { pais: 'US', nombre: 'NYT Books',                        url: 'https://rss.nytimes.com/services/xml/rss/nyt/Books.xml',     ambito: 'internacional' },
  { pais: 'US', nombre: 'The Guardian Books',               url: 'https://www.theguardian.com/books/rss',                      ambito: 'internacional' },
  { pais: 'US', nombre: 'Publishers Weekly',                url: 'https://www.publishersweekly.com/pw/feeds/latest/index.rss', ambito: 'internacional' },
  { pais: 'US', nombre: 'Literary Hub',                     url: 'https://lithub.com/feed/',                                   ambito: 'internacional' },
  { pais: 'US', nombre: 'The Atlantic Books',               url: 'https://www.theatlantic.com/feed/all/',                      ambito: 'internacional' },

  /* ── CANADÁ ─────────────────────────────────────────── */
  { pais: 'CA', nombre: 'CBC Books',                        url: 'https://www.cbc.ca/cmlink/rss-books',                        ambito: 'internacional' },
  { pais: 'CA', nombre: 'Globe and Mail Books',             url: 'https://www.theglobeandmail.com/rss/topic/arts-and-entertainment/', ambito: 'internacional' },

  /* ── ESPAÑA ─────────────────────────────────────────── */
  { pais: 'ES', nombre: 'Babelia – El País',                url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/babelia/portada', ambito: 'internacional' },
  { pais: 'ES', nombre: 'El Mundo Cultura',                 url: 'https://e00-elmundo.uecdn.es/elmundo/rss/cultura.xml',       ambito: 'internacional' },
  { pais: 'ES', nombre: 'ABC Cultural',                     url: 'https://www.abc.es/rss/feeds/abcCultural.xml',               ambito: 'internacional' },
  { pais: 'ES', nombre: 'La Vanguardia Cultura',            url: 'https://www.lavanguardia.com/rss/cultura.xml',               ambito: 'internacional' },
  { pais: 'ES', nombre: 'El Confidencial Cultura',          url: 'https://www.elconfidencial.com/rss/cultura/',                ambito: 'internacional' },

  /* ── FRANCE ─────────────────────────────────────────── */
  { pais: 'FR', nombre: 'Le Monde Livres',                  url: 'https://www.lemonde.fr/livres/rss_full.xml',                 ambito: 'internacional' },
  { pais: 'FR', nombre: 'Le Figaro Culture',                url: 'https://www.lefigaro.fr/rss/figaro_culture.xml',             ambito: 'internacional' },
  { pais: 'FR', nombre: 'France Culture',                   url: 'https://www.radiofrance.fr/france-culture/rss',              ambito: 'internacional' },
  { pais: 'FR', nombre: 'L\'Obs Culture',                   url: 'https://www.nouvelobs.com/rss.xml',                          ambito: 'internacional' },
  { pais: 'FR', nombre: 'Franceinfo Culture',               url: 'https://www.francetvinfo.fr/culture.rss',                    ambito: 'internacional' },

  /* ── ALEMANIA ───────────────────────────────────────── */
  { pais: 'DE', nombre: 'Zeit Literatur',                   url: 'https://www.zeit.de/kultur/literatur/index.rss',             ambito: 'internacional' },
  { pais: 'DE', nombre: 'Spiegel Literatur',                url: 'https://www.spiegel.de/kultur/literatur/index.rss',          ambito: 'internacional' },
  { pais: 'DE', nombre: 'FAZ Literatur',                    url: 'https://www.faz.net/rss/aktuell/feuilleton/buecher/',        ambito: 'internacional' },
  { pais: 'DE', nombre: 'taz Kultur',                       url: 'https://taz.de/!p4;rss/',                                    ambito: 'internacional' },
  { pais: 'DE', nombre: 'Deutschlandfunk Kultur',           url: 'https://www.deutschlandfunk.de/nachrichten-und-sendungen-104.rss', ambito: 'internacional' },

  /* ── ITALIA ─────────────────────────────────────────── */
  { pais: 'IT', nombre: 'Corriere della Sera Cultura',      url: 'https://www.corriere.it/rss/cultura.xml',                    ambito: 'internacional' },
  { pais: 'IT', nombre: 'La Repubblica Cultura',            url: 'https://www.repubblica.it/rss/cultura/rss2.0.xml',           ambito: 'internacional' },
  { pais: 'IT', nombre: 'La Stampa Cultura',                url: 'https://www.lastampa.it/rss/cult',                           ambito: 'internacional' },
  { pais: 'IT', nombre: 'Il Sole 24 Ore Cultura',           url: 'https://www.ilsole24ore.com/rss/cultura-e-tempo-libero.xml', ambito: 'internacional' },
  { pais: 'IT', nombre: 'Internazionale',                   url: 'https://www.internazionale.it/rss',                          ambito: 'internacional' },

  /* ── PORTUGAL ───────────────────────────────────────── */
  { pais: 'PT', nombre: 'Público Cultura',                  url: 'https://www.publico.pt/rss/culturaipsilon',                   ambito: 'internacional' },
  { pais: 'PT', nombre: 'Observador Cultura',               url: 'https://observador.pt/seccao/cultura/feed/',                 ambito: 'internacional' },
  { pais: 'PT', nombre: 'Jornal de Negócios Cultura',       url: 'https://www.jornaldenegocios.pt/rss',                        ambito: 'internacional' },

  /* ── REINO UNIDO ────────────────────────────────────── */
  { pais: 'GB', nombre: 'The Guardian Books',               url: 'https://www.theguardian.com/books/rss',                      ambito: 'internacional' },
  { pais: 'GB', nombre: 'The Independent Culture',          url: 'https://www.independent.co.uk/arts-entertainment/rss',       ambito: 'internacional' },
  { pais: 'GB', nombre: 'The Telegraph Culture',            url: 'https://www.telegraph.co.uk/culture/rss.xml',                ambito: 'internacional' },
  { pais: 'GB', nombre: 'BBC Culture Books',                url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml', ambito: 'internacional' },
  { pais: 'GB', nombre: 'Financial Times Culture',          url: 'https://www.ft.com/?format=rss&section=arts',                ambito: 'internacional' },

  /* ── PAÍSES BAJOS ───────────────────────────────────── */
  { pais: 'NL', nombre: 'De Volkskrant Cultuur',            url: 'https://www.volkskrant.nl/cultuur-media/rss.xml',            ambito: 'internacional' },
  { pais: 'NL', nombre: 'NRC Cultuur',                      url: 'https://www.nrc.nl/rss/',                                    ambito: 'internacional' },

  /* ── BÉLGICA ────────────────────────────────────────── */
  { pais: 'BE', nombre: 'Le Soir Cultures',                 url: 'https://www.lesoir.be/rss',                                  ambito: 'internacional' },

  /* ── SUECIA ─────────────────────────────────────────── */
  { pais: 'SE', nombre: 'Dagens Nyheter Kultur',            url: 'https://www.dn.se/kultur/rss/',                              ambito: 'internacional' },
  { pais: 'SE', nombre: 'Svenska Dagbladet Kultur',         url: 'https://www.svd.se/feed/sections/1',                         ambito: 'internacional' },

  /* ── NORUEGA ────────────────────────────────────────── */
  { pais: 'NO', nombre: 'Aftenposten Kultur',               url: 'https://www.aftenposten.no/rss/kultur.rss',                  ambito: 'internacional' },

  /* ── RUSIA ──────────────────────────────────────────── */
  { pais: 'RU', nombre: 'Литературная газета',              url: 'http://lgz.ru/rss.xml',                                      ambito: 'internacional' },
  { pais: 'RU', nombre: 'Коммерсантъ Культура',            url: 'https://www.kommersant.ru/RSS/section-kultury.xml',           ambito: 'internacional' },

  /* ── POLONIA ────────────────────────────────────────── */
  { pais: 'PL', nombre: 'Gazeta Wyborcza Kultura',          url: 'https://rss.gazeta.pl/pub/rss/kultura.xml',                  ambito: 'internacional' },

  /* ── REPÚBLICA CHECA ────────────────────────────────── */
  { pais: 'CZ', nombre: 'iLiteratura',                      url: 'https://www.iliteratura.cz/rss',                             ambito: 'internacional' },

  /* ── INDIA ──────────────────────────────────────────── */
  { pais: 'IN', nombre: 'The Hindu Books',                  url: 'https://www.thehindu.com/books/feeder/default.rss',          ambito: 'internacional' },
  { pais: 'IN', nombre: 'Indian Express Books',             url: 'https://indianexpress.com/section/books/feed/',              ambito: 'internacional' },
  { pais: 'IN', nombre: 'Hindustan Times Culture',          url: 'https://www.hindustantimes.com/rss/entertainment/rssfeed.xml', ambito: 'internacional' },
  { pais: 'IN', nombre: 'The Wire Culture',                 url: 'https://thewire.in/culture/feed',                            ambito: 'internacional' },
  { pais: 'IN', nombre: 'Scroll Arts',                      url: 'https://scroll.in/rss',                                     ambito: 'internacional' },

  /* ── JAPÓN ──────────────────────────────────────────── */
  { pais: 'JP', nombre: 'The Japan Times Books',            url: 'https://www.japantimes.co.jp/culture/books/feed/',           ambito: 'internacional' },
  { pais: 'JP', nombre: 'NHK World Culture',                url: 'https://www3.nhk.or.jp/nhkworld/en/news/feeds/',             ambito: 'internacional' },

  /* ── CHINA ──────────────────────────────────────────── */
  { pais: 'CN', nombre: 'Global Times Culture',             url: 'https://www.globaltimes.cn/rss/outbrain.xml',                ambito: 'internacional' },
  { pais: 'CN', nombre: 'South China Morning Post',         url: 'https://www.scmp.com/rss/4/feed',                            ambito: 'internacional' },

  /* ── ISRAEL ─────────────────────────────────────────── */
  { pais: 'IL', nombre: 'Haaretz Culture',                  url: 'https://www.haaretz.com/cmlink/1.263',                       ambito: 'internacional' },

  /* ── TURQUÍA ────────────────────────────────────────── */
  { pais: 'TR', nombre: 'Hürriyet Daily News Culture',      url: 'https://www.hurriyetdailynews.com/rss/arts-culture',         ambito: 'internacional' },

  /* ── AUSTRALIA ──────────────────────────────────────── */
  { pais: 'AU', nombre: 'Sydney Morning Herald Culture',    url: 'https://www.smh.com.au/rss/culture.xml',                     ambito: 'internacional' },
  { pais: 'AU', nombre: 'The Age Culture',                  url: 'https://www.theage.com.au/rss/culture.xml',                  ambito: 'internacional' },
  { pais: 'AU', nombre: 'ABC Arts',                         url: 'https://www.abc.net.au/news/feed/51894/rss.xml',              ambito: 'internacional' },

  /* ── SUDÁFRICA ──────────────────────────────────────── */
  { pais: 'ZA', nombre: 'Mail & Guardian Culture',          url: 'https://mg.co.za/feed/',                                     ambito: 'internacional' },
  { pais: 'ZA', nombre: 'Daily Maverick Culture',           url: 'https://dailymaverick.co.za/feed/',                          ambito: 'internacional' },
  { pais: 'ZA', nombre: 'Times Live Culture',               url: 'https://www.timeslive.co.za/rss/',                           ambito: 'internacional' },

  /* ── NIGERIA ────────────────────────────────────────── */
  { pais: 'NG', nombre: 'The Guardian Nigeria Culture',     url: 'https://guardian.ng/feed/',                                  ambito: 'internacional' },
  { pais: 'NG', nombre: 'Punch Nigeria Culture',            url: 'https://punchng.com/feed/',                                  ambito: 'internacional' },

  /* ── EGIPTO ─────────────────────────────────────────── */
  { pais: 'EG', nombre: 'Al-Ahram Weekly Arts',             url: 'http://weekly.ahram.org.eg/rss.aspx',                        ambito: 'internacional' },

  /* ── KENIA ──────────────────────────────────────────── */
  { pais: 'KE', nombre: 'Nation Africa Culture',            url: 'https://nation.africa/kenya/rss/',                           ambito: 'internacional' },

  /* ── LÍBANO ─────────────────────────────────────────── */
  { pais: 'LB', nombre: 'L\'Orient Le Jour Culture',        url: 'https://www.lorientlejour.com/rss',                          ambito: 'internacional' },

  /* ── ARABIA SAUDITA ─────────────────────────────────── */
  { pais: 'SA', nombre: 'Arab News Culture',                url: 'https://www.arabnews.com/rss.xml?pid=301',                   ambito: 'internacional' },
];

async function fetchTexto(url) {
  const { default: fetch } = await import('node-fetch');
  const resp = await fetch(url, { signal: AbortSignal.timeout(6000) });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.text();
}

function parsearFeed(xml, fuente, desde) {
  const items = [];
  // Soporta RSS <item> y Atom <entry>
  const reItem = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/g;
  let m;
  while ((m = reItem.exec(xml)) !== null) {
    const bloque = m[1];
    const titulo = extraer(bloque, 'title');
    const enlace = extraer(bloque, 'link') || extraerAttr(bloque, 'link', 'href');
    const fechaStr = extraer(bloque, 'pubDate') || extraer(bloque, 'published') || extraer(bloque, 'updated') || extraer(bloque, 'dc:date');
    const descripcion = extraer(bloque, 'description') || extraer(bloque, 'summary') || extraer(bloque, 'content');
    if (!titulo || !enlace) continue;
    const fechaObj = fechaStr ? new Date(fechaStr) : null;
    if (fechaObj && !isNaN(fechaObj) && fechaObj < desde) continue;
    items.push({
      titulo: titulo.replace(/<[^>]+>/g, '').trim(),
      url: enlace.trim(),
      fuente: fuente.nombre,
      pais: fuente.pais,
      tipo: 'noticia',
      ambito: fuente.ambito,
      descripcion: descripcion ? descripcion.replace(/<[^>]+>/g, '').trim().substring(0, 300) : '',
      fecha: fechaObj && !isNaN(fechaObj) ? fechaObj.toISOString().split('T')[0] : null,
    });
  }
  return items;
}

function extraer(texto, etiqueta) {
  const m = texto.match(new RegExp(`<${etiqueta}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${etiqueta}>`, 'i'));
  return m ? m[1].trim() : '';
}

function extraerAttr(texto, etiqueta, atributo) {
  const m = texto.match(new RegExp(`<${etiqueta}[^>]+${atributo}="([^"]+)"`, 'i'));
  return m ? m[1].trim() : '';
}

async function obtenerDiarios(diasAtras = 365) {
  const limite = new Date();
  limite.setDate(limite.getDate() - diasAtras);

  const resultados = await Promise.allSettled(
    FUENTES_DIARIOS.map(async fuente => {
      const xml = await fetchTexto(fuente.url);
      return parsearFeed(xml, fuente, limite);
    })
  );

  const todos = [];
  for (const r of resultados) {
    if (r.status === 'fulfilled') todos.push(...r.value);
  }
  return todos;
}

module.exports = { obtenerDiarios, FUENTES_DIARIOS };
