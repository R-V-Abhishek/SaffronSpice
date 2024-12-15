import React from 'react';
import { useCart } from '../context/CartContext';

const CartMenu = () => {
  const { cartItems, removeFromCart } = useCart();

  // Only log in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Cart Menu Items:', cartItems);
    }
  }, [cartItems]);

  return (
    <div className="cart-menu">
      <h4>Cart</h4>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
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