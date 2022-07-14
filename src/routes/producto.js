const express = require('express');
const {Router} = express; 
const router = Router();
const { DaoProduct } = require('../containers/index.js');

const ProductDao = new DaoProduct()

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
            productos = await ProductDao.getAll();
        }
        else {
            productos = await ProductDao.getById(id);
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
    const idNuevoProducto = await ProductDao.save(req.body);
    res.status(200).json({id: idNuevoProducto});
});
 
router.put("/:id", validarAdministrador, async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const resProducto = await ProductDao.updateById(id, data);

    res.send("Producto actualizado: " + JSON.stringify(resProducto));
});

router.delete("/:id", validarAdministrador, async (req, res) => {
    const id = req.params.id;
    await ProductDao.deleteById(id);
    res.send("Producto eliminado");
});

module.exports = router; 