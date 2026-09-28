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
  { pais: 'EG', nombre: 'Dar Al-Maaref',                    lang: 'ar' },

  /* ── GUATEMALA ────────────────────────── */
  { pais: 'GT', nombre: 'F&G Editores Guatemala',           lang: 'es' },
  { pais: 'GT', nombre: 'Oscar de Leon Palacios',           lang: 'es' },

  /* ── HONDURAS ─────────────────────────── */
  { pais: 'HN', nombre: 'Editorial Universitaria Honduras', lang: 'es' },
  { pais: 'HN', nombre: 'Baktun Editores',                  lang: 'es' },

  /* ── EL SALVADOR ──────────────────────── */
  { pais: 'SV', nombre: 'Direccion de Publicaciones El Salvador', lang: 'es' },
  { pais: 'SV', nombre: 'Calix y Cantos Editores',          lang: 'es' },

  /* ── NICARAGUA ────────────────────────── */
  { pais: 'NI', nombre: 'Editorial Nueva Nicaragua',        lang: 'es' },
  { pais: 'NI', nombre: 'Anama Ediciones',                  lang: 'es' },

  /* ── PANAMÁ ───────────────────────────── */
  { pais: 'PA', nombre: 'Editorial Universitaria USMA',     lang: 'es' },
  { pais: 'PA', nombre: 'Editora Sibauste',                  lang: 'es' },

  /* ── HAITI ────────────────────────────── */
  { pais: 'HT', nombre: 'Editions Henri Deschamps',         lang: 'fr' },
  { pais: 'HT', nombre: 'C3 Editions',                      lang: 'fr' },

  /* ── JAMAICA ──────────────────────────── */
  { pais: 'JM', nombre: 'Ian Randle Publishers',            lang: 'en' },
  { pais: 'JM', nombre: 'LMH Publishing Jamaica',           lang: 'en' },

  /* ── TRINIDAD Y TOBAGO ────────────────── */
  { pais: 'TT', nombre: 'Lexicon Trinidad',                 lang: 'en' },
  { pais: 'TT', nombre: 'Paria Publishing',                 lang: 'en' },

  /* ── GUYANA ───────────────────────────── */
  { pais: 'GY', nombre: 'Guyana Publications',              lang: 'en' },

  /* ── BARBADOS ─────────────────────────── */
  { pais: 'BB', nombre: 'Miller Publishing Barbados',       lang: 'en' },

  /* ── AUSTRIA ──────────────────────────── */
  { pais: 'AT', nombre: 'Paul Zsolnay Verlag',              lang: 'de' },
  { pais: 'AT', nombre: 'Residenz Verlag',                  lang: 'de' },
  { pais: 'AT', nombre: 'Deuticke Verlag',                  lang: 'de' },
  { pais: 'AT', nombre: 'Haymon Verlag',                    lang: 'de' },

  /* ── SUIZA ────────────────────────────── */
  { pais: 'CH', nombre: 'Diogenes Verlag',                  lang: 'de' },
  { pais: 'CH', nombre: 'Nagel Kimche',                     lang: 'de' },
  { pais: 'CH', nombre: 'Editions Zoe',                     lang: 'fr' },
  { pais: 'CH', nombre: 'Editions de l Aire',               lang: 'fr' },

  /* ── IRLANDA ──────────────────────────── */
  { pais: 'IE', nombre: 'The Lilliput Press',               lang: 'en' },
  { pais: 'IE', nombre: 'New Island Books',                 lang: 'en' },
  { pais: 'IE', nombre: 'Gill Books Ireland',               lang: 'en' },

  /* ── GRECIA ───────────────────────────── */
  { pais: 'GR', nombre: 'Estia Publications',               lang: 'el' },
  { pais: 'GR', nombre: 'Kastaniotis Editions',             lang: 'el' },
  { pais: 'GR', nombre: 'Metaichmio',                       lang: 'el' },

  /* ── DINAMARCA ────────────────────────── */
  { pais: 'DK', nombre: 'Gyldendal Denmark',                lang: 'da' },
  { pais: 'DK', nombre: 'Rosinante Forlag',                 lang: 'da' },
  { pais: 'DK', nombre: 'Lindhardt og Ringhof',             lang: 'da' },

  /* ── FINLANDIA ────────────────────────── */
  { pais: 'FI', nombre: 'WSOY Finland',                     lang: 'fi' },
  { pais: 'FI', nombre: 'Otava Publishing',                 lang: 'fi' },
  { pais: 'FI', nombre: 'Tammi Publishers',                 lang: 'fi' },

  /* ── HUNGRÍA ──────────────────────────── */
  { pais: 'HU', nombre: 'Magveto Kiado',                    lang: 'hu' },
  { pais: 'HU', nombre: 'Jelenkor Kiado',                   lang: 'hu' },
  { pais: 'HU', nombre: 'Scolar Kiado',                     lang: 'hu' },

  /* ── RUMANÍA ──────────────────────────── */
  { pais: 'RO', nombre: 'Polirom Romania',                  lang: 'ro' },
  { pais: 'RO', nombre: 'Humanitas Romania',                lang: 'ro' },
  { pais: 'RO', nombre: 'Cartea Romaneasca',                lang: 'ro' },

  /* ── UCRANIA ──────────────────────────── */
  { pais: 'UA', nombre: 'Folio Publishing Ukraine',         lang: 'uk' },
  { pais: 'UA', nombre: 'Osnovy Ukraine',                   lang: 'uk' },
  { pais: 'UA', nombre: 'A-BA-BA-HA-LA-MA-HA Ukraine',     lang: 'uk' },

  /* ── SERBIA ───────────────────────────── */
  { pais: 'RS', nombre: 'Laguna Serbia',                    lang: 'sr' },
  { pais: 'RS', nombre: 'Stubovi kulture',                  lang: 'sr' },

  /* ── CROACIA ──────────────────────────── */
  { pais: 'HR', nombre: 'Fraktura Croatia',                 lang: 'hr' },
  { pais: 'HR', nombre: 'Algoritam Croatia',                lang: 'hr' },
  { pais: 'HR', nombre: 'Profil International Croatia',     lang: 'hr' },

  /* ── ESLOVENIA ────────────────────────── */
  { pais: 'SI', nombre: 'Cankarjeva Zalozba',               lang: 'sl' },
  { pais: 'SI', nombre: 'Mladinska knjiga',                 lang: 'sl' },

  /* ── ESLOVAQUIA ───────────────────────── */
  { pais: 'SK', nombre: 'Slovart Slovakia',                 lang: 'sk' },
  { pais: 'SK', nombre: 'Ikar Slovakia',                    lang: 'sk' },

  /* ── BULGARIA ─────────────────────────── */
  { pais: 'BG', nombre: 'Colibri Bulgaria',                 lang: 'bg' },
  { pais: 'BG', nombre: 'Ciela Publishers',                 lang: 'bg' },

  /* ── ESTONIA ──────────────────────────── */
  { pais: 'EE', nombre: 'Varrak Publishers Estonia',        lang: 'et' },
  { pais: 'EE', nombre: 'Tanapäev Estonia',                 lang: 'et' },

  /* ── LETONIA ──────────────────────────── */
  { pais: 'LV', nombre: 'Dienas Gramata Latvia',            lang: 'lv' },
  { pais: 'LV', nombre: 'Zvaigzne ABC Latvia',              lang: 'lv' },

  /* ── LITUANIA ─────────────────────────── */
  { pais: 'LT', nombre: 'Alma Littera Lithuania',           lang: 'lt' },
  { pais: 'LT', nombre: 'Tyto alba Lithuania',              lang: 'lt' },

  /* ── NORUEGA ──────────────────────────── */
  { pais: 'NO', nombre: 'Gyldendal Norsk Forlag',           lang: 'no' },
  { pais: 'NO', nombre: 'Cappelen Damm',                    lang: 'no' },
  { pais: 'NO', nombre: 'Aschehoug Norway',                 lang: 'no' },

  /* ── BÉLGICA ──────────────────────────── */
  { pais: 'BE', nombre: 'Actes Sud Belgique',               lang: 'fr' },
  { pais: 'BE', nombre: 'Lannoo Publishers',                lang: 'nl' },
  { pais: 'BE', nombre: 'Standaard Uitgeverij',             lang: 'nl' },

  /* ── TURQUÍA ──────────────────────────── */
  { pais: 'TR', nombre: 'Yapi Kredi Yayinlari',             lang: 'tr' },
  { pais: 'TR', nombre: 'Iletisim Yayinlari',               lang: 'tr' },
  { pais: 'TR', nombre: 'Can Yayinlari',                    lang: 'tr' },
  { pais: 'TR', nombre: 'Metis Yayinlari',                  lang: 'tr' },

  /* ── FILIPINAS ────────────────────────── */
  { pais: 'PH', nombre: 'Anvil Publishing Philippines',     lang: 'en' },
  { pais: 'PH', nombre: 'UP Press Philippines',             lang: 'en' },
  { pais: 'PH', nombre: 'Ateneo de Manila Press',           lang: 'en' },

  /* ── INDONESIA ────────────────────────── */
  { pais: 'ID', nombre: 'Gramedia Pustaka Utama',           lang: 'id' },
  { pais: 'ID', nombre: 'Kepustakaan Populer Gramedia',     lang: 'id' },
  { pais: 'ID', nombre: 'Mizan Publishers Indonesia',       lang: 'id' },

  /* ── MALASIA ──────────────────────────── */
  { pais: 'MY', nombre: 'Dewan Bahasa dan Pustaka',         lang: 'ms' },
  { pais: 'MY', nombre: 'Utusan Publications Malaysia',     lang: 'ms' },

  /* ── TAILANDIA ────────────────────────── */
  { pais: 'TH', nombre: 'Amarin Publishers Thailand',       lang: 'th' },
  { pais: 'TH', nombre: 'Matichon Publishers',              lang: 'th' },

  /* ── VIETNAM ──────────────────────────── */
  { pais: 'VN', nombre: 'Nha Xuat Ban Kim Dong',            lang: 'vi' },
  { pais: 'VN', nombre: 'Nha Xuat Ban Tre',                 lang: 'vi' },

  /* ── COREA DEL SUR (ampliado) ─────────── */
  { pais: 'KR', nombre: 'Moonji Publishing',                lang: 'ko' },
  { pais: 'KR', nombre: 'Hangilsa',                         lang: 'ko' },

  /* ── PAKISTÁN ─────────────────────────── */
  { pais: 'PK', nombre: 'Oxford University Press Pakistan', lang: 'en' },
  { pais: 'PK', nombre: 'Sang-e-Meel Publications',         lang: 'ur' },
  { pais: 'PK', nombre: 'Ferozsons Pakistan',               lang: 'en' },

  /* ── BANGLADESH ───────────────────────── */
  { pais: 'BD', nombre: 'Anyaprokash Publishers',           lang: 'bn' },
  { pais: 'BD', nombre: 'Prothoma Prokashon',               lang: 'bn' },

  /* ── SRI LANKA ────────────────────────── */
  { pais: 'LK', nombre: 'S Godage Sri Lanka',               lang: 'si' },
  { pais: 'LK', nombre: 'Godage Publishers',                lang: 'si' },

  /* ── ISRAEL ───────────────────────────── */
  { pais: 'IL', nombre: 'Am Oved Publishers',               lang: 'he' },
  { pais: 'IL', nombre: 'Kinneret Zmora',                   lang: 'he' },
  { pais: 'IL', nombre: 'Carmel Publishing Israel',         lang: 'he' },

  /* ── IRAN ─────────────────────────────── */
  { pais: 'IR', nombre: 'Negah Publishers Iran',            lang: 'fa' },
  { pais: 'IR', nombre: 'Cheshmeh Publications',            lang: 'fa' },

  /* ── EAU ──────────────────────────────── */
  { pais: 'AE', nombre: 'Dar Al Manhal UAE',                lang: 'ar' },
  { pais: 'AE', nombre: 'Kalimat Group UAE',                lang: 'ar' },

  /* ── SINGAPUR ─────────────────────────── */
  { pais: 'SG', nombre: 'Epigram Books Singapore',          lang: 'en' },
  { pais: 'SG', nombre: 'Marshall Cavendish Singapore',     lang: 'en' },

  /* ── HONG KONG ────────────────────────── */
  { pais: 'HK', nombre: 'Kubrick Hong Kong',                lang: 'zh' },
  { pais: 'HK', nombre: 'Oxford University Press HK',       lang: 'en' },

  /* ── TAIWÁN ───────────────────────────── */
  { pais: 'TW', nombre: 'INK Literary Monthly Taiwan',      lang: 'zh' },
  { pais: 'TW', nombre: 'Rye Field Publishing Taiwan',      lang: 'zh' },
  { pais: 'TW', nombre: 'Linking Publishing Taiwan',        lang: 'zh' },

  /* ── NUEVA ZELANDA ────────────────────── */
  { pais: 'NZ', nombre: 'Victoria University Press NZ',     lang: 'en' },
  { pais: 'NZ', nombre: 'Penguin New Zealand',              lang: 'en' },

  /* ── GHANA ────────────────────────────── */
  { pais: 'GH', nombre: 'Sub-Saharan Publishers Ghana',     lang: 'en' },
  { pais: 'GH', nombre: 'Woeli Publishing Ghana',           lang: 'en' },

  /* ── SENEGAL ──────────────────────────── */
  { pais: 'SN', nombre: 'Presence Africaine',               lang: 'fr' },
  { pais: 'SN', nombre: 'NEAS Dakar',                       lang: 'fr' },

  /* ── ETIOPÍA ──────────────────────────── */
  { pais: 'ET', nombre: 'Kuraz Publishing Ethiopia',        lang: 'am' },

  /* ── ZIMBABUE ─────────────────────────── */
  { pais: 'ZW', nombre: 'Weaver Press Zimbabwe',            lang: 'en' },
  { pais: 'ZW', nombre: 'amaBooks Zimbabwe',                lang: 'en' },

  /* ── CAMERÚN ──────────────────────────── */
  { pais: 'CM', nombre: 'CLE Cameroon',                     lang: 'fr' },
  { pais: 'CM', nombre: 'Ifrikiya Publishers',              lang: 'fr' },

  /* ── COSTA DE MARFIL ──────────────────── */
  { pais: 'CI', nombre: 'NEI CEDA Cote d Ivoire',           lang: 'fr' },

  /* ── MARRUECOS ────────────────────────── */
  { pais: 'MA', nombre: 'Editions Le Fennec',               lang: 'fr' },
  { pais: 'MA', nombre: 'Dar Qalam Morocco',                lang: 'ar' },

  /* ── MOZAMBIQUE ───────────────────────── */
  { pais: 'MZ', nombre: 'Associacao Escritores Mozambicanos', lang: 'pt' },

  /* ── ANGOLA ───────────────────────────── */
  { pais: 'AO', nombre: 'Editorial Nzila Angola',           lang: 'pt' },
  { pais: 'AO', nombre: 'Maianga Editora',                  lang: 'pt' },

  /* ── KENIA ────────────────────────────── */
  { pais: 'KE', nombre: 'East African Educational Publishers', lang: 'en' },
  { pais: 'KE', nombre: 'Kwani Trust Kenya',                lang: 'en' },
  { pais: 'KE', nombre: 'Storymoja Africa',                 lang: 'en' },

  /* ── UGANDA ───────────────────────────── */
  { pais: 'UG', nombre: 'Fountain Publishers Uganda',       lang: 'en' },

  /* ── RWANDA ───────────────────────────── */
  { pais: 'RW', nombre: 'Editions Bakame Rwanda',           lang: 'rw' },

  /* ── PAPÚA NUEVA GUINEA ───────────────── */
  { pais: 'PG', nombre: 'University of PNG Press',          lang: 'en' },

  /* ── LÍBANO ───────────────────────────── */
  { pais: 'LB', nombre: 'Dar An-Nahar Lebanon',             lang: 'ar' },
  { pais: 'LB', nombre: 'Arab Scientific Publishers',       lang: 'ar' },
  { pais: 'LB', nombre: 'Dar Al-Jadid Lebanon',             lang: 'ar' },

  /* ── ARABIA SAUDITA ───────────────────── */
  { pais: 'SA', nombre: 'Dar Al-Yamama Saudi',              lang: 'ar' },
  { pais: 'SA', nombre: 'Al-Riyad Publishers',              lang: 'ar' },

  /* ── ISLANDIA ─────────────────────────── */
  { pais: 'IS', nombre: 'Forlagid Iceland',                 lang: 'is' },
  { pais: 'IS', nombre: 'Bjartur Publishers',               lang: 'is' },

  /* ── LUXEMBURGO ───────────────────────── */
  { pais: 'LU', nombre: 'Editions Phi Luxembourg',          lang: 'fr' },

  /* ── GEORGIA ──────────────────────────── */
  { pais: 'GE', nombre: 'Bakur Sulakauri Publishing',       lang: 'ka' },

  /* ── ARMENIA ──────────────────────────── */
  { pais: 'AM', nombre: 'Antares Publishing Armenia',       lang: 'hy' },
  { pais: 'AM', nombre: 'Edit Print Armenia',               lang: 'hy' },

  /* ── AZERBAIYÁN ───────────────────────── */
  { pais: 'AZ', nombre: 'Adiloglu Azerbaijan',              lang: 'az' },

  /* ── KAZAJISTÁN ───────────────────────── */
  { pais: 'KZ', nombre: 'Atamura Kazakhstan',               lang: 'kk' },

  /* ── EDITORES DE LITERATURA EN TRADUCCIÓN ─ */
  { pais: 'XX', nombre: 'Restless Books',                   lang: 'en' },
  { pais: 'XX', nombre: 'Archipelago Books',                lang: 'en' },
  { pais: 'XX', nombre: 'New Directions Publishing',        lang: 'en' },
  { pais: 'XX', nombre: 'And Other Stories',                lang: 'en' },
  { pais: 'XX', nombre: 'Europa Editions',                  lang: 'en' },
  { pais: 'XX', nombre: 'World Editions',                   lang: 'en' },
  { pais: 'XX', nombre: 'Seagull Books',                    lang: 'en' },
  { pais: 'XX', nombre: 'Peirene Press',                    lang: 'en' },
  { pais: 'XX', nombre: 'Pushkin Press',                    lang: 'en' },
  { pais: 'XX', nombre: 'Biblioasis',                       lang: 'en' },
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
