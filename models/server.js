const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.puerto = process.env.PUERTO
        this.directorioUsuario = '/api/usuarios'

        // * MIDDLEWARES
        this.middlewares()

        // * RUTAS
        this.routes()
    }

    middlewares() {
        // * CORS
        this.app.use(cors())

        // * LECTURA Y PARSE DEL BODY
        this.app.use(express.json())

        // * DIRECTORIO PÚBLICO
        this.app.use(express.static('public'))
    }

    // * MANEJO DE LAS RUTAS
    routes() {
        this.app.use(this.directorioUsuario, require('../routes/usuarios'))
    }

    // * DEFINICIÓN DE PUERTO DE ESCUCHA
    listen() {
        this.app.listen(this.puerto, () => {
            console.log('Escuchando en puerto: ', this.puerto);
        })
    }
}

// * EXPORTO LA CLASE PARA QUE ESTÉ DISPONIBLE ¿EN TODA? LA APLICACIÓN
module.exports = Server