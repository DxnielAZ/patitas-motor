const assert = require('node:assert/strict');
const Editor = require('../src/Editor');
const Pila = require('../src/Pila');
const pila = new Pila();
assert.equal(pila.desapilar(), null);
pila.apilar('A'); pila.apilar('B');
assert.equal(pila.verTope(), 'B');
assert.equal(pila.tamanio(), 2);
assert.equal(pila.desapilar(), 'B');
assert.equal(pila.desapilar(), 'A');
assert.equal(pila.estaVacia(), true);
const editor = new Editor();
const A = {motivo:'A'}, B = {motivo:'B'}, C = {motivo:'C'};
function estado(pila) {
    const datos = [];
    let actual = pila.tope;
    while (actual !== null) {
        datos.push((actual.dato.tipo === 'agregar' ? '+' : '-') + actual.dato.atencion.motivo);
        actual = actual.siguiente;
    }
    return datos;
}
function verificar(paso, historial, deshacer, rehacer) {
    const lista = editor.registro.historiales.get('Lola');
    assert.deepEqual(lista ? lista.aArreglo().map(a => a.motivo) : [], historial);
    if (lista) {
        assert.equal(lista.obtenerTamanio(), historial.length);
        assert.equal(lista.cola ? lista.cola.siguiente : null, null);
        assert.equal(lista.cabeza ? lista.cabeza.dato.motivo : null, historial[0] ?? null);
        assert.equal(lista.cola ? lista.cola.dato.motivo : null, historial.at(-1) ?? null);
    }
    assert.deepEqual(estado(editor.pilaDeshacer), deshacer);
    assert.deepEqual(estado(editor.pilaRehacer), rehacer);
    console.log(paso, historial, deshacer, rehacer);
}
assert.equal(editor.deshacer(), null);
assert.equal(editor.rehacer(), null);
editor.agregar('Lola', A); verificar('Agregar A', ['A'], ['+A'], []);
editor.agregar('Lola', B); verificar('Agregar B', ['A','B'], ['+B','+A'], []);
editor.eliminar('Lola', a => a === A); verificar('Eliminar A', ['B'], ['-A','+B','+A'], []);
editor.deshacer(); verificar('Deshacer', ['A','B'], ['+B','+A'], ['-A']);
editor.deshacer(); verificar('Deshacer', ['A'], ['+A'], ['+B','-A']);
editor.rehacer(); verificar('Rehacer', ['A','B'], ['+B','+A'], ['-A']);
editor.agregar('Lola', C); verificar('Agregar C', ['A','B','C'], ['+C','+B','+A'], []);
assert.equal(editor.rehacer(), null); verificar('Rehacer', ['A','B','C'], ['+C','+B','+A'], []);
console.log('Pruebas de pila y editor: OK');
