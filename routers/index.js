const express = require("express");
const router = express.Router();

const newCartController = require("../controllers/cart");
const newHomeController = require("../controllers/home");
const newShopController = require("../controllers/shop");
const newSingleProductController = require("../controllers/singleProduct");
const newContactController = require("../controllers/contact");

router.get("/cart", newCartController);
router.get("/", newHomeController);
router.get("/index", newHomeController);
router.get("/shop", newShopController);
router.get("/single-product", newSingleProductController);
router.get("/contact", newContactController);

module.exports = router;
