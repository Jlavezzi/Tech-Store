export const isAuthenticated = () => {
    // Check if user data exists in localStorage
    return localStorage.getItem('userData') !== null;
  };
  
  export const login = (userData) => {
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  export const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
  };
  