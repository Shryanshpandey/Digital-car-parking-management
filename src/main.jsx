import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ParkingProvider } from './context/ParkingContext.jsx';
import './index.css';
createRoot(document.getElementById('root')).render(
  <BrowserRouter><ParkingProvider><App /></ParkingProvider></BrowserRouter>
);
