import React, { useState } from 'react';
import '../styles/Header.css';
import VLogo from '../assets/VLogo.png';

const Header = ({ onAuthClick, onSearch }) => {
  const [destination, setDestination] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(destination.trim());
  };

  return (
    <header className="app-header">
      <div className="header-shell">
        <div className="brand-group">
          <a className="brand-block" href="#home" aria-label="VentureVista home">
            <img src={VLogo} alt="VentureVista" className="header-logo" />
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#features" className="nav-link">Permission</a>
            <a href="#hotels" className="nav-link">Hotels</a>
          </nav>
        </div>

        <div className="header-actions">
          <form className="search-box" role="search" onSubmit={handleSearch}>
            <span className="search-icon" aria-hidden="true" />
            <input
              type="search"
              aria-label="Explore by destination"
              placeholder="Explore by destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </form>

          <button type="button" className="login-btn" onClick={onAuthClick}>Log in</button>
          <button type="button" className="signup-btn" onClick={onAuthClick}>Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
