// This is where our routes should go - I have deleted the boilerplate content
// import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

function App() {

  return (
    <>
      <Router>
{/* Any component put here will appear globally, for example the Navbar may go here. */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
{/* All other Routes Go Here */}

          </Routes>
      </Router>
    </>
  );
}

export default App
