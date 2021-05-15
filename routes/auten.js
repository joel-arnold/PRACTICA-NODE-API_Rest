const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')

const { iniciarSesion } = require('../controllers/auth')

const router = Router()

router.post('/iniciarSesion', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasena', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos
], iniciarSesion)


module.exports = router