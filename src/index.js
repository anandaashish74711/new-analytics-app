import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create a root for concurrent rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
