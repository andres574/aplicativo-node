const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
                this._listado[tarea.id] = tarea;

            })
            // this._listado[]


    }


    crearTarea(des = "") {

        const tarea = new Tarea(des);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log("\n")

        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i+1}`.green
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) ? 'completado'.green : 'pendiente'.red

            console.log(`${idx} = ${desc}:: ${estado}`)

        })

    }

    toggleCompletadas(id = []) {

        id.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea => {
            if (!id.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }
        })

    }

    listarPendientesCompletadas(completadas = true) {

        console.log("\n")
        let contador = 0;

        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;

            // const estado = (completadoEn) ? 'completado'.green : 'pendiente'.red

            if (completadas) {
                if (completadoEn) {
                    contador += 1
                    console.log(`${contador.toString().green + '.'.green}  ${desc}:: ${completadoEn.green
                    }`)

                }
            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${contador.toString().red + '.'.red}  ${desc} `)

                }

            }


        })


    }

}

module.exports = Tareas;