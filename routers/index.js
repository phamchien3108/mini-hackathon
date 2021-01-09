const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const newCartController = require("../controllers/cart");
const newHomeController = require("../controllers/home");
const newShopController = require("../controllers/shop");
const newSingleProductController = require("../controllers/singleProduct");
const newContactController = require("../controllers/contact");
const newLoginController = require("../controllers/login");
const newRegisterController = require("../controllers/register");
const newCreateProductController = require("../controllers/createProduct");
const StoreItemsController = require("../controllers/StoreItems");
const GetLoginController = require("../controllers/GetLogin");
const GetRegisterController = require("../controllers/GetRegister");


router.get("/cart", newCartController);
router.get("/", newHomeController);
router.get("/index", newHomeController);
router.get("/shop", newShopController);
router.get("/single-product", newSingleProductController);
router.get("/contact", newContactController);
router.get("/login", newLoginController);
router.get("/register", newRegisterController);
router.get("/create-product", newCreateProductController);
router.get("/getbody",function(req , res){
    console.log(req.body);
})
router.post("/create-product", StoreItemsController);

router.post("/register", GetRegisterController);

router.post("/login", GetLoginController);

module.exports = router;
