import API_URL from '../config/config';

export const createReservation = async (reservationData) => {
  try {
    const response = await fetch(`${API_URL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(reservationData),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reservations`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};