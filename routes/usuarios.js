// * IMPORTACIONES NECESARIAS
const { Router } = require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

// * VARIABLES
const router = Router()

// * RUTAS
router.get('/', usuariosGet)
router.post('/', usuariosPost)
router.put('/:id', usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)

// * EXPORTO EL ROUTER
module.exports = router