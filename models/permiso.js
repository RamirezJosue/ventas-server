var mongoose = require('mongoose');

var Shema = mongoose.Schema;

var permisoShema = new Shema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
});


module.exports = mongoose.model('Permiso', permisoShema);