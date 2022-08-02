const { Container } = require('../../containers/Container');
const product = require('../../models/product');

class DaoProduct extends Container {
    constructor(){
        super(product);
    }
}

module.exports = {DaoProduct};