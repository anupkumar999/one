// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Replace with your main component
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div data-theme="light"> {/* Set the default data-theme attribute */}
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
