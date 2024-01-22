import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");
  const location = useLocation();

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  // Placeholder function for handling the Add button click
  const handleAddClick = () => {
    navigate("/upload");
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Store the current page in local storage
    window.localStorage.setItem('currentPage', location.pathname);
  }, [location.pathname]);

  console.log(token);
  console.log('username:', username);

  return (
    <nav className="nav">
      {/* Baldbible Home-button */}
      <Button
        ariaLabel='Navigate to Baldbible Home'
        onClick={() => navigate("/")}
        className="btn home-btn"
      >
        Baldbible
      </Button>

      {/* Spacer to push buttons to the right */}
      <div className="spacer" />

      {/* Sign Up and Login buttons with reduced spacing */}
      <div className="nav-link-container">
        {!token && (
          <>
            <Button
              ariaLabel='Navigate to Sign Up'
              onClick={() => navigate("/Signup")}
              className={`btn nav-btn-signup ${location.pathname === "/Signup" ? 'active' : ''}`}
            >
              Sign Up
            </Button>
            <Button
              ariaLabel='Navigate to Login'
              onClick={() => navigate("/Login")}
              className={`btn nav-btn-login ${location.pathname === "/Login" ? 'active' : ''}`}
            >
              Log In
            </Button>
          </>
        )}

        {token && (
          <>
            <span>Welcome, {username}!</span>
            <Button
              ariaLabel='Log out current user'
              onClick={handleLogOut}
              className="btn"
            >
              Log Out
            </Button>
            <Button
              ariaLabel='Add an image'
              onClick={handleAddClick}
              className="btn"
            >
              Upload Image
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;







