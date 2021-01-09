const Items = require('../models/items')
const path = require('path')
module.exports = (req, res) => {
    let image = req.files.image_product;
    image.mv(path.resolve(__dirname, '../public/img', image.name), function (error) {
        Items.create({
            ...req.body,
            image_product: '/img/' + image.name
        }, function (err) {
            res.redirect('/')
        })
    })
}