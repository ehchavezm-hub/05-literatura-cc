const cache = new Map();

async function fetchConLimite(url, opciones = {}) {
  const clave = url;
  const ahora = Date.now();
  const CACHE_MS = 15 * 60 * 1000;

  if (cache.has(clave)) {
    const { datos, tiempo } = cache.get(clave);
    if (ahora - tiempo < CACHE_MS) return datos;
  }

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), 5000);

  try {
    const fetch = (await import('node-fetch')).default;
    const resp = await fetch(url, { ...opciones, signal: controlador.signal });
    clearTimeout(temporizador);
    const datos = await resp.json();
    cache.set(clave, { datos, tiempo: ahora });
    return datos;
  } catch (e) {
    clearTimeout(temporizador);
    throw e;
  }
}

module.exports = { fetchConLimite };
