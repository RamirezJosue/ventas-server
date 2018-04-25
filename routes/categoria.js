var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Categoria = require('../models/categoria');

// ==========================================
// Obtener todo Categoria
// ==========================================
app.get('/', (req, res, next) => {

    Categoria.find({})
        .exec(
            (err, categorias) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando persona',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    categorias
                });

            });
});


// ==========================================
// Actualizar categoria
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Categoria.findById(id, (err, categoria) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar categoria',
                errors: err
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El categoria con el id ' + id + ' no existe',
                errors: { message: 'No existe un categoria con ese ID' }
            });
        }


        categoria.nombre = body.nombre;
        categoria.descripcion = body.descripcion;

        categoria.save((err, categoriaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar categoria',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                categoria: categoriaGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo categoria
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion
    });

    categoria.save((err, categoriaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear categoria',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            categoria: categoriaGuardado,
        });


    });

});


// ============================================
//   Borrar categoria por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar categoria',
                errors: err
            });
        }

        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un categoria con ese id',
                errors: { message: 'No existe un categoria con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaBorrado
        });

    });

});


module.exports = app;