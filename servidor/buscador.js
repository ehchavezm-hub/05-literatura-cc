const { buscarGutenberg } = require('./fuentes/gutenberg');
const { buscarCrossref } = require('./fuentes/crossref');
const { buscarOpenLibrary, buscarGoogleBooks } = require('./fuentes/libros-recientes');
const { obtenerCatalogoLocal } = require('./fuentes/catalogo-local');

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

function quitarDuplicados(items) {
  const vistos = new Set();
  return items.filter(item => {
    const clave = normalizar(item.titulo + (item.autores || ''));
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });
}

function ordenarPorFecha(items) {
  return items.sort((a, b) => {
    if (!a.fecha && !b.fecha) return 0;
    if (!a.fecha) return 1;
    if (!b.fecha) return -1;
    return b.fecha.localeCompare(a.fecha);
  });
}

async function buscar(termino, diasAtras = 365) {
  const [gutenberg, crossref, openLibrary, googleBooks] = await Promise.allSettled([
    buscarGutenberg(termino),
    buscarCrossref(termino, diasAtras),
    buscarOpenLibrary(termino),
    buscarGoogleBooks(termino),
  ]);

  const todos = [
    ...(gutenberg.value || []),
    ...(crossref.value || []),
    ...(openLibrary.value || []),
    ...(googleBooks.value || []),
    ...obtenerCatalogoLocal().filter(item =>
      normalizar(item.titulo + (item.autores || '')).includes(normalizar(termino))
    ),
  ];

  return ordenarPorFecha(quitarDuplicados(todos));
}

module.exports = { buscar };
