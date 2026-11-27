const Nodo = require('./Nodo');
class Pila {
    constructor() { this.tope = null; this.cantidad = 0; }
    apilar(dato) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = this.tope;
        this.tope = nuevo;
        this.cantidad++;
    }
    desapilar() {
        if (this.estaVacia()) return null;
        const dato = this.tope.dato;
        this.tope = this.tope.siguiente;
        this.cantidad--;
        return dato;
    }
    verTope() { return this.estaVacia() ? null : this.tope.dato; }
    estaVacia() { return this.cantidad === 0; }
    tamanio() { return this.cantidad; }
}
module.exports = Pila;
