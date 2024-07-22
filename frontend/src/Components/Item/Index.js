import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Item = (props) => {
    const [product, setProduct] = useState(props);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(product);
    useEffect(() => {
        if (location.state && location.state.product) {
            setProduct(location.state.product);
        }
    }, [location.state]);

    const handleClick = (productId) => {
        axios.get(`http://shashanks-macbook-air.local:8080/api/product/${product.id}`, {
            headers: { "authorization": window.sessionStorage.getItem("token") }
        })
        .then((response) => {
            navigate(`/product/${product.id}`, { state: { product: response.data.data } });
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={12} onClick={() => handleClick(product._id)} >
                        <div className='d-flex justify-content-center '>
                            <img src={product.imageUrl} className='w-50 h-50' alt={product.name} />
                        </div>
                        <div className='d-flex flex-column mt-3'>
                            <div className='d-flex flex-row justify-content-center'><h6>{product.name}</h6></div>
                            <div className='d-flex flex-row justify-content-center'><h2>{product.price}</h2></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Item;
