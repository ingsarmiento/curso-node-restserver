const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { isValidRole, emailExist, userExistById } = require('../helpers/db-validators');
const { validarCampos, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email proporcionado no es válido.').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(isValidRole),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(isValidRole),
    validarCampos
], usuariosPut);

router.patch('/:id', usuariosPatch);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userExistById),
    validarCampos
], usuariosDelete);

module.exports = router;