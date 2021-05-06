// * IMPORTACIONES DE TERCEROS
require('dotenv').config()

// * IMPORTACIONES PROPIAS
const Server = require('./models/server')

// * VARIABLES
const servidor = new Server()


console.clear();
servidor.listen()