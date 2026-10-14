import "../styles/Header.css"
import VLogo from "../assets/VLogo.png"

function Header() {
    return (
        <header className="navbar">
            <div className="nav-left">
                <img src={VLogo} alt="Logo" className="brand-logo-image" />
                <nav className="nav-links">
                    <a href="#" className="active">Home</a>
                    <a href="#">Permission</a>
                    <a href="#">Hotels</a>
                </nav>
            </div>
            <div className="nav-right">
                <a href="#" className="btn-login">Log in</a>
                <a href="#" className="btn-signup">Sign up</a>
            </div>
        </header>   
    );
}

export default Header;
