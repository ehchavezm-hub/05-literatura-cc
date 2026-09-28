const { obtenerNoticias } = require('./fuentes/noticias-rss');
const { buscarCrossref } = require('./fuentes/crossref');
const { buscarGoogleBooks } = require('./fuentes/libros-recientes');

async function obtenerNovedadesSemana() {
  const [noticias, ensayos, libros] = await Promise.allSettled([
    obtenerNoticias(7),
    buscarCrossref('literatura hispanoamericana', 7),
    buscarGoogleBooks('novela latinoamericana'),
  ]);
  return [
    ...(noticias.value || []),
    ...(ensayos.value || []),
    ...(libros.value || []),
  ];
}

async function obtenerNovedadesAnio() {
  const [noticias, ensayos] = await Promise.allSettled([
    obtenerNoticias(365),
    buscarCrossref('critica literaria latinoamerica', 365),
  ]);
  return [
    ...(noticias.value || []),
    ...(ensayos.value || []),
  ];
}

module.exports = { obtenerNovedadesSemana, obtenerNovedadesAnio };
