// src/utils/authUtils.js

// Set user ID and token in localStorage
export const setAuthData = (userId, token) => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
};

// Get the token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get the user ID from localStorage
export const getUserId = () => {
  return localStorage.getItem("userId");
};

// Remove user ID and token from localStorage (Logout)
export const clearAuthData = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Returns true if token exists, false otherwise
};
