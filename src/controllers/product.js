const { DaoProduct } = require('../containers/index.js');
const product = new DaoProduct()

const getProduct = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let products = [];
        if(id == null) {
            products = await product.getAll();
        }
        else {
            products = await product.getById(id);
            if(products === null) {
                throw new Error('producto no encontrado');
            }
        }
        res.send(products);        
    } catch (error) {
        res.send({error: error.message})
    }
}

const saveProduct = async (req, res) => {
    const idProduct = await product.save(req.body);
    res.status(200).json({id: idProduct});
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const resProduct = await product.updateById(id, data);

    res.send("Producto actualizado: " + JSON.stringify(resProduct));
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    await product.deleteById(id);
    res.send("Producto eliminado");
}

module.exports = { getProduct, saveProduct, updateProduct, deleteProduct }