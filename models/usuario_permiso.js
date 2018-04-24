var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Shema = mongoose.Schema;

var usuarioPermisoShema = new Shema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    permiso: { type: Schema.Types.ObjectId, ref: 'Permiso', required: true }
});