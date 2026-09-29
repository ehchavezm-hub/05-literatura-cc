#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const { obtenerNovedadesSemana, obtenerNovedadesAnio } = require('../servidor/semana');
const { buscarGoogleBooks, buscarOpenLibrary } = require('../servidor/fuentes/libros-recientes');
const { obtenerDiarios } = require('../servidor/fuentes/diarios');
const { obtenerLibrosEditoriales } = require('../servidor/fuentes/editoriales');
const { guardarArchivo } = require('../servidor/archivo');

const DATOS = path.join(__dirname, '../public/datos');

// Queries de Google Books: [termino, langRestrict]
// after:2023 → devuelve publicaciones desde 2024 en adelante
const GB_QUERIES_GLOBAL = [
  // América Latina (español)
  ['novela latinoamericana poesia contemporanea after:2023', 'es'],
  ['literatura peruana colombiana chilena argentina after:2023', 'es'],
  ['literatura mexicana venezolana ecuatoriana boliviana after:2023', 'es'],
  ['literatura centroamericana caribeña cubana after:2023', 'es'],
  ['literatura brasileña portuguesa contemporanea after:2023', 'es'],
  // Europa
  ['roman littérature contemporaine poésie française after:2023', 'fr'],
  ['neue deutsche Literatur Roman Gedicht Erzählung after:2023', 'de'],
  ['narrativa italiana contemporanea romanzo poesia after:2023', 'it'],
  ['literatura española novela ensayo contemporaneo after:2023', 'es'],
  ['literatura portuguesa escandinava nórdica after:2023', 'pt'],
  // Asia y Oceanía
  ['contemporary asian literature fiction translation after:2023', ''],
  ['japanese korean chinese literature novel translation after:2023', ''],
  ['south asian indian literature fiction poetry after:2023', ''],
  ['african australian world literature fiction after:2023', ''],
  // Anglófona global
  ['new literary fiction prize winner booker after:2023', 'en'],
  ['contemporary world fiction poetry translation after:2023', 'en'],
  ['literary novel short stories essay criticism after:2023', 'en'],
];

// Google News RSS — funciona bien desde servidores cloud
const GNEWS_QUERIES = [
  { q: 'literatura novela poesia', lang: 'es', gl: 'MX' },
  { q: 'literatura novela reseña', lang: 'es', gl: 'AR' },
  { q: 'novel fiction poetry books', lang: 'en', gl: 'US' },
  { q: 'roman littérature livre', lang: 'fr', gl: 'FR' },
  { q: 'Literatur Roman Gedicht', lang: 'de', gl: 'DE' },
  { q: 'narrativa romanzo poesia libri', lang: 'it', gl: 'IT' },
  { q: 'literatura libro prêmio', lang: 'pt', gl: 'BR' },
];

async function fetchGNewsRSS(query) {
  try {
    const { default: fetch } = await import('node-fetch');
    const { lang, gl, q } = query;
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${lang}&gl=${gl}&ceid=${gl}:${lang}`;
    const UA = 'Mozilla/5.0 (compatible; BLG-Bot/2.0; +https://ehchavezm-hub.github.io/05-literatura-cc/)';
    const resp = await fetch(url, {
      signal: AbortSignal.timeout(12000),
      headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/xml, text/xml, */*' },
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const xml = await resp.text();

    const items = [];
    const reItem = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = reItem.exec(xml)) !== null) {
      const bloque = m[1];
      const titulo = extraerTag(bloque, 'title');
      const enlace = extraerTag(bloque, 'link');
      const fecha = extraerTag(bloque, 'pubDate');
      const fuente = extraerTag(bloque, 'source') || `Google News ${gl}`;
      if (!titulo || !enlace) continue;
      const fechaObj = fecha ? new Date(fecha) : null;
      items.push({
        titulo: titulo.replace(/<[^>]+>/g, '').trim(),
        url: enlace.trim(),
        fuente,
        pais: gl,
        tipo: 'noticia',
        ambito: 'internacional',
        fecha: fechaObj && !isNaN(fechaObj) ? fechaObj.toISOString().split('T')[0] : null,
      });
    }
    return items;
  } catch {
    return [];
  }
}

function extraerTag(texto, tag) {
  const m = texto.match(new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

// Leer JSON existente con fallback a []
function leerExistente(archivo) {
  try {
    const contenido = fs.readFileSync(path.join(DATOS, archivo), 'utf8');
    return JSON.parse(contenido);
  } catch {
    return [];
  }
}

// Guardar solo si hay datos nuevos; si nuevo está vacío, conservar el anterior
function guardarSiHayDatos(archivo, nuevos, descripcion) {
  if (nuevos.length > 0) {
    fs.writeFileSync(path.join(DATOS, archivo), JSON.stringify(nuevos, null, 2));
    console.log(`✓ ${archivo}: ${nuevos.length} items`);
  } else {
    const anteriores = leerExistente(archivo);
    if (anteriores.length > 0) {
      console.warn(`⚠ ${archivo}: vacío — conservando ${anteriores.length} items anteriores (${descripcion})`);
    } else {
      fs.writeFileSync(path.join(DATOS, archivo), JSON.stringify([], null, 2));
      console.warn(`⚠ ${archivo}: vacío (${descripcion})`);
    }
  }
}

async function main() {
  console.log('Actualizando datos literarios…');
  console.log(`  GOOGLE_BOOKS_API_KEY: ${process.env.GOOGLE_BOOKS_API_KEY ? 'configurada ✓' : 'NO CONFIGURADA (rate-limit sin clave)'}`);

  // Ejecutar todas las queries en paralelo
  const gbPromises = GB_QUERIES_GLOBAL.map(([q, lang]) => buscarGoogleBooks(q, 'newest', 15, lang));
  const gnewsPromises = GNEWS_QUERIES.map(q => fetchGNewsRSS(q));

  const [semana, anio, diarios, editoriales, openLib1, openLib2, ...resto] = await Promise.allSettled([
    obtenerNovedadesSemana(),
    obtenerNovedadesAnio(),
    obtenerDiarios(730),
    obtenerLibrosEditoriales(),
    buscarOpenLibrary('novela latinoamericana poesia'),
    buscarOpenLibrary('world fiction literary novel poetry'),
    ...gbPromises,
    ...gnewsPromises,
  ]);

  const gbResults   = resto.slice(0, gbPromises.length);
  const gnewsResults = resto.slice(gbPromises.length);

  const ultimaSemana = semana.value || [];
  const archivo      = guardarArchivo(anio.value || []);

  // Libros: editoriales + Google Books global + Open Library
  const editorialesItems = editoriales.value || [];
  const gbItems  = gbResults.flatMap(r => r.value || []);
  const olItems  = [...(openLib1.value || []), ...(openLib2.value || [])];
  const librosTotal = quitarDuplicados([...editorialesItems, ...gbItems, ...olItems]).slice(0, 2000);

  // Noticias: RSS directo + Google News como respaldo
  const rssItems    = diarios.value || [];
  const gnewsItems  = gnewsResults.flatMap(r => r.value || []);
  const diariosItems = quitarDuplicados([...rssItems, ...gnewsItems]).slice(0, 3000);

  console.log(`  RSS directo: ${rssItems.length} items | Google News: ${gnewsItems.length} items`);
  console.log(`  Editoriales: ${editorialesItems.length} | GB: ${gbItems.length} | OL: ${olItems.length}`);

  fs.writeFileSync(path.join(DATOS, 'ultima-semana.json'),    JSON.stringify(ultimaSemana, null, 2));
  fs.writeFileSync(path.join(DATOS, 'noticias-archivo.json'), JSON.stringify(archivo,      null, 2));
  guardarSiHayDatos('libros-recientes.json', librosTotal,  'falla en APIs de libros');
  guardarSiHayDatos('diarios.json',          diariosItems, 'falla en todos los feeds RSS y Google News');

  if (librosTotal.length < 50 && !process.env.GOOGLE_BOOKS_API_KEY) {
    console.warn('  → Agrega GOOGLE_BOOKS_API_KEY como secreto en GitHub para mejorar libros-recientes');
  }
  const gbFailed = gbResults.filter(r => r.status === 'rejected').length;
  if (gbFailed > 0) console.warn(`  ⚠ Fallaron ${gbFailed}/${gbResults.length} queries de Google Books`);
}

function quitarDuplicados(items) {
  const vistos = new Set();
  return items.filter(item => {
    const clave = (item.titulo || '').toLowerCase().trim();
    if (!clave || vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });
}

main().catch(e => { console.error(e); process.exit(1); });
