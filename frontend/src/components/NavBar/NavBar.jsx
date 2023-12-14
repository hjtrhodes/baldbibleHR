// import React from 'react';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  const token = window.localStorage.getItem("token"); // getting token from local storage

  const logout = () => {
    window.localStorage.clear(); //clearing all items from local storage
    window.localStorage.removeItem('token'); //specifically removing the 'token' item
  };

  console.log(token);

  if (!token) {
    // User is not logged in
    return (
      <nav className="nav">
        {/* Baldbible Home-button */}
        <button
          className="nav-btn Baldbible Home-button"
          onClick={() => navigate("/")}
          aria-label="Navigate to Baldbible Home"
        >
          <span>Baldbible</span>
        </button>

        {/* Spacer to push buttons to the right */}
        <div className="spacer" />

        {/* Sign Up and Login buttons with reduced spacing */}
        <div className="linkcontainer">
          <button
            className="nav-btn"
            onClick={() => navigate("/SignUp")}
            aria-label="Navigate to Sign Up"
          >
            <span>SignUp</span>
          </button>

          <button
            className="nav-btn"
            onClick={() => navigate("/Login")}
            aria-label="Navigate to Login"
          >
            <span>Login</span>
          </button>
        </div>
      </nav>
    );
  } else {
    // User is logged in
    return (
      <nav className="nav">
        {/* Baldbible Home-button */}
        <button
          className="nav-btn baldbible-button"
          onClick={() => navigate("/")}
          aria-label="Navigate to Baldbible Home"
        >
          <span>Baldbible</span>
        </button>

        {/* Spacer to push buttons to the right */}
        <div className="spacer" />

        {/* Logout and Add buttons with reduced spacing */}
        <div className="linkcontainer">
          <button
            className="nav-btn"
            onClick={logout}
            aria-label="Logout"
          >
            <span>Logout</span>
          </button>

          <button
            className="nav-btn"
            onClick={() => handleAddClick()}
            aria-label="Upload Image"
          >
            <span>Upload image</span>
          </button>
        </div>
      </nav>
    );
  }
};

// Placeholder function for handling the Add button click
const handleAddClick = () => {
  // Implement your logic for handling the Add button click
  // For example, navigate to the upload image page
  navigate("/upload-image");
};

export default NavBar;









