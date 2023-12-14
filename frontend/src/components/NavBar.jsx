// NavBar.js

import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ navigate }) => {
    const logout = () => {
      window.localStorage.clear();
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('token');
    };
  
    return (
      <nav className="nav">
        {/* Baldbible button */}
        <button className="btn-12 baldbible-button" onClick={() => navigate("/")}>
          <span>Baldbible</span>
        </button>
  
        {/* Spacer to push buttons to the right */}
        <div className="spacer" />
  
        {/* SignUp and Login buttons with reduced spacing */}
        <div className="linkcontainer">
          <button className="btn-12" onClick={() => navigate("/SignUp")}>
            <span>SignUp</span>
          </button>
  
          <button className="btn-12" onClick={() => navigate("/Login")}>
            <span>Login</span>
          </button>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
