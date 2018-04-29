var express = require('express');

var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');


var UsuarioPermiso = require('../models/UsuarioPermiso');


// ==========================================
// Obtener todos los usuarioPermiso
// ==========================================

app.get('/', (req, res, next) => {

    UsuarioPermiso.find({})
        .populate('usuario', 'nombre')
        .populate('permiso')
        .exec(
            (err, usuarioPermisos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarioPermiso',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarioPermisos
                });

            });
});

// ==========================================
// Actualizar usurioPermiso
// ==========================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    UsuarioPermiso.findById(id, (err, usuarioPermiso) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarioPermiso',
                errors: err
            });
        }

        if (!usuarioPermiso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuarioPermiso con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuarioPermiso con ese ID' }
            });
        }


        usuarioPermiso.usuario = body.usuario;
        usuarioPermiso.permiso = body.permiso;


        usuarioPermiso.save((err, usuarioPermisoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuarioPermiso',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                usuarioPermiso: usuarioPermisoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo usuarioPermisos
// ==========================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var usuarioPermiso = new UsuarioPermiso({
        usuario: body.usuario,
        permiso: body.permiso
    });

    usuarioPermiso.save((err, usuarioPermisoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarioPermiso',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuarioPermiso: usuarioPermisoGuardado
        });
    })
});

// ==========================================
// Borrar un usuarioPermiso por el id
// ==========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    UsuarioPermiso.findByIdAndRemove(id, (err, usuarioPermisoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuarioPermiso',
                errors: err
            });
        }

        if (!usuarioPermisoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuarioPermiso con ese id',
                errors: { message: 'No existe un usuarioPermiso con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuarioPermiso: usuarioPermisoBorrado
        });

    });

});


module.exports = app;