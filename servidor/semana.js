const { obtenerNoticias } = require('./fuentes/noticias-rss');
const { buscarCrossref } = require('./fuentes/crossref');
const { buscarGoogleBooks } = require('./fuentes/libros-recientes');

async function obtenerNovedadesSemana() {
  const [noticias, cr1, cr2, gb1, gb2] = await Promise.allSettled([
    obtenerNoticias(14),
    buscarCrossref('literatura hispanoamericana critica resena', 14),
    buscarCrossref('literary criticism book review fiction', 14),
    buscarGoogleBooks('novela latinoamericana contemporanea'),
    buscarGoogleBooks('new literary fiction world poetry'),
  ]);
  return [
    ...(noticias.value || []),
    ...(cr1.value     || []),
    ...(cr2.value     || []),
    ...(gb1.value     || []),
    ...(gb2.value     || []),
  ];
}

async function obtenerNovedadesAnio() {
  const [noticias, cr1, cr2, cr3] = await Promise.allSettled([
    obtenerNoticias(730),
    buscarCrossref('critica literaria latinoamerica resena', 730),
    buscarCrossref('literary criticism world fiction essay', 730),
    buscarCrossref('literatura contemporanea ensayo cultural', 730),
  ]);
  return [
    ...(noticias.value || []),
    ...(cr1.value     || []),
    ...(cr2.value     || []),
    ...(cr3.value     || []),
  ];
}

module.exports = { obtenerNovedadesSemana, obtenerNovedadesAnio };
