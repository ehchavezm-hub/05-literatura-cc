(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_ServicioDatos = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const BASE = (function () {
    const { hostname, pathname } = location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return '';
    return pathname.replace(/\/$/, '').replace(/\/[^/]+$/, '');
  })();

  async function cargarJSON(ruta) {
    try {
      const resp = await fetch(BASE + ruta);
      if (!resp.ok) throw new Error(resp.status);
      return resp.json();
    } catch {
      return [];
    }
  }

  async function cargarUltimaSemana() {
    return cargarJSON('/datos/ultima-semana.json');
  }

  async function cargarArchivo() {
    return cargarJSON('/datos/noticias-archivo.json');
  }

  async function cargarLibrosRecientes() {
    return cargarJSON('/datos/libros-recientes.json');
  }

  return { cargarUltimaSemana, cargarArchivo, cargarLibrosRecientes };
});
