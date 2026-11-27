const assert = require('node:assert/strict');
const Recepcion = require('./Recepcion');
const Editor = require('./Editor');
const llegadas = [
    { horaLlegada: 480, mascota: 'Toby', tipo: 'General', motivo: 'Control de vacunas' },
    { horaLlegada: 485, mascota: 'Max', tipo: 'General', motivo: 'Revisión de piel' },
    { horaLlegada: 490, mascota: 'Luna', tipo: 'Urgencia', motivo: 'Intoxicación' },
    { horaLlegada: 500, mascota: 'Simón', tipo: 'General', motivo: 'Corte de uñas' },
    { horaLlegada: 505, mascota: 'Kira', tipo: 'Urgencia', motivo: 'Herida en pata' },
    { horaLlegada: 520, mascota: 'Nala', tipo: 'General', motivo: 'Desparasitación' },
    { horaLlegada: 540, mascota: 'Rocky', tipo: 'Urgencia', motivo: 'Dificultad para respirar' }
];
const recepcion = new Recepcion();
const editor = new Editor();
const resultados = [];
let i = 0;
let tiempo = llegadas[0].horaLlegada;
const hora = minutos => `${Math.floor(minutos / 60)}:${String(minutos % 60).padStart(2, '0')}`;
while (i < llegadas.length || !recepcion.urgencias.estaVacia() || !recepcion.generales.estaVacia()) {
    if (recepcion.urgencias.estaVacia() && recepcion.generales.estaVacia() && i < llegadas.length) {
        tiempo = Math.max(tiempo, llegadas[i].horaLlegada);
    }
    while (i < llegadas.length && llegadas[i].horaLlegada <= tiempo) recepcion.registrarLlegada(llegadas[i++]);
    const turno = recepcion.llamarSiguiente();
    if (turno === null) break;
    const inicio = tiempo;
    const fin = inicio + 20;
    resultados.push({ mascota: turno.mascota, tipo: turno.tipo, llegada: hora(turno.horaLlegada),
        inicio: hora(inicio), fin: hora(fin), espera: inicio - turno.horaLlegada });
    tiempo = fin;
    // La tabla no proporciona fecha exacta, veterinario ni costo de estas atenciones.
    const atencion = { fecha: null, motivo: turno.motivo, veterinario: null, costo: null,
        horaInicio: hora(inicio), horaFin: hora(fin) };
    if (turno.mascota === 'Toby') {
        editor.agregar('Max', atencion);
        console.log('Error: atención de Toby registrada en Max.');
        editor.deshacer();
        console.log('Error corregido con deshacer.');
    }
    editor.agregar(turno.mascota, atencion);
}
console.log('\nREPORTE DE ATENCIÓN');
console.table(resultados);
let sumaUrgencias = 0, cantidadUrgencias = 0, sumaGenerales = 0, cantidadGenerales = 0;
for (const resultado of resultados) {
    if (resultado.tipo === 'Urgencia') { sumaUrgencias += resultado.espera; cantidadUrgencias++; }
    else { sumaGenerales += resultado.espera; cantidadGenerales++; }
}
console.log('Espera promedio urgencias:', (sumaUrgencias / cantidadUrgencias).toFixed(2), 'min');
console.log('Espera promedio generales:', (sumaGenerales / cantidadGenerales).toFixed(2), 'min');
console.log('\nHISTORIALES DE LA MAÑANA');
for (const [mascota, historial] of editor.registro.historiales) {
    console.log(mascota, '- atenciones:', historial.obtenerTamanio());
    historial.recorrer(a => console.log(`${a.horaInicio}–${a.horaFin} | ${a.motivo}`));
}
assert.deepEqual(resultados.map(r => r.mascota), ['Toby','Luna','Kira','Rocky','Max','Simón','Nala']);
assert.deepEqual(resultados.map(r => r.espera), [0,10,15,0,75,80,80]);
assert.equal(editor.registro.historiales.size, 7);
for (const turno of llegadas) {
    const historial = editor.registro.historiales.get(turno.mascota);
    assert.equal(historial.obtenerTamanio(), 1);
    assert.equal(historial.cabeza.dato.motivo, turno.motivo);
}
assert.equal(recepcion.llamarSiguiente(), null);
console.log('Simulación verificada: siete atenciones correctas.');
