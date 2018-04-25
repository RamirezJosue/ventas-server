var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Articulo = require('../models/articulo');

// ==========================================
// Obtener todos los articulos
// ==========================================
app.get('/', (req, res, next) => {

    Articulo.find({})
        .exec(
            (err, articulos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando persona',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    articulos
                });

            });
});

// ==========================================
// Actualizar articulo
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Articulo.findById(id, (err, articulo) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar articulo',
                errors: err
            });
        }

        if (!articulo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El articulo con el id ' + id + ' no existe',
                errors: { message: 'No existe un articulo con ese ID' }
            });
        }


        articulo.codigo = body.codigo;
        articulo.nombre = body.nombre;
        articulo.stock = body.stock;
        articulo.descripcion = body.descripcion;
        articulo.categoria = body.categoria;


        articulo.save((err, articuloGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar articulo',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                articulo: articuloGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo articulo
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var articulo = new Articulo({
        codigo: body.codigo,
        nombre: body.nombre,
        stock: body.stock,
        descripcion: body.descripcion,
        condicion: body.condicion,
        categoria: body.categoria
    });

    articulo.save((err, articuloGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear articulo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            articulo: articuloGuardado,
        });


    });

});


// ============================================
//   Borrar articulo por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Articulo.findByIdAndRemove(id, (err, articuloBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar articulo',
                errors: err
            });
        }

        if (!articuloBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un articulo con ese id',
                errors: { message: 'No existe un articulo con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            articulo: articuloBorrado
        });

    });

});


module.exports = app;