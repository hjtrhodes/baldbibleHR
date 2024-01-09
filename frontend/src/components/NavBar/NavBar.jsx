// import React from 'react';
import Button from '../Button/Button';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  const token = window.localStorage.getItem("token"); // getting token from local storage
  const username = window.localStorage.getItem("username");
  // const token = true;

  const logout = () => {
    window.localStorage.clear(); //clearing all items from local storage
    window.localStorage.removeItem('token'); //specifically removing the 'token' item
    window.localStorage.removeItem('username'); 
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

    // Placeholder function for handling the Add button click
  const handleAddClick = () => {
    // Implement your logic for handling the Add button click
    // For example, navigate to the upload image page
    navigate("/upload-image");
  };

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
            >
              Sign Up
            </Button>
            <Button
              ariaLabel='Navigate to Sign Up'
              onClick={() => navigate("/Login")}
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
            >
              Log Out
            </Button>
            <Button
              ariaLabel='Add an image'
              onClick={handleAddClick}
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









