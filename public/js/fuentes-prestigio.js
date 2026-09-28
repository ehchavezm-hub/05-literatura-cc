(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_FuentesPrestigio = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const NACIONAL = [
    'Libros & Artes',
    'El Dominical',
    'Revista Morelia',
    'Buensalvaje Perú',
    'Punto de Equilibrio',
    'El Hablador',
    'Casa de la Literatura Peruana',
    'Revista de Critica Literaria Latinoamericana',
    'Archivo José Carlos Mariátegui',
  ];

  const INTERNACIONAL = [
    'Babelia',
    'Letras Libres',
    'Granta en Español',
    'Cuadernos Hispanoamericanos',
    'Revista de la Universidad de México',
    'The New York Review of Books',
    'Asymptote Journal',
    'Revista Clarín Cultura',
    'Insula',
    'Quimera',
    'The Guardian Books',
    'Le Monde des Livres',
  ];

  const ACADEMICAS = [
    'Anales de Literatura Hispanoamericana',
    'Revista Iberoamericana',
    'Bulletin of Spanish Studies',
    'Lexis',
    'Chasqui',
    'Hispania',
    'Latin American Literary Review',
    'Nueva Revista de Filología Hispánica',
  ];

  const EDITORIALES = [
    'Cátedra', 'Gredos', 'Fondo de Cultura Económica', 'Seix Barral',
    'Alfaguara', 'Anagrama', 'Penguin Clásicos', 'Acantilado',
    'Alianza Editorial', 'Editorial Castalia', 'Fondo Editorial PUCP',
    'Fondo Editorial UNMSM', 'IEP', 'Editorial Sudamericana',
  ];

  return { NACIONAL, INTERNACIONAL, ACADEMICAS, EDITORIALES };
});
