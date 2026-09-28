const path = require('path');
const fs = require('fs');

function obtenerCatalogoLocal() {
  const ruta = path.join(__dirname, '../../public/datos/catalogo.js');
  if (!fs.existsSync(ruta)) return [];
  const contenido = fs.readFileSync(ruta, 'utf8');
  const m = contenido.match(/BLG_CATALOGO\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) return [];
  try {
    return JSON.parse(m[1]);
  } catch {
    return [];
  }
}

module.exports = { obtenerCatalogoLocal };
