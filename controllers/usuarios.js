const { request, response } = require("express")
const encriptador = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async (req = request, res = response) => {

    const { desde = 0, limite = 5 } = req.query
    const consulta = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(consulta),
        Usuario.find(consulta)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
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

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        mensaje: 'Se hizo un PATCH - desde el controlador'
    })
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params

    // * Esto es si quisiera borrarlo "fisicamente"
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}