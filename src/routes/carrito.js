const express = require('express');
const {Router} = express; 
const router = Router();
const { CarritoDao } = require('../containers/index.js');

const carrito = new CarritoDao();

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
router.get('/:id?', async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let productos = [];
        if(id == null) {
            productos = await carrito.getAll();
        }
        else {
            productos = await carrito.getById(id);
            // console.log(productos);
            if(productos === null) {
                throw new Error('carrito no encontrado');
            }
        }
        res.send(productos);        
    } catch (error) {
        res.send({error: error.message})
    }
});

router.get('/:id/productos', async (req, res) => {
    try {
        const id = req.params.id;
        const carritoC = await carrito.getById(id);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        res.send(carritoC.productos ?? carritoC.data.productos);        
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
        // console.log("Init",carritoC);

        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        await carrito.addProduct(idCarrito, productos);

        res.send({message: "Productos agregados"});

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

        await carrito.deleteProduct(idCarrito, idProd);

        res.send({message: "Producto actualizado"});
    } catch (error) {
        res.send({error: error.message})
    }
});



module.exports = router; 