var express = require('express');

var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');


var Persona = require('../models/persona');


// ==========================================
// Obtener todos los personas
// ==========================================

app.get('/', (req, res, next) => {

    Persona.find({})
        .exec(
            (err, personas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando persona',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    personas
                });

            });
});

// ==========================================
// Actualizar persona
// ==========================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Persona.findById(id, (err, persona) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar persona',
                errors: err
            });
        }

        if (!persona) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El persona con el id ' + id + ' no existe',
                errors: { message: 'No existe un persona con ese ID' }
            });
        }


        persona.tipoPersona = body.tipoPersona;
        persona.nombre = body.nombre;
        persona.tipoDocumento = body.tipoDocumento;
        persona.numDocumento = body.numDocumento;
        persona.direccion = body.direccion;
        persona.telefono = body.telefono;
        persona.email = body.email;



        persona.save((err, personaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar persona',
                    errors: err
                });
            }

            personaGuardado.clave = ':)';

            res.status(200).json({
                ok: true,
                persona: personaGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo persona
// ==========================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var persona = new Persona({
        tipoPersona: body.tipoPersona,
        nombre: body.nombre,
        tipoDocumento: body.tipoDocumento,
        numDocumento: body.numDocumento,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email,
    });

    persona.save((err, personaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear persona',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            persona: personaGuardado,
            personatoken: req.persona
        });
    })
});

// ==========================================
// Borrar un persona por el id
// ==========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Persona.findByIdAndRemove(id, (err, personaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar persona',
                errors: err
            });
        }

        if (!personaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un persona con ese id',
                errors: { message: 'No existe un persona con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            persona: personaBorrado
        });

    });

});

module.exports = app;