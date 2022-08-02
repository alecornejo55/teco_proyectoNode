const express = require('express');
const {Router} = express; 
const router = Router();

const { 
    createCart, deleteCart, getCart, getProductsCart, addProductCart,
    deleteProductCart
} = require('../../controllers/cart.js');

const { checkAdmin } = require('../../middlewares/auth.js');

// Crea un carrito y devuelve su id
router.post("/",checkAdmin, createCart);

// Vacía un carrito y lo elimina
router.delete("/:id", deleteCart);

// Permite listar todos los carritos o un carrito en particular
router.get('/:id?', getCart);

// Permite listar todos los productos guardados en el carrito
router.get('/:id/products', getProductsCart);

// Permite incorporar productos al carrito por su id de producto
router.post('/:id/products', addProductCart);

// Elimina productos del carrito por su id de producto
router.delete('/:id/products/:idProd', deleteProductCart);

module.exports = router; 