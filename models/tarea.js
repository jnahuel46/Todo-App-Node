const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadEn = null;

    constructor( desc ){//se ejecuta cuando creamos una nueva instancia de la tarea
      
        this.id = uuidv4();
        this.desc = desc;
        this.completadEn = null;
    }
};

module.exports = Tarea;