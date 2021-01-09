const Post = require('../models/ReviewPost');
const post = require('../models/ReviewPost');
module.exports = (req,res)=>{
    let item_id = req.params.id;
    post.create({
        ...req.body,
        id_product:item_id,
    });
;}