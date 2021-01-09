const mongoose = require('mongoose');
const { schema } = require('./user');
const Schema = mongoose.Schema;
const reviewPost = new Schema({
    nameReview:String,
    content:String,
    datePosted: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    id_product:String,
})
const Post = mongoose.model('Post',reviewPost);
module.exports = Post;