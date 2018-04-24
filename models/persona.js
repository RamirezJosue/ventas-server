var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Shema = mongoose.Schema;

var personaShema = new Shema({
    tipoPersona: { type: String, required: [true, 'El tipo de persona es necesario'] },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    tipoDocumento: { type: String, required: false },
    numDocumento: { type: String, required: false },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false },
    email: { type: String, unique: true, required: false }

});