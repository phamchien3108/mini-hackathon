const Items = require("../models/items");

module.exports = (req, res) => {
  Items.find({},function(err,items){
    console.log(items);
    res.render("shop",{
      items:items,
      cart:req.session.Ucart,
    })
  })
};
