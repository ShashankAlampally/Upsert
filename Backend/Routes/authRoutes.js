const express = require('express')
const router = express.Router()
const {addProduct,getAllProducts,getProductById} = require('../Controllers/productController');
const {viewCart , removeFromCart, updateCart, addToCart , checkProductInCart , cartCount} = require('../Controllers/cartController');
router.post('/addProduct',addProduct);
router.get('/products',getAllProducts)
router.get('/product/:id',getProductById)
router.post('/cart',viewCart)
router.get('/cartCount/:userID',cartCount)
router.post('/addToCart',addToCart)
router.put('/updateCart/:productID',updateCart)
router.delete('/removeFromCart/:productID',removeFromCart);
router.post('/cart/check-product/:productID', checkProductInCart);
module.exports = router