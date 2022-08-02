const { DaoCart } = require('../containers/index.js');
const cart = new DaoCart();

const createCart = async (req, res) => {
    const idCart = await cart.save(req.body);
    res.status(200).json({id: idCart});
}
const deleteCart = async (req, res) => {
    const id = req.params.id;
    await cart.deleteById(id);
    res.send("Carrito eliminado");
}

const getCart = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let products = [];
        if(id == null) {
            products = await cart.getAll();
        }
        else {
            products = await cart.getById(id);
            // console.log(products);
            if(products === null) {
                throw new Error('carrito no encontrado');
            }
        }
        res.send(products);
    } catch (error) {
        res.send({error: error.message})
    }
}

const getProductsCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cartFound = await cart.getById(id);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }
        res.send(cartFound.products ?? cartFound.data.products);        
    } catch (error) {
        res.status(200).json({error: error.message})
    }
}

const addProductCart = async (req, res) => {
    const idCart = req.params.id;
    const products = req.body;
    try {
        const cartFound = await cart.getById(idCart);
        // console.log("Init",cartFound);

        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }
        await cart.addProduct(idCart, products);

        res.send({message: "Productos agregados"});

    } catch (error) {
        res.send({error: error.message})
    }
}

const deleteProductCart = async (req, res) => {
    const idCart = req.params.id;
    const idProd = req.params.idProd;
    try {
        const cartFound = await cart.getById(idCart);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }

        await cart.deleteProduct(idCart, idProd);

        res.send({message: "Producto actualizado"});
    } catch (error) {
        res.send({error: error.message})
    }
}

module.exports = {
    createCart, deleteCart, getCart, getProductsCart, addProductCart,
    deleteProductCart
}