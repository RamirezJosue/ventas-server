var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');


var Venta = require('../models/venta');


// ==========================================
// Obtener todos los ventas
// ==========================================

app.get('/', (req, res, next) => {

    Venta.find({}, 'nombre tipoDocumento numDocumento direccion telefono email login img condicion role')
        .exec(
            (err, ventas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando venta',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    ventas
                });

            });
});

// ==========================================
// Actualizar venta
// ==========================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Venta.findById(id, (err, venta) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar venta',
                errors: err
            });
        }

        if (!venta) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El venta con el id ' + id + ' no existe',
                errors: { message: 'No existe un venta con ese ID' }
            });
        }


        venta.tipoComprobante = body.tipoComprobante;
        venta.serieComprobante = body.serieComprobante;
        venta.numComprobante = body.numComprobante;
        venta.fechaHora = body.fechaHora;
        venta.impuesto = body.impuesto;
        venta.totalVenta = body.totalVenta;
        venta.estado = body.estado;
        venta.cliente = req.cliente._id;
        venta.usuario = req.usuario._id;



        venta.save((err, ventaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar venta',
                    errors: err
                });
            }

            ventaGuardado.clave = ':)';

            res.status(200).json({
                ok: true,
                venta: ventaGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo venta
// ==========================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var venta = new Venta({
        tipoComprobante: body.tipoComprobante,
        serieComprobante: body.serieComprobante,
        numComprobante: body.numComprobante,
        fechaHora: body.fechaHora,
        impuesto: body.impuesto,
        totalVenta: body.totalVenta,
        estado: body.estado,
        cliente: req.cleinte._id,
        usuario: req.usuario._id
    });

    venta.save((err, ventaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear venta',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            venta: ventaGuardado,
            ventatoken: req.venta
        });
    })
});

// ==========================================
// Borrar un venta por el id
// ==========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Venta.findByIdAndRemove(id, (err, ventaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar venta',
                errors: err
            });
        }

        if (!ventaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un venta con ese id',
                errors: { message: 'No existe un venta con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            venta: ventaBorrado
        });

    });

});

module.exports = app;