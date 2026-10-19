import "../styles/Navbar.css"
import VLogo from "../assets/VLogo.png"

function Navbar( { onLoginSection, isLoggedIn } ) {
    return (
        <header className="navbar">
            <div className="nav-left">
                <img src={VLogo} alt="Logo" className="brand-logo-image" />
                <nav className="nav-links">
                    <a href="#" className="nav-link">Home</a>
                </nav>
            </div>
            <div className="nav-right">
                {!isLoggedIn && <button type="button" className="btn-login" onClick={() => {onLoginSection()}}>Log in</button>}
            </div>
        </header>   
    );
}

export default Navbar;
