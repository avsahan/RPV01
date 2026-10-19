import "../styles/Home.css"

function Home( {onLoginSection} ) {
  return (
        <main className="home-container">
            <section className="hero-section">
                <h1>One app for all your travel planning needs</h1>
                <p>Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.</p>
                <div className="hero-buttons">
                    <button type="button" className="btn-primary" onClick={onLoginSection}>Start planning</button>
                </div>
            </section>
        </main>
  );
}

export default Home;