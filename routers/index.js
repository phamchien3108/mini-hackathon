const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const newCartController = require("../controllers/cart");
const newHomeController = require("../controllers/home");
const newShopController = require("../controllers/shop");
const newContactController = require("../controllers/contact");
const newLoginController = require("../controllers/login");
const newRegisterController = require("../controllers/register");
const newCreateProductController = require("../controllers/createProduct");
const StoreItemsController = require("../controllers/StoreItems");
const GetLoginController = require("../controllers/GetLogin");
const GetRegisterController = require("../controllers/GetRegister");
const AddToCartController = require("../controllers/AddCart");
const GetSinglePro = require("../controllers/GetSingle");
const StoreReview = require("../controllers/Storereview");

app.use(function (req, res, next) {
  res.local.totalQuanty = req.session[req.session.uid].Ucart.Cart.totalQuanty;
  res.local.totalPrice = req.session[req.session.uid].Ucart.Cart.totalPrice;
  next();
});

router.get("/cart", newCartController);
router.get("/", newHomeController);
router.get("/index", newHomeController);
router.get("/shop", newShopController);
router.get("/:id", GetSinglePro);
router.get("/login", newLoginController);
router.get("/register", newRegisterController);
router.get("/create-product", newCreateProductController);
router.get("/add-to-cart/:id", AddToCartController);

router.post("/create-product", StoreItemsController);
router.post("/register", GetRegisterController);
router.post("/login", GetLoginController);
router.post("add-to-cart/:id", AddToCartController);
router.post("/shop/:id", StoreReview);

module.exports = router;
