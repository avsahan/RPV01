import "../styles/TravelerSignup.css"

function TravelerSignup() {
  return (
    <div className="TravelerSignupPage">
      <div className="home-container">
            <div className="registration-card">
              <h2>Traveler Registration</h2>
              <p className="subtitle">Discover local experiences and book Sri Lankan guides.</p>

              <form className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>

                <div className="form-group">
                  <label>Tele-Number</label>
                  <input type="text" placeholder="e.g. 07X XXX XXX" required />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="example@gmail.com" required />
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
      </div>
  );
}

export default TravelerSignup;