const { Container } = require('../../containers/Container');
const { DaoProduct } = require('../products/DaoProduct');

const cart = require('../../models/cart');

class DaoCart extends Container {
    constructor(){
        super(cart);
    }
    async addProduct(idCart, products) {
        try {
            const product = new DaoProduct();
            const cartFound = await this.getById(idCart);
            if(cartFound === null) {
                throw new Error('carrito no encontrado');
            }
            for (const p of products) {
                const addProduct = await product.getById(p.id);
                if(addProduct !== null) {
                    cartFound.products.push(addProduct);
                }
            }
            await this.updateById(idCart, cartFound);
        }
        catch(error) {
            return {error: error.message};
        }
    }
    async deleteProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart);
            if(cartFound === null) {
                throw new Error('carrito no encontrado');
            }
            const productFound = cartFound.products.filter(prod => prod._id != idProd);
            cartFound.products = productFound;
            await this.updateById(idCart, cartFound);
        }
        catch(error) {
            return {error: error.message};
        }
    }
}

module.exports = {DaoCart};