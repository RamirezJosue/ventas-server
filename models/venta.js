var mongoose = require('mongoose');

var Shema = mongoose.Schema;

var ventaShema = new Shema({
    tipoComprobante: { type: String, required: [true, 'Tipo de combrobante es necesario'] },
    serieComprobante: { type: String, required: [true, 'Serie de comprobante es necesario'] },
    numComprobante: { type: String, required: [true, 'Numero de comprobante es necesario'] },
    fechaHora: { type: Date, required: true, default: Date.now },
    impuesto: { type: Number, required: [true, 'Impuesto es necesario'] },
    totalVenta: { type: Number, required: [true, 'Total venta es necesario'] },
    estado: { type: String, required: [true, 'Estado es necesario'] },
    cliente: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});