var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var DetalleIngreso = require('../models/detalleIngreso');

// ==========================================
// Obtener todo DetalleIngreso
// ==========================================
app.get('/', (req, res, next) => {

    DetalleIngreso.find({})
        .populate('articulo')
        .populate('ingreso')
        .exec(
            (err, detalleIngresos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando persona',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    detalleIngresos
                });

            });
});


// ==========================================
// Actualizar detalleIngreso
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    DetalleIngreso.findById(id, (err, detalleIngreso) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar detalleIngreso',
                errors: err
            });
        }

        if (!detalleIngreso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El detalleIngreso con el id ' + id + ' no existe',
                errors: { message: 'No existe un detalleIngreso con ese ID' }
            });
        }


        detalleIngreso.cantidad = body.cantidad;
        detalleIngreso.precioVenta = body.precioVenta;
        detalleIngreso.descuento = body.descuento;
        detalleIngreso.articulo = body.articulo;
        detalleIngreso.ingreso = body.ingreso;

        detalleIngreso.save((err, detalleIngresoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar detalleIngreso',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                detalleIngreso: detalleIngresoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo detalleIngreso
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var detalleIngreso = new DetalleIngreso({
        cantidad: body.cantidad,
        precioVenta: body.precioVenta,
        descuento: body.descuento,
        articulo: body.articulo,
        ingreso: body.ingreso
    });

    detalleIngreso.save((err, detalleIngresoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear detalleIngreso',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            detalleIngreso: detalleIngresoGuardado,
        });


    });

});


// ============================================
//   Borrar detalleIngreso por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    DetalleIngreso.findByIdAndRemove(id, (err, detalleIngresoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar detalleIngreso',
                errors: err
            });
        }

        if (!detalleIngresoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un detalleIngreso con ese id',
                errors: { message: 'No existe un detalleIngreso con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            detalleIngreso: detalleIngresoBorrado
        });

    });

});


module.exports = app;