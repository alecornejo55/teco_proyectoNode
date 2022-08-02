const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

});
userSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}
const user = mongoose.model('user', userSchema);

module.exports = user;