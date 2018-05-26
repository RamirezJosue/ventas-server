// Requires 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var ventaRoutes = require('./routes/venta');
var personaRoutes = require('./routes/persona');
var categoriaRoutes = require('./routes/categoria');
var ingresoRoutes = require('./routes/ingreso');
var articuloRoutes = require('./routes/articulo');
var detalleVentaRoutes = require('./routes/detalleVenta');
var detalleIngresoRoutes = require('./routes/detalleIngreso');
var permisoRoutes = require('./routes/permiso');
var usuarioPermisoRoutes = require('./routes/usuarioPermiso');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/ventasDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')


});

// Server index config
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/venta', ventaRoutes);
app.use('/persona', personaRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/ingreso', ingresoRoutes);
app.use('/articulo', articuloRoutes);
app.use('/detalle_venta', detalleVentaRoutes);
app.use('/detalle_ingreso', detalleIngresoRoutes);
app.use('/permiso', permisoRoutes);
app.use('/usuario_permiso', usuarioPermisoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);




// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online')
})