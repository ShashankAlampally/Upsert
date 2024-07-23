import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Index.css'; // Import custom CSS

const Banner = () => {
    const [data, setData] = useState({
        imageUrl: "https://as2.ftcdn.net/v2/jpg/01/35/03/19/1000_F_135031985_QuMwgZiWF6hFNS4jGY65gPcKmsd8qym7.jpg",
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
