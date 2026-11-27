# Bitácora – Patitas Motor

##  Nodos

```text
cabeza
  ↓
[Vacunación] → [Control de peso] → [Limpieza dental] → null
```

Al asignar `null` a `cabeza.siguiente`, el recorrido termina después de la primera atención. Las otras dos dejan de ser alcanzables desde la cabeza, aunque todavía existan referencias a ellas en las variables originales.

##  Inserciones

```text
Agregar al final de una lista vacía
Antes: cabeza = cola = null
Después: cabeza → [N] → null
                  ↑
                 cola

Agregar al final de una lista con un nodo
Antes: cabeza = cola → [A] → null
Después: cabeza → [A] → [N] → null
                        ↑
                       cola

Agregar al final de una lista con varios nodos
Antes: cabeza → [A] → ... → [Z] → null (cola = Z)
Después: cabeza → [A] → ... → [Z] → [N] → null (cola = N)

Agregar al inicio de una lista vacía
Antes: cabeza = cola = null
Después: cabeza = cola → [N] → null

Agregar al inicio de una lista con un nodo
Antes: cabeza = cola → [A] → null
Después: cabeza → [N] → [A] → null (cola = A)

Agregar al inicio de una lista con varios nodos
Antes: cabeza → [A] → ... → [Z] → null (cola = Z)
Después: cabeza → [N] → [A] → ... → [Z] → null (cola = Z)
```

## Eliminación 

```text
Eliminar la cabeza
Antes: cabeza → [A] → [B] → [C] → null (cola = C)
Después: cabeza → [B] → [C] → null (cola = C)

Eliminar un nodo intermedio
Antes: cabeza → [A] → [B] → [C] → null (cola = C)
Después: cabeza → [A] ─────→ [C] → null (cola = C)

Eliminar la cola
Antes: cabeza → [A] → [B] → [C] → null (cola = C)
Después: cabeza → [A] → [B] → null (cola = B)
```

### Complejidad de la lista 

| Método | Tiempo | Explicación |
|---|---|---|
| agregarAlInicio / agregarAlFinal | O(1) | Cambian referencias sin recorrer. |
| recorrer / aArreglo | O(n) | Visitan todos los nodos. |
| estaVacia / obtenerTamanio | O(1) | Consultan el tamaño guardado. |
| buscar / insertarDespuesDe / eliminar | O(n) | En el peor caso buscan hasta el final. |

Eliminar la cola requiere encontrar el nodo anterior porque los enlaces solamente apuntan hacia adelante.

##  Comparación

| Operación | Lista enlazada | Arreglo |
|---|---|---|
| Agregar al final | O(1) | O(1) amortizado |
| Agregar al inicio | O(1) | O(n) |
| Acceder a la atención k | O(n) | O(1) |
| Buscar | O(n) | O(n) |
| Eliminar la primera | O(1) | O(n) |

## Cola

```text
Encolar Lola: frente = final → [Lola] → null
Encolar Toby: frente → [Lola] → [Toby] → null (final = Toby)
Encolar Mía: frente → [Lola] → [Toby] → [Mía] → null (final = Mía)
Desencolar: sale Lola; frente → [Toby] → [Mía] → null (final = Mía)
```

## Cálculo manual de la mañana

Se registra toda llegada que ocurre hasta el momento de liberar el consultorio, incluyendo las simultáneas. Una atención ya iniciada no se interrumpe.

| Mascota | Llegada | Inicio | Fin | Espera (min) |
|---|---|---|---|---:|
| Toby | 8:00 | 8:00 | 8:20 | 0 |
| Luna | 8:10 | 8:20 | 8:40 | 10 |
| Kira | 8:25 | 8:40 | 9:00 | 15 |
| Rocky | 9:00 | 9:00 | 9:20 | 0 |
| Max | 8:05 | 9:20 | 9:40 | 75 |
| Simón | 8:20 | 9:40 | 10:00 | 80 |
| Nala | 8:40 | 10:00 | 10:20 | 80 |

Urgencias: (10 + 15 + 0) / 3 = 8,33 minutos.
Generales: (0 + 75 + 80 + 80) / 4 = 58,75 minutos.

###  Medición y complejidades

Medición de 100.000 turnos con `console.time`, Node.js v22.16.0, en el entorno de ejecución de ChatGPT. Los datos de prueba se generan antes de medir.

| Operación | Cola enlazada | Arreglo |
|---|---:|---:|
| Encolar | 33,741 ms | 16,588 ms |
| Desencolar | 2,907 ms | 488,911 ms |

| Operación | Cola | Arreglo |
|---|---|---|
| encolar / push | O(1) | O(1) amortizado |
| desencolar / shift | O(1) | O(n) |
| verFrente | O(1) | O(1) |
| estaVacia | O(1) | O(1) |
| tamanio | O(1) | O(1) |

La cola cambia sus referencias directamente; `shift()` desplaza los elementos restantes. Por eso vaciar n elementos con shift tiene costo cuadrático, mientras que con la cola es lineal. Los tiempos pueden variar según el equipo y la ejecución. Los cinco turnos de prueba salieron en el orden de llegada; al vaciar la cola, frente y final quedaron en null.

### Comparación con el programa

El orden, las horas y las esperas de la simulación coinciden con el cálculo manual. No fue necesario documentar un error de discrepancia. Registrar las llegadas antes de seleccionar el siguiente turno permite atender a Rocky a las 9:00.

## Pila y editor

Se eligió una pila con nodos porque permite apilar y desapilar modificando el tope, sin recorrer ni desplazar elementos. Todas sus operaciones son O(1).

En la tabla, + representa agregar y − representa eliminar. Las pilas se muestran desde el tope hacia el fondo.

| Paso | Historial | Deshacer | Rehacer |
|---|---|---|---|
| Agregar A | A | +A | Vacía |
| Agregar B | A, B | +B, +A | Vacía |
| Eliminar A | B | −A, +B, +A | Vacía |
| Deshacer | A, B | +B, +A | −A |
| Deshacer | A | +A | +B, −A |
| Rehacer | A, B | +B, +A | −A |
| Agregar C | A, B, C | +C, +B, +A | Vacía |
| Rehacer | A, B, C | +C, +B, +A | Vacía |

La prueba confirmó los ocho estados. El editor guarda la posición original de una atención para restaurarla en el mismo lugar. Una acción nueva efectiva elimina la posibilidad de rehacer las acciones anteriores.

## Integración

| Estructura | Principio | Uso en Patitas | Complejidad principal |
|---|---|---|---|
| ListaEnlazada | Secuencial | Historial clínico | Inserción en extremos O(1); búsqueda, recorrido y eliminación por condición O(n) |
| Cola | FIFO | Turnos de recepción | Encolar, desencolar, consultar frente y tamaño O(1) |
| Pila | LIFO | Deshacer y rehacer | Apilar, desapilar, consultar tope y tamaño O(1) |

RegistroClinico usa un Map como índice de historiales (acceso promedio O(1)). Recepcion utiliza dos colas con prioridad. Editor utiliza dos pilas, pero sus operaciones sobre el historial pueden requerir O(n) para localizar o restaurar una atención.

La simulación registra temporalmente la atención de Toby en Max, deshace el error y registra la atención correcta. Se verificó que cada mascota atendida tenga exactamente su atención y que llamar con la sala vacía no genere errores. Las siete atenciones corresponden a la mañana simulada; no se inventaron fechas exactas, veterinarios ni costos que la tabla no proporciona.
