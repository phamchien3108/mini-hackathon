const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Cart = require("../function/Cart");


const { registerValidation, loginValidation } = require("../auth/validation");

module.exports = async(req, res , next) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    // Kiểm tra email
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) return res.status(400).send("Không tìm thấy email");
  
    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin) return res.status(400).send("Mật khẩu không hợp lệ");

    req.session.uid = req.body.email;
    if(!req.session[req.session.uid]){
        let cart = new Cart({cartDetail:{},totalQuanty:0,totalPrice:0});
        req.session[req.session.uid] = 
        {
            Ucart : cart
        }
        console.log(req.session[req.session.uid]);
    }
    res.render("index");
};