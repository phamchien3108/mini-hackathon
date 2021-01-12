const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const faker = require("faker");

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
const Items = require("../models/items");
//Faker data
router.get("/generate-data-fake", async (req, res, next) => {
  for (let i = 0; i < 10; i++) {
    const newItem = new Items();
    newItem.name_product = faker.commerce.productName();
    newItem.cost_product = faker.commerce.price();
    newItem.discout = faker.commerce.price();
    newItem.description = faker.commerce.productDescription();
    newItem.image_product = faker.image.sports();
    newItem.review = [];
   
    newItem.save((err) => {
      if (err) return next(err);
    });
  }
  res.redirect("/");
});
//Pagination
router.get("/shop/:page", (req, res, next) => {
  let perPage = 8;
  let page = req.params.page || 1;
  Items.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, items) => {
      Items.countDocuments((err, count) => {
        if (err) return next(err);
        res.render("shop", {
          items,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

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
