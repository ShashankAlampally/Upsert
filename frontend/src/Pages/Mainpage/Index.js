import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Index';
import axios from 'axios';
import Item from '../../Components/Item/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Index.css';
import Cart from '../../Components/Cart/Index';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [Products, setProducts] = useState([]);
    const userID = window.sessionStorage.getItem('user');
    const token = window.sessionStorage.getItem('token');
    const navigate = useNavigate()
  useEffect(() => {
    if (!token || !userID) {
      navigate('/login');
      return;
    }
})
    useEffect(() => {
        axios.get(`http://shashanks-macbook-air.local:8080/api/products`, { headers: { "authorization": window.sessionStorage.getItem("token") } })
            .then((response) => {
                setProducts(response.data.data.products);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Cart />
            <Banner className="mb-0 banner" />
            <div className='container-fluid'>
                <div className='row justify-content-around'>
                    {Products.map((item) => (
                        <div className='col-6 col-md-4 col-lg-3 mb-4' key={item._id}>
                            <Item 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                imageUrl={item.imageUrl} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
