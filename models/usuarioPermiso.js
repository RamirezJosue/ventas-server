var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usuarioPermisoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    permiso: { type: Schema.Types.ObjectId, ref: 'Permiso', required: true }
});
module.exports = mongoose.model('usuarioPermiso', usuarioPermisoSchema);