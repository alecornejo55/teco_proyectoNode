const express = require('express');
const app = express();
const path = require('path');
const { PORT } = require('./config/globals');
global.ADMIN = true;
// MONGODB: mongo. FIRESTORE: firestore

const productosRouter = require('./src/routes/producto');
const carritoRouter = require('./src/routes/carrito');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

/** comodín */
app.use('*', function(req, res){
    const path = req.originalUrl;
    const metodo = req.method;
    res.status(401).json({
        error: -2,
        descripcion:`ruta ${path} método ${metodo} no implementada`
    });
});

// Conexión al puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));