const mongoose = require('mongoose');
const productDetailSchema = new mongoose.Schema({
    productID: { type: String, required: true },
    quantity: { type: Number, required: true }
});
const cartSchema = new mongoose.Schema({
    userID : {type: 'string', required: true},
    productDetails: {type: [productDetailSchema], required: true,}
})

module.exports = mongoose.model('cartSchema',cartSchema);
