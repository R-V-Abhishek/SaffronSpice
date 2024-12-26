import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const response = await fetch("http://localhost:5000/api/cart", {
        headers: { userId },
      });
      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateQuantity = async (menuItemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemove(menuItemId);
        return;
      }

      // Optimistically update cart state
      const updatedItems = cart.items.map((item) =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      const newTotal = updatedItems.reduce(
        (acc, item) => acc + item.quantity * parseFloat(item.price.replace("₹", "")),
        0
      );
      setCart({ items: updatedItems, total: newTotal });

      // Call API to update quantity
      const userId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          userId,
        },
        body: JSON.stringify({ menuItemId, quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      console.error(err.message);
      fetchCart();
    }
  };

  const handleRemove = async (menuItemId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          userId,
        },
        body: JSON.stringify({ menuItemId }),
      });
      if (!response.ok) throw new Error("Failed to remove item from cart");

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.items.map((item) => (
                <li key={item.menuItemId}>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value)) {
                          updateQuantity(item.menuItemId, value);
                        }
                      }}
                      min="0"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price}</span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.menuItemId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ₹{cart.total}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
