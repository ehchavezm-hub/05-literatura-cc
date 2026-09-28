(function (root, factory) {
  if (typeof module !== 'undefined') module.exports = factory();
  else root.BLG_Autores = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  const CONTINENTES = [
    {
      id: 'america',
      nombre: 'América',
      icono: '🌎',
      autores: [
        { nombre: 'Mario Vargas Llosa', pais: 'Perú' },
        { nombre: 'Gabriel García Márquez', pais: 'Colombia' },
        { nombre: 'Pablo Neruda', pais: 'Chile' },
        { nombre: 'Octavio Paz', pais: 'México' },
        { nombre: 'Gabriela Mistral', pais: 'Chile' },
        { nombre: 'César Vallejo', pais: 'Perú' },
        { nombre: 'Jorge Luis Borges', pais: 'Argentina' },
        { nombre: 'Julio Cortázar', pais: 'Argentina' },
        { nombre: 'Isabel Allende', pais: 'Chile' },
        { nombre: 'Carlos Fuentes', pais: 'México' },
        { nombre: 'José María Arguedas', pais: 'Perú' },
        { nombre: 'Alfredo Bryce Echenique', pais: 'Perú' },
      ],
    },
    {
      id: 'europa',
      nombre: 'Europa',
      icono: '🏰',
      autores: [
        { nombre: 'Albert Camus', pais: 'Francia' },
        { nombre: 'José Saramago', pais: 'Portugal' },
        { nombre: 'Thomas Mann', pais: 'Alemania' },
        { nombre: 'Luigi Pirandello', pais: 'Italia' },
        { nombre: 'Svetlana Alexievich', pais: 'Bielorrusia' },
        { nombre: 'Miguel de Cervantes', pais: 'España' },
        { nombre: 'Federico García Lorca', pais: 'España' },
        { nombre: 'Franz Kafka', pais: 'Checoslovaquia' },
        { nombre: 'Fiódor Dostoievski', pais: 'Rusia' },
        { nombre: 'León Tolstói', pais: 'Rusia' },
        { nombre: 'Marcel Proust', pais: 'Francia' },
        { nombre: 'James Joyce', pais: 'Irlanda' },
      ],
    },
    {
      id: 'asia',
      nombre: 'Asia',
      icono: '⛩️',
      autores: [
        { nombre: 'Rabindranath Tagore', pais: 'India' },
        { nombre: 'Yasunari Kawabata', pais: 'Japón' },
        { nombre: 'Kenzaburō Ōe', pais: 'Japón' },
        { nombre: 'Gao Xingjian', pais: 'China' },
        { nombre: 'Mo Yan', pais: 'China' },
        { nombre: 'Haruki Murakami', pais: 'Japón' },
        { nombre: 'Orhan Pamuk', pais: 'Turquía' },
        { nombre: 'Naguib Mahfouz', pais: 'Egipto' },
      ],
    },
    {
      id: 'africa',
      nombre: 'África',
      icono: '🌍',
      autores: [
        { nombre: 'Wole Soyinka', pais: 'Nigeria' },
        { nombre: 'Naguib Mahfouz', pais: 'Egipto' },
        { nombre: 'Nadine Gordimer', pais: 'Sudáfrica' },
        { nombre: 'J.M. Coetzee', pais: 'Sudáfrica' },
        { nombre: 'Abdulrazak Gurnah', pais: 'Tanzania' },
        { nombre: 'Chimamanda Ngozi Adichie', pais: 'Nigeria' },
      ],
    },
    {
      id: 'oceania',
      nombre: 'Oceanía',
      icono: '🌊',
      autores: [
        { nombre: 'Patrick White', pais: 'Australia' },
        { nombre: 'Katherine Mansfield', pais: 'Nueva Zelanda' },
        { nombre: 'Christina Stead', pais: 'Australia' },
        { nombre: 'Thomas Keneally', pais: 'Australia' },
        { nombre: 'Alexis Wright', pais: 'Australia' },
      ],
    },
  ];

  function obtenerPrincipales(continenteId, cantidad = 5) {
    const c = CONTINENTES.find(c => c.id === continenteId);
    return c ? c.autores.slice(0, cantidad) : [];
  }

  function obtenerTodos(continenteId) {
    const c = CONTINENTES.find(c => c.id === continenteId);
    return c ? c.autores : [];
  }

  return { CONTINENTES, obtenerPrincipales, obtenerTodos };
});
