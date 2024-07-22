import React, { useState } from 'react';
import './Index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartItem = (props) => {
    const { _id, name, price, imageUrl, quantity } = props.data;
    const productID = _id;
    const [count, setCount] = useState(quantity);
    console.log(productID);
    // Notify parent component about quantity change
    const updateCart = (updatedProduct) => {
        console.log(updatedProduct)
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
            // Remove item from cart if quantity is 1 and decrease is clicked
            removeItemFromCart(productID);
        }
    };
    console.log(productID);
    // Remove item from cart and notify parent component
    const removeItemFromCart = (productID) => {
        
        props.onRemoveItem(productID);
    };

    return (
        <div className="cartItem d-flex align-items-center mb-3">
            <img src={imageUrl} alt={name} className="img-thumbnail me-3" />
            <div className="description p-3">
                <p>
                    <b>{name}</b>
                </p>
                <p>Price: ₹{price}</p>
                <div className="countHandler d-flex align-items-center">
                    <button onClick={handleDecrease} className='btn btn-secondary me-2'> - </button>
                    <input
                        type="number"
                        value={count}
                        readOnly
                        className='form-control text-center'
                    />
                    <button onClick={handleIncrease} className='btn btn-secondary ms-2'> + </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
