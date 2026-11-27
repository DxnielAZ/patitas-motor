# Patitas Motor

Motor de registro clínico y recepción veterinaria desarrollado en JavaScript. Permite organizar historiales de mascotas, gestionar turnos según su prioridad y corregir cambios mediante deshacer y rehacer.

## Tecnologías

- JavaScript (clases, objetos, referencias y callbacks).
- Node.js y módulos CommonJS (`require`, `module.exports`).
- Markdown para la documentación.
- Git y GitHub para el control de versiones.

## Funcionalidades

- Registro, búsqueda, inserción y eliminación de atenciones clínicas.
- Reporte de historiales, costos y últimas vacunaciones.
- Cola de turnos FIFO y prioridad para urgencias.
- Editor con deshacer y rehacer mediante dos pilas.
- Simulación de una mañana de atención, con horas y tiempos de espera.

## Estructuras

- `Nodo`: elemento que almacena un dato y una referencia al siguiente.
- `ListaEnlazada`: historial con cabeza, cola y tamaño.
- `RegistroClinico`: índice Map de historiales por mascota.
- `Cola`: turnos atendidos en orden de llegada.
- `Recepcion`: dos colas, urgencias y generales.
- `Pila`: acciones en orden LIFO.
- `Editor`: acciones reversibles sobre el registro clínico.

## Ejecución

Requiere Node.js. Abre la carpeta del proyecto en VS Code y ejecuta los comandos desde su raíz. No requiere instalar dependencias externas.

```bash
node pruebas/nodos.js
node pruebas/lista.js
node src/reporte.js
node pruebas/cola.js
node pruebas/editor.js
node src/simulacion.js
```

El reporte carga los datos clínicos originales; la simulación utiliza un registro independiente para las siete atenciones del sábado. Los datos de fecha exacta, veterinario y costo no suministrados se mantienen como `null`.

## Documentación

`bitacora.md` contiene diagramas, complejidades, mediciones, cálculo manual de la simulación y traza del editor.

## Versión

v0.2 — Integración de listas enlazadas, colas y pilas.
