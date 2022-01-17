require('colors');
const { guardarDb, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');




const main = async () => {


    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerDB();

    if (tareasDb) { // cargar tareas
        tareas.cargarTareasFromArray(tareasDb);
    }


    do {
        opt = await inquirerMenu();// aca se imprime el menu

        switch (opt) {
            case '1':
                //CREAR OPCION 
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3': //listar completados
                tareas.listarTareasCompletadasPendientes(true);
                break;

            case '4'://listar pendientes
                tareas.listarTareasCompletadasPendientes(false);
                break;

            case '5': // tildar completados y pendientes
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.cambioCompletadas(ids);
                break;

            case '6': //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== '0') {

                    const ok = await confirmar('Esta seguro de Borrarlo?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }

                break;
            case '0':

                break;

        }

        guardarDb(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');



};

main();