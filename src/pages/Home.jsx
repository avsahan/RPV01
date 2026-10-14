import "../styles/Home.css"
import Header from "../components/Header.jsx"

function Home() {
  return (
    <>
        <Header />
        <main className="home-container">
            <section className="hero-section">
                <h1>One app for all your travel planning needs</h1>
                <p>Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.</p>
                <div className="hero-buttons">
                    <a className="btn-primary" href="/login">Start planning</a>
                </div>
            </section>
    </main>
    </>
    
  );
}

export default Home;
