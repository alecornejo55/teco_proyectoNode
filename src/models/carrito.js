const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    productos: {type: Array, required: true, default: []},
    dateTime: {type: Date, required: true, default: Date.now},
});
carritoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const carrito = mongoose.model('carrito', carritoSchema);



module.exports = carrito;