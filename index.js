const express = require('express');
const app = express();
const path = require('path');
const { PORT } = require('./src/config/globals');
global.ADMIN = true;

const { productRouterApi, cartRouterApi } = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRouterApi);
app.use('/api/cart', cartRouterApi);

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