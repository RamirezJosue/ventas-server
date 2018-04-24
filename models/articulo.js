var mongoose = require('mongoose');

var Shema = mongoose.Schema;

var articuloShema = new Shema({
    codigo: { type: String, required: false },
    nombre: { type: String, required: false },
    stock: { type: Number, required: [true, 'El stock es necesario'] },
    descripcion: { type: String, required: [true, 'Descripcion es necesario'] },
    image: { type: String, required: false },
    condicion: { type: Boolean, required: true, default: false },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
});