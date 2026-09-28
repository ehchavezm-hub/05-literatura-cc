(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Voz = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  let reconocedor = null;

  function disponible() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  function iniciar(alResultado, alError) {
    if (!disponible()) {
      alError && alError('No disponible en este navegador');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    reconocedor = new SR();
    reconocedor.lang = 'es-PE';
    reconocedor.interimResults = false;
    reconocedor.maxAlternatives = 1;
    reconocedor.onresult = e => {
      const texto = e.results[0][0].transcript;
      alResultado && alResultado(texto);
    };
    reconocedor.onerror = e => alError && alError(e.error);
    reconocedor.start();
  }

  function detener() {
    if (reconocedor) reconocedor.stop();
  }

  return { disponible, iniciar, detener };
});
