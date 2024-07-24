import React, { useState } from 'react';
import './NewCSS.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const CartItem = (props) => {
    const { _id, name, price, imageUrl, quantity } = props.data;
    const productID = _id;
    const [count, setCount] = useState(quantity);

    const updateCart = (updatedProduct) => {
        props.onQuantityChange(updatedProduct);
    };

    const handleIncrease = () => {
        const newQuantity = count + 1;
        setCount(newQuantity);
        updateCart({ ...props.data, quantity: newQuantity });
    };

    const handleDecrease = () => {
        if (count > 1) {
            const newQuantity = count - 1;
            setCount(newQuantity);
            updateCart({ ...props.data, quantity: newQuantity });
        } else {
            removeItemFromCart(productID);
        }
    };

    const removeItemFromCart = (productID) => {
        props.onRemoveItem(productID);
    };

    return (
        <div className="d-flex flex-row justify-content-center containers col-lg-10 col-12 mb-3">
            <div className='col-3'><img src={imageUrl} alt={name} className="images" /></div>
            <div className='d-flex flex-column justify-content-around details col-9'>

                <div className="col-12 meta">
                    <b>{name}</b>
                    <p className='text-success'>In Stock</p>
                    <h6>Price: ₹{price}</h6>
                </div>
                <div className="col-12 handling d-flex flex-row ">
                    <button onClick={handleDecrease} className='btn btn-secondary'> - </button>
                    <input
                        type="number"
                        value={count}
                        readOnly
                        className='col-lg-1 col-2 ms-3 me-3 rounded text-center'
                    />
                    <button onClick={handleIncrease} className='btn btn-secondary'> + </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
