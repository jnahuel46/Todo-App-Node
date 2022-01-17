require('colors');
const { guardarDb, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');




const main = async () => {


    let opt = '';
    const tareas = new Tareas();
    
    const tareasDb = leerDB();

    if (tareasDb) { // cargar tareas
        tareas.cargarTareasFromArray( tareasDb );
    }


    do {
        opt = await inquirerMenu();// aca se imprime el menu

        switch (opt) {
            case '1':
                    const desc = await leerInput('Descripcion: ');
                    tareas.crearTarea( desc );
                break;

            case '2':
                console.log( tareas.listadoCompleto());
                break;
            case '3':
                tareas.listadoPendCompl(true);
                break;
            case '4':
                tareas.listadoPendCompl(true);
                break;
            case '5':

                break;
            case '6':

                break;
            case '0':

                break;

        }

       guardarDb(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');



};

main();