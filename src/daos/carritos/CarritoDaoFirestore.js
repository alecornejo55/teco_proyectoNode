const { ContainerFirestore } = require('../../containers/ContainerFirestore')
const { ProductDaoFirestore } = require('../productos/ProductoDaoFirestore');

class CarritoDaoFirestore extends ContainerFirestore {
    constructor() {
        super('carrito');
    }
    async addProduct(idCarrito, productos) {
        try {
            const producto = new ProductDaoFirestore();
            const carritoC = await this.getById(idCarrito);
            if(carritoC === null) {
                throw new Error('carrito no encontrado');
            }
    
            for (const p of productos) {
                const addProducto = await producto.getById(p.id);
                if(addProducto !== null) {
                    console.log("addProducto", addProducto);
                    carritoC.data.productos.push(addProducto);
                }
            }
            await this.updateById(idCarrito, carritoC.data);
        }
        catch(error) {
            return {error: error.message};
        }
    }
    async deleteProduct(idCarrito, idProd) {
        try {
            const carritoC = await this.getById(idCarrito);
            if(carritoC === null) {
                throw new Error('carrito no encontrado');
            }
            const productoC = carritoC.data.productos.filter(prod => prod.id != idProd);
            carritoC.data.productos = productoC;
            await this.updateById(idCarrito, carritoC.data);
        }
        catch(error) {
            return {error: error.message};
        }
    }
}

module.exports = { CarritoDaoFirestore };