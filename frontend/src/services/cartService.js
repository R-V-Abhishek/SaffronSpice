import API_URL from '../config/config';

export const addToCart = async (itemData) => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(itemData),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/api/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};