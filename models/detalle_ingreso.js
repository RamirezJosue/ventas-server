var mongoose = require('mongoose');

var Shema = mongoose.Schema;

var detalleIngresoShema = new Shema({
    cantidad: { type: Number, required: [true, 'Cantidad es necesario'] },
    precioCompra: { type: Number, required: [true, 'Precio compra es necesario'] },
    precioVenta: { type: Number, required: [true, 'Precio venta es necesario'] },
    articulo: { type: Schema.Types.ObjectId, ref: 'Articulo', required: true },
    ingreso: { type: Schema.Types.ObjectId, ref: 'Ingreso', required: true }

});