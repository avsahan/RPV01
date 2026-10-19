import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import TravelHome from './pages/travel-Home';
import AddDate from './pages/Add-date';
import GuideSelect from './pages/guide-select';
import TravelerDashboard from './pages/TravelerDashboard';
import GuideDashboard from './pages/GuideDashboard';
import Permission from './pages/Permission';
import { createBooking, createTrip, getCurrentUser, logout, updateTrip } from './api/auth';
import './styles/App.css';

const featureCards = [
  { icon: '✈', title: 'Plan flights', text: 'Add flight plans and organize travel details in a few clicks.' },
  { icon: '📍', title: 'Create guides', text: 'Build custom itineraries and save your favorite stops along the way.' },
  { icon: '🧳', title: 'Travel essentials', text: 'Keep bookings, documents, and reminders all in one place.' },
  { icon: '🗺', title: 'Discover routes', text: 'Map scenic drives, train rides, and local experiences with ease.' },
  { icon: '🧾', title: 'Manage budgets', text: 'Track spending and compare costs before finalizing a trip.' },
  { icon: '💬', title: 'Stay inspired', text: 'Browse ideas, stories, and tips shared by fellow travelers.' },
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

function LandingView({ onStartPlanning }) {
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

        <section className="adventure-section" id="hotels">
          <h2>Find your next adventure</h2>
          <div className="adventure-grid">
            {adventures.map((item) => (
              <article key={item.title} className="adventure-card">
                <img src={item.image} alt={item.title} />
                <div className="adventure-copy">
                  <h3>{item.title}</h3>
                  <button type="button">Explore</button>
                </div>
              </article>
            ))}
          </div>
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
  const [tripDetails, setTripDetails] = useState({});
  const [pendingTrip, setPendingTrip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    getCurrentUser()
      .then(({ user }) => {
        if (!isMounted) return;
        setCurrentUser(user);
        setActivePage(user.role === 'guide' ? 'guide-dashboard' : 'dashboard');
      })
      .catch(() => {})
      .finally(() => {
        isMounted = false;
      });
  }, []);

  const handleStartPlanning = () => {
    setActivePage('planner');
  };

  const tripPayload = (details) => ({
    destination: details.destination,
    startDate: details.startDate || null,
    endDate: details.endDate || null,
    visibility: details.visibility || 'friends',
    budget: Number(details.budget) || 60000,
    activities: details.activities || [],
  });

  const handleStartTrip = async (details) => {
    if (!currentUser) {
      setTripDetails({
        ...details,
        destination: details.destination.trim(),
        startDate: details.startDate || null,
        endDate: details.endDate || null,
        visibility: details.visibility || 'friends',
      });
      setAuthMessage('');
      setActivePage('itinerary');
      return;
    }
    if (currentUser.role !== 'traveler') {
      setAuthMessage('Only traveler accounts can create trips.');
      return;
    }

    try {
      const { trip } = await createTrip(tripPayload(details));
      setTripDetails({ ...details, ...trip });
      setAuthMessage('');
      setActivePage('itinerary');
    } catch (error) {
      setAuthMessage(error.message);
    }
  };

  const handleSaveTrip = async (details) => {
    if (!tripDetails.id && !currentUser) {
      setPendingTrip(details);
      setAuthMessage('Log in as a traveler to save your trip.');
      setActivePage('login');
      throw new Error('Log in as a traveler to save your trip.');
    }
    if (!tripDetails.id) throw new Error('Start a trip before saving the itinerary.');
    const { trip } = await updateTrip(tripDetails.id, tripPayload(details));
    setTripDetails((current) => ({ ...current, ...trip }));
    return trip;
  };

  const handleRequestGuide = async (guide) => {
    if (!tripDetails.id || !guide.id) {
      throw new Error('Save your trip and choose a registered guide to send a request.');
    }
    return createBooking(tripDetails.id, {
      guideId: guide.id,
      offeredBudget: guide.price || 0,
      message: `Please guide me in ${tripDetails.destination}.`,
    });
  };

  const handleFindGuides = () => {
    setActivePage('guides');
  };

  const handleAuthClick = () => {
    setAuthMessage('');
    setActivePage('login');
  };

  const navigateToLandingSection = (sectionId) => {
    setActivePage('landing');
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleLoginSuccess = async () => {
    const { user } = await getCurrentUser();
    setCurrentUser(user);
    setAuthMessage('');
    if (pendingTrip) {
      if (user.role !== 'traveler') {
        setAuthMessage('Sign in with a traveler account to save your trip.');
        setActivePage('guide-dashboard');
        return;
      }
      const { trip } = await createTrip(tripPayload(pendingTrip));
      setTripDetails({ ...pendingTrip, ...trip });
      setPendingTrip(null);
      setActivePage('itinerary');
      return;
    }
    setActivePage(user.role === 'guide' ? 'guide-dashboard' : 'dashboard');
  };

  const handleDashboardNavigation = () => {
    if (!currentUser) {
      setAuthMessage('Log in to view your dashboard.');
      setActivePage('login');
      return;
    }

    setAuthMessage('');
    setActivePage(currentUser.role === 'guide' ? 'guide-dashboard' : 'dashboard');
  };

  const handleGuideDashboardNavigation = () => {
    if (currentUser?.role !== 'guide') {
      setAuthMessage(currentUser
        ? 'The guide dashboard is only available to guide accounts.'
        : 'Log in with a guide account to open the guide dashboard.');
      setActivePage(currentUser ? 'dashboard' : 'login');
      return;
    }

    setAuthMessage('');
    setActivePage('guide-dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthMessage('');
      setCurrentUser(null);
      setActivePage('landing');
    } catch (error) {
      setAuthMessage(error.message);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setActivePage('registration');
  };

  const handleBackToLogin = () => {
    setActivePage('login');
    setSelectedRole(null);
  };

  return (
    <div className="app-main">
      <Header
        onAuthClick={handleAuthClick}
        onHomeClick={() => navigateToLandingSection('home')}
        onHotelsClick={() => navigateToLandingSection('hotels')}
        currentUser={currentUser}
        onLogout={handleLogout}
        authMessage={authMessage}
        onDashboardClick={handleDashboardNavigation}
        isDashboard={activePage === 'dashboard'}
        onGuideDashboardClick={handleGuideDashboardNavigation}
        isGuideDashboard={activePage === 'guide-dashboard'}
        onPermissionClick={() => setActivePage('permission')}
        isPermission={activePage === 'permission'}
      />
      <main className="content-body">
        {activePage === 'landing' && (
          <LandingView onStartPlanning={handleStartPlanning} />
        )}
        {activePage === 'login' && <Login onRoleSelect={handleRoleSelect} onLoginSuccess={handleLoginSuccess} />}
        {activePage === 'registration' && <Home role={selectedRole} onBack={handleBackToLogin} />}
        {activePage === 'planner' && <TravelHome onStartTrip={handleStartTrip} />}
        {activePage === 'itinerary' && (
          <AddDate
            tripDetails={tripDetails}
            onBack={() => setActivePage('planner')}
            onHome={() => setActivePage('landing')}
            onContinue={handleFindGuides}
            onSaveTrip={handleSaveTrip}
          />
        )}
        {activePage === 'guides' && (
          <GuideSelect tripDetails={tripDetails} onBack={() => setActivePage('itinerary')} onRequestGuide={handleRequestGuide} />
        )}
        {activePage === 'dashboard' && (
          <TravelerDashboard currentUser={currentUser} onPlanTrip={() => setActivePage('planner')} />
        )}
        {activePage === 'guide-dashboard' && <GuideDashboard currentUser={currentUser} />}
        {activePage === 'permission' && (
          <Permission onCancel={() => setActivePage('landing')} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;