var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Shema = mongoose.Schema;

var categoriaShema = new Shema({
    nombre: { type: String, required: [true, 'Nombre es obligatorio'] },
    descripcion: { type: String, required: false },
    condicion: { type: Boolean, required: true, default: false },
});