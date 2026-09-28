/* global BLG_MotorBusqueda, BLG_Gutenberg, BLG_Crossref, BLG_Libros, BLG_ServicioDatos, BLG_Interfaz, BLG_Autores, BLG_Temas, BLG_Voz */

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
    if (destino === 'novedades') cargarNovedades();
    if (destino === 'ensayos') cargarEnsayos();
    if (destino === 'obras') cargarObras();
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
          if (panel === 'novedades') { delete document.getElementById('blg-resultados-novedades')?.dataset.cargado; cargarNovedades(); }
          if (panel === 'ensayos')   { delete document.getElementById('blg-resultados-ensayos')?.dataset.cargado;   cargarEnsayos(); }
          if (panel === 'obras')     { delete document.getElementById('blg-resultados-obras')?.dataset.cargado;     cargarObras(); }
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

  function renderizarAutores() {
    const contenedor = document.getElementById('blg-autores-panel');
    if (!contenedor || autoresRendered) return;
    autoresRendered = true;
    const { PREMIOS } = BLG_Autores;

    contenedor.innerHTML = PREMIOS.map(premio => {
      const principales = premio.autores.slice(0, 6);
      const otros = premio.autores.slice(6);
      return `
        <div class="autores-continente">
          <div class="autores-continente-cabecera">
            <span class="autores-continente-icono" aria-hidden="true">${premio.icono}</span>
            <span class="autores-continente-nombre">${escHtml(premio.nombre)}</span>
          </div>
          <div class="autores-grid">
            ${principales.map(a => `
              <button class="btn-autor-panel" data-autor="${escHtml(a.nombre)}" title="${escHtml(a.pais)}${a.año ? ' · ' + a.año : ''}">
                ${escHtml(a.nombre)}<span class="pais">${escHtml(a.pais)}${a.año ? ' ' + a.año : ''}</span>
              </button>`).join('')}
            ${otros.length ? `
              <button class="btn-mas-panel" data-premio="${escHtml(premio.id)}">+${otros.length} más</button>` : ''}
          </div>
        </div>`;
    }).join('');

    contenedor.querySelectorAll('.btn-autor-panel').forEach(btn => {
      btn.addEventListener('click', () => buscarAutor(btn.dataset.autor));
    });

    contenedor.querySelectorAll('.btn-mas-panel').forEach(btn => {
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
      <h2 class="text-lg font-semibold mb-4">${premio.icono} ${escHtml(premio.nombre)} — todos los ganadores</h2>
      <div class="flex flex-wrap gap-2">
        ${premio.autores.map(a => `
          <button class="btn-autor-modal px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm hover:bg-blg-blue hover:text-white transition-colors"
            data-autor="${escHtml(a.nombre)}">
            ${escHtml(a.nombre)} <span class="text-xs opacity-60">(${escHtml(a.pais)}${a.año ? ' · ' + a.año : ''})</span>
          </button>`).join('')}
      </div>`;
    body.querySelectorAll('.btn-autor-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        cerrarModal();
        buscarAutor(btn.dataset.autor);
      });
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

    const [gutenberg, crossref, openLib, googleBooks] = await Promise.allSettled([
      BLG_Gutenberg.buscar(terminoPrincipal),
      BLG_Crossref.buscar(terminoPrincipal, diasAtras),
      BLG_Libros.buscarOpenLibrary(terminoPrincipal),
      BLG_Libros.buscarGoogleBooks(terminoPrincipal),
    ]);

    let todos = [
      ...(gutenberg.value || []),
      ...(crossref.value || []),
      ...(openLib.value || []),
      ...(googleBooks.value || []),
    ];

    todos = BLG_MotorBusqueda.filtrarPorFecha(todos, diasAtras);
    todos = BLG_MotorBusqueda.rankear(todos, terminoPrincipal);
    todos = quitarDuplicados(todos);

    BLG_Interfaz.renderizarLista(contenedor, todos, `No se encontraron resultados para «${escHtml(termino)}».`);
  }

  // ── Novedades ─────────────────────────────────────────────────────────────
  async function cargarNovedades() {
    const contenedor = document.getElementById('blg-resultados-novedades');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);
    const [semana, diarios] = await Promise.allSettled([
      BLG_ServicioDatos.cargarUltimaSemana(),
      BLG_ServicioDatos.cargarDiarios(),
    ]);
    const todos = [
      ...(semana.value || []),
      ...(diarios.value || []),
    ];
    const periodo = obtenerPeriodo('novedades');
    const diasAtras = BLG_MotorBusqueda.calcularDiasAtras(periodo);
    const filtrados = BLG_MotorBusqueda.filtrarPorFecha(todos, diasAtras);
    BLG_Interfaz.renderizarLista(contenedor, filtrados, 'No hay novedades recientes.');
    contenedor.dataset.cargado = '1';
  }

  // ── Ensayos ───────────────────────────────────────────────────────────────
  async function cargarEnsayos() {
    const contenedor = document.getElementById('blg-resultados-ensayos');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);
    const [crossref, archivo] = await Promise.allSettled([
      BLG_Crossref.buscar('critica literaria latinoamerica'),
      BLG_ServicioDatos.cargarArchivo(),
    ]);
    const ensayos = [
      ...(crossref.value || []),
      ...(archivo.value || []).filter(i => i.tipo === 'ensayo'),
    ];
    const periodo = obtenerPeriodo('ensayos');
    const diasAtras = BLG_MotorBusqueda.calcularDiasAtras(periodo);
    const filtrados = BLG_MotorBusqueda.filtrarPorFecha(ensayos, diasAtras);
    BLG_Interfaz.renderizarLista(contenedor, filtrados, 'No se encontraron ensayos.');
    contenedor.dataset.cargado = '1';
  }

  // ── Obras ─────────────────────────────────────────────────────────────────
  async function cargarObras() {
    const contenedor = document.getElementById('blg-resultados-obras');
    if (!contenedor || contenedor.dataset.cargado) return;
    BLG_Interfaz.mostrarCargando(contenedor);
    const [libros, clasicos] = await Promise.allSettled([
      BLG_ServicioDatos.cargarLibrosRecientes(),
      BLG_Gutenberg.buscar('literatura'),
    ]);
    const todos = [
      ...(libros.value || []),
      ...(clasicos.value || []),
    ];
    BLG_Interfaz.renderizarLista(contenedor, todos, 'No se encontraron obras.');
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

    // Pre-cargar todos los paneles al inicio con período de 1 año
    cargarNovedades();
    cargarEnsayos();
    cargarObras();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
