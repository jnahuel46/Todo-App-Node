const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1 Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tarea'
            },
            {
                value: '3',
                name: '3. Listar Tareas Completadas'
            },
            {
                value: '4',
                name: '4. Listar Tareas Pendientes'
            },
            {
                value: '5',
                name: '5. Completar Tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar Tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('====================='.green);
    console.log('Seleccione una opción'.white);
    console.log('=====================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);// prompt para mostrarlo en consola
    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
};

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;

};

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar '
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async (message) => { //opcion para mostrar una confirmacion al user
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;

};

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;//mostrar id
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadEn) ? true : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
};

module.exports = {
    inquirerMenu: inquirerMenu,
    pausa: pausa,
    leerInput: leerInput,
    listadoTareasBorrar: listadoTareasBorrar,
    confirmar: confirmar,
    mostrarListadoChecklist: mostrarListadoChecklist
};






/*const choices = tareas.map ( (tarea, i ) => {

    const idx = `${i + 1}`.green;
    return {
        value : tarea.id,
        name: `${ idx } ${tareas.desc}`
    }
});

const preguntas = [
    {
        type:'list',
        name: 'id',
        message: 'Borrar',
        choices
    }
]
const {id} = await inquirer.prompt(preguntas);
return id;*/