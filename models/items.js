const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    name_product:String,
    cost_product:Number,
    discout:Number,
    description:String,
    review: [],
    image_product:String
})
const Items = mongoose.model('Items',ItemSchema);
module.exports = Items;