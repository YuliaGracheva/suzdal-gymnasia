import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { SearchProvider } from "../src/Components/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SearchProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SearchProvider>
  </BrowserRouter>
);
reportWebVitals();
