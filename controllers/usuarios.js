const { request, response } = require("express")

const usuariosGet = (req = request, res = response) => {
    const { id, nombre = 'Sin nombre', apikey = 'sin api key', limite } = req.query
    res.json({
        mensaje: 'Se hizo un GET - desde el controlador',
        id,
        nombre,
        apikey,
        limite
    })
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body

    res.json({
        mensaje: 'Se hizo un POST - desde el controlador',
        nombre,
        edad
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