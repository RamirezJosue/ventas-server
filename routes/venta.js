var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Venta = require('../models/venta');

// ==========================================
// Obtener todos los Medicos
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Venta.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec(
            (err, ventas) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando venta',
                        errors: err
                    });
                }

                Venta.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        ventas: ventas,
                        total: conteo
                    });
                })





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
        // venta.fechaHora = body.fechaHora;
        venta.impuesto = body.impuesto;
        venta.totalVenta = body.totalVenta;
        venta.estado = body.estado;
        venta.usuario = req.usuario._id;
        venta.persona = body.persona;


        venta.save((err, medicoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar venta',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                venta: medicoGuardado
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
        usuario: req.usuario._id,
        persona: body.persona
    });

    venta.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear venta',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            venta: medicoGuardado,
        });


    });

});


// ============================================
//   Borrar venta por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Venta.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar venta',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un venta con ese id',
                errors: { message: 'No existe un venta con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            venta: medicoBorrado
        });

    });

});


module.exports = app;