import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Index.css'; // Import custom CSS

const Banner = () => {
    const [data, setData] = useState({
        imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/004/299/815/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg",
        link: ""
    });

    return (
        <div className="banner">
            <Container fluid className="p-0 m-0">
                <Row className="no-gutters">
                    <Col className="m-0 p-0">
                        <div className="banner-image-container">
                            <img src={data.imageUrl} className='w-100 h-100' alt="Banner"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;
