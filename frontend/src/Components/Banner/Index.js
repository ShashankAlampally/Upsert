import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Index.css'; // Add this line to import custom CSS

const Banner = () => {
    const [data, setData] = useState({
        imageUrl: "https://t3.ftcdn.net/jpg/04/65/46/52/240_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
        link: ""
    });

    return (
        <div className="banner">
            <Container fluid className="p-0 m-0">
                <Row noGutters className=''>
                    <Col className='m-0 p-0'>
                        <img src={data.imageUrl} className='w-100 h-100 p-0 m-0'/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;
