
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();


// * RESPECTO A PRIVILEGIOS NO PIDE NADA
router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

// * RESPECTO A PRIVILEGIOS NO PIDE TOKEN, SOLO ROL VÁLIDO
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // ! ACÁ EL ROL SE VALIDA BUSCANDOLO EN LA BASE DE DATOS
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

// * RESPECTO A PRIVILEGIOS PIDE TOKEN Y ROL VÁLIDO
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    // ! ACÁ EL ROL SE VALIDA DE FORMA "JARCODEADA"
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;