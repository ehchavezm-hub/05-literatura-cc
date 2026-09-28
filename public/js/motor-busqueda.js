(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_MotorBusqueda = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const SINONIMOS = {
    'vargas llosa': ['literatura peruana', 'boom latinoamericano', 'la ciudad y los perros', 'conversacion en la catedral'],
    'garcia marquez': ['realismo magico', 'macondo', 'cien anos de soledad', 'boom latinoamericano'],
    'vallejo': ['los heraldos negros', 'trilce', 'poesia peruana', 'vanguardia'],
    'cervantes': ['quijote', 'siglo de oro', 'don quijote'],
    'camus': ['existencialismo', 'el extranjero', 'la peste'],
    'neruda': ['odes elementales', 'canto general', 'poesia chilena'],
    'borges': ['ficciones', 'el aleph', 'literatura argentina', 'fantasia'],
    'arguedas': ['indigenismo', 'los rios profundos', 'literatura andina'],
  };

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .trim();
  }

  function expandirTerminos(termino) {
    const norm = normalizar(termino);
    const terminos = new Set([norm]);
    for (const [clave, sinonimos] of Object.entries(SINONIMOS)) {
      if (norm.includes(clave) || sinonimos.some(s => norm.includes(s))) {
        terminos.add(clave);
        sinonimos.forEach(s => terminos.add(s));
      }
    }
    return [...terminos];
  }

  function calcularDiasAtras(periodo) {
    const mapa = {
      '1': 365,
      '2': 730,
      '3': 1095,
      '4': 1460,
      '5': 1825,
      'historico': Infinity,
    };
    return mapa[String(periodo)] || 365;
  }

  function filtrarPorFecha(items, diasAtras) {
    if (diasAtras === Infinity) return items;
    const limite = new Date();
    limite.setDate(limite.getDate() - diasAtras);
    return items.filter(item => {
      if (!item.fecha) return true;
      const f = new Date(item.fecha);
      return isNaN(f.getTime()) || f >= limite;
    });
  }

  function rankear(items, termino) {
    const norm = normalizar(termino);
    return items
      .map(item => {
        const tituloNorm = normalizar(item.titulo || '');
        const autorNorm = normalizar(item.autores || '');
        let puntos = 0;
        if (tituloNorm.includes(norm)) puntos += 10;
        if (autorNorm.includes(norm)) puntos += 8;
        return { ...item, _puntos: puntos };
      })
      .sort((a, b) => {
        if (b._puntos !== a._puntos) return b._puntos - a._puntos;
        if (!a.fecha && !b.fecha) return 0;
        if (!a.fecha) return 1;
        if (!b.fecha) return -1;
        return b.fecha.localeCompare(a.fecha);
      });
  }

  return { normalizar, expandirTerminos, calcularDiasAtras, filtrarPorFecha, rankear };
});
