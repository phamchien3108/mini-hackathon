module.exports = (req, res) => {
  res.render("index", {
    cart:req.session.Ucart
  });
};
