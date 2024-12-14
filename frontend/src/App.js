import React, { useState, useEffect } from 'react';
import AllRoutes from './allRoutes';

const App = () => {
  const [token, setToken] = useState(null);

  // Use effect to load the token from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken); // Load saved token into state
    }
  }, []);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <div className="App">
      {/* Pass token and setToken to AllRoutes */}
      <AllRoutes setToken={setToken} token={token} />
    </div>
  );
};

export default App;
