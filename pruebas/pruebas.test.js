const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

// ── motor-busqueda ────────────────────────────────────────────────────────
const motor = require('../public/js/motor-busqueda.js');

describe('normalizar', () => {
  test('convierte a minúsculas y quita tildes', () => {
    assert.equal(motor.normalizar('Márquez'), 'marquez');
    assert.equal(motor.normalizar('Ñoño'), 'nono');
  });
});

describe('calcularDiasAtras', () => {
  test('devuelve 365 para periodo 1', () => {
    assert.equal(motor.calcularDiasAtras('1'), 365);
  });
  test('devuelve Infinity para historico', () => {
    assert.equal(motor.calcularDiasAtras('historico'), Infinity);
  });
  test('devuelve 730 para periodo 2', () => {
    assert.equal(motor.calcularDiasAtras('2'), 730);
  });
});

describe('filtrarPorFecha', () => {
  test('no filtra si diasAtras es Infinity', () => {
    const items = [{ fecha: '1900-01-01' }, { fecha: null }];
    assert.equal(motor.filtrarPorFecha(items, Infinity).length, 2);
  });
  test('excluye items fuera del rango', () => {
    const items = [
      { titulo: 'reciente', fecha: new Date().toISOString().split('T')[0] },
      { titulo: 'antiguo', fecha: '1990-01-01' },
    ];
    const resultado = motor.filtrarPorFecha(items, 365);
    assert.equal(resultado.length, 1);
    assert.equal(resultado[0].titulo, 'reciente');
  });
});

describe('expandirTerminos', () => {
  test('expande vargas llosa con sinónimos', () => {
    const terminos = motor.expandirTerminos('vargas llosa');
    assert.ok(terminos.includes('boom latinoamericano'));
  });
});

describe('rankear', () => {
  test('los que coinciden en título primero', () => {
    const items = [
      { titulo: 'Sobre la filosofía', autores: '' },
      { titulo: 'Cien años de soledad', autores: 'García Márquez' },
    ];
    const resultado = motor.rankear(items, 'cien anos de soledad');
    assert.equal(resultado[0].titulo, 'Cien años de soledad');
  });
});

// ── fuentes-prestigio ────────────────────────────────────────────────────
const fuentes = require('../public/js/fuentes-prestigio.js');

describe('fuentes-prestigio', () => {
  test('tiene fuentes nacionales', () => {
    assert.ok(Array.isArray(fuentes.NACIONAL));
    assert.ok(fuentes.NACIONAL.length > 0);
  });
  test('incluye Casa de la Literatura Peruana', () => {
    assert.ok(fuentes.NACIONAL.some(f => f.includes('Casa de la Literatura')));
  });
});

// ── autores ───────────────────────────────────────────────────────────────
const autores = require('../public/js/autores.js');

describe('autores', () => {
  test('tiene 5 continentes', () => {
    assert.equal(autores.CONTINENTES.length, 5);
  });
  test('América incluye Vargas Llosa', () => {
    const america = autores.CONTINENTES.find(c => c.id === 'america');
    assert.ok(america.autores.some(a => a.nombre.includes('Vargas Llosa')));
  });
  test('obtenerPrincipales devuelve máximo 5', () => {
    assert.ok(autores.obtenerPrincipales('america').length <= 5);
  });
});

// ── temas ─────────────────────────────────────────────────────────────────
const temas = require('../public/js/temas.js');

describe('temas', () => {
  test('tiene 4 clasificaciones', () => {
    assert.equal(temas.CLASIFICACIONES.length, 4);
  });
  test('incluye clasificación de narrativa', () => {
    assert.ok(temas.CLASIFICACIONES.some(t => t.id === 'narrativa'));
  });
});
