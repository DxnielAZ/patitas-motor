const assert = require('node:assert/strict');
const ListaEnlazada = require('../src/ListaEnlazada');

function verificar(lista, esperados) {
    assert.equal(lista.tamanio, esperados.length);
    assert.equal(lista.obtenerTamanio(), esperados.length);
    assert.equal(lista.estaVacia(), esperados.length === 0);

    if (esperados.length === 0) {
        assert.equal(lista.cabeza, null);
        assert.equal(lista.cola, null);
    } else {
        assert.equal(lista.cabeza.dato, esperados[0]);
        assert.equal(lista.cola.dato, esperados[esperados.length - 1]);
        assert.equal(lista.cola.siguiente, null);
        if (esperados.length === 1) {
            assert.equal(lista.cabeza, lista.cola);
        }
    }

    let actual = lista.cabeza;
    let ultimo = null;
    let cantidad = 0;
    while (actual !== null) {
        cantidad++;
        assert.ok(cantidad <= esperados.length, 'Demasiados nodos o ciclo');
        ultimo = actual;
        actual = actual.siguiente;
    }
    assert.equal(cantidad, esperados.length);
    assert.equal(ultimo, lista.cola);
    assert.deepEqual(lista.aArreglo(), esperados);
}

console.log('MiniReto 2: inserciones');
let lista = new ListaEnlazada();
lista.agregarAlFinal('A');
verificar(lista, ['A']);
console.log('1. Agregar al final de una lista vacía: OK');
lista.agregarAlFinal('B');
verificar(lista, ['A', 'B']);
console.log('2. Agregar al final de una lista con un nodo: OK');
lista.agregarAlFinal('C');
verificar(lista, ['A', 'B', 'C']);
console.log('3. Agregar al final de una lista con varios nodos: OK');

lista = new ListaEnlazada();
lista.agregarAlInicio('C');
verificar(lista, ['C']);
console.log('4. Agregar al inicio de una lista vacía: OK');
lista.agregarAlInicio('B');
verificar(lista, ['B', 'C']);
console.log('5. Agregar al inicio de una lista con un nodo: OK');
lista.agregarAlInicio('A');
verificar(lista, ['A', 'B', 'C']);
console.log('6. Agregar al inicio de una lista con varios nodos: OK');

console.log('\nMiniReto 3: casos borde');
lista = new ListaEnlazada();
assert.equal(lista.eliminar(dato => dato === 'A'), null);
verificar(lista, []);
console.log('1. Eliminar en una lista vacía: OK');
lista.agregarAlFinal('A');
verificar(lista, ['A']);
assert.equal(lista.eliminar(dato => dato === 'A'), 'A');
verificar(lista, []);
console.log('2. Eliminar el único nodo: OK');
lista.agregarAlFinal('A');
verificar(lista, ['A']);
lista.agregarAlFinal('B');
verificar(lista, ['A', 'B']);
lista.agregarAlFinal('C');
verificar(lista, ['A', 'B', 'C']);
assert.equal(lista.eliminar(dato => dato === 'A'), 'A');
verificar(lista, ['B', 'C']);
console.log('3. Eliminar la cabeza: OK');
assert.equal(lista.eliminar(dato => dato === 'C'), 'C');
verificar(lista, ['B']);
console.log('4. Eliminar la cola: OK');
assert.equal(lista.eliminar(dato => dato === 'X'), null);
verificar(lista, ['B']);
console.log('5. Eliminar algo inexistente: OK');
lista.insertarDespuesDe(dato => dato === 'B', 'C');
verificar(lista, ['B', 'C']);
console.log('6. Insertar después de la cola: OK');
