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

  /* ── GUATEMALA ──────────────────────────────────────── */
  { pais: 'GT', nombre: 'Prensa Libre Cultura',             url: 'https://www.prensalibre.com/section/cultura/feed/',           ambito: 'internacional' },
  { pais: 'GT', nombre: 'El Periódico Guatemala',           url: 'https://elperiodico.com.gt/feed/',                           ambito: 'internacional' },

  /* ── HONDURAS ───────────────────────────────────────── */
  { pais: 'HN', nombre: 'La Prensa Honduras',               url: 'https://www.laprensa.hn/rss/',                               ambito: 'internacional' },
  { pais: 'HN', nombre: 'El Heraldo Honduras',              url: 'https://www.elheraldo.hn/rss/',                              ambito: 'internacional' },

  /* ── EL SALVADOR ────────────────────────────────────── */
  { pais: 'SV', nombre: 'La Prensa Gráfica Cultura',        url: 'https://www.laprensagrafica.com/seccion/cultura/feed/',       ambito: 'internacional' },
  { pais: 'SV', nombre: 'El Diario de Hoy',                 url: 'https://www.elsalvador.com/feed/',                           ambito: 'internacional' },

  /* ── NICARAGUA ──────────────────────────────────────── */
  { pais: 'NI', nombre: 'La Prensa Nicaragua',              url: 'https://www.laprensa.com.ni/rss/',                           ambito: 'internacional' },
  { pais: 'NI', nombre: 'Confidencial Nicaragua',           url: 'https://confidencial.digital/feed/',                         ambito: 'internacional' },

  /* ── PANAMÁ ─────────────────────────────────────────── */
  { pais: 'PA', nombre: 'La Prensa Panamá',                 url: 'https://www.prensa.com/rss',                                 ambito: 'internacional' },
  { pais: 'PA', nombre: 'Mi Diario Panamá',                 url: 'https://www.midiario.com/rss/',                              ambito: 'internacional' },

  /* ── PUERTO RICO ────────────────────────────────────── */
  { pais: 'PR', nombre: 'El Nuevo Día',                     url: 'https://www.elnuevodia.com/rss/',                            ambito: 'internacional' },
  { pais: 'PR', nombre: 'El Vocero',                        url: 'https://www.elvocero.com/rss/',                              ambito: 'internacional' },

  /* ── HAITÍ ──────────────────────────────────────────── */
  { pais: 'HT', nombre: 'Le Nouvelliste',                   url: 'https://lenouvelliste.com/rss.xml',                          ambito: 'internacional' },
  { pais: 'HT', nombre: 'Alter Presse Haiti',               url: 'https://www.alterpresse.org/rss.xml',                       ambito: 'internacional' },

  /* ── JAMAICA ────────────────────────────────────────── */
  { pais: 'JM', nombre: 'Jamaica Gleaner Arts',             url: 'https://jamaica-gleaner.com/feed',                           ambito: 'internacional' },
  { pais: 'JM', nombre: 'Jamaica Observer Culture',         url: 'https://www.jamaicaobserver.com/feed/',                      ambito: 'internacional' },

  /* ── TRINIDAD Y TOBAGO ──────────────────────────────── */
  { pais: 'TT', nombre: 'Trinidad Guardian',                url: 'https://www.guardian.co.tt/rss/',                            ambito: 'internacional' },
  { pais: 'TT', nombre: 'Newsday Trinidad',                 url: 'https://newsday.co.tt/feed/',                                ambito: 'internacional' },

  /* ── BARBADOS ───────────────────────────────────────── */
  { pais: 'BB', nombre: 'Barbados Nation',                  url: 'https://www.nationnews.com/feed/',                           ambito: 'internacional' },

  /* ── GUYANA ─────────────────────────────────────────── */
  { pais: 'GY', nombre: 'Demerara Waves',                   url: 'https://demerarawaves.com/feed/',                            ambito: 'internacional' },
  { pais: 'GY', nombre: 'Stabroek News',                    url: 'https://www.stabroeknews.com/feed/',                         ambito: 'internacional' },

  /* ── SURINAM ────────────────────────────────────────── */
  { pais: 'SR', nombre: 'Starnieuws Suriname',              url: 'https://www.starnieuws.com/rss/home.xml',                    ambito: 'internacional' },

  /* ── BELIZE ─────────────────────────────────────────── */
  { pais: 'BZ', nombre: 'Channel 5 Belize',                 url: 'https://edition.channel5belize.com/feed/',                   ambito: 'internacional' },

  /* ── AUSTRIA ────────────────────────────────────────── */
  { pais: 'AT', nombre: 'Der Standard Kultur',              url: 'https://www.derstandard.at/rss/kultur',                      ambito: 'internacional' },
  { pais: 'AT', nombre: 'Die Presse Kultur',                url: 'https://www.diepresse.com/rss/kultur',                       ambito: 'internacional' },
  { pais: 'AT', nombre: 'Wiener Zeitung Kultur',            url: 'https://www.wienerzeitung.at/rss/kultur.rss',                ambito: 'internacional' },

  /* ── SUIZA ──────────────────────────────────────────── */
  { pais: 'CH', nombre: 'Neue Zürcher Zeitung Kultur',      url: 'https://www.nzz.ch/feuilleton.rss',                          ambito: 'internacional' },
  { pais: 'CH', nombre: 'Le Temps Kultur',                  url: 'https://www.letemps.ch/culture/rss',                         ambito: 'internacional' },
  { pais: 'CH', nombre: 'SRF Kultur',                       url: 'https://www.srf.ch/kultur/feed',                             ambito: 'internacional' },

  /* ── IRLANDA ────────────────────────────────────────── */
  { pais: 'IE', nombre: 'The Irish Times Culture',          url: 'https://www.irishtimes.com/rss/culture.xml',                 ambito: 'internacional' },
  { pais: 'IE', nombre: 'Irish Independent Culture',        url: 'https://www.independent.ie/entertainment/rss/',              ambito: 'internacional' },

  /* ── GRECIA ─────────────────────────────────────────── */
  { pais: 'GR', nombre: 'Kathimerini Culture',              url: 'https://www.ekathimerini.com/rss/?catid=37',                 ambito: 'internacional' },
  { pais: 'GR', nombre: 'To Vima Culture',                  url: 'https://www.tovima.gr/feed/',                               ambito: 'internacional' },

  /* ── DINAMARCA ──────────────────────────────────────── */
  { pais: 'DK', nombre: 'Politiken Kultur',                 url: 'https://politiken.dk/rss/kultur',                            ambito: 'internacional' },
  { pais: 'DK', nombre: 'Information Kultur',               url: 'https://www.information.dk/kultur/rss',                      ambito: 'internacional' },

  /* ── FINLANDIA ──────────────────────────────────────── */
  { pais: 'FI', nombre: 'Helsingin Sanomat Kulttuuri',      url: 'https://www.hs.fi/rss/kulttuuri.xml',                        ambito: 'internacional' },
  { pais: 'FI', nombre: 'Yle Kulttuuri',                    url: 'https://yle.fi/uutiset/rss/kulttuuri.rss',                   ambito: 'internacional' },

  /* ── HUNGRÍA ────────────────────────────────────────── */
  { pais: 'HU', nombre: 'Magyar Narancs',                   url: 'https://magyarnarancs.hu/rss.xml',                           ambito: 'internacional' },
  { pais: 'HU', nombre: 'Élet és Irodalom',                 url: 'https://www.es.hu/rss.xml',                                  ambito: 'internacional' },

  /* ── RUMANÍA ────────────────────────────────────────── */
  { pais: 'RO', nombre: 'Dilema Veche',                     url: 'https://www.dilemaveche.ro/rss.xml',                         ambito: 'internacional' },
  { pais: 'RO', nombre: 'România Literară',                 url: 'https://www.romlit.ro/rss.xml',                              ambito: 'internacional' },

  /* ── UCRANIA ────────────────────────────────────────── */
  { pais: 'UA', nombre: 'LB.ua Cultura',                    url: 'https://lb.ua/rss/culture.xml',                              ambito: 'internacional' },
  { pais: 'UA', nombre: 'Zaxid Cultura',                    url: 'https://zaxid.net/rss/culture/',                             ambito: 'internacional' },

  /* ── SERBIA ─────────────────────────────────────────── */
  { pais: 'RS', nombre: 'Vreme Kultura',                    url: 'https://www.vreme.com/rss.xml',                              ambito: 'internacional' },

  /* ── CROACIA ────────────────────────────────────────── */
  { pais: 'HR', nombre: 'Jutarnji List Kultura',            url: 'https://www.jutarnji.hr/rss/kultura',                        ambito: 'internacional' },
  { pais: 'HR', nombre: 'Nacional Kultura',                 url: 'https://www.nacional.hr/feed/',                              ambito: 'internacional' },

  /* ── ESLOVENIA ──────────────────────────────────────── */
  { pais: 'SI', nombre: 'Delo Kultura',                     url: 'https://www.delo.si/kultura/rss.xml',                        ambito: 'internacional' },

  /* ── ESLOVAQUIA ─────────────────────────────────────── */
  { pais: 'SK', nombre: 'SME Kultura',                      url: 'https://kultura.sme.sk/rss.xml',                             ambito: 'internacional' },

  /* ── ESTONIA ────────────────────────────────────────── */
  { pais: 'EE', nombre: 'Postimees Kultuur',                url: 'https://kultuur.postimees.ee/rss',                           ambito: 'internacional' },

  /* ── LETONIA ────────────────────────────────────────── */
  { pais: 'LV', nombre: 'Latvijas Avīze Kultūra',           url: 'https://www.la.lv/rss/kultura',                              ambito: 'internacional' },

  /* ── LITUANIA ───────────────────────────────────────── */
  { pais: 'LT', nombre: 'LRT Kultūra',                      url: 'https://www.lrt.lt/rss/kultura',                             ambito: 'internacional' },

  /* ── BULGARIA ───────────────────────────────────────── */
  { pais: 'BG', nombre: 'Kultura Weekly',                   url: 'https://kultura.bg/rss.xml',                                 ambito: 'internacional' },
  { pais: 'BG', nombre: 'Capital Kultura',                  url: 'https://www.capital.bg/rss/culture/',                        ambito: 'internacional' },

  /* ── ALBANIA ────────────────────────────────────────── */
  { pais: 'AL', nombre: 'Shqip Kultura',                    url: 'https://www.gazetashqip.al/feed/',                           ambito: 'internacional' },

  /* ── ISLANDIA ───────────────────────────────────────── */
  { pais: 'IS', nombre: 'Morgunblaðið Menning',             url: 'https://www.mbl.is/rss/menning/',                            ambito: 'internacional' },

  /* ── LUXEMBURGO ─────────────────────────────────────── */
  { pais: 'LU', nombre: 'Luxemburger Wort Kultur',          url: 'https://www.wort.lu/de/rss/',                                ambito: 'internacional' },

  /* ── MOLDOVA ────────────────────────────────────────── */
  { pais: 'MD', nombre: 'Ziarul de Gardă',                  url: 'https://www.zdg.md/feed',                                    ambito: 'internacional' },

  /* ── GEORGIA ────────────────────────────────────────── */
  { pais: 'GE', nombre: 'Rustavi 2 Cultura',                url: 'https://rustavi2.ge/rss/culture',                            ambito: 'internacional' },

  /* ── ARMENIA ────────────────────────────────────────── */
  { pais: 'AM', nombre: 'Azatutyun Cultura',                url: 'https://www.azatutyun.am/api/zmqoivmt',                      ambito: 'internacional' },

  /* ── AZERBAIYÁN ─────────────────────────────────────── */
  { pais: 'AZ', nombre: 'Azernews Culture',                 url: 'https://www.azernews.az/rss/culture.xml',                    ambito: 'internacional' },

  /* ── KAZAJISTÁN ─────────────────────────────────────── */
  { pais: 'KZ', nombre: 'Tengri News Culture',              url: 'https://tengrinews.kz/rss/culture/',                         ambito: 'internacional' },

  /* ── TURQUÍA (ampliado) ──────────────────────────────── */
  { pais: 'TR', nombre: 'Cumhuriyet Kültür',                url: 'https://www.cumhuriyet.com.tr/rss/kultur.xml',               ambito: 'internacional' },
  { pais: 'TR', nombre: 'Milliyet Kultur',                  url: 'https://www.milliyet.com.tr/rss/rssNew/sanatRss.xml',        ambito: 'internacional' },

  /* ── FILIPINAS ──────────────────────────────────────── */
  { pais: 'PH', nombre: 'Philippine Daily Inquirer Arts',   url: 'https://lifestyle.inquirer.net/category/arts-and-books/feed/', ambito: 'internacional' },
  { pais: 'PH', nombre: 'BusinessMirror Culture',           url: 'https://businessmirror.com.ph/feed/',                        ambito: 'internacional' },

  /* ── INDONESIA ──────────────────────────────────────── */
  { pais: 'ID', nombre: 'Kompas Budaya',                    url: 'https://www.kompas.com/tag/sastra.rss',                      ambito: 'internacional' },
  { pais: 'ID', nombre: 'Tempo Budaya',                     url: 'https://www.tempo.co/rss/budaya',                            ambito: 'internacional' },

  /* ── MALASIA ────────────────────────────────────────── */
  { pais: 'MY', nombre: 'The Star Arts',                    url: 'https://www.thestar.com.my/rss/News/Arts-and-Entertainment', ambito: 'internacional' },
  { pais: 'MY', nombre: 'Malaysiakini Arts',                url: 'https://www.malaysiakini.com/rss',                           ambito: 'internacional' },

  /* ── TAILANDIA ──────────────────────────────────────── */
  { pais: 'TH', nombre: 'Bangkok Post Arts',                url: 'https://www.bangkokpost.com/rss/data/lifestyle.xml',         ambito: 'internacional' },
  { pais: 'TH', nombre: 'The Nation Thailand',              url: 'https://www.nationthailand.com/rss/',                        ambito: 'internacional' },

  /* ── VIETNAM ────────────────────────────────────────── */
  { pais: 'VN', nombre: 'Tuoi Tre Cultura',                 url: 'https://tuoitre.vn/rss/van-hoa.rss',                         ambito: 'internacional' },
  { pais: 'VN', nombre: 'VnExpress Văn hóa',               url: 'https://vnexpress.net/rss/van-hoa.rss',                      ambito: 'internacional' },

  /* ── COREA DEL SUR ──────────────────────────────────── */
  { pais: 'KR', nombre: 'Korea JoongAng Daily Culture',     url: 'https://koreajoongangdaily.joins.com/rss/culture',           ambito: 'internacional' },
  { pais: 'KR', nombre: 'The Korea Herald Arts',            url: 'https://www.koreaherald.com/rss/010101000000.xml',           ambito: 'internacional' },

  /* ── PAKISTÁN ───────────────────────────────────────── */
  { pais: 'PK', nombre: 'Dawn Books and Authors',           url: 'https://www.dawn.com/feeds/books-and-authors',               ambito: 'internacional' },
  { pais: 'PK', nombre: 'The News International Arts',      url: 'https://www.thenews.com.pk/rss/9',                           ambito: 'internacional' },

  /* ── BANGLA DESH ────────────────────────────────────── */
  { pais: 'BD', nombre: 'The Daily Star Bangladesh Arts',   url: 'https://www.thedailystar.net/rss.xml',                       ambito: 'internacional' },
  { pais: 'BD', nombre: 'Prothom Alo Sahitya',              url: 'https://www.prothomalo.com/rss',                             ambito: 'internacional' },

  /* ── NEPAL ──────────────────────────────────────────── */
  { pais: 'NP', nombre: 'The Kathmandu Post Arts',          url: 'https://kathmandupost.com/rss',                              ambito: 'internacional' },

  /* ── SRI LANKA ──────────────────────────────────────── */
  { pais: 'LK', nombre: 'Daily Mirror Sri Lanka Culture',   url: 'https://www.dailymirror.lk/rss.xml',                         ambito: 'internacional' },

  /* ── IRÁN ───────────────────────────────────────────── */
  { pais: 'IR', nombre: 'Iran Daily Culture',               url: 'https://www.iran-daily.com/rss/culture',                     ambito: 'internacional' },
  { pais: 'IR', nombre: 'Tehran Times Culture',             url: 'https://www.tehrantimes.com/rss/culture',                    ambito: 'internacional' },

  /* ── IRAK ───────────────────────────────────────────── */
  { pais: 'IQ', nombre: 'Iraq News Agency Culture',         url: 'https://www.iraqinewsagency.com/feed/',                      ambito: 'internacional' },

  /* ── JORDANIA ───────────────────────────────────────── */
  { pais: 'JO', nombre: 'The Jordan Times Culture',         url: 'https://jordantimes.com/rss/',                               ambito: 'internacional' },

  /* ── EAU ────────────────────────────────────────────── */
  { pais: 'AE', nombre: 'The National UAE Culture',         url: 'https://www.thenationalnews.com/rss/Arts-Culture',           ambito: 'internacional' },
  { pais: 'AE', nombre: 'Gulf News Arts',                   url: 'https://gulfnews.com/rss',                                   ambito: 'internacional' },

  /* ── QATAR ──────────────────────────────────────────── */
  { pais: 'QA', nombre: 'Qatar Tribune Culture',            url: 'https://www.qatar-tribune.com/rss/culture',                  ambito: 'internacional' },

  /* ── KUWAIT ─────────────────────────────────────────── */
  { pais: 'KW', nombre: 'Arab Times Kuwait',                url: 'https://www.arabtimesonline.com/news/feed/',                  ambito: 'internacional' },

  /* ── SINGAPUR ───────────────────────────────────────── */
  { pais: 'SG', nombre: 'The Straits Times Arts',           url: 'https://www.straitstimes.com/rss/lifestyle',                 ambito: 'internacional' },
  { pais: 'SG', nombre: 'CNA Culture',                      url: 'https://www.channelnewsasia.com/rss/lifestyle/culture',      ambito: 'internacional' },

  /* ── HONG KONG ──────────────────────────────────────── */
  { pais: 'HK', nombre: 'SCMP Arts',                        url: 'https://www.scmp.com/rss/91/feed',                           ambito: 'internacional' },
  { pais: 'HK', nombre: 'HKFP Culture',                     url: 'https://hongkongfp.com/category/arts-culture/feed/',         ambito: 'internacional' },

  /* ── TAIWÁN ─────────────────────────────────────────── */
  { pais: 'TW', nombre: 'Taipei Times Culture',             url: 'https://www.taipeitimes.com/xml/culture.rss',                ambito: 'internacional' },

  /* ── MONGOLIA ───────────────────────────────────────── */
  { pais: 'MN', nombre: 'UB Post Mongolia',                 url: 'https://ubpost.mn/feed/',                                    ambito: 'internacional' },

  /* ── NUEVA ZELANDA ──────────────────────────────────── */
  { pais: 'NZ', nombre: 'NZ Herald Arts',                   url: 'https://www.nzherald.co.nz/rss/entertainment/',              ambito: 'internacional' },
  { pais: 'NZ', nombre: 'Stuff Culture',                    url: 'https://www.stuff.co.nz/entertainment/culture/rss',          ambito: 'internacional' },

  /* ── GHANA ──────────────────────────────────────────── */
  { pais: 'GH', nombre: 'Graphic Online Arts',              url: 'https://www.graphic.com.gh/rss',                             ambito: 'internacional' },
  { pais: 'GH', nombre: 'GhanaWeb Entertainment',          url: 'https://www.ghanaweb.com/GhanaHomePage/entertainment/rss.php', ambito: 'internacional' },

  /* ── SENEGAL ────────────────────────────────────────── */
  { pais: 'SN', nombre: 'Le Soleil Sénégal',                url: 'https://www.lesoleil.sn/feed/',                              ambito: 'internacional' },
  { pais: 'SN', nombre: 'Dakar Actu',                       url: 'https://www.dakaractu.com/rss.xml',                          ambito: 'internacional' },

  /* ── ETIOPÍA ────────────────────────────────────────── */
  { pais: 'ET', nombre: 'Addis Fortune',                    url: 'https://addisfortune.net/feed/',                             ambito: 'internacional' },
  { pais: 'ET', nombre: 'The Ethiopian Herald',             url: 'https://www.ethiopianherald.com/feed/',                      ambito: 'internacional' },

  /* ── TANZANIA ───────────────────────────────────────── */
  { pais: 'TZ', nombre: 'The Citizen Tanzania',             url: 'https://www.thecitizen.co.tz/tanzania/feed/',                ambito: 'internacional' },

  /* ── ZIMBABUE ───────────────────────────────────────── */
  { pais: 'ZW', nombre: 'The Herald Zimbabwe',              url: 'https://www.herald.co.zw/feed/',                             ambito: 'internacional' },
  { pais: 'ZW', nombre: 'NewsDay Zimbabwe',                 url: 'https://www.newsday.co.zw/feed/',                            ambito: 'internacional' },

  /* ── CAMERÚN ────────────────────────────────────────── */
  { pais: 'CM', nombre: 'Cameroon Tribune',                 url: 'http://www.cameroon-tribune.cm/rss.xml',                     ambito: 'internacional' },

  /* ── COSTA DE MARFIL ────────────────────────────────── */
  { pais: 'CI', nombre: 'Fraternité Matin',                 url: 'https://www.fratmat.info/rss.xml',                           ambito: 'internacional' },

  /* ── MARRUECOS ──────────────────────────────────────── */
  { pais: 'MA', nombre: 'Le Matin Maroc Culture',           url: 'https://lematin.ma/rss/culture.xml',                         ambito: 'internacional' },
  { pais: 'MA', nombre: 'Telquel Maroc',                    url: 'https://telquel.ma/feed/',                                   ambito: 'internacional' },

  /* ── ARGELIA ────────────────────────────────────────── */
  { pais: 'DZ', nombre: 'El Watan Culture',                 url: 'https://www.elwatan.com/feed/',                              ambito: 'internacional' },
  { pais: 'DZ', nombre: 'Le Quotidien d\'Oran',             url: 'https://www.lequotidien-oran.com/rss.xml',                   ambito: 'internacional' },

  /* ── TÚNEZ ──────────────────────────────────────────── */
  { pais: 'TN', nombre: 'La Presse Tunisie',                url: 'https://www.lapresse.tn/feed/',                              ambito: 'internacional' },

  /* ── MOZAMBIQUE ─────────────────────────────────────── */
  { pais: 'MZ', nombre: 'O País Mozambique',                url: 'https://www.opais.co.mz/feed/',                              ambito: 'internacional' },

  /* ── ANGOLA ─────────────────────────────────────────── */
  { pais: 'AO', nombre: 'Jornal de Angola',                 url: 'https://jornaldeangola.ao/feed/',                            ambito: 'internacional' },

  /* ── CONGO (RDC) ────────────────────────────────────── */
  { pais: 'CD', nombre: 'Actualité.cd',                     url: 'https://actualite.cd/feed/',                                 ambito: 'internacional' },

  /* ── RWANDA ─────────────────────────────────────────── */
  { pais: 'RW', nombre: 'The New Times Rwanda',             url: 'https://www.newtimes.co.rw/rss.xml',                         ambito: 'internacional' },

  /* ── UGANDA ─────────────────────────────────────────── */
  { pais: 'UG', nombre: 'Daily Monitor Uganda Culture',     url: 'https://www.monitor.co.ug/rss/',                             ambito: 'internacional' },

  /* ── ZIMBABUE / ZAMBIA ──────────────────────────────── */
  { pais: 'ZM', nombre: 'Zambia Daily Mail',                url: 'https://www.daily-mail.co.zm/feed/',                         ambito: 'internacional' },

  /* ── PAPUA NUEVA GUINEA ─────────────────────────────── */
  { pais: 'PG', nombre: 'Post Courier PNG',                 url: 'https://postcourier.com.pg/feed/',                           ambito: 'internacional' },

  /* ── REVISTAS LITERARIAS ESPECIALIZADAS ─────────────── */
  { pais: 'XX', nombre: 'Words Without Borders',            url: 'https://wordswithoutborders.org/feed/',                      ambito: 'internacional' },
  { pais: 'XX', nombre: 'World Literature Today',           url: 'https://www.worldliteraturetoday.org/feed',                  ambito: 'internacional' },
  { pais: 'XX', nombre: 'Asymptote Journal',                url: 'https://www.asymptotejournal.com/feed/',                     ambito: 'internacional' },
  { pais: 'XX', nombre: 'Three Percent',                    url: 'https://www.rochester.edu/news/rss/index.xml',               ambito: 'internacional' },
  { pais: 'XX', nombre: 'BOMB Magazine',                    url: 'https://bombmagazine.org/feed/',                             ambito: 'internacional' },
  { pais: 'XX', nombre: 'Paris Review',                     url: 'https://www.theparisreview.org/feed/',                       ambito: 'internacional' },
  { pais: 'XX', nombre: 'Granta',                           url: 'https://granta.com/feed/',                                   ambito: 'internacional' },
  { pais: 'XX', nombre: 'Los Angeles Review of Books',      url: 'https://lareviewofbooks.org/feed/',                          ambito: 'internacional' },
  { pais: 'XX', nombre: 'Book Riot',                        url: 'https://bookriot.com/feed/',                                 ambito: 'internacional' },
  { pais: 'XX', nombre: 'Electric Literature',              url: 'https://electricliterature.com/feed/',                       ambito: 'internacional' },
  { pais: 'XX', nombre: 'The Millions',                     url: 'https://themillions.com/feed',                               ambito: 'internacional' },
  { pais: 'XX', nombre: 'Necessary Fiction',                url: 'https://necessaryfiction.com/feed/',                         ambito: 'internacional' },
  { pais: 'XX', nombre: 'Tin House',                        url: 'https://tinhouse.com/feed/',                                 ambito: 'internacional' },
  { pais: 'XX', nombre: 'The New York Review of Books',     url: 'https://www.nybooks.com/feed/rss/',                          ambito: 'internacional' },
  { pais: 'XX', nombre: 'London Review of Books',           url: 'https://www.lrb.co.uk/rss.xml',                              ambito: 'internacional' },
  { pais: 'XX', nombre: 'Times Literary Supplement',        url: 'https://www.the-tls.co.uk/feed/',                            ambito: 'internacional' },
  { pais: 'XX', nombre: 'Nexos México',                     url: 'https://nexos.com.mx/feed/',                                 ambito: 'internacional' },
  { pais: 'XX', nombre: 'Revista Ñ',                        url: 'https://www.clarin.com/rss/cultura/',                        ambito: 'internacional' },
  { pais: 'XX', nombre: 'Quimera Revista',                  url: 'https://revistaquimera.com/feed/',                           ambito: 'internacional' },
  { pais: 'XX', nombre: 'Cuadernos Hispanoamericanos',      url: 'https://cuadernoshispanoamericanos.com/feed/',               ambito: 'internacional' },
];

const UA = 'Mozilla/5.0 (compatible; BLG-Bot/2.0; +https://ehchavezm-hub.github.io/05-literatura-cc/)';

async function fetchTexto(url) {
  const { default: fetch } = await import('node-fetch');
  const resp = await fetch(url, {
    signal: AbortSignal.timeout(8000),
    headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/xml, text/xml, */*' },
  });
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
