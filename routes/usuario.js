var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {

    Usuario.find({}, (err, usuarios) => {
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

module.exports = app;