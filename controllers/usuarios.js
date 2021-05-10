const { request, response } = require("express")
const encriptador = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {
    const { id, nombre = 'Sin nombre', apikey = 'sin api key' } = req.query
    res.json({
        mensaje: 'Se hizo un GET - desde el controlador',
        id,
        nombre,
        apikey
    })
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, contrasena, rol } = req.body
    const usuario = new Usuario({ nombre, correo, contrasena, rol })

    // ? VERIFICACIÓN DE EXISTENCIA DEL CORREO
    const existeCorreo = await Usuario.findOne({ correo })
    if (existeCorreo) {
        return res.status(400).json({
            mensaje: 'El correo utilizado ya existe'
        })
    }

    // ? ENCRIPTADO DE LA CONTRASEÑA
    const modoEncriptado = encriptador.genSaltSync()
    usuario.contrasena = encriptador.hashSync(contrasena, modoEncriptado)

    // ? GUARDADO DEL USUARIO EN LA BASE DE DATOS
    await usuario.save()

    res.json({
        usuario
    })
}

const usuariosPut = (req, res) => {
    const { id } = req.params
    res.json({
        mensaje: 'Se hizo un PUT - desde el controlador',
        id
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        mensaje: 'Se hizo un PATCH - desde el controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        mensaje: 'Se hizo un DELETE - desde el controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}