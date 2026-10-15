import { Link } from "react-router-dom";
import "../styles/Header.css"
import VLogo from "../assets/VLogo.png"

function Header() {
    return (
        <header className="navbar">
            <div className="nav-left">
                <img src={VLogo} alt="Logo" className="brand-logo-image" />
                <nav className="nav-links">
                    <a href="#" className="active">Home</a>
                    {/* <a href="#">Permission</a>
                    <a href="#">Hotels</a> */}
                </nav>
            </div>
            <div className="nav-right">
                <Link to="/login" className="btn-login">Log in</Link>
            </div>
        </header>   
    );
}

export default Header;
