import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Index.css'
import Cart from '../Cart/Index';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showViewCart, setShowViewCart] = useState(false);

    useEffect(() => {
        if (location.state && location.state.product) {
            setProduct(location.state.product);

            const userID = window.sessionStorage.getItem("user");
            const productID = location.state.product._id;

            axios.post(
                `http://shashanks-macbook-air.local:8080/api/cart/check-product/${productID}`,
                { userID },
                { headers: { "authorization": window.sessionStorage.getItem("token") } }
            )
            .then(response => {
                if (response.data && response.data.data) {
                    setQuantity(response.data.data.quantity);
                    setShowViewCart(response.data.data.quantity > 1);
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [location.state]);

    const addToCart = () => {
        if (product) {
            axios.post(
                `http://shashanks-macbook-air.local:8080/api/addToCart`, 
                { 
                    userID: window.sessionStorage.getItem("user"),
                    productDetails: {
                        productID: product._id,
                        quantity: quantity
                    }
                }, 
                {
                    headers: { "authorization": window.sessionStorage.getItem("token") }
                }
            ).then(response => {
                console.log(response);
                setShowViewCart(quantity > 1);
            }).catch(error => {
                console.error(error);
            });
        }
    };

    const handleQuantity = (e) => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);

        axios.put(
            `http://shashanks-macbook-air.local:8080/api/updateCart/${product._id}`,
            { 
                userID: window.sessionStorage.getItem("user"),
                quantity: newQuantity
            }, 
            {
                headers: { "authorization": window.sessionStorage.getItem("token") }
            }
        )
        .then(response => {
            console.log(response);
            setShowViewCart(newQuantity > 1);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const viewCart = () => {
        navigate('/cart');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Cart/>
            <Row className='mt-5 '>
                <Col md={12} xl={6} className='d-flex flex-row justify-content-center'>
                    <img src={product.imageUrl} className='w-50 h-100 images' alt={product.name} />
                </Col>
                <Col md={12} xl={6} className='ml-3 p-3'>
                    <h1>{product.name}</h1>
                    <h2>₹{product.price}</h2>
                    <h2><b>Product Details</b></h2>
                    <ul>
                        <li><b>Material Composition</b>: {product.description[0]}</li>
                        <li><b>Pattern</b>: {product.description[1]}</li>
                        <li><b>Fit type</b>: {product.description[2]}</li>
                        <li><b>Sleeve type</b>: {product.description[3]}</li>
                        <li><b>Collar style</b>: {product.description[4]}</li>
                        <li><b>Length</b>: {product.description[5]}</li>
                        <li><b>Country of Origin</b>: {product.description[6]}</li>
                    </ul>
                    <Row className='form-group align-items-center'>
                        <Col xs={6} md={4} lg={2} className='d-flex flex-column justify-content-center'>
                            <label htmlFor="inputQuantity" className='form-label'><b>Quantity</b>:</label>
                        </Col>
                        <Col xs={6} md={6} lg={3}>
                            <select className='form-control' id='inputQuantity' value={quantity} onChange={handleQuantity}>
                                {[...Array(5).keys()].map(i => (
                                    <option key={i+1} value={i+1}>{i+1}</option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                    <div className='d-flex flex-row justify-content-center mt-3'>
                        <button type="button" className='btn btn-warning' onClick={addToCart}>Add to Cart</button>
                    </div>
                    {showViewCart && (
                        <div className='d-flex flex-row justify-content-center mt-3'>
                            <button type="button" className='btn btn-primary' onClick={viewCart}>View Cart</button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Product;
