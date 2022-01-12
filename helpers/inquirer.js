const inquirer = require('inquirer')
require('colors')

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que deseas hacer?',
    choices: [{
            value: '1',
            name: `${'1'.green }. Crear una lista`
        },
        {
            value: '2',
            name: `${"2".green}. Listar tareas`

        },
        {
            value: '3',
            name: `${'3'.green}. Listar tareas completadas`

        },
        {
            value: '4',
            name: `${'4'.green}. listar tareas pendiendientes`

        },
        {
            value: '5',
            name: `${'5'.green}. Completar tarea(s)`

        },
        {
            value: '6',
            name: `${'6'.green}. Borrar tarea`

        },
        {
            value: '0',
            name: `${'0'.green}. Salir`

        }
    ]

}]


const inquirerMenu = async() => {
    console.clear();

    console.log('=========================='.green)
    console.log('Selecione una opcion'.white)
    console.log('==========================\n'.green)


    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'enter'.green} para continuar`
    }];
    console.log("\n");
    await inquirer.prompt(question);
}


const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'des',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];
    const { des } = await inquirer.prompt(question)
    return des;
}

const listadoTareasBorrar = async(tarea = []) => {

    const choices = tarea.map((tarea, i) => {
        const id = `${i + 1}`.green
        return {
            value: tarea.id,
            name: `${id} ${tarea.desc}`

        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + ' cancelar'
    })

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: "Borrar",
        choices
    }]
    const { id } = await inquirer.prompt(preguntas)
    return id
}

const mostrarChecklist = async(tarea = []) => {

    const choices = tarea.map((tarea, i) => {

        const id = `${i + 1}`.green
        return {
            value: tarea.id,
            name: `${id} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,

        }
    });


    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: "Seleccione",
        choices
    }]
    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question)
    return ok
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarChecklist
}