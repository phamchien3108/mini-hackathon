const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../auth/validation");

const newCartController = require("../controllers/cart");
const newHomeController = require("../controllers/home");
const newShopController = require("../controllers/shop");
const newSingleProductController = require("../controllers/singleProduct");
const newContactController = require("../controllers/contact");
const newLoginController = require("../controllers/login");
const newRegisterController = require("../controllers/register");
const newCreateProductController = require("../controllers/createProduct");
const StoreItemsController = require("../controllers/StoreItems");

router.get("/cart", newCartController);
router.get("/", newHomeController);
router.get("/index", newHomeController);
router.get("/shop", newShopController);
router.get("/single-product", newSingleProductController);
router.get("/contact", newContactController);
router.get("/login", newLoginController);
router.get("/register", newRegisterController);
router.get("/create-product", newCreateProductController);
router.post("/create-product", StoreItemsController);

router.post("/register", async function (req, res) {
  // Validate user
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
});

router.post("/login", async function (req, res) {
  // Validate user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Kiểm tra email
  const userLogin = await User.findOne({ email: req.body.email });
  if (!userLogin) return res.status(400).send("Không tìm thấy email");

  // Kiểm tra password
  const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passLogin) return res.status(400).send("Mật khẩu không hợp lệ");

  res.render("index");
});

module.exports = router;
