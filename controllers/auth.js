const { response, json } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const generateJWT = require("../helpers/generar-jws");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            const data = {
                name,
                email,
                password: 'PWD',
                img,
                google: true, 
                role: 'USER_ROLE'
            }

            usuario = new Usuario(data);

            await usuario.save();
        }

        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Pongase en contacto con el administrador, Usuario Bloqueado!'
            });
        }
        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se ha podido verificar'
        });
    }

}

module.exports = {
    login,
    googleSignIn
};