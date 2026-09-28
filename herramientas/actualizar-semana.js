#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const { obtenerNovedadesSemana, obtenerNovedadesAnio } = require('../servidor/semana');
const { buscarGoogleBooks, buscarOpenLibrary } = require('../servidor/fuentes/libros-recientes');
const { obtenerDiarios } = require('../servidor/fuentes/diarios');
const { obtenerLibrosEditoriales } = require('../servidor/fuentes/editoriales');
const { guardarArchivo } = require('../servidor/archivo');

const DATOS = path.join(__dirname, '../public/datos');

async function main() {
  console.log('Actualizando datos literarios…');

  const [semana, anio, libros1, libros2, diarios, editoriales] = await Promise.allSettled([
    obtenerNovedadesSemana(),
    obtenerNovedadesAnio(),
    buscarGoogleBooks('literatura latinoamericana 2024'),
    buscarOpenLibrary('literatura peruana'),
    obtenerDiarios(365),
    obtenerLibrosEditoriales(),
  ]);

  const ultimaSemana  = semana.value     || [];
  const archivo       = guardarArchivo(anio.value || []);
  const librosRecientes = [
    ...(libros1.value || []),
    ...(libros2.value || []),
  ].slice(0, 100);

  const diariosItems = (diarios.value || []).slice(0, 500);

  // Combinar libros de editoriales con los recientes
  const editorialesItems = (editoriales.value || []).slice(0, 500);
  const librosTotal = quitarDuplicados([...librosRecientes, ...editorialesItems]).slice(0, 300);

  fs.writeFileSync(path.join(DATOS, 'ultima-semana.json'),    JSON.stringify(ultimaSemana, null, 2));
  fs.writeFileSync(path.join(DATOS, 'noticias-archivo.json'), JSON.stringify(archivo,      null, 2));
  fs.writeFileSync(path.join(DATOS, 'libros-recientes.json'), JSON.stringify(librosTotal,  null, 2));
  fs.writeFileSync(path.join(DATOS, 'diarios.json'),          JSON.stringify(diariosItems, null, 2));

  console.log(`✓ ultima-semana.json:    ${ultimaSemana.length} items`);
  console.log(`✓ noticias-archivo.json: ${archivo.length} items`);
  console.log(`✓ libros-recientes.json: ${librosTotal.length} items`);
  console.log(`✓ diarios.json:          ${diariosItems.length} items`);
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
