var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Shema = mongoose.Schema;

var permisoShema = new Shema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
});