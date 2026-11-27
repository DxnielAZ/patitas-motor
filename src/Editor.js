const Pila = require('./Pila');
const RegistroClinico = require('./RegistroClinico');
class Editor {
    constructor(registro = new RegistroClinico()) {
        this.registro = registro;
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }
    agregar(mascota, atencion) {
        const historial = this.registro.historiales.get(mascota);
        const accion = { tipo: 'agregar', mascota, atencion,
            posicion: historial ? historial.obtenerTamanio() : 0, historialNuevo: !historial };
        this.registro.registrarAtencion(mascota, atencion);
        this.pilaDeshacer.apilar(accion);
        this.pilaRehacer = new Pila();
        return atencion;
    }
    eliminar(mascota, condicion) {
        const historial = this.registro.historiales.get(mascota);
        if (!historial) return null;
        let posicion = 0;
        const atencion = historial.eliminar(dato => {
            if (condicion(dato)) return true;
            posicion++;
            return false;
        });
        if (atencion === null) return null;
        this.pilaDeshacer.apilar({ tipo: 'eliminar', mascota, atencion, posicion });
        this.pilaRehacer = new Pila();
        return atencion;
    }
    eliminarEnPosicion(accion) {
        let i = 0;
        return this.registro.historiales.get(accion.mascota).eliminar(() => i++ === accion.posicion);
    }
    restaurar(accion) {
        const historial = this.registro.historiales.get(accion.mascota);
        if (!historial) this.registro.registrarAtencion(accion.mascota, accion.atencion);
        else if (accion.posicion === 0) historial.agregarAlInicio(accion.atencion);
        else {
            let i = 0;
            historial.insertarDespuesDe(() => i++ === accion.posicion - 1, accion.atencion);
        }
    }
    deshacer() {
        const accion = this.pilaDeshacer.desapilar();
        if (accion === null) return null;
        if (accion.tipo === 'agregar') {
            this.eliminarEnPosicion(accion);
            if (accion.historialNuevo) this.registro.historiales.delete(accion.mascota);
        } else this.restaurar(accion);
        this.pilaRehacer.apilar(accion);
        return accion;
    }
    rehacer() {
        const accion = this.pilaRehacer.desapilar();
        if (accion === null) return null;
        if (accion.tipo === 'agregar') this.restaurar(accion);
        else this.eliminarEnPosicion(accion);
        this.pilaDeshacer.apilar(accion);
        return accion;
    }
}
module.exports = Editor;
