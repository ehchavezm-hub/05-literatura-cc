#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const { obtenerNovedadesSemana, obtenerNovedadesAnio } = require('../servidor/semana');
const { buscarGoogleBooks, buscarOpenLibrary } = require('../servidor/fuentes/libros-recientes');
const { guardarArchivo } = require('../servidor/archivo');

const DATOS = path.join(__dirname, '../public/datos');

async function main() {
  console.log('Actualizando datos literarios…');

  const [semana, anio, libros1, libros2] = await Promise.allSettled([
    obtenerNovedadesSemana(),
    obtenerNovedadesAnio(),
    buscarGoogleBooks('literatura latinoamericana 2024'),
    buscarOpenLibrary('literatura peruana'),
  ]);

  const ultimaSemana = semana.value || [];
  const archivo = guardarArchivo(anio.value || []);
  const librosRecientes = [
    ...(libros1.value || []),
    ...(libros2.value || []),
  ].slice(0, 100);

  fs.writeFileSync(path.join(DATOS, 'ultima-semana.json'), JSON.stringify(ultimaSemana, null, 2));
  fs.writeFileSync(path.join(DATOS, 'libros-recientes.json'), JSON.stringify(librosRecientes, null, 2));

  console.log(`✓ ultima-semana.json: ${ultimaSemana.length} items`);
  console.log(`✓ noticias-archivo.json: ${archivo.length} items`);
  console.log(`✓ libros-recientes.json: ${librosRecientes.length} items`);
}

main().catch(e => { console.error(e); process.exit(1); });
