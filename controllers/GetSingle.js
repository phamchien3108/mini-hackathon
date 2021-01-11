const Items = require("../models/items");
const Reviews = require("../models/ReviewPost");

module.exports = (req, res) => {
  Items.findById(req.params.id, function (err, items) {
    Reviews.find(
      {
        id_product: req.params.id,
      },
      function (err, reviews) {
        res.render("single-product", {
          item: items,
          review: reviews,
        });
      }
    );
  });
};
