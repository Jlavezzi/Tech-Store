import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useNavigate } from 'react-router-dom';

import Loader from './Components/loader';
import Home from './Pages/home';
import Dashboard from './Pages/dashboard';
import Profile from './Pages/profile';
import Settings from './Pages/settings';
import LoginForm from './Components/loginForms';
import LogoutButton from './Components/logoutButton';
import { isAuthenticated, login, logout } from './Utils/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          <Component />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    // Simulating authentication logic
    if (username === 'admin' && password === 'password') {
      // Simulating fetch API and storing data in localStorage
      const userData = { username: 'admin', role: 'admin' };
      login(userData);
      setLoggedIn(true);
      //useNavigate('/dashboard'); // Redirect to dashboard on successful login
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage and log out
    logout();
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <LogoutButton onLogout={handleLogout} />
        </nav>

        <Suspense fallback={<Loader />}>
          <Routes>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/settings" component={Settings} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
