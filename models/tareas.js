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
        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx= `${i + 1}`.green;
            const { desc, completadEn } = tarea;
            const estado = ( completadEn )
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ estado }`);
        })

    };
};

module.exports = Tareas;