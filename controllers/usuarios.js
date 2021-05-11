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
    // ? Elijo solo los datos que necesito y omito todo lo que pudiera llegar desde el front
    const { nombre, correo, contrasena, rol } = req.body
    const usuario = new Usuario({ nombre, correo, contrasena, rol })

    // ? Encriptado de la contraseña
    const modoEncriptado = encriptador.genSaltSync()
    usuario.contrasena = encriptador.hashSync(contrasena, modoEncriptado)

    // ? GUARDADO DEL USUARIO EN LA BASE DE DATOS
    await usuario.save()

    // ? DEVUELVO LOS DATOS DEL USUARIO DADO DE ALTA
    res.json({
        usuario
    })
}

const usuariosPut = async (req, res) => {
    // ? Con esto saco el ID de la ruta (...ruta/usuarios/ID)
    const { id } = req.params

    // ? Con esto separo e identifico los elementos que quiero del cuerpo de la petición
    const { _id, contrasena, correo, google, ...resto } = req.body

    // TODO Validar contra BD
    if (contrasena) {
        // ? Encriptado de la contraseña
        const modoEncriptado = encriptador.genSaltSync()
        resto.contrasena = encriptador.hashSync(contrasena, modoEncriptado)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario,
        resto
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