var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();


var Usuario = require('../models/usuario');


// ==========================================
// Obtener todos los usuarios
// ==========================================

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre tipoDocumento numDocumento direccion telefono email login img condicion role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios
                });

            });
});


// ==========================================
// Crear un nuevo usuario
// ==========================================

app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        tipoDocumento: body.tipoDocumento,
        numDocumento: body.numDocumento,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email,
        login: body.login,
        clave: bcrypt.hashSync(body.clave, 10),
        img: body.img,
        condicion: body.condicion,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioGuardado
        });
    })
});

module.exports = app;