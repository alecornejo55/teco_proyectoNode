const express = require('express');
const {Router} = express; 
const router = Router();
const { Contenedor } = require('../classes/Classes.js');
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

router.get('/:id?', async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let productos = [];
        if(id == null) {
            productos = await producto.getAll();
        }
        else {
            productos = await producto.getById(id);
            if(productos === null) {
                throw new Error('producto no encontrado');
            }
        }
        res.send(productos);        
    } catch (error) {
        res.send({error: error.message})
    }
});

router.post("/",validarAdministrador, async (req, res) => {
    const idNuevoProducto = await producto.save(req.body);
    res.status(200).json({id: idNuevoProducto});
});
 
router.put("/:id", validarAdministrador, async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const resProducto = await producto.updateById(id, data);

    res.send("Producto actualizado: " + JSON.stringify(resProducto));
});

router.delete("/:id", validarAdministrador, async (req, res) => {
    const id = req.params.id;
    await producto.deleteById(id);
    res.send("Producto eliminado");
});

module.exports = router; 