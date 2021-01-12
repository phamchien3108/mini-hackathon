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



router.get("/cart", newCartController);
router.get("/", newHomeController);
router.get("/index", newHomeController);
router.get("/shop", newShopController);
router.get("/login", newLoginController);
router.get("/register", newRegisterController);
router.get("/create-product", newCreateProductController);
router.get("/add-to-cart/:id", AddToCartController);
router.get("/single-product/:id", GetSinglePro);

router.post("/create-product", StoreItemsController);
router.post("/register", GetRegisterController);
router.post("/login", GetLoginController);
router.post("/shop/:id", StoreReview);

module.exports = router;
