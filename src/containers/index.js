const { MOTOR } = require('../config/globals')
if(MOTOR === 'mongo') {
    // console.log(MOTOR);
    const { ProductDaoMongo: DaoProduct} = require('../daos/productos/ProductoDaoMongo');
    const { CarritoDaoMongo: CarritoDao } = require('../daos/carritos/CarritoDaoMongo');
    module.exports = { DaoProduct, CarritoDao };
}
else if(MOTOR === 'firestore') {
    const { ProductDaoFirestore: DaoProduct } = require('../daos/productos/ProductoDaoFirestore');
    const { CarritoDaoFirestore: CarritoDao } = require('../daos/carritos/CarritoDaoFirestore');

    module.exports = { DaoProduct, CarritoDao };
}
// console.log("HOLA");
