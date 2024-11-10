import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles
import App from './App'; // Main app component
import reportWebVitals from './reportWebVitals';

// Create a root element to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance if needed
// reportWebVitals(console.log); // Uncomment if you want to measure performance
reportWebVitals();
