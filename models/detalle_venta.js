var mongoose = require('mongoose');

var Shema = mongoose.Schema;

var detalleVentaShema = new Shema({
    cantidad: { type: Number, required: [true, 'Cantidad es necesario'] },
    precioVenta: { type: Number, required: [true, 'Precio venta es necesario'] },
    descuento: { type: Number, required: [true, 'Descuento es necesario es necesario'] },
    articulo: { type: Schema.Types.ObjectId, ref: 'Articulo', required: true },
    venta: { type: Schema.Types.ObjectId, ref: 'Venta', required: true },
});

module.exports = mongoose.model('DetalleVenta', detalleVentaShema);