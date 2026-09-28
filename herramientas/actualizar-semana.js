#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const { obtenerNovedadesSemana, obtenerNovedadesAnio } = require('../servidor/semana');
const { buscarGoogleBooks, buscarOpenLibrary } = require('../servidor/fuentes/libros-recientes');
const { obtenerDiarios } = require('../servidor/fuentes/diarios');
const { obtenerLibrosEditoriales } = require('../servidor/fuentes/editoriales');
const { guardarArchivo } = require('../servidor/archivo');

const DATOS = path.join(__dirname, '../public/datos');

// Queries de Google Books para cubrir todas las regiones del mundo
const GB_QUERIES_GLOBAL = [
  // América Latina
  'novela latinoamericana poesia contemporanea',
  'literatura peruana colombiana chilena argentina',
  'literatura mexicana venezolana ecuatoriana boliviana',
  'literatura centroamericana caribeña cubana',
  'literatura brasileña portuguesa contemporanea',
  // Europa
  'roman littérature contemporaine poésie française',
  'neue deutsche Literatur Roman Gedicht Erzählung',
  'narrativa italiana contemporanea romanzo poesia',
  'literatura española novela ensayo contemporaneo',
  'literatura portuguesa escandinava nórdica',
  // Asia y Oceanía
  'contemporary asian literature fiction translation',
  'japanese korean chinese literature novel translation',
  'south asian indian literature fiction poetry',
  'african australian world literature fiction',
  // Anglófona global
  'new literary fiction prize winner booker',
  'contemporary world fiction poetry translation',
  'literary novel short stories essay criticism',
];

async function main() {
  console.log('Actualizando datos literarios…');

  // Ejecutar todas las queries en paralelo
  const gbPromises = GB_QUERIES_GLOBAL.map(q => buscarGoogleBooks(q));

  const [semana, anio, diarios, editoriales, openLib1, openLib2, ...gbResults] = await Promise.allSettled([
    obtenerNovedadesSemana(),
    obtenerNovedadesAnio(),
    obtenerDiarios(730),          // 2 años de noticias RSS (todos los 248 feeds)
    obtenerLibrosEditoriales(),   // todos los 290+ editores
    buscarOpenLibrary('novela latinoamericana poesia'),
    buscarOpenLibrary('world fiction literary novel poetry'),
    ...gbPromises,
  ]);

  const ultimaSemana = semana.value || [];
  const archivo      = guardarArchivo(anio.value || []);

  // Libros: editoriales + Google Books global + Open Library
  const editorialesItems = editoriales.value || [];
  const gbItems = gbResults.flatMap(r => r.value || []);
  const olItems = [...(openLib1.value || []), ...(openLib2.value || [])];
  const librosTotal = quitarDuplicados([...editorialesItems, ...gbItems, ...olItems]).slice(0, 2000);

  // Noticias: todos los feeds RSS sin límite artificial
  const diariosItems = quitarDuplicados(diarios.value || []).slice(0, 3000);

  fs.writeFileSync(path.join(DATOS, 'ultima-semana.json'),    JSON.stringify(ultimaSemana, null, 2));
  fs.writeFileSync(path.join(DATOS, 'noticias-archivo.json'), JSON.stringify(archivo,      null, 2));
  fs.writeFileSync(path.join(DATOS, 'libros-recientes.json'), JSON.stringify(librosTotal,  null, 2));
  fs.writeFileSync(path.join(DATOS, 'diarios.json'),          JSON.stringify(diariosItems, null, 2));

  console.log(`✓ ultima-semana.json:    ${ultimaSemana.length} items`);
  console.log(`✓ noticias-archivo.json: ${archivo.length} items`);
  console.log(`✓ libros-recientes.json: ${librosTotal.length} items (${editorialesItems.length} editoriales + ${gbItems.length} GB + ${olItems.length} OL)`);
  console.log(`✓ diarios.json:          ${diariosItems.length} items (${(diarios.value || []).length} antes de dedup)`);
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
