const path = require('path');
const fs = require('fs');

const RUTA_ARCHIVO = path.join(__dirname, '../public/datos/noticias-archivo.json');

function leerArchivo() {
  if (!fs.existsSync(RUTA_ARCHIVO)) return [];
  try {
    return JSON.parse(fs.readFileSync(RUTA_ARCHIVO, 'utf8'));
  } catch {
    return [];
  }
}

function guardarArchivo(items) {
  const existentes = leerArchivo();
  const urls = new Set(existentes.map(i => i.url));
  const nuevos = items.filter(i => i.url && !urls.has(i.url));
  const combinados = [...nuevos, ...existentes].slice(0, 2000);
  fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(combinados, null, 2));
  return combinados;
}

module.exports = { leerArchivo, guardarArchivo };
