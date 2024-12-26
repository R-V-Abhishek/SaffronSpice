import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
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

    fetchCart();
  }, []);

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
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <li key={item.menuItemId}>
                {item.name} - {item.quantity} x ₹{item.price}
                <button onClick={() => handleRemove(item.menuItemId)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{cart.total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
