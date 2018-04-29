var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var DetalleVenta = require('../models/detalleVenta');

// ==========================================
// Obtener todo DetalleVenta
// ==========================================
app.get('/', (req, res, next) => {

    DetalleVenta.find({})
        .populate('venta')
        .populate('articulo')
        .exec(
            (err, detalleVentas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Detalle venta',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    detalleVentas
                });

            });
});


// ==========================================
// Actualizar detalleVenta
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    DetalleVenta.findById(id, (err, detalleVenta) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar detalleVenta',
                errors: err
            });
        }

        if (!detalleVenta) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El detalleVenta con el id ' + id + ' no existe',
                errors: { message: 'No existe un detalleVenta con ese ID' }
            });
        }


        detalleVenta.cantidad = body.cantidad;
        detalleVenta.precioVenta = body.precioVenta;
        detalleVenta.descuento = body.descuento;
        detalleVenta.venta = body.venta;
        detalleVenta.articulo = body.articulo;

        detalleVenta.save((err, detalleVentaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar detalleVenta',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                detalleVenta: detalleVentaGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo detalleVenta
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var detalleVenta = new DetalleVenta({
        cantidad: body.cantidad,
        precioVenta: body.precioVenta,
        descuento: body.descuento,
        venta: body.venta,
        articulo: body.articulo
    });

    detalleVenta.save((err, detalleVentaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear detalleVenta',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            detalleVenta: detalleVentaGuardado,
        });


    });

});


// ============================================
//   Borrar detalleVenta por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    DetalleVenta.findByIdAndRemove(id, (err, detalleVentaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar detalleVenta',
                errors: err
            });
        }

        if (!detalleVentaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un detalleVenta con ese id',
                errors: { message: 'No existe un detalleVenta con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            detalleVenta: detalleVentaBorrado
        });

    });

});


module.exports = app;