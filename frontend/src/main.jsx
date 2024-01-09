// This is the entry point for the Vue application, we shouldn't need to change much in here

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-montserrat';

// Create a React root using ReactDOM.createRoot and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  // Enable development features and strict mode with <React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
