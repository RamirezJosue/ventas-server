var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();
var Usuario = require('../models/usuario');

//===================================================================
// Autenticacion normal
//===================================================================

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ login: body.login }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - login',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.clave, usuarioDB.clave)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - clave',
                errors: err
            });
        }

        // Crear un token!!!


        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id
        });

    })


});





module.exports = app;