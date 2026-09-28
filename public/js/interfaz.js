(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Interfaz = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const LABEL_TIPO = {
    clasico: '📜 Clásico',
    ensayo:  '📄 Ensayo',
    libro:   '📚 Libro',
    noticia: '≡ Noticia',
    resena:  '✍️ Reseña',
  };

  const ACCENT_TIPO = {
    clasico: 'border-l-blg-purple',
    ensayo:  'border-l-blg-blue',
    libro:   'border-l-blg-green',
    noticia: 'border-l-blg-orange',
    resena:  'border-l-blg-red',
  };

  const BADGE_TIPO = {
    clasico: 'badge-tipo-clasico',
    ensayo:  'badge-tipo-ensayo',
    libro:   'badge-tipo-libro',
    noticia: 'badge-tipo-noticia',
    resena:  'badge-tipo-resena',
  };

  function fechaRelativa(fechaStr) {
    if (!fechaStr) return '';
    const solo = String(fechaStr).trim();
    // Si es sólo año (4 dígitos) no se puede calcular diferencia
    if (/^\d{4}$/.test(solo)) return `Publicado en ${solo}`;
    const d = new Date(solo);
    if (isNaN(d)) return solo;
    const hoy = new Date();
    const diff = Math.floor((hoy - d) / 86400000);
    if (diff <= 0)  return 'Publicado hoy';
    if (diff === 1) return 'Publicado ayer';
    if (diff < 7)   return 'Esta semana';
    if (diff < 30)  return 'Este mes';
    if (diff < 365) return 'Este año';
    return `Publicado en ${d.getFullYear()}`;
  }

  function formatearFechaLarga(fechaStr) {
    if (!fechaStr) return '';
    const solo = String(fechaStr).trim();
    if (/^\d{4}$/.test(solo)) return solo;
    const d = new Date(solo);
    if (isNaN(d)) return solo;
    return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function crearTarjeta(item) {
    const tipo = (item.tipo || 'libro').toLowerCase();
    const accentClass = ACCENT_TIPO[tipo] || 'border-l-blg-blue';
    const badgeClass  = BADGE_TIPO[tipo]  || 'badge-tipo-default';
    const labelTipo   = LABEL_TIPO[tipo]  || tipo;
    const esNacional  = item.ambito === 'nacional';

    // Badges
    const badgeTipo = `<span class="badge-v2 ${badgeClass}">${escHtml(labelTipo)}</span>`;
    const fechaRel  = fechaRelativa(item.fecha);
    const badgeFecha = fechaRel
      ? `<span class="badge-v2 badge-fecha-rel">${escHtml(fechaRel)}</span>`
      : '';
    const tema = item.editorial || item.tema || '';
    const badgeTema = tema
      ? `<span class="badge-v2 badge-tema">Tema: ${escHtml(tema)}</span>`
      : '';
    const badgePeru = esNacional
      ? `<span class="badge-v2 badge-nacional">🇵🇪 Perú</span>`
      : '';

    // Contenido
    const titulo = escHtml(item.titulo || 'Sin título');
    const desc = item.descripcion
      ? `<p class="tarjeta-v2-desc">${escHtml(item.descripcion)}</p>`
      : '';

    // Metadata
    const metaAutor  = item.autores
      ? `<p class="tarjeta-v2-meta-fila"><strong>Autor:</strong> ${escHtml(item.autores)}</p>`
      : '';
    const metaFuente = item.fuente
      ? `<p class="tarjeta-v2-meta-fila"><strong>Fuente:</strong> <a class="tarjeta-v2-fuente-link" href="${escHtml(item.url || '#')}" target="_blank" rel="noopener noreferrer">${escHtml(item.fuente)}</a></p>`
      : '';
    const metaFecha  = item.fecha
      ? `<p class="tarjeta-v2-meta-fila"><strong>Fecha:</strong> ${escHtml(formatearFechaLarga(item.fecha))}</p>`
      : '';

    // Botones
    const url = escHtml(item.url || '#');
    const waTexto = encodeURIComponent((item.titulo || '') + (item.url ? '\n' + item.url : ''));
    const btnVisitar   = `<a class="btn-visitar"  href="${url}" target="_blank" rel="noopener noreferrer">🔗 Visitar enlace</a>`;
    const btnWhatsApp  = item.url
      ? `<a class="btn-whatsapp" href="https://wa.me/?text=${waTexto}" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>`
      : '';

    return `
      <article class="tarjeta-v2 ${accentClass}">
        <div class="tarjeta-v2-inner">
          <div class="tarjeta-v2-left">
            <div class="tarjeta-badges">
              ${badgeTipo}${badgeFecha}${badgeTema}${badgePeru}
            </div>
            <p class="tarjeta-v2-titulo">${titulo}</p>
            ${desc}
            <div class="tarjeta-v2-meta">
              ${metaAutor}${metaFuente}${metaFecha}
            </div>
          </div>
          <div class="tarjeta-v2-actions">
            ${btnVisitar}
            ${btnWhatsApp}
          </div>
        </div>
      </article>`;
  }

  function renderizarLista(contenedor, items, mensajeVacio) {
    if (!contenedor) return;
    if (!items || items.length === 0) {
      contenedor.innerHTML = `<p style="text-align:center; color:var(--color-texto-sec); padding:48px 0;">${mensajeVacio || 'No se encontraron resultados.'}</p>`;
      return;
    }
    contenedor.innerHTML = `<div class="lista-resultados">${items.map(crearTarjeta).join('')}</div>`;
  }

  function mostrarCargando(contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = `
      <div class="cargando" role="status" aria-label="Cargando">
        <div class="spinner"></div>
        <span>Buscando…</span>
      </div>`;
  }

  function mostrarError(contenedor, mensaje) {
    if (!contenedor) return;
    contenedor.innerHTML = `<p style="text-align:center; color:var(--color-red); padding:48px 0;">⚠️ ${escHtml(mensaje)}</p>`;
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
