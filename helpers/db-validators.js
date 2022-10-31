const { response } = require('express');
const Role = require('../models/role');
const Usuario = require('../models/usuario')
const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({ role })
    if (!roleExist) {
        throw new Error('El role proporcionado no existe');
    }
}

const emailExist = async (email = '') => {
    const user = await Usuario.findOne({ email });
    if (user) {
        throw new Error('El email ya existe en la base de datos');
    }
}

const userExistById = async (id) => {
    const user = await Usuario.findById(id);
    if (!user) {
        throw new Error(`El id: ${id} no existe en la base de datos`);
    }
}

module.exports = {
    isValidRole,
    emailExist,
    userExistById
}