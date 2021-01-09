const express = require("express");
const router = express.Router();

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
router.post("/create-product",StoreItemsController);


module.exports = router;
