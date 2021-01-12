const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    user_cart:String,
    item:[],
    totalQuanty:Number,
    totalPrice:Number,
})

const Cart = mongoose.model('Cart',CartSchema);
module.exports = Cart;