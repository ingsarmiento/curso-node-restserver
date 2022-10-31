
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: (true, 'El name es obligatorio'),
        unique: false
    },
    email: {
        type: String,
        required: (true, 'El email es obligatorio'),
        unique: true
    },
    password: {
        type: String,
        required: (true, 'El password es obligatorio'),
        unique: false
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: (true, 'El role es obligatorio'),
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}
module.exports = model('User', UsuarioSchema);