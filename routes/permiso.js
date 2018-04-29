var express = require('express');

var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');


var Permiso = require('../models/permiso');


// ==========================================
// Obtener todos los permiso
// ==========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Permiso.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, permisos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando permiso',
                        errors: err
                    });
                }

                Permiso.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        permisos,
                        total: conteo
                    });
                })

            });
});

// ==========================================
// Actualizar permiso
// ==========================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Permiso.findById(id, (err, permiso) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar permiso',
                errors: err
            });
        }

        if (!permiso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El permiso con el id ' + id + ' no existe',
                errors: { message: 'No existe un permiso con ese ID' }
            });
        }


        permiso.nombre = body.nombre;


        permiso.save((err, permisoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar permiso',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                permiso: permisoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo permiso
// ==========================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var permiso = new Permiso({
        nombre: body.nombre,
    });

    permiso.save((err, permisoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear permiso',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            permiso: permisoGuardado,
            permisotoken: req.permiso
        });
    })
});

// ==========================================
// Borrar un permiso por el id
// ==========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Permiso.findByIdAndRemove(id, (err, permisoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar permiso',
                errors: err
            });
        }

        if (!permisoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un permiso con ese id',
                errors: { message: 'No existe un permiso con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            permiso: permisoBorrado
        });

    });

});

module.exports = app;