(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Temas = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const CLASIFICACIONES = [
    {
      id: 'narrativa',
      titulo: 'Novelas, Cuentos e Historias',
      descripcion: 'Narrativa contemporánea, clásica, relatos y ficción',
      icono: '📖',
      terminos: ['novela', 'cuento', 'narrativa', 'ficción', 'relato', 'historia'],
    },
    {
      id: 'poesia-teatro',
      titulo: 'Poesía y Teatro',
      descripcion: 'Lírica, dramaturgia, verso y obras teatrales',
      icono: '🎭',
      terminos: ['poesía', 'poema', 'teatro', 'verso', 'lírica', 'drama', 'obra teatral'],
    },
    {
      id: 'ensayo',
      titulo: 'Ensayos, Ideas y Análisis',
      descripcion: 'Crítica literaria, filosofía de las letras, teoría e investigación',
      icono: '📄',
      terminos: ['ensayo', 'crítica', 'teoría', 'investigación', 'análisis', 'filosofía'],
    },
    {
      id: 'clasicos-peru',
      titulo: 'Literatura Peruana, Clásicos y Grandes Épocas',
      descripcion: 'Tradición andina, indigenismo, Siglo de Oro, vanguardias',
      icono: '🏛️',
      terminos: ['peruana', 'andina', 'indigenismo', 'siglo de oro', 'vanguardia', 'clásico', 'cervantes', 'quijote'],
    },
  ];

  return { CLASIFICACIONES };
});
