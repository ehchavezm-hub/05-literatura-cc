/**
 * noticias-rss.js — reusa la lista completa de diarios.js
 * para obtener artículos de cultura/literatura de todo el mundo.
 */
const { obtenerDiarios, FUENTES_DIARIOS } = require('./diarios');

async function obtenerNoticias(diasAtras = 365) {
  return obtenerDiarios(diasAtras);
}

module.exports = { obtenerNoticias, FUENTES_DIARIOS };
