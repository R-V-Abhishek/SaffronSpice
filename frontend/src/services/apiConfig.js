// Base API URL - use environment variable or fallback
export const API_BASE_URL = process.env.REACT_APP_API_URL || "https://saffron-spice-api.onrender.com";

// Helper function for API calls
export const apiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;