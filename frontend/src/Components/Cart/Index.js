import React, { useEffect, useState } from 'react';
import './Index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [totalItems, setTotalItems] = useState(0);
  const userID = window.sessionStorage.getItem('user');
  const location = useLocation();
  const navigate = useNavigate();
    useEffect(()=>{
      axios.get(`http://shashanks-macbook-air.local:8080/api/cartCount/${userID}`, { headers: { "authorization": window.sessionStorage.getItem("token") } })
            .then((response) => {
              console.log(response);
                setTotalItems(response.data.data.count)
            }).catch((error) => {
                console.log(error);
            });
    })
  const handleClick = () => {
    navigate('/cart');
  };

  const handleHome = () => {
    navigate('/shop');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    navigate('/login');
  };

  const getBorderStyle = (path) => {
    return location.pathname === path ? { border: '2px solid black', borderRadius: '5px' } : {};
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 d-flex flex-row justify-content-between'>
          <div className='m-3' onClick={handleHome} style={getBorderStyle('/shop')}>
            <i className="bi bi-house h1"></i>
          </div>
          <div className='m-3' onClick={handleClick} style={getBorderStyle('/cart')}>
            <i className="bi bi-cart h1"></i>
            <span className='badge badge-warning' id='lblCartCount'>{totalItems}</span>
          </div>
          <div className='m-3' onClick={handleLogout}>
            <i className="bi bi-box-arrow-left h1"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
