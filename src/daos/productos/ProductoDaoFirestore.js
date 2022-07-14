const { ContainerFirestore } = require('../../containers/ContainerFirestore')

class ProductDaoFirestore extends ContainerFirestore {
    constructor() {
        super('producto');
    }
}

module.exports = { ProductDaoFirestore };