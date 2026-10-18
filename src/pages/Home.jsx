import { Link } from "react-router-dom";
import Header from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import "../styles/Home.css"

function Home() {
  return (
    <>
        <Header />
        <main className="home-container">
            <section className="hero-section">
                <h1>One app for all your travel planning needs</h1>
                <p>Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.</p>
                <div className="hero-buttons">
                    <Link to="/Login" className="btn-primary" href="/Login">Start planning</Link>
                </div>
            </section>
        </main>
        <Footer />
    </>
    
  );
}

export default Home;