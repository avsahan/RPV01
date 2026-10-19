import { useState } from "react";
import "../styles/TravelerSignup.css"

function TravelerSignup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preference, setPreference] = useState("Culture & Heritage");

  function handleRegistation() {
    fetch("http://localhost:5000/api/register", {
        method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      password: password,
      preference: preference,
      role: "traveler"
    })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if(!data.message) {
        throw new Error("Unexpected server response");
      }
    })
     .catch((error) => {
      console.error("Registration error:", error);
    })
  }

  return (
    <div className="TravelerSignupPage">
      <div className="home-container">
            <div className="registration-card">
              <h2>Traveler Registration</h2>
              <p className="subtitle">Discover local experiences and book Sri Lankan guides.</p>

              <form className="form-grid"   onSubmit={(e) => { e.preventDefault(); handleRegistation();}}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input value={name} type="text" placeholder="John Doe" required onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label>Tele-Number</label>
                  <input value={phone} type="text" placeholder="e.g. 07X XXX XXX" required onChange={(e) => setPhone(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input value={email} type="email" placeholder="example@gmail.com" required onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input value={password} placeholder="••••••••" required onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="form-group full-width">
                  <label>Travel Preferences</label>
                  <select  value={preference} onChange={(e) => setPreference(e.target.value)}>
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