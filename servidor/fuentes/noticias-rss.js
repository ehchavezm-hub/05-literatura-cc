const { fetchConLimite } = require('./utilidades');

const FUENTES_RSS = [
  { nombre: 'Casa de la Literatura Peruana', url: 'https://www.casadelaliteratura.gob.pe/feed/', ambito: 'nacional' },
  { nombre: 'El Dominical – El Comercio', url: 'https://elcomercio.pe/rss/cultural.xml', ambito: 'nacional' },
  { nombre: 'Babelia – El País', url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/babelia/portada', ambito: 'internacional' },
  { nombre: 'The Guardian Books', url: 'https://www.theguardian.com/books/rss', ambito: 'internacional' },
  { nombre: 'Letras Libres', url: 'https://letraslibres.com/feed/', ambito: 'internacional' },
];

async function obtenerNoticias(diasAtras = 365) {
  const resultados = [];
  const limite = new Date();
  limite.setDate(limite.getDate() - diasAtras);

  for (const fuente of FUENTES_RSS) {
    try {
      const texto = await fetchTexto(fuente.url);
      const items = parsearRSS(texto, fuente, limite);
      resultados.push(...items);
    } catch {
      // continuar con siguiente fuente
    }
  }
  return resultados;
}

async function fetchTexto(url) {
  const { default: fetch } = await import('node-fetch');
  const resp = await fetch(url, { signal: AbortSignal.timeout(5000) });
  return resp.text();
}

function parsearRSS(xml, fuente, desde) {
  const items = [];
  const regex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    const bloque = m[1];
    const titulo = extraer(bloque, 'title');
    const enlace = extraer(bloque, 'link');
    const fecha = extraer(bloque, 'pubDate');
    if (!titulo || !enlace) continue;
    const fechaObj = fecha ? new Date(fecha) : null;
    if (fechaObj && fechaObj < desde) continue;
    items.push({
      titulo,
      url: enlace,
      fuente: fuente.nombre,
      tipo: 'noticia',
      ambito: fuente.ambito,
      fecha: fechaObj ? fechaObj.toISOString().split('T')[0] : null,
    });
  }
  return items;
}

function extraer(texto, etiqueta) {
  const m = texto.match(new RegExp(`<${etiqueta}[^>]*>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${etiqueta}>`, 'i'));
  return m ? m[1].trim() : '';
}

module.exports = { obtenerNoticias };
