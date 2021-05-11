const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos.`)
    }
}

const emailExiste = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({ correo })
    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya está registrado en la base de datos.`)
    }
}

const existeUsuarioPorID = async (id) => {
    const existeUsuario = await Usuario.findById({ id })
    if (!existeUsuario) {
        throw new Error(`El usuario con ID ${id} no existe en la base de datos.`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID
}