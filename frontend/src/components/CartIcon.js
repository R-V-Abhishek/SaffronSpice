import React from "react";
import { useCart } from "../context/CartContext"; // Import the useCart hook

const CartIcon = () => {
  const { cartItems } = useCart();

  return (
    <div className="cart-icon">
      <span>Cart ({cartItems.length})</span> {/* Display number of items */}
    </div>
  );
};

export default CartIcon;
