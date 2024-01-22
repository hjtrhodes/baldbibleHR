// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
const navigate = useNavigate();

const logout = () => {
    // Implement your logic to clear user-related information
    removeExpiredToken();
    // Additional logout logic (e.g., show alert)
    alert('You have been logged out.');
    // If you want to provide the option to navigate to the login page, you can use a confirm dialog
    const userDecision = window.confirm('Do you want to go to the login page?');
    if (userDecision) {
      // If the user clicks OK, navigate to the login page
    navigate('/login');
    } else {
      // If the user clicks Cancel, you can handle it here (e.g., do nothing)
        console.log('User decided to stay on the current page.');
    }
};

const removeExpiredToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
};

    const handleLogout = () => {
    logout();
    navigate('/');
    };

return (
    <button
        ariaLabel='Log out current user'
        onClick={handleLogout}
        className="btn"
    >
        Log Out
    </button>
);
};

export default Logout;
