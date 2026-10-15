import { Link } from "react-router-dom";
import VLogo from "../assets/VLogo.png"
import "../styles/Login.css"

function Login() {
return (
    <div className="loginPage">
        <div className="login-card">
            <a className="auth-brand" href="../index.html">
                <img src={VLogo} alt="Logo" className="brandlogoimage" />
            </a>

            <h2>Log in to view this page</h2>

            <div className="social-login">
                <button className="btn-social btn-facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                    <span>Log in with Facebook</span>
                </button>
                <button className="btn-social btn-google">
                    <i className="fa-brands fa-google"></i>
                    <span>Log in with Google</span>
                </button>
                <button className="btn-social btn-apple">
                    <i className="fa-brands fa-apple"></i>
                    <span>Log in with Apple</span>
                </button>
            </div>

            <div className="divider">
                <span>or</span>
            </div>

            <form id="loginForm" className="login-form">
                <div className="input-group">
                    <input type="email" id="email" name="email" placeholder="Email" required/>
                </div>
                <div className="input-group password-group">
                    <input type="password" id="password" placeholder="Password" required/>
                    {/* <i className="fa-regular fa-eye-slash toggle-password" id="togglePassword"></i> */}
                </div>
            </form>
            <div className="forgot-password">
                <a href="#">Forgot password</a>
            </div>

            <button type="submit" id="loginButton" className="btn-submit">Log in</button>
    
            <div className="role-selection-section">
                <p className="signup-label">New to VentureVista? Choose your account type:</p>
                <div className="role-buttons">
                    <Link to="/Login/travelerSignup" className="btn-role btn-traveler">Sign Up as Traveler</Link>
                    <Link to="/Login/guideSignup" className="btn-role btn-guide">Sign Up as Local Guide</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;