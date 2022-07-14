const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: String, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    dateTime: {type: Date, required: true, default: Date.now},
});
productoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const producto = mongoose.model('producto', productoSchema);

module.exports = producto;