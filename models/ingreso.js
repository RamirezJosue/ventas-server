var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Shema = mongoose.Schema;

var ingresoShema = new Shema({
    tipoComprobante: { type: String, required: [true, 'El comprobante es necesario'] },
    serieComprobante: { type: String, required: false },
    numComprobante: { type: String, required: [true, 'Numero de comprobante es necesario'] },
    fechaHora: { type: Date, required: true, default: Date.now },
    impuesto: { type: Number, required: [true, 'El impuesto es necesario'] },
    totalCompra: { type: Number, required: [true, 'Total de compra es necesario'] },
    estado: { type: String, required: [true, 'Estado es necesario'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    proveedor: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
});