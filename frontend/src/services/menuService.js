import API_URL from '../config/config';

export const getMenuItems = async () => {
  try {
    const response = await fetch(`${API_URL}/api/menu`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/menu/${id}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};