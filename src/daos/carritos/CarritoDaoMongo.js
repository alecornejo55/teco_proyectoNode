const {ContainerMongo} = require('../../containers/containerMongo');
const { ProductDaoMongo } = require('../productos/ProductoDaoMongo');

const carrito = require('../../models/carrito');

class CarritoDaoMongo extends ContainerMongo {
    constructor(){
        super(carrito);
    }
    async addProduct(idCarrito, productos) {
        try {
            const producto = new ProductDaoMongo();
            const carritoC = await this.getById(idCarrito);
            if(carritoC === null) {
                throw new Error('carrito no encontrado');
            }
    
            for (const p of productos) {
                const addProducto = await producto.getById(p.id);
                if(addProducto !== null) {
                    carritoC.productos.push(addProducto);
                }
            }
            await this.updateById(idCarrito, carritoC);
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
            const productoC = carritoC.productos.filter(prod => prod._id != idProd);
            carritoC.productos = productoC;
            await this.updateById(idCarrito, carritoC);
        }
        catch(error) {
            return {error: error.message};
        }
    }
}

module.exports = {CarritoDaoMongo};