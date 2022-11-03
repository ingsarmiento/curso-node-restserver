const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "debe enviar un token"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({ msg: 'El usuario no existe' });
        }

        if (!usuario.status) {
            return res.status(401).json({ msg: 'El usuario no activo' });
        }

        req.usuarioAutenticado = usuario;

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no válido' });

    }
    next();
}

module.exports = {
    validateJWT
}