import React, { useState, useEffect } from "react";
import {
  getUserId,
  getToken,
  isAuthenticated,
} from "../utils/authUtils";
import "./Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartError, setCartError] = useState(null);

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        const updatedData = data.map((category) => ({
          ...category,
          items: category.items.map((item) => ({
            ...item,
            image: require(`../assets/Images/${item.image.split('/').pop()}`),
          })),
        }));
        setMenuItems(updatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Add item to cart with userId linked
  const addToCart = async (menuItemId) => {
    try {
      if (!isAuthenticated()) {
        throw new Error("You must be logged in to add items to the cart.");
      }

      const userId = getUserId();
      const token = getToken();

      if (!userId || !token) {
        throw new Error("Authentication data missing. Please log in again.");
      }

      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, menuItemId, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart");
      }

      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Cart Error:", err.message);
      setCartError(err.message);
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dish names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* No Results Found */}
      {searchTerm &&
        !menuItems.some((category) =>
          category.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) && (
          <div className="no-results">
            <p>No dishes found matching "{searchTerm}"</p>
          </div>
        )}

      {/* Menu Categories */}
      {menuItems.map((category) => {
        const filteredItems = category.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchTerm && filteredItems.length === 0) return null;

        return (
          <div key={category.category} className="category">
            <h2>{category.category}</h2>
            <div className="menu-items">
              {(searchTerm ? filteredItems : category.items).map((item) => (
                <div key={item._id} className="menu-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-item-image"
                  />
                  <div className="menu-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="price">{item.price}</p>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="add-to-cart-btn"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
