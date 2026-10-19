import { useState } from "react";
import VLogo from "../assets/VLogo.png"
import "../styles/Login.css"

function Login( { onSignTraveler, onSignGuide, onLoginSuccess } ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
         try {
             const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                alert(data.message);
                return;
                }

                alert("Login successful! Welcome " + data.user.name);
                onLoginSuccess(data.user);

  } catch (error) {
    console.error("Login error:", error);
    alert("Cannot connect to the server.");
  }
};

    return (
        <div className="loginPage">
            <div className="login-card">
                <a className="auth-brand" href="../index.html">
                    <img src={VLogo} alt="Logo" className="brandlogoimage" />
                </a>

                <form id="loginForm" className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input type="email" id="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-group password-group">
                        <input type="password" id="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" id="loginButton" className="btn-submit">Log in</button>

                </form>
        
                <div className="role-selection-section">
                    <p className="signup-label">New to VentureVista? Choose your account type:</p>
                    <div className="role-buttons">
                        <button className="btn-role btn-traveler" onClick={onSignTraveler}>Sign Up as Traveler</button>
                        <button className="btn-role btn-guide" onClick={onSignGuide}>Sign Up as Local Guide</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;