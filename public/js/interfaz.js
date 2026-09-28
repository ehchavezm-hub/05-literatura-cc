(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Interfaz = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const ICONOS_TIPO = {
    clasico: '📜',
    ensayo: '📄',
    libro: '📚',
    noticia: '📰',
    resena: '✍️',
  };

  const COLORES_TIPO = {
    clasico: 'blg-purple',
    ensayo: 'blg-blue',
    libro: 'blg-green',
    noticia: 'blg-orange',
    resena: 'blg-red',
  };

  function crearTarjeta(item) {
    const icono = ICONOS_TIPO[item.tipo] || '📄';
    const esNacional = item.ambito === 'nacional';
    const accentClass = esNacional ? 'border-l-blg-red' : 'border-l-blg-blue';
    const badgeNacional = esNacional
      ? '<span class="inline-block text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 font-semibold mr-2">Perú</span>'
      : '';
    const accesoLibre = item.acceso === 'libre'
      ? '<span class="inline-block text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-semibold">Acceso libre</span>'
      : '';
    const fecha = item.fecha
      ? `<span class="text-xs text-blg-gray">${item.fecha}</span>`
      : '';
    const autores = item.autores
      ? `<p class="text-sm text-blg-gray mt-1 truncate">${escHtml(item.autores)}</p>`
      : '';
    const fuente = item.fuente
      ? `<span class="text-xs text-blg-gray">${escHtml(item.fuente)}</span>`
      : '';

    return `
      <article class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blg-border dark:border-gray-700 border-l-4 ${accentClass} p-4 hover:shadow-md transition-shadow">
        <div class="flex items-start gap-3">
          <span class="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">${icono}</span>
          <div class="flex-1 min-w-0">
            <a href="${escHtml(item.url || '#')}" target="_blank" rel="noopener noreferrer"
               class="font-semibold text-blg-dark dark:text-gray-100 hover:text-blg-blue dark:hover:text-blue-400 leading-snug line-clamp-2 block">
              ${escHtml(item.titulo || 'Sin título')}
            </a>
            ${autores}
            <div class="flex flex-wrap items-center gap-2 mt-2">
              ${badgeNacional}
              ${accesoLibre}
              ${fuente}
              ${fecha}
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderizarLista(contenedor, items, mensajeVacio) {
    if (!contenedor) return;
    if (!items || items.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-blg-gray py-12">${mensajeVacio || 'No se encontraron resultados.'}</p>`;
      return;
    }
    contenedor.innerHTML = items.map(crearTarjeta).join('');
  }

  function mostrarCargando(contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = `
      <div class="flex justify-center items-center py-16" role="status" aria-label="Cargando">
        <div class="w-10 h-10 border-4 border-blg-blue border-t-transparent rounded-full animate-spin"></div>
        <span class="ml-3 text-blg-gray">Buscando…</span>
      </div>`;
  }

  function mostrarError(contenedor, mensaje) {
    if (!contenedor) return;
    contenedor.innerHTML = `<p class="text-center text-red-500 py-12">⚠️ ${escHtml(mensaje)}</p>`;
  }

  function escHtml(texto) {
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return { crearTarjeta, renderizarLista, mostrarCargando, mostrarError };
});
