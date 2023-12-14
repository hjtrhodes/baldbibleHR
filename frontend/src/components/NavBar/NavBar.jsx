// import React from 'react';
import Button from '../Button/Button';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  // const token = window.localStorage.getItem("token"); // getting token from local storage
  const token = true;

  const logout = () => {
    window.localStorage.clear(); //clearing all items from local storage
    window.localStorage.removeItem('token'); //specifically removing the 'token' item
  };

    // Placeholder function for handling the Add button click
  const handleAddClick = () => {
    // Implement your logic for handling the Add button click
    // For example, navigate to the upload image page
    navigate("/upload-image");
  };

  console.log(token);

    return (
      <nav className="nav">
        {/* Baldbible Home-button */}
        <Button ariaLabel='Navigate to Baldbible Home'
          onClick={() => navigate("/")}
          className="btn home-btn"
        >Baldbible</Button>

        {/* Spacer to push buttons to the right */}
        <div className="spacer" />

        {/* Sign Up and Login buttons with reduced spacing */}
        <div className="linkcontainer">
          {!token && <Button ariaLabel='Navigate to Sign Up'
            onClick={() => navigate("/SignUp")}
          >Sign Up</Button>}

          {!token && <Button ariaLabel='Navigate to Sign Up'
            onClick={() => navigate("/Login")}
          >Log In</Button>}

          {token && <Button ariaLabel='Log out current user'
            onClick={() => navigate("/")}
          >Log Out</Button>}

          {token && <Button ariaLabel='Add an image'
            onClick={() => handleAddClick()}
          >Upload Image</Button>}
        </div>
      </nav>
    );
};

export default NavBar;









