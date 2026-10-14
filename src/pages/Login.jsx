import React, { useState } from 'react';
import '../styles/Login.css';
import VLogo from '../assets/VLogo.png';

const Login = ({ onRoleSelect }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-card">
      <div className="login-header">
        <img src={VLogo} alt="VentureVista Logo" className="main-logo" />
        <h2>Log in to view this page</h2>
      </div>

      <div className="social-buttons">
        <button className="btn-social btn-facebook">
          <span>Log in with Facebook</span>
        </button>
        <button className="btn-social btn-google">
          <span>Log in with Google</span>
        </button>
        <button className="btn-social btn-apple">
          <span>Log in with Apple</span>
        </button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          className="input-field"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <a href="#forgot" className="forgot-link">Forgot password?</a>

        <button type="submit" className="btn-login">Log in</button>
      </form>

      <div className="role-selection-section">
        <p className="signup-label">New to VentureVista? Choose your account type:</p>
        <div className="role-buttons">
          <button 
            className="btn-role btn-traveler" 
            onClick={() => onRoleSelect('traveler')}
          >
            Sign Up as Traveler
          </button>
          <button 
            className="btn-role btn-guide" 
            onClick={() => onRoleSelect('guide')}
          >
            Sign Up as Local Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;