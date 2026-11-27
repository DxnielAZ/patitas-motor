const assert = require('node:assert/strict');
const Cola = require('../src/Cola');
const turnos = ['Lola', 'Toby', 'Mía', 'Max', 'Luna'].map((mascota, i) => ({
    mascota, tutor: `Tutor ${i + 1}`, horaLlegada: `08:0${i}`, motivo: 'Consulta de prueba'
}));
const cola = new Cola();
assert.equal(cola.desencolar(), null);
for (const turno of turnos) cola.encolar(turno);
assert.equal(cola.tamanio(), 5);
for (const turno of turnos) {
    assert.equal(cola.verFrente(), turno);
    assert.equal(cola.desencolar(), turno);
    console.log('Sale:', turno.mascota);
}
assert.equal(cola.desencolar(), null);
assert.equal(cola.verFrente(), null);
assert.equal(cola.frente, null);
assert.equal(cola.final, null);
assert.equal(cola.tamanio(), 0);
assert.equal(cola.estaVacia(), true);
console.log('Pruebas FIFO: OK');

const datos = Array.from({length: 100000}, (_, i) => ({
    mascota: `Mascota ${i}`, tutor: `Tutor ${i}`, horaLlegada: '08:00', motivo: 'Consulta de prueba'
}));
const arreglo = [];
console.time('Cola encolar');
for (const dato of datos) cola.encolar(dato);
console.timeEnd('Cola encolar');
console.time('Cola desencolar');
for (let i = 0; i < datos.length; i++) cola.desencolar();
console.timeEnd('Cola desencolar');
console.time('Arreglo push');
for (const dato of datos) arreglo.push(dato);
console.timeEnd('Arreglo push');
console.time('Arreglo shift');
for (let i = 0; i < datos.length; i++) arreglo.shift();
console.timeEnd('Arreglo shift');
