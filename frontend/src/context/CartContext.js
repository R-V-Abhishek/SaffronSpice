import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    console.log("Adding item to cart:", item);
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.name === item.name
      );

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity = 
          (newItems[existingItemIndex].quantity || 1) + 1;
        return newItems;
      }

      // If item doesn't exist, add with quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.name !== itemName)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};