const { stdout } = require('process');
const readline = require('readline');
require = ('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('====================='.green);
        console.log('Seleccione una opción'.green);
        console.log('=====================\n'.green);


        console.log(`1. Crear Tarea`);
        console.log(`2. Listar Tareas`);
        console.log(`3. Listar Tareas Completadas`);
        console.log(`4. Listar Tareas Pendientes`);
        console.log(`5. Completar Tarea(s)`);
        console.log(`6. Borrar Tarea`);
        console.log(`0. Salir \n`);

        //recibir info del usuario

        const rl = readline.createInterface({
            input: process.stdin,
            output: stdout
        });

        rl.question('Seleccione una opcion: ', (opt) => {
            rl.close();
            resolve(opt);
        })
    });


};

const pausa = () => {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: stdout
        });

        rl.question(`\n Presione ${'ENTER'.green} para continuar`, (opt) => {
            rl.close();
            resolve();
        });
    })
};



module.exports = {
    mostrarMenu: mostrarMenu,
    pausa: pausa
};