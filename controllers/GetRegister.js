const User = require("../models/user");
const { registerValidation, loginValidation } = require("../auth/validation");
const bcrypt = require("bcryptjs");

module.exports = async(req ,res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    // Kiểm tra email có tồn tại hay không
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email đã tồn tại");
  
    // Mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
  
    // Tạo user
    const newuser = new User();
    newuser.name = req.body.name;
    newuser.email = req.body.email;
    newuser.password = hashPass;
  
    try {
      const User = await newuser.save();
      res.render("login");
    } catch (err) {
      res.status(400).send(err);
    }
}