var express = require('express');

var app = express();

var Venta = require('../models/venta');
var Usuario = require('../models/usuario');
var Persona = require('../models/persona');
var Ingreso = require('../models/ingreso');
var DetalleVenta = require('../models/detalleVenta');
var DetalleIngreso = require('../models/detalleIngreso');
var Categoria = require('../models/categoria');
var Articulo = require('../models/articulo');

//===================================
// Busqueda general
//===================================

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarVentas(busqueda, regex),
            buscarUsuarios(busqueda, regex),
            buscarPersonas(busqueda, regex),
            buscarCategorias(busqueda, regex),
            buscarArticulos(busqueda, regex)
        ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                ventas: respuestas[0],
                usuarios: respuestas[1],
                personas: respuestas[2],
                categorias: respuestas[3],
                articulos: respuestas[4]

            });
        });

});

function buscarVentas(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Venta.find({ 'tipoComprobante': regex })
            .populate('usuario', 'nombre')
            .exec((err, ventas) => {
                if (err) {
                    reject('Error al cargar ventas', err);
                } else {
                    resolve(ventas)
                }
            });
    });

}



function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre direccion role')
            .or([{ 'nombre': regex }, { 'direccion': regex }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            });
    });

}

function buscarPersonas(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Persona.find({}, 'nombre email')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, personas) => {
                if (err) {
                    reject('Error al cargar personas', err);
                } else {
                    resolve(personas);
                }
            });
    });

}

function buscarCategorias(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Categoria.find({ 'nombre': regex }, (err, categorias) => {
            if (err) {
                reject('Error al cargar categorias', err);
            } else {
                resolve(categorias)
            }
        });
    });

}

function buscarArticulos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Articulo.find({}, 'nombre codigo')
            .or([{ 'nombre': regex }, { 'codigo': regex }])
            .exec((err, articulos) => {
                if (err) {
                    reject('Error al cargar articulos', err);
                } else {
                    resolve(articulos);
                }
            });
    });

}



module.exports = app;