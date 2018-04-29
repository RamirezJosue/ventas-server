var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Ingreso = require('../models/ingreso');

// ==========================================
// Obtener todos los ingresos
// ==========================================
app.get('/', (req, res, next) => {

    Ingreso.find({})
        .populate('venta')
        .populate('articulo')
        .exec(
            (err, ingresos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando persona',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    ingresos
                });

            });
});

// ==========================================
// Actualizar ingreso
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Ingreso.findById(id, (err, ingreso) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar ingreso',
                errors: err
            });
        }

        if (!ingreso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El ingreso con el id ' + id + ' no existe',
                errors: { message: 'No existe un ingreso con ese ID' }
            });
        }


        ingreso.cantidad = body.cantidad;
        ingreso.precioVenta = body.precioVenta;
        ingreso.descuento = body.descuento;
        ingreso.ingreso = body.ingreso;
        ingreso.venta = body.venta;
        ingreso.articulo = body.articulo;


        ingreso.save((err, ingresoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar ingreso',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                ingreso: ingresoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo ingreso
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var ingreso = new Ingreso({
        cantidad: body.cantidad,
        precioVenta: body.precioVenta,
        descuento: body.descuento,
        ingreso: body.ingreso,
        venta: body.venta,
        articulo: body.articulo
    });

    ingreso.save((err, ingresoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear ingreso',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            ingreso: ingresoGuardado,
        });


    });

});


// ============================================
//   Borrar ingreso por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Ingreso.findByIdAndRemove(id, (err, ingresoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar ingreso',
                errors: err
            });
        }

        if (!ingresoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un ingreso con ese id',
                errors: { message: 'No existe un ingreso con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            ingreso: ingresoBorrado
        });

    });

});


module.exports = app;