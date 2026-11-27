const Nodo = require('../src/Nodo');

const nodo1 = new Nodo({ fecha: '02/02', motivo: 'Vacunación anual', veterinario: 'Dra. Ríos', costo: 85000 });
const nodo2 = new Nodo({ fecha: '15/03', motivo: 'Control de peso', veterinario: 'Dr. Gómez', costo: 40000 });
const nodo3 = new Nodo({ fecha: '20/05', motivo: 'Limpieza dental', veterinario: 'Dra. Ríos', costo: 150000 });

nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;
const cabeza = nodo1;

console.log('Historial de Lola (gata, 4 años)');
let actual = cabeza;
while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}

let total = 0;
actual = cabeza;
while (actual !== null) {
    total += actual.dato.costo;
    actual = actual.siguiente;
}
console.log('Costo total: $' + total.toLocaleString('es-CO'));

// Se pierde el enlace con la segunda atención a propósito.
cabeza.siguiente = null;
console.log('\nRecorrido después de perder el enlace:');
actual = cabeza;
while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}
