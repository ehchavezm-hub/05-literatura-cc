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
          if (panel === 'criticas') { delete document.getElementById('blg-resultados-criticas')?.dataset.cargado; cargarCriticas(); }
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
  // Fuentes: Google Books (por editorial + género), Open Library, Gutenberg
  // Editoriales representativas por región:
  const EDITORIALES_BUSQUEDA = [
    // Iberoamérica
    'Alfaguara', 'Anagrama', 'Fondo de Cultura Economica', 'Seix Barral', 'Tusquets',
    'Planeta', 'Acantilado', 'Eterna Cadencia', 'Sudamericana', 'Peisa',
    // Europa
    'Gallimard', 'Seuil', 'Einaudi', 'Mondadori', 'Bloomsbury', 'Faber Faber', 'Suhrkamp',
    // Anglosajón
    'Penguin Random House', 'HarperCollins', 'Knopf', 'Farrar Straus Giroux',
    // Asia / África
    'Penguin India', 'Cassava Republic', 'Companhia das Letras',
  ];

  async function cargarObrasTextos() {
    const contenedor = document.getElementById('blg-resultados-obras-textos');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);

    // Seleccionar 6 editoriales al azar para no saturar la API
    const eds = EDITORIALES_BUSQUEDA.sort(() => Math.random() - 0.5).slice(0, 6);
    const busquedasEditoriales = eds.map(ed =>
      BLG_Libros.buscarGoogleBooks(`inpublisher:"${ed}"`, 'newest', 15)
    );

    const [
      librosJSON,
      google1, google2, google3, google4,
      open1, open2, open3,
      clasicos,
      ...edResults
    ] = await Promise.allSettled([
      BLG_ServicioDatos.cargarLibrosRecientes(),
      BLG_Libros.buscarGoogleBooks('novela latinoamericana poesia', 'newest'),
      BLG_Libros.buscarGoogleBooks('contemporary world fiction poetry novel', 'newest'),
      BLG_Libros.buscarGoogleBooks('literatura iberoamericana novela', 'relevance'),
      BLG_Libros.buscarGoogleBooks('african asian literature contemporary fiction', 'newest'),
      BLG_Libros.buscarOpenLibrary('novela latinoamericana'),
      BLG_Libros.buscarOpenLibrary('poesia contemporanea'),
      BLG_Libros.buscarOpenLibrary('world fiction literary novel'),
      BLG_Gutenberg.buscar('literatura'),
      ...busquedasEditoriales,
    ]);

    const todos = quitarDuplicados([
      ...(librosJSON.value || []),
      ...(google1.value    || []),
      ...(google2.value    || []),
      ...(google3.value    || []),
      ...(google4.value    || []),
      ...(open1.value      || []),
      ...(open2.value      || []),
      ...(open3.value      || []),
      ...(clasicos.value   || []),
      ...edResults.flatMap(r => r.value || []),
    ]);

    BLG_Interfaz.renderizarLista(contenedor, todos, 'No se encontraron obras.');
    contenedor.dataset.cargado = '1';
  }

  // ── Críticas y Reseñas ────────────────────────────────────────────────────
  // Fuentes: The Guardian Books · DOAJ · Crossref · JSON pre-construido (90+ diarios)
  async function cargarCriticas() {
    const contenedor = document.getElementById('blg-resultados-criticas');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);
    const periodo = obtenerPeriodo('criticas');
    const diasAtras = BLG_MotorBusqueda.calcularDiasAtras(periodo);

    const [
      semana, diarios, archivo,
      crossref1, crossref2,
      guardian1, guardian2,
      doaj1, doaj2,
    ] = await Promise.allSettled([
      BLG_ServicioDatos.cargarUltimaSemana(),
      BLG_ServicioDatos.cargarDiarios(),       // JSON pre-construido: 90+ diarios del mundo
      BLG_ServicioDatos.cargarArchivo(),
      BLG_Crossref.buscar('critica literaria reseña novela latinoamerica', diasAtras),
      BLG_Crossref.buscar('literary criticism book review fiction poetry', diasAtras),
      BLG_Guardian.buscarLibros(diasAtras),
      BLG_Guardian.buscarCritica('latin american literature', diasAtras),
      BLG_DOAJ.buscarCritica(diasAtras),
      BLG_DOAJ.buscarLatinoamerica(diasAtras),
    ]);

    const todos = [
      ...(semana.value   || []),
      ...(diarios.value  || []),
      ...(archivo.value  || []).filter(i => i.tipo === 'ensayo' || i.tipo === 'resena' || i.tipo === 'noticia'),
      ...(crossref1.value || []),
      ...(crossref2.value || []),
      ...(guardian1.value || []),
      ...(guardian2.value || []),
      ...(doaj1.value    || []),
      ...(doaj2.value    || []),
    ];

    const filtrados = BLG_MotorBusqueda.filtrarPorFecha(quitarDuplicados(todos), diasAtras);
    BLG_Interfaz.renderizarLista(contenedor, filtrados, 'No se encontraron críticas ni reseñas recientes.');
    contenedor.dataset.cargado = '1';
  }

  // ── Utilidades ────────────────────────────────────────────────────────────
  function quitarDuplicados(items) {
    const vistos = new Set();
    return items.filter(item => {
      const clave = (item.titulo || '').toLowerCase() + (item.autores || '').toLowerCase();
      if (vistos.has(clave)) return false;
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
