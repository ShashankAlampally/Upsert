const Cart = require('../Models/cart');
const User = require('../Models/user');
const Product = require('../Models/product');

exports.viewCart = async (req, res) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).send({ message: "userID is required" });
        }

        // Fetch the cart for the given userID
        const cart = await Cart.findOne({ userID });
        if (!cart) {
            return res.status(404).send({ message: "No cart found for this user" });
        }

        // Extract productIDs and quantities from the cart
        const productDetails = cart.productDetails;

        // Fetch details for each productID
        const productPromises = productDetails.map(async (item) => {
            const product = await Product.findById(item.productID);
            return {
                ...product.toObject(),
                quantity: item.quantity
            };
        });

        const products = await Promise.all(productPromises);

        // Send combined data to client
        res.status(200).send({ message: "Cart items found", data: { cartItems: products } });
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const details = req.body;
        if (!details.userID) {
            return res.status(400).send({ message: "userID is required" });
        }

        const userExists = await User.findById(details.userID);
        if (!userExists) {
            return res.status(400).send({ message: "userID not found" });
        }

        if (!details.productDetails || !details.productDetails.productID || !details.productDetails.quantity) {
            return res.status(400).send({ message: "Product details are required" });
        }

        const productExists = await Product.findById(details.productDetails.productID);
        if (!productExists) {
            return res.status(400).send({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userID: details.userID });
        if (!cart) {
            cart = new Cart({ userID: details.userID, productDetails: [] });
        }

        const productIndex = cart.productDetails.findIndex(item => item.productID === details.productDetails.productID);

        if (productIndex > -1) {
            cart.productDetails[productIndex].quantity = details.productDetails.quantity;
        } else {
            cart.productDetails.push(details.productDetails);
        }

        await cart.save();
        res.status(200).send({ message: "Product added to cart", data: cart });
    } catch (error) {
        res.status(500).send({ error });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { userID, quantity } = req.body;
        const { productID } = req.params;

        if (!userID || !productID || !quantity) {
            return res.status(400).send({ message: "userID, productID, and quantity are required" });
        }

        const userExists = await User.findById(userID);
        if (!userExists) {
            return res.status(400).send({ message: "userID not found" });
        }

        const cart = await Cart.findOne({ userID });
        if (!cart) {
            return res.status(404).send({ message: "No cart found for this user" });
        }

        const productIndex = cart.productDetails.findIndex(item => item.productID === productID);

        if (productIndex > -1) {
            cart.productDetails[productIndex].quantity = quantity;
            await cart.save();
            res.status(200).send({ message: "Cart updated", data: cart });
        } else {
            return res.status(404).send({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userID } = req.body;
        const { productID } = req.params;

        if (!userID || !productID) {
            return res.status(400).send({ message: "userID and productID are required" });
        }

        const userExists = await User.findById(userID);
        if (!userExists) {
            return res.status(400).send({ message: "userID not found" });
        }

        const cart = await Cart.findOne({ userID });
        if (!cart) {
            return res.status(404).send({ message: "No cart found for this user" });
        }

        const productIndex = cart.productDetails.findIndex(item => item.productID === productID);

        if (productIndex > -1) {
            cart.productDetails.splice(productIndex, 1);
            await cart.save();
            res.status(200).send({ message: "Product removed from cart", data: cart });
        } else {
            return res.status(404).send({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};

exports.checkProductInCart = async (req, res) => {
    try {
        const { userID } = req.body;
        const { productID } = req.params;

        if (!userID || !productID) {
            return res.status(400).send({ message: "userID and productID are required" });
        }

        const userExists = await User.findById(userID);
        if (!userExists) {
            return res.status(400).send({ message: "userID not found" });
        }

        const cart = await Cart.findOne({ userID });
        if (!cart) {
            return res.status(404).send({ message: "No cart found for this user" });
        }

        const productIndex = cart.productDetails.findIndex(item => item.productID === productID);

        if (productIndex > -1) {
            const product = cart.productDetails[productIndex];
            return res.status(200).send({ message: "Product found in cart", data: { productID: product.productID, quantity: product.quantity } });
        } else {
            return res.status(404).send({ message: "Product not in cart" });
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
};
