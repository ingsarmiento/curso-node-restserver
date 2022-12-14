const { Router } = require('express');
const { check } = require('express-validator');
const {login, googleSignIn} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'El email es Obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token de google es Obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;