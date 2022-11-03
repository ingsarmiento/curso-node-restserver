const { response } = require('express');
const bcriptJs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const [usuarios, total] = await Promise.all([
        Usuario.find({ status: true })
            .skip(Number(from))
            .limit(Number(limit)),
        Usuario.countDocuments()
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    //Encriptar Contraseña
    const salt = bcriptJs.genSaltSync();
    usuario.password = bcriptJs.hashSync(password, salt);
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcriptJs.genSaltSync();
        rest.password = bcriptJs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controller'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { status: false });
    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}