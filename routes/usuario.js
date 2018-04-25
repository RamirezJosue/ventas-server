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
// Actualizar usuario
// ==========================================

app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.tipoDocumento = body.tipoDocumento;
        usuario.numDocumento = body.numDocumento;
        usuario.direccion = body.direccion;
        usuario.telefono = body.telefono;
        usuario.email = body.email;
        usuario.login = body.login;
        usuario.role = body.role;



        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.clave = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

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

// ==========================================
// Borrar un usuario por el id
// ==========================================

app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;