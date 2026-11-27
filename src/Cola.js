const Nodo = require('./Nodo');

class Cola {
    constructor() {
        this.frente = null;
        this.final = null;
        this.cantidad = 0;
    }
    encolar(dato) {
        const nuevo = new Nodo(dato);
        if (this.estaVacia()) this.frente = nuevo;
        else this.final.siguiente = nuevo;
        this.final = nuevo;
        this.cantidad++;
    }
    desencolar() {
        if (this.estaVacia()) return null;
        const dato = this.frente.dato;
        this.frente = this.frente.siguiente;
        this.cantidad--;
        if (this.estaVacia()) this.final = null;
        return dato;
    }
    verFrente() { return this.estaVacia() ? null : this.frente.dato; }
    estaVacia() { return this.cantidad === 0; }
    tamanio() { return this.cantidad; }
}
module.exports = Cola;
