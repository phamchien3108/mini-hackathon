
const Items = require("../models/items");
const Cart = require("../models/Cart");
module.exports = async (req, res,next) => {
    let userCart = req.session.UID;
    let userItem = []
    let totalQ = 0;
    let totalP = 0;
    Cart.findOne({user_cart:userCart},function(err,detail){
        userItem = detail.item;
        totalQ = detail.totalQuanty;
        totalP = detail.totalPrice;
    })
    let rel = await Items.findById(req.params.id, async function(err,items,next){
        for(let i=0;i<userItem.length;i++){
            if(userItem[i].item_id == items._id){
                return true
            }
        }
    })
    if(rel == true){
        res.redirect('/cart');
    }
    else{
        Items.findById(req.params.id, function(err,items,next){
        let arr = {
            item_id:items._id,
            item_quanty:1,
            item_cost:items.cost_product,
        }
        userItem.push(arr);
        totalQ = 1;
        totalP = items.cost_product;
        req.session.Ucart = {
            item:userItem,
            totalQuanty:totalQ,
            totalPrice:totalP,
        }
        console.log(req.session.Ucart);
        })

    Cart.findOne({
        user_cart:userCart
    },function(err,detail){
        Cart.updateOne(detail,{$set:{
            user_cart:userCart,
            item:userItem,
            totalQuanty:totalQ,
            totalPrice:totalP,}},function(err,newup){})
    })
}
        res.redirect("/cart");
}