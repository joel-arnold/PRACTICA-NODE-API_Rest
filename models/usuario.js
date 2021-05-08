const { Schema, model } = require('mongoose')

const EsquemaUsuario = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ROL_ADMIN', 'ROL_USUARIO']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


module.exports = model('Usuario', EsquemaUsuario)