import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div style={{
      backgroundColor: 'white', 
      padding: '20px', 
      border: '1px solid black'
    }}>
      <h2>Cart Debug</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price} (Qty: {item.quantity || 1})
            </li>
          ))}
        </ul>
      )}
      <p>Total Items: {cartItems.length}</p>
    </div>
  );
};

export default Cart;