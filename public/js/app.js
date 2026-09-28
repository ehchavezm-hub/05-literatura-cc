/* global BLG_MotorBusqueda, BLG_Gutenberg, BLG_Crossref, BLG_Libros, BLG_ServicioDatos, BLG_Interfaz, BLG_Autores, BLG_Temas, BLG_Voz, BLG_Guardian, BLG_DOAJ */

window.BLG_VERSION = '__VERSION__';

(function () {
  'use strict';

  // ── Escala de texto ──────────────────────────────────────────────────────
  const ESCALAS = [0.9, 1, 1.15, 1.3, 1.5];
  let escalaIdx = 1;

  function aplicarEscala() {
    document.documentElement.style.setProperty('--escala', ESCALAS[escalaIdx]);
    try { localStorage.setItem('blg-escala', escalaIdx); } catch {}
  }

  function cargarEscala() {
    try {
      const v = parseInt(localStorage.getItem('blg-escala'), 10);
      if (!isNaN(v) && v >= 0 && v < ESCALAS.length) escalaIdx = v;
    } catch {}
    aplicarEscala();
  }

  // ── Modo oscuro ───────────────────────────────────────────────────────────
  function iniciarModoOscuro() {
    const prefiere = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefiere) document.documentElement.classList.add('dark');
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      document.documentElement.classList.toggle('dark', e.matches);
    });
  }

  // ── Navegación por pestañas ───────────────────────────────────────────────
  function activarTab(destino) {
    const tabs = document.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll('[data-panel]');
    tabs.forEach(t => {
      const activo = t.dataset.tab === destino;
      t.setAttribute('aria-selected', activo);
      t.classList.toggle('tab-activa', activo);
    });
    panels.forEach(p => { p.hidden = p.dataset.panel !== destino; });
    if (destino === 'obras-textos') cargarObrasTextos();
    if (destino === 'criticas') cargarCriticas();
    if (destino === 'autores') renderizarAutores();
  }

  function iniciarNavegacion() {
    document.querySelectorAll('[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => activarTab(tab.dataset.tab));
    });
  }

  // ── Selector de período ───────────────────────────────────────────────────
  function obtenerPeriodo(panelId) {
    const activo = document.querySelector(`.periodo-btns[data-periodo="${panelId}"] .btn-periodo-activo`);
    return activo ? activo.dataset.valor : '1';
  }

  function iniciarBotonesPeriodo() {
    document.querySelectorAll('.periodo-btns').forEach(grupo => {
      grupo.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', () => {
          grupo.querySelectorAll('.btn-periodo').forEach(b => {
            b.classList.remove('btn-periodo-activo');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('btn-periodo-activo');
          btn.setAttribute('aria-pressed', 'true');

          const panel = grupo.dataset.periodo;
          if (panel === 'buscar') ejecutarBusqueda();
          if (panel === 'obras-textos') { delete document.getElementById('blg-resultados-obras-textos')?.dataset.cargado; cargarObrasTextos(); }
          if (panel === 'criticas')     { delete document.getElementById('blg-resultados-criticas')?.dataset.cargado;     cargarCriticas(); }
        });
      });
    });
  }

  // ── Módulos de autores ────────────────────────────────────────────────────
  let autoresRendered = false;

  function buscarAutor(nombre) {
    activarTab('buscar');
    const input = document.getElementById('blg-busqueda');
    if (input) { input.value = nombre; ejecutarBusqueda(); }
  }

  function filaAutor(a, clase) {
    const { obtenerContinente } = BLG_Autores;
    const continente = obtenerContinente(a.pais);
    const geo = continente ? `${continente} · ${a.pais}` : a.pais;
    return `
      <div class="autor-fila">
        <span class="autor-anio">${a.año || ''}</span>
        <button class="${clase}" data-autor="${escHtml(a.nombre)}">${escHtml(a.nombre)}</button>
        <span class="autor-geo">${escHtml(geo)}</span>
      </div>`;
  }

  function renderizarAutores() {
    const contenedor = document.getElementById('blg-autores-panel');
    if (!contenedor || autoresRendered) return;
    autoresRendered = true;
    const { PREMIOS } = BLG_Autores;
    const MAX = 8;

    contenedor.innerHTML = PREMIOS.map(premio => {
      const visibles = premio.autores.slice(0, MAX);
      const resto = premio.autores.slice(MAX);
      return `
        <div class="autores-premio-seccion">
          <div class="autores-premio-header">
            <span class="autores-premio-icono" aria-hidden="true">${premio.icono}</span>
            <span class="autores-premio-titulo">${escHtml(premio.nombre)}</span>
          </div>
          <div class="autores-lista">
            ${visibles.map(a => filaAutor(a, 'btn-autor-fila')).join('')}
          </div>
          ${resto.length ? `
            <button class="btn-mas-lista" data-premio="${escHtml(premio.id)}">
              Ver los ${resto.length} ganadores restantes →
            </button>` : ''}
        </div>`;
    }).join('');

    contenedor.querySelectorAll('.btn-autor-fila').forEach(btn => {
      btn.addEventListener('click', () => buscarAutor(btn.dataset.autor));
    });
    contenedor.querySelectorAll('.btn-mas-lista').forEach(btn => {
      btn.addEventListener('click', () => abrirModalAutores(btn.dataset.premio));
    });
  }

  function abrirModalAutores(premioId) {
    const { PREMIOS } = BLG_Autores;
    const premio = PREMIOS.find(p => p.id === premioId);
    if (!premio) return;
    const modal = document.getElementById('blg-modal-autores');
    const body = document.getElementById('blg-modal-autores-body');
    if (!modal || !body) return;
    body.innerHTML = `
      <h2 style="font-size:1rem;font-weight:700;margin-bottom:12px;">
        ${premio.icono} ${escHtml(premio.nombre)} — todos los ganadores
      </h2>
      <div class="autores-lista modal-autores-lista">
        ${premio.autores.map(a => filaAutor(a, 'btn-autor-modal-fila')).join('')}
      </div>`;
    body.querySelectorAll('.btn-autor-modal-fila').forEach(btn => {
      btn.addEventListener('click', () => { cerrarModal(); buscarAutor(btn.dataset.autor); });
    });
    modal.hidden = false;
    modal.querySelector('[data-cerrar-modal]').focus();
  }

  function cerrarModal() {
    const modal = document.getElementById('blg-modal-autores');
    if (modal) modal.hidden = true;
  }

  // ── Módulos de temas ──────────────────────────────────────────────────────
  function renderizarTemas() {
    const contenedor = document.getElementById('blg-temas');
    if (!contenedor) return;
    const { CLASIFICACIONES } = BLG_Temas;
    contenedor.innerHTML = CLASIFICACIONES.map(t => `
      <button class="btn-tema flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-blg-blue hover:text-white transition-colors text-left"
        data-tema="${escHtml(t.terminos[0])}">
        <span class="text-xl" aria-hidden="true">${t.icono}</span>
        <span class="font-medium text-sm">${escHtml(t.titulo)}</span>
      </button>`).join('');

    contenedor.querySelectorAll('.btn-tema').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById('blg-busqueda');
        if (input) { input.value = btn.dataset.tema; ejecutarBusqueda(); }
      });
    });
  }

  // ── Búsqueda ──────────────────────────────────────────────────────────────
  async function ejecutarBusqueda() {
    const input = document.getElementById('blg-busqueda');
    const termino = input ? input.value.trim() : '';
    if (!termino) return;

    const contenedor = document.getElementById('blg-resultados-busqueda');
    BLG_Interfaz.mostrarCargando(contenedor);

    const periodo = obtenerPeriodo('buscar');
    const diasAtras = BLG_MotorBusqueda.calcularDiasAtras(periodo);
    const terminos = BLG_MotorBusqueda.expandirTerminos(termino);
    const terminoPrincipal = terminos[0];

    const [gutenberg, crossref, openLib, openLibEn, gbRelevance, gbNewest] = await Promise.allSettled([
      BLG_Gutenberg.buscar(terminoPrincipal),
      BLG_Crossref.buscar(terminoPrincipal, diasAtras),
      BLG_Libros.buscarOpenLibrary(terminoPrincipal),
      BLG_Libros.buscarOpenLibrary(terminoPrincipal + ' author'),
      BLG_Libros.buscarGoogleBooks('inauthor:' + terminoPrincipal, 'relevance'),
      BLG_Libros.buscarGoogleBooks(terminoPrincipal, 'newest'),
    ]);

    let todos = [
      ...(gutenberg.value    || []),
      ...(crossref.value     || []),
      ...(openLib.value      || []),
      ...(openLibEn.value    || []),
      ...(gbRelevance.value  || []),
      ...(gbNewest.value     || []),
    ];

    // Los libros son atemporales: no filtrar por fecha. Solo filtrar noticias/ensayos.
    const libros = todos.filter(i => i.tipo === 'libro' || i.tipo === 'clasico');
    const otros = BLG_MotorBusqueda.filtrarPorFecha(
      todos.filter(i => i.tipo !== 'libro' && i.tipo !== 'clasico'),
      diasAtras
    );
    todos = [...otros, ...libros];
    todos = BLG_MotorBusqueda.rankear(todos, terminoPrincipal);
    todos = quitarDuplicados(todos);

    BLG_Interfaz.renderizarLista(contenedor, todos, `No se encontraron resultados para «${escHtml(termino)}».`);
  }

  // ── Obras y Textos ────────────────────────────────────────────────────────
  const EDITORIALES_BUSQUEDA = [
    // Hispanófonas
    'Alfaguara', 'Anagrama', 'Fondo de Cultura Economica', 'Seix Barral', 'Tusquets',
    'Planeta', 'Acantilado', 'Eterna Cadencia', 'Sudamericana', 'Peisa',
    'Sexto Piso', 'Era Mexico', 'LOM Ediciones', 'Cal y Arena', 'Adriana Hidalgo',
    // Francófonas
    'Gallimard', 'Seuil', 'Actes Sud', 'Fayard', 'Flammarion', 'Grasset',
    // Italianas
    'Einaudi', 'Mondadori', 'Feltrinelli', 'Adelphi', 'Garzanti',
    // Alemanas
    'Suhrkamp', 'S Fischer Verlag', 'Rowohlt', 'Carl Hanser Verlag', 'Diogenes Verlag',
    // Anglófonas
    'Bloomsbury', 'Faber Faber', 'Penguin Random House', 'HarperCollins', 'Knopf',
    'Farrar Straus Giroux', 'W W Norton', 'Archipelago Books', 'Pushkin Press',
    'And Other Stories', 'Europa Editions', 'New Directions Publishing',
    // Asia / África / Resto
    'Penguin India', 'Cassava Republic', 'Companhia das Letras',
    'Kodansha', 'Shueisha', 'Bungeishunju',
  ];

  async function cargarObrasTextos() {
    const contenedor = document.getElementById('blg-resultados-obras-textos');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);

    const periodo   = obtenerPeriodo('obras-textos');
    const diasAtras = BLG_MotorBusqueda.calcularDiasAtras(periodo);
    const anoActual = new Date().getFullYear();
    const anoDesde  = isFinite(diasAtras) ? anoActual - Math.ceil(diasAtras / 365) : 0;
    // Filtro de fecha para Google Books API (after:YYYY restringe la búsqueda)
    const gbFiltro  = anoDesde > 0 ? ` after:${anoDesde}` : '';

    // 14 editoriales rotativas al azar (mayor cobertura)
    const eds = EDITORIALES_BUSQUEDA.slice().sort(() => Math.random() - 0.5).slice(0, 14);
    const busquedasEditoriales = eds.map(ed =>
      BLG_Libros.buscarGoogleBooks(`inpublisher:"${ed}"${gbFiltro}`, 'newest', 20)
    );

    const [
      librosJSON,
      google1, google2, google3, google4, google5, google6, google7,
      open1, open2, open3,
      clasicos,
      ...edResults
    ] = await Promise.allSettled([
      BLG_ServicioDatos.cargarLibrosRecientes(),
      BLG_Libros.buscarGoogleBooks(`novela latinoamericana poesia${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarGoogleBooks(`contemporary world fiction poetry novel${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarGoogleBooks(`literatura iberoamericana novela ensayo${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarGoogleBooks(`african asian literature contemporary fiction${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarGoogleBooks(`new literary fiction prize winner${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarGoogleBooks(`roman litterature contemporaine poesie${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarGoogleBooks(`neue literatur roman gedicht${gbFiltro}`, 'newest', 40),
      BLG_Libros.buscarOpenLibrary('novela latinoamericana', 20),
      BLG_Libros.buscarOpenLibrary('poesia contemporanea', 20),
      BLG_Libros.buscarOpenLibrary('world fiction literary novel', 20),
      BLG_Gutenberg.buscar('literatura'),
      ...busquedasEditoriales,
    ]);

    let todos = quitarDuplicados([
      ...(librosJSON.value   || []),
      ...(google1.value      || []),
      ...(google2.value      || []),
      ...(google3.value      || []),
      ...(google4.value      || []),
      ...(google5.value      || []),
      ...(google6.value      || []),
      ...(google7.value      || []),
      ...edResults.flatMap(r => r.value || []),
      // Open Library y Gutenberg al final (más títulos históricos)
      ...(open1.value        || []),
      ...(open2.value        || []),
      ...(open3.value        || []),
      ...(clasicos.value     || []),
    ]);

    // Filtrar por período; excluir fechas futuras; sin fecha → siempre mostrar
    todos = todos.filter(i => {
      if (!i.fecha) return true;
      const solo = String(i.fecha).trim();
      const ano = parseInt(solo, 10);
      if (!ano) return true;
      if (ano > anoActual) return false; // fecha futura → descartar
      if (anoDesde > 0 && ano < anoDesde) return false;
      return true;
    });

    // Ordenar: más recientes primero; sin fecha al final
    todos.sort((a, b) => {
      const ta = a.fecha ? new Date(a.fecha).getTime() : 0;
      const tb = b.fecha ? new Date(b.fecha).getTime() : 0;
      if (tb > 0 && ta > 0) return tb - ta;
      if (tb > 0) return 1;
      if (ta > 0) return -1;
      return 0;
    });

    BLG_Interfaz.renderizarLista(contenedor, todos, 'No se encontraron obras en este período.');
    contenedor.dataset.cargado = '1';
  }

  // ── Críticas y Reseñas ────────────────────────────────────────────────────
  // Fuentes: The Guardian · DOAJ · Crossref · JSON pre-construido (90+ diarios)
  async function cargarCriticas() {
    const contenedor = document.getElementById('blg-resultados-criticas');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);
    const periodo   = obtenerPeriodo('criticas');
    const diasAtras = BLG_MotorBusqueda.calcularDiasAtras(periodo);
    const hoy       = new Date();

    const [
      semana, diarios, archivo,
      crossref1, crossref2, crossref3, crossref4,
      guardian1, guardian2, guardian3, guardian4,
      doaj1, doaj2,
    ] = await Promise.allSettled([
      BLG_ServicioDatos.cargarUltimaSemana(),
      BLG_ServicioDatos.cargarDiarios(),       // JSON: 90+ diarios del mundo
      BLG_ServicioDatos.cargarArchivo(),
      BLG_Crossref.buscar('critica literaria resena novela latinoamerica', diasAtras),
      BLG_Crossref.buscar('literary criticism book review fiction poetry', diasAtras),
      BLG_Crossref.buscar('literatura contemporanea ensayo critica cultural', diasAtras),
      BLG_Crossref.buscar('world literature review translation criticism', diasAtras),
      BLG_Guardian.buscarLibros(diasAtras),
      BLG_Guardian.buscarCritica('latin american literature fiction', diasAtras),
      BLG_Guardian.buscarCritica('world fiction poetry prize review', diasAtras),
      BLG_Guardian.buscarCritica('literary criticism essay novel', diasAtras),
      BLG_DOAJ.buscarCritica(diasAtras),
      BLG_DOAJ.buscarLatinoamerica(diasAtras),
    ]);

    let todos = [
      ...(semana.value    || []),
      ...(diarios.value   || []),
      ...(archivo.value   || []).filter(i => i.tipo === 'ensayo' || i.tipo === 'resena' || i.tipo === 'noticia'),
      ...(crossref1.value || []),
      ...(crossref2.value || []),
      ...(crossref3.value || []),
      ...(crossref4.value || []),
      ...(guardian1.value || []),
      ...(guardian2.value || []),
      ...(guardian3.value || []),
      ...(guardian4.value || []),
      ...(doaj1.value     || []),
      ...(doaj2.value     || []),
    ];

    todos = quitarDuplicados(todos);
    // Filtrar por período y eliminar fechas futuras
    todos = BLG_MotorBusqueda.filtrarPorFecha(todos, diasAtras);
    todos = todos.filter(i => !i.fecha || new Date(i.fecha) <= hoy);

    // Ordenar: más recientes primero; sin fecha al final
    todos.sort((a, b) => {
      if (!a.fecha && !b.fecha) return 0;
      if (!a.fecha) return 1;
      if (!b.fecha) return -1;
      return new Date(b.fecha) - new Date(a.fecha);
    });

    BLG_Interfaz.renderizarLista(contenedor, todos, 'No se encontraron críticas ni reseñas recientes.');
    contenedor.dataset.cargado = '1';
  }

  // ── Utilidades ────────────────────────────────────────────────────────────
  function quitarDuplicados(items) {
    const vistos = new Set();
    return items.filter(item => {
      // Normalizar: sin puntuación, sin artículos iniciales, primeras 40 chars del título
      const t = (item.titulo || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/^(el|la|los|las|the|a|an|un|una|le|les|l'|il)\s+/, '').trim().substring(0, 40);
      const a = (item.autores || '').toLowerCase().replace(/[^\w\s]/g, '').trim().substring(0, 30);
      const clave = t + '|' + a;
      if (!t || vistos.has(clave)) return false;
      vistos.add(clave);
      return true;
    });
  }

  function escHtml(texto) {
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Voz ───────────────────────────────────────────────────────────────────
  function iniciarVoz() {
    const btn = document.getElementById('blg-btn-voz');
    if (!btn) return;
    if (!BLG_Voz.disponible()) { btn.hidden = true; return; }
    btn.addEventListener('click', () => {
      btn.classList.add('animate-pulse');
      BLG_Voz.iniciar(
        texto => {
          btn.classList.remove('animate-pulse');
          const input = document.getElementById('blg-busqueda');
          if (input) { input.value = texto; ejecutarBusqueda(); }
        },
        () => btn.classList.remove('animate-pulse')
      );
    });
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    cargarEscala();
    iniciarModoOscuro();
    iniciarNavegacion();
    iniciarBotonesPeriodo();
    renderizarTemas();
    iniciarVoz();

    document.getElementById('blg-btn-escala-menos')?.addEventListener('click', () => {
      if (escalaIdx > 0) { escalaIdx--; aplicarEscala(); }
    });
    document.getElementById('blg-btn-escala-mas')?.addEventListener('click', () => {
      if (escalaIdx < ESCALAS.length - 1) { escalaIdx++; aplicarEscala(); }
    });

    document.getElementById('blg-btn-ayuda')?.addEventListener('click', () => {
      document.getElementById('blg-dialog-ayuda')?.showModal();
    });
    document.getElementById('blg-cerrar-ayuda')?.addEventListener('click', () => {
      document.getElementById('blg-dialog-ayuda')?.close();
    });

    document.getElementById('blg-modal-autores')?.querySelector('[data-cerrar-modal]')
      ?.addEventListener('click', cerrarModal);

    const form = document.getElementById('blg-form-busqueda');
    form?.addEventListener('submit', e => { e.preventDefault(); ejecutarBusqueda(); });

    // Pre-cargar paneles al inicio
    cargarObrasTextos();
    cargarCriticas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
