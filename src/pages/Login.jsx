import VLogo from "../assets/VLogo.png"
import "../styles/Login.css"

function Login() {
  return (
    <div className="login-card">
        <a className="auth-brand" href="../index.html">
        <img src={VLogo} alt="Logo" className="brand-logo-image" />
        </a>
        <h2>Log in to view this page</h2>
        <div className="social-login">
            <button class="btn-social btn-facebook">
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
                    <i className="fa-regular fa-eye-slash toggle-password" id="togglePassword"></i>
                 </div>

                 <div className="forgot-password">
                    <a href="#">Forgot password</a>
                 </div>

                <button type="submit" id="loginButton" class="btn-submit">Log in</button>
                <p id="loginMessage" className="form-message" role="status" aria-live="polite"></p>                     
            </form>
        <div className="signup-footer">
            <p>Don't have an account yet? <a href="signup.html">Sign up</a></p>
        </div>
    </div>
  );
}

export default Login;