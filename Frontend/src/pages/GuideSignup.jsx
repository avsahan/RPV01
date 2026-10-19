import { useState } from "react";
import ProfilePic from "../assets/ProfilePic.avif";
import "../styles/GuideSignup.css";

function GuideSignup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [fee, setFee] = useState("Culture & Heritage");
  const [licence, setLicence] = useState("");
  const [bio, setBio] = useState("");


  const registration = () => {

  }
  
  return (
    <div className="GuideSignupPage">
      <div className="home-container">
        <div className="registration-card">
          <h2>Tour Guide Registration</h2>
          <p className="subtitle">
            Set up your guide profile and connect with tourists.
          </p>

          <form className="form-grid" onSubmit={registration}>
            <div className="form-group full-width photo-upload-group">
              <img
                src={ProfilePic}
                alt="Guide Avatar"
                className="avatar-preview"
              />
              <div>
                <label className="upload-btn">
                  Upload Profile Photo
                  <input type="file" className="choose-file" hidden />
                </label>
                <span className="upload-hint">JPG or PNG (Max 2MB)</span>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={name} placeholder="Nuwan Jayawardena" required onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Contact Phone Number</label>
              <input type="tel" value={phone} placeholder="+94 77 123 4567" required onChange={(e) => setPhone(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} placeholder="example@gmail.com" required onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="text" value={password} placeholder="••••••••" required onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Base Location / Region</label>
              <input
                type="text"
                placeholder="e.g. Ella & Central Highlands"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <input type="text" value={year} placeholder="e.g. 5+ Years" required onChange={(e) => setYear(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Daily Standard Rate (LKR)</label>
              <input type="number" value={fee} placeholder="12000" required onChange={(e) => setFee(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>SLTDA License Number</label>
              <input type="text" value={licence} placeholder="SLTDA/G/8942" required onChange={(e) => setLicence(e.target.value)}/>
            </div>

            <div className="form-group full-width">
              <label>Short Bio / About You</label>
              <textarea
                rows="3"
                value={bio}
                placeholder="Describe your guide expertise and favorite local spots..."
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Register as Verified Guide
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GuideSignup;
