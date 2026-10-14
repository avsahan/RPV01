import { useState } from 'react';
import '../styles/Home.css';

const Home = ({ role, onBack }) => {
  const [guidePhoto, setGuidePhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGuidePhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="home-container">
      <button className="btn-back" onClick={onBack}>← Back to Login</button>

      {role === 'traveler' ? (
        <div className="registration-card">
          <h2>Traveler Registration</h2>
          <p className="subtitle">Discover local experiences and book Sri Lankan guides.</p>

          <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
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
      ) : (
        <div className="registration-card">
          <h2>Tour Guide Registration</h2>
          <p className="subtitle">Set up your guide profile and connect with tourists.</p>

          <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group full-width photo-upload-group">
              <img src={guidePhoto} alt="Guide Avatar" className="avatar-preview" />
              <div>
                <label className="upload-btn">
                  Upload Profile Photo
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
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
      )}
    </div>
  );
};

export default Home;
