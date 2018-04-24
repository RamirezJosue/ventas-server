var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Shema = mongoose.Schema;

var usuarioShema = new Shema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    tipoDocumento: { type: String, required: [true, 'El tipo de documento es necesario'] },
    numDocumento: { type: String, required: [true, 'Numero de documento es necesario'] },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false },
    email: { type: String, required: false },
    cargo: { type: String, required: false },
    login: { type: String, unique: true, required: [true, 'El usuario es necesario'] },
    clave: { type: String, required: [true, 'La contraseña es necesario'] },
    condicion: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});