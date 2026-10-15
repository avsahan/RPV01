import { Link } from "react-router-dom";
import "../styles/TravelerSignup.css"

function TravelerSignup() {
  return (
   <div className="home-container">
      <Link to="/login" className="btn-back">← Back to Login</Link>
        <div className="registration-card">
          <h2>Traveler Registration</h2>
          <p className="subtitle">Discover local experiences and book Sri Lankan guides.</p>

          <form className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label>Country of Origin</label>
              <input type="text" placeholder="e.g. Australia" required />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <div className="form-group full-width">
              <label>Travel Preferences</label>
              <select>
                <option>Culture & Heritage</option>
                <option>Hiking & Adventure</option>
                <option>Beach & Water Sports</option>
                <option>Wildlife & Safari</option>
              </select>
            </div>

            <button type="submit" className="btn-submit">Complete Registration</button>
          </form>
        </div>
    </div>
  );
}

export default TravelerSignup;