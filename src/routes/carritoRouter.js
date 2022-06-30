const express = require('express');
const {Router} = express; 
const router = Router();
const { Contenedor } = require('../classes/Classes.js');
const carrito = new Contenedor('./src/files/carrito.json');
const producto = new Contenedor('./src/files/productos.json');
const validarAdministrador = (req, res, next) => {
    const path = req.originalUrl;
    const metodo = req.method;
    if (ADMIN !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }
    next();
}
// Crea un carrito y devuelve su id
router.post("/",validarAdministrador, async (req, res) => {
    const idNuevoCarrito = await carrito.save(req.body);
    res.status(200).json({id: idNuevoCarrito});
});

// Vacía un carrito y lo elimina
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await carrito.deleteById(id);
    res.send("Carrito eliminado");
});
 
// Permite listar todos los productos guardados en el carrito
router.get('/:id/productos', async (req, res) => {
    try {
        const id = req.params.id;
        const carritoC = await carrito.getById(id);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        res.send(carritoC.productos);        
    } catch (error) {
        res.status(200).json({error: error.message})
    }
});

// Permite incorporar productos al carrito por su id de producto
router.post('/:id/productos', async (req, res) => {
    const idCarrito = req.params.id;
    const productos = req.body;
    try {
        const carritoC = await carrito.getById(idCarrito);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        productos.map(async prod => {
            const addProducto = await producto.getById(prod.id);
            if(addProducto !== null) {
                carritoC.productos.push(addProducto);
            }
        });
        await carrito.updateById(idCarrito, carritoC);
        // console.log(productos);
        res.send("OK");
    } catch (error) {
        res.send({error: error.message})
    }
});

// Permite incorporar productos al carrito por su id de producto
router.delete('/:id/productos/:idProd', async (req, res) => {
    const idCarrito = req.params.id;
    const idProd = req.params.idProd;
    try {
        const carritoC = await carrito.getById(idCarrito);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        // console.log('id', idProd);
        const productoC = carritoC.productos.filter(prod => prod.id != idProd);
        // console.log('Productos', productoC);
        carritoC.productos = productoC;
        await carrito.updateById(idCarrito, carritoC);
        res.send("OK");
    } catch (error) {
        res.send({error: error.message})
    }
});



module.exports = router; 