// * IMPORTACIONES NECESARIAS
const { Router } = require('express')
const { check } = require('express-validator')
const Rol = require('../models/rol')

const { validarCampos } = require('../middlewares/validar-campos')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

// * VARIABLES
const router = Router()

// * RUTAS
router.get('/', usuariosGet)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'Contraseña de mínimo 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ROL_ADMIN', 'ROL_USUARIO']),
    check('rol').custom(async (rol = '') => {
        const existeRol = await Rol.findOne({ rol })
        if (!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la base de datos.`)
        }
    }),
    validarCampos
], usuariosPost)
router.put('/:id', usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)

// * EXPORTO EL ROUTER
module.exports = router