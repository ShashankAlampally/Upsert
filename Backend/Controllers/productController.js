const Product = require('../Models/product');

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        if (!(name && description && price && imageUrl)) {
            return res.status(400).send({ message: "Please provide all required fields" });
        }

        await Product.create({ name, description, price, imageUrl });
        return res.status(200).send({ message: "Product created successfully" });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).send({ message: "Successfully retrieved all products", data: { products } });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({ message: "Please enter a product ID" });
        }
        const item = await Product.findById(id); // Use findById to query by _id
        if (!item) {
            return res.status(404).send({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product Retrieved", data: item });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
