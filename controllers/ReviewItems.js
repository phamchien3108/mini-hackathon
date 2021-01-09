const Items = require("../models/items");
module.exports = (req, res){
    Items.findById(req.params.id,function(){
        var review = {
            name: ,
            detailReview: ,
        }
    })
}