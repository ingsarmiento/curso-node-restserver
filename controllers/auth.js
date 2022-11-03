const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const generateJWT = require("../helpers/generar-jws");

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son corectos - Email'
            });
        }

        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son corectos - Status'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son corectos - Password'
            });
        }

        const token = await generateJWT(usuario.id);

        res.json({
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacte con el administrador.'
        });
    }

}

module.exports = login;