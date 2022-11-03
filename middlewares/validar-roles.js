const { response } = require("express");



const isAdminRole = (req, res = response, next) => {
    const usuario = req.usuarioAutenticado;

    if (!usuario) {
        return res.status(500).json({ msg: 'Se esta intentando validar el rol antes de validar el token' });
    }

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: 'Este usuario no es administrador' });
    }

    next();
}

const hasRole = (...roles) => {

    return (req, res = response, next) => {
        const usuario = req.usuarioAutenticado;
        if (!usuario) {
            return res.status(500).json({ msg: 'Se esta intentando validar el rol antes de validar el token' });
        }

        if (!roles.includes(usuario.role)) {
            return res.status(401).json({ msg: `Esta accion solo esta permitida para usuarios con uno de estos roles: ${roles}` });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}