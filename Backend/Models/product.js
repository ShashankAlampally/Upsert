const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, sparse: true },
    description: { type: Array, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
