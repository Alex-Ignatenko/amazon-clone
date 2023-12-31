import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from'react-helmet-async';
import axios from 'axios';
import { StoreProvider } from './context/store';


axios.defaults.baseURL = 'http://localhost:5000/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
          <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
