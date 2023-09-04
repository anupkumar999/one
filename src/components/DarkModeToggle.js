// DarkModeToggle.js
import React, { useState } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    const theme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="dark-mode-toggle">
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
}

export default DarkModeToggle;
