const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { registerValidation, loginValidation } = require("../auth/validation");

module.exports = async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    // Kiểm tra email
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) return res.status(400).send("Không tìm thấy email");
  
    // Kiểm tra password
    const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passLogin) return res.status(400).send("Mật khẩu không hợp lệ");
  
    res.render("index");
};