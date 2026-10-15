import { Link } from "react-router-dom";
import ProfilePic from "../assets/ProfilePic.avif";
import "../styles/GuideSignup.css";

function GuideSignup() {
  return (
    <div className="home-container">
        <Link to="/Login" className="btn-back">← Back to Login</Link>
        <div className="registration-card">
          <h2>Tour Guide Registration</h2>
          <p className="subtitle">Set up your guide profile and connect with tourists.</p>

          <form className="form-grid">
            <div className="form-group full-width photo-upload-group">
              <img src={ProfilePic} alt="Guide Avatar" className="avatar-preview" />
              <div>
                <label className="upload-btn">
                  Upload Profile Photo
                  <input type="file" className="choose-file" hidden/>
                </label>
                <span className="upload-hint">JPG or PNG (Max 2MB)</span>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Nuwan Jayawardena" required />
            </div>

            <div className="form-group">
              <label>Contact Phone Number</label>
              <input type="tel" placeholder="+94 77 123 4567" required />
            </div>

            <div className="form-group">
              <label>Base Location / Region</label>
              <input type="text" placeholder="e.g. Ella & Central Highlands" required />
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <input type="text" placeholder="e.g. 5+ Years" required />
            </div>

            <div className="form-group">
              <label>Daily Standard Rate (LKR)</label>
              <input type="number" placeholder="12000" required />
            </div>

            <div className="form-group">
              <label>SLTDA License Number</label>
              <input type="text" placeholder="SLTDA/G/8942" required />
            </div>

            <div className="form-group full-width">
              <label>Spoken Languages</label>
              <input type="text" placeholder="English, Sinhala, German" required />
            </div>

            <div className="form-group full-width">
              <label>Short Bio / About You</label>
              <textarea rows="3" placeholder="Describe your guide expertise and favorite local spots..."></textarea>
            </div>

            <button type="submit" className="btn-submit">Register as Verified Guide</button>
          </form>
        </div>
    </div>
  );
}

export default GuideSignup;