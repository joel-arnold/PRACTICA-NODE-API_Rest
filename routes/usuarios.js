// * IMPORTACIONES NECESARIAS
const { Router } = require('express')
const { check } = require('express-validator')

const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/validadores-db')
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
    check('correo', 'El correo ya está en uso').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)
router.put('/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)

// * EXPORTO EL ROUTER
module.exports = router