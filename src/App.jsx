import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import './styles/App.css';

const featureCards = [
  { icon: '✈', title: 'Plan flights', text: 'Add flight plans and organize travel details in a few clicks.' },
  { icon: '📍', title: 'Create guides', text: 'Build custom itineraries and save your favorite stops along the way.' },
  { icon: '🧳', title: 'Travel essentials', text: 'Keep bookings, documents, and reminders all in one place.' },
  { icon: '🗺', title: 'Discover routes', text: 'Map scenic drives, train rides, and local experiences with ease.' },
  { icon: '🧾', title: 'Manage budgets', text: 'Track spending and compare costs before finalizing a trip.' },
  { icon: '💬', title: 'Stay inspired', text: 'Browse ideas, stories, and tips shared by fellow travelers.' },
];

const reviews = [
  { name: 'Nadia', text: 'Everything stayed organized from flight to hotel without any stress.' },
  { name: 'Marcus', text: 'The trip plans were simple, visual, and easy to share with friends.' },
  { name: 'Aisha', text: 'I found hidden places and made better route decisions with this app.' },
  { name: 'Liam', text: 'It made our family trip easier to plan and more enjoyable to enjoy.' },
];

const adventures = [
  { title: 'Paris 1 Day Tour', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80' },
  { title: 'Lake Cabin Retreat', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { title: 'Swiss Alps Escape', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80' },
  { title: 'Island Weekend', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80' },
];

const footerColumns = [
  { heading: 'Travel', links: ['Discover', 'Plan trips', 'Popular guides', 'Itineraries'] },
  { heading: 'Company', links: ['About', 'Careers', 'Press', 'Support'] },
  { heading: 'Resources', links: ['Blog', 'Travel tips', 'Community', 'FAQs'] },
];

function LandingView({ onStartPlanning, destinationSearch }) {
  const matchingAdventures = adventures.filter((item) =>
    item.title.toLowerCase().includes(destinationSearch.toLowerCase()),
  );

  return (
    <>
      <main className="home-page" id="home">
        <section className="hero-section">
          <h1>One app for all your travel planning needs</h1>
          <p>
            Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.
          </p>
          <button className="primary-button" onClick={onStartPlanning}>Start planning</button>
        </section>

        <section className="feature-section" id="features">
          <h2>Features tools</h2>
          <div className="feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="feature-card">
                <div className="feature-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
          <button className="secondary-button" onClick={onStartPlanning}>Start planning</button>
        </section>

        <section className="reviews-section">
          <h2>What travelers are saying about</h2>
          <div className="review-grid">
            {reviews.map((review) => (
              <article key={review.name} className="review-card">
                <span className="review-rating">★★★★★</span>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="adventure-section" id="hotels">
          <h2>Find your next adventure</h2>
          <div className="adventure-grid">
            {matchingAdventures.map((item) => (
              <article key={item.title} className="adventure-card">
                <img src={item.image} alt={item.title} />
                <div className="adventure-copy">
                  <h3>{item.title}</h3>
                  <button type="button">Explore</button>
                </div>
              </article>
            ))}
          </div>
          {destinationSearch && matchingAdventures.length === 0 && (
            <p className="search-empty-state" role="status">
              No destinations match “{destinationSearch}”. Try another search.
            </p>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="brand-block">
            <div className="footer-logo">V</div>
            <p>Plan every step of your journey with clarity and confidence.</p>
          </div>

          {footerColumns.map((group) => (
            <div key={group.heading} className="footer-column">
              <h4>{group.heading}</h4>
              <ul>
                {group.links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="newsletter">
            <h4>Get the app</h4>
            <div className="download-buttons">
              <button type="button">App Store</button>
              <button type="button">Google Play</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Velo. All rights reserved.</span>
          <div className="legal-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookie</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [activePage, setActivePage] = useState('landing');
  const [selectedRole, setSelectedRole] = useState(null);
  const [destinationSearch, setDestinationSearch] = useState('');

  const handleStartPlanning = () => {
    setActivePage('login');
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setActivePage('registration');
  };

  const handleBackToLogin = () => {
    setActivePage('login');
    setSelectedRole(null);
  };

  const handleDestinationSearch = (query) => {
    setDestinationSearch(query);
    setActivePage('landing');
  };

  return (
    <div className="app-main">
      <Header onAuthClick={handleStartPlanning} onSearch={handleDestinationSearch} />
      <main className="content-body">
        {activePage === 'landing' && (
          <LandingView onStartPlanning={handleStartPlanning} destinationSearch={destinationSearch} />
        )}
        {activePage === 'login' && <Login onRoleSelect={handleRoleSelect} />}
        {activePage === 'registration' && <Home role={selectedRole} onBack={handleBackToLogin} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;