import React from 'react';
import { useCart } from '../context/CartContext';

const CartMenu = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-menu">
      <h4>Cart</h4>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x {item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartMenu;
