// This is where our routes should go - I have deleted the boilerplate content
import React from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Image from './components/Image/Image'

function App() {

  return (
    <>
    

{/* Any component put here will appear globally, for example the Navbar may go here. */}
      <NavBar navigate={useNavigate()} />
          <Routes>
            <Route path="/" element={<Home navigate={useNavigate()}/>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/image" element={<Image />} />
{/* All other Routes Go Here */}

          </Routes>

    </>
  );
}

export default App
