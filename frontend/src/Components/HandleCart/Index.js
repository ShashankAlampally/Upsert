import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CartItem from './CartItem';
import axios from 'axios';
import './Index.css';

const CartView = () => {
    const [cartItems, setCartItems] = useState([]);
    const [amount, setAmount] = useState(0);
    console.log(cartItems)
    useEffect(() => {
        // Define the async function
        const fetchCartData = async () => {
            try {
                const response = await axios.post(
                    'http://shashanks-macbook-air.local:8080/api/cart',
                    { userID: window.sessionStorage.getItem('user') },
                    { headers: { "authorization": window.sessionStorage.getItem("token") } }
                );
                setCartItems(response.data.data.cartItems);
            } catch (error) {
                console.error('Error fetching cart details', error);
            }
        };

        // Call the async function
        fetchCartData();
    }, [cartItems]); // Empty dependency array means this effect runs only once when the component mounts

    useEffect(() => {
        // Calculate total amount based on cartItems
        const totalAmount = cartItems.reduce((acc, item) => {
            // Remove commas and convert to number
            const price = parseFloat(item.price.replace(/,/g, ''));
            return acc + (price * item.quantity);
        }, 0);
        setAmount(totalAmount);
    }, [cartItems]); // This effect runs whenever `cartItems` changes

    const handleQuantityChange = async (updatedProduct) => {
        try {
            console.log(updatedProduct);
            await axios.put(
                `http://shashanks-macbook-air.local:8080/api/updateCart/${updatedProduct._id}`,
                { 
                    userID: window.sessionStorage.getItem('user'),
                    quantity: updatedProduct.quantity
                },
                { headers: { "authorization": window.sessionStorage.getItem("token") } }
            );
            // Update the local state
            setCartItems((prevItems) => prevItems.map((item) =>
                item.productID === updatedProduct.productID ? { ...item, quantity: updatedProduct.quantity } : item
            ));
        } catch (error) {
            console.error('Error updating cart item quantity', error);
        }
    };

    const handleRemoveItem = async (productID) => {
        try {
            await axios.delete(
                `http://shashanks-macbook-air.local:8080/api/removeFromCart/${productID}`,
                { 
                    data: { userID: window.sessionStorage.getItem('user') },
                    headers: { "authorization": window.sessionStorage.getItem("token") }
                }
            );
            // Update the local state
            setCartItems((prevItems) => prevItems.filter((item) => item.productID !== productID));
        } catch (error) {
            console.error('Error removing cart item', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <div className="cart">
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            cartItems.map((product) => (
                                <CartItem 
                                    productID={product._id} 
                                    data={product} 
                                    onQuantityChange={handleQuantityChange} 
                                    onRemoveItem={handleRemoveItem} 
                                />
                            ))
                        )}
                    </div>
                    <div>
                        <h3>Total Cart Items: {cartItems.length}</h3>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="card mt-5">
                        <div className="card-header py-3">
                            <h5 className="mb-0">Summary</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>₹{amount.toLocaleString('en-IN')}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>Free</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p className="mb-0">(including GST)</p>
                                        </strong>
                                    </div>
                                    <span><strong>₹{amount.toLocaleString('en-IN')}</strong></span>
                                </li>
                            </ul>
                            <button type="button" className="btn btn-primary btn-lg btn-block">
                                Go to checkout
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CartView;
