import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Accessible.css';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import HeaderRoutes from './Components/HeaderRoutes.js';

import { AccessibilityProvider } from './Components/context/AccessibilityContext.js';
import AccessibilityHandler from './Components/AccessibilityHandler.js';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <AccessibilityProvider>
      <AccessibilityHandler />
      <div className='wrapper'>
        {!isAdminPage && <Header />}
        <HeaderRoutes />
        {!isAdminPage && <Footer />}
      </div>
    </AccessibilityProvider>
  );
}

export default App;
