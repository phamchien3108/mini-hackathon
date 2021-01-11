const Cart = require("../function/Cart");
const Items = require("../models/items");

module.exports = (req, res) => {
   
    let cart = new Cart(req.session[req.session.uid].Ucart);
    let productID = req.params.id;
    Items.findById(productID, function(err, Items) {
        console.log(cart);
        if(err){
            return res.redirect('/');
        }
        let amount = (req.body.amount)?req.body.amount:1;
        cart.add(Items,Items._id,amount);
        req.session[req.session.uid].cart = cart;
        console.log(cart);
    })
    
}