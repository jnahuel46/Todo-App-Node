const Tarea = require("./tarea");


/*
  _listado: asi lo vamos a manejar
        { uuid-123-12312-2: {id: 12, desc:asdd, completadoEn:123123}},
        { uuid-123-12312-2: {id: 12, desc:asdd, completadoEn:123123}},
        { uuid-123-12312-2: {id: 12, desc:asdd, completadoEn:123123}},

*/
class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);

        });
        return listado;


    }

    constructor() {
        this._listado = {};
    };

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    };

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    };

    listadoCompleto() {
        console.log();// generamos espacio
        this.listadoArr.forEach((tarea, i) => {//recorro el array de listadoArr

            const idx = `${i + 1}`.green;
            const { desc, completadEn } = tarea;
            const estado = (completadEn)
                ? 'Completado'.green
                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        })

    };

    listarTareasCompletadasPendientes(completadas = true) {//si le envio true me lista las completadas
        console.log();// generamos espacio
        let indice = 0;//contador de indices
        this.listadoArr.forEach((tarea) => {//recorro el array de listadoArr

            const { desc, completadEn } = tarea;
            const estado = (completadEn)
                ? 'Completado'.green
                : 'Pendiente'.red;
            if (completadas) {
                //mostrar completadas
                if (completadEn) {
                    indice += 1;
                    console.log(`${indice.toString().green}. ${desc} :: ${completadEn.green}`);
                }

            } else {
                //mostrar pendientes
                if (!completadEn) {
                    indice += 1;
                    console.log(`${indice.toString().red}. ${desc} :: ${estado}`);
                }
            }
        })

    };

    cambioCompletadas(ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadEn) {
                tarea.completadEn = new Date().toISOString();
            }
        })
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadEn = null;

            }
        })
    }
};

module.exports = Tareas;