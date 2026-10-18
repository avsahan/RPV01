import React, { useState } from 'react';
import '../styles/Header.css';
import VLogo from '../assets/VLogo.png';

const Header = ({ onAuthClick, onSearch, onDashboardClick, isDashboard, onGuideDashboardClick, isGuideDashboard, onPermissionClick, isPermission }) => {
  const [destination, setDestination] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(destination.trim());
  };
  if (isGuideDashboard) return null;

  return (
    <header className="app-header">
      <div className="header-shell">
        <div className="brand-group">
          <a className="brand-block" href="#home" aria-label="VentureVista home">
            <img src={VLogo} alt="VentureVista" className="header-logo" />
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#home" className="nav-link active">Home</a>
            <button
              type="button"
              className={`nav-link nav-dashboard-link${isPermission ? ' active' : ''}`}
              onClick={onPermissionClick}
            >
              Permission
            </button>
            <a href="#hotels" className="nav-link">Hotels</a>
            <button
              type="button"
              className={`nav-link nav-dashboard-link${isDashboard ? ' active' : ''}`}
              onClick={onDashboardClick}
            >
              My trips
            </button>
            <button
              type="button"
              className={`nav-link nav-dashboard-link${isGuideDashboard ? ' active' : ''}`}
              onClick={onGuideDashboardClick}
            >
              For guides
            </button>
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
