import { apiUrl } from '../services/apiConfig';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId, getToken, isAuthenticated } from "../utils/authUtils";
import "./Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [setCartError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch menu items on component mount 
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(apiUrl("/api/menu"));
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        const updatedData = data.map((category) => ({
          ...category,
          items: category.items.map((item) => ({
            ...item,
            image: require(`../assets/${item.image.split('/').pop()}`),
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

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const handleAddToCartClick = (item) => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: '/menu' } });
      return;
    }
    setSelectedItem(item);
    setQuantity(1);
    setShowPopup(true);
  };

  const handleConfirmAddToCart = async () => {
    try {
      if (!isAuthenticated()) {
        navigate('/login', { state: { from: '/menu' } });
        return;
      }

      const userId = getUserId();
      const token = getToken();

      if (!userId || !token) {
        throw new Error("Authentication data missing. Please log in again.");
      }

      const response = await fetch(apiUrl("/api/cart/add"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ menuItemId: selectedItem._id, quantity })
      });

      const data = await response.json();
      if (response.ok) {
        showNotification('Item added to cart successfully!');
        setShowPopup(false);
        setSelectedItem(null);
        setCartError(null);
      } else {
        throw new Error(data.message || "Failed to add item to cart");
      }
    } catch (err) {
      console.error("Cart Error:", err.message);
      setCartError(err.message);
      showNotification(err.message, 'error');
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
                      onClick={() => handleAddToCartClick(item)}
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

    {showPopup && selectedItem && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Add to Cart</h3>
          <div className="item-details">
            <h4>{selectedItem.name}</h4>
            <p>{selectedItem.price}</p>
          </div>
          <div className="quantity-controls">
            <button 
              onClick={() => quantity > 1 && setQuantity(q => q - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>
              +
            </button>
          </div>
          <div className="modal-actions">
            <button className="confirm-btn" onClick={handleConfirmAddToCart}>
              Add to Cart
            </button>
            <button 
              className="cancel-btn" 
              onClick={() => {
                setShowPopup(false);
                setSelectedItem(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Menu;
