import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        // Update image paths to use imported images
        const updatedData = data.map(category => ({
          ...category,
          items: category.items.map(item => ({
            ...item,
            image: require(`../assets/Images/${item.image.split('/').pop()}`)
          }))
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dish names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && !menuItems.some(category => 
        category.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) && (
        <div className="no-results">
          <p>No dishes found matching "{searchTerm}"</p>
        </div>
      )}

      {menuItems.map((category) => {
        const filteredItems = category.items.filter(item =>
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