import { useState } from 'react';
import '../styles/GuideDashboard.css';
import GuideHeader from '../components/GuideHeader';

const guide = {
  name: 'Nuwan Jayawardena',
  initials: 'NJ',
  title: 'Hiking & Tea Country Specialist • Ella & Central Highlands',
  bio: 'I help travelers discover Sri Lanka at a gentler pace — from hidden tea trails to local flavors and unforgettable hill-country views.',
  photo: '/image/guide-nuwan.png',
  dailyFee: 12000,
  baseLocation: 'Ella, Sri Lanka',
  experience: '8+ Years',
  phone: '+94 77 123 4567',
  license: 'SLTDA/G/8942',
};

const initialRequests = [
  {
    id: 'BKG-1001',
    title: 'Ella Rock Sunrise Hike',
    location: 'Ella, Sri Lanka',
    traveler: 'Liam Chen',
    budget: 10000,
    date: 'Nov 10, 2026',
    dateLong: 'Tue, Nov 10, 2026',
    travelers: 1,
    duration: '6 hours',
    message: 'Looking for a sunrise hike up Ella Rock.',
    status: 'declined',
    image: '.image/ella-rock.jpeg',
  },
  {
    id: 'BKG-1002',
    title: 'A Gentle Day in Ella & Tea Plantations',
    location: 'Ella, Sri Lanka',
    traveler: 'Alex Morgan',
    travelerNote: 'First-time visitor',
    budget: 12000,
    date: 'Nov 12, 2026',
    dateLong: 'Thu, Nov 12, 2026',
    travelers: 2,
    duration: '1 Full Day (8 Hours)',
    message:
      'Hi Nuwan! We are looking for a gentle hike through the tea fields (Little Adam’s Peak), local tea tasting, and visit to Nine Arch Bridge. We want to take it slow and enjoy local cuisine.',
    status: 'pending',
    image: '/image/ella_tea.jpeg',
  },
  {
    id: 'BKG-1003',
    title: 'Early Morning Sigiriya & Pidurangala Climb',
    location: 'Sigiriya, Sri Lanka',
    traveler: 'Sarah & Daniel',
    budget: 15000,
    date: 'Nov 15, 2026',
    dateLong: 'Sun, Nov 15, 2026',
    travelers: 2,
    duration: 'Sunrise Tour (6 Hours)',
    message:
      'Looking for an experienced local guide for sunrise hike up Pidurangala followed by Sigiriya Fortress history tour. Need transportation guidance from Dambulla.',
    status: 'pending',
    image: '/image/sigiriya.jpeg',
  },
  {
    id: 'BKG-1004',
    title: 'Kandy Heritage & Lake Walk',
    location: 'Kandy, Sri Lanka',
    traveler: 'Emma & James Wilson',
    travelerNote: 'United Kingdom · 2 adults',
    travelerAbout: 'Interested in culture, local food, and gentle walks. This is their first visit to Kandy.',
    budget: 12000,
    date: 'Nov 20, 2026',
    dateLong: 'Fri, Nov 20, 2026',
    travelers: 2,
    duration: '1 Full Day (8 Hours)',
    message: 'Looking forward to meeting you! Is the hotel entrance the best place to meet?',
    status: 'accepted',
    image: '/image/kandy.jpeg',
    itinerary: [
      { time: '08:30', title: 'Welcome & lakeside walk', text: 'Meet Emma and James, then take a relaxed walk around Kandy Lake.' },
      { time: '10:00', title: 'Temple of the Sacred Tooth Relic', text: 'Discover the temple’s history and local traditions. Modest clothing required.' },
      { time: '12:30', title: 'Local lunch & market visit', text: 'Explore Sri Lankan flavors and browse the city’s colorful market.' },
      { time: '14:30', title: 'Royal Botanical Gardens', text: 'Easy afternoon visit in Peradeniya, return to Kandy by 4:30 PM.' },
    ],
  },
];

const statusLabels = {
  pending: 'Pending decision',
  accepted: 'Confirmed',
  declined: 'Declined',
};

const formatMoney = (amount) => `LKR ${amount.toLocaleString('en-US')}`;

function GuideStatus({ status }) {
  return (
    <span className={`gd-status gd-status--${status}`}>
      <span aria-hidden="true" /> {statusLabels[status]}
    </span>
  );
}

function GuideDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('pending');
  const [counterId, setCounterId] = useState(null);
  const [counterValue, setCounterValue] = useState('');
  const [messagedIds, setMessagedIds] = useState([]);

  const pending = requests.filter((request) => request.status === 'pending');
  const accepted = requests.filter((request) => request.status === 'accepted');

  const tabs = [
    { id: 'pending', label: 'Pending Requests', icon: '◷', count: pending.length },
    { id: 'accepted', label: 'Accepted Trips', icon: '✓', count: accepted.length },
    { id: 'all', label: 'All Requests', icon: '≡', count: requests.length },
  ];

  const updateStatus = (id, status) => {
    setRequests((current) => current.map((request) => (request.id === id ? { ...request, status } : request)));
    setCounterId(null);
  };

  const sendCounter = (id) => {
    const amount = Number(counterValue);
    if (!amount || amount <= 0) return;
    setRequests((current) => current.map((request) => (request.id === id ? { ...request, budget: amount } : request)));
    setCounterId(null);
    setCounterValue('');
  };

  const openCounter = (id) => {
    setCounterId(id);
    setCounterValue('');
  };

  const messageTraveler = (id) => {
    setMessagedIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  return (
    <>
      <GuideHeader />
      <main className="gd-dashboard">
        <div className="gd-dashboard__inner">
          <section className="gd-profile" aria-label="Guide profile">
            <div className="gd-profile__top">
              <img className="gd-profile__photo" src={guide.photo} alt={guide.name} />
              <div className="gd-profile__info">
                <h1>
                  {guide.name}
                  <span className="gd-verified"><span aria-hidden="true">✓</span> Verified Guide</span>
                </h1>
                <p className="gd-profile__title">{guide.title}</p>
                <p className="gd-profile__bio">{guide.bio}</p>
              </div>
              <div className="gd-fee">
                <span>Standard Daily Fee</span>
                <p><strong>{formatMoney(guide.dailyFee)}</strong> / day</p>
                <small><span aria-hidden="true" /> Available for Instant Booking</small>
              </div>
            </div>
            <div className="gd-profile__bottom">
              <div className="gd-detail"><span>Base location</span><strong>{guide.baseLocation}</strong></div>
              <div className="gd-detail"><span>Experience</span><strong>{guide.experience}</strong></div>
              <div className="gd-detail"><span>Contact phone</span><strong>{guide.phone}</strong></div>
              <div className="gd-detail"><span>License no.</span><strong>{guide.license}</strong></div>
              <button className="gd-button" type="button"><span aria-hidden="true">✎</span> Edit Profile &amp; Details</button>
            </div>
          </section>

          <div className="gd-tabs" role="tablist" aria-label="Guide dashboard sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`gd-tab-${tab.id}`}
                className={`gd-tab${activeTab === tab.id ? ' is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`gd-panel-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCounterId(null);
                }}
              >
                <span aria-hidden="true">{tab.icon}</span>
                {tab.label}
                <span className="gd-tab__count">{tab.count}</span>
              </button>
            ))}
          </div>

          {activeTab === 'pending' && (
            <section className="gd-panel" id="gd-panel-pending" role="tabpanel" aria-labelledby="gd-tab-pending">
              {pending.length === 0 && <p className="gd-empty">No pending requests right now.</p>}
              <div className="gd-request-list">
                {pending.map((request) => (
                  <article className="gd-request" key={request.id}>
                    <div className="gd-request__media">
                    <img src={request.image} alt={request.title} />
                    <span className="gd-chip">{request.location}</span>
                    </div>
                    <div className="gd-request__body">
                      <div className="gd-request__top">
                        <div>
                          <h3>{request.title}</h3>
                          <p className="gd-muted">
                            Requested by {request.traveler}
                            {request.travelerNote ? ` · ${request.travelerNote}` : ''}
                          </p>
                        </div>
                       <div className="gd-budget">
                          <span>Offered budget</span>
                          <strong>{formatMoney(request.budget)}</strong>
                        </div>
                      </div>

                      <div className="gd-facts">
                        <span><span aria-hidden="true">▦</span>{request.dateLong}</span>
                        <span><span aria-hidden="true">♧</span>{request.travelers} Traveler{request.travelers > 1 ? 's' : ''}</span>
                        <span><span aria-hidden="true">◷</span>{request.duration}</span>
                      </div>

                      <p className="gd-request__message">“{request.message}”</p>

                      <div className="gd-request__footer">
                        <GuideStatus status={request.status} />
                        {counterId === request.id ? (
                          <div className="gd-counter">
                            <input
                              type="number"
                              min="1"
                              placeholder="Your offer (LKR)"
                              aria-label="Counter offer amount"
                              value={counterValue}
                              onChange={(event) => setCounterValue(event.target.value)}
                            />
                            <button className="gd-button gd-button--primary" type="button" onClick={() => sendCounter(request.id)}>
                              Send offer
                            </button>
                            <button className="gd-button" type="button" onClick={() => setCounterId(null)}>Cancel</button>
                          </div>
                        ) : (
                          <div className="gd-actions">
                            <button className="gd-button" type="button" onClick={() => updateStatus(request.id, 'declined')}>Decline</button>
                            <button className="gd-button" type="button" onClick={() => openCounter(request.id)}>Counter Offer</button>
                            <button className="gd-button gd-button--primary" type="button" onClick={() => updateStatus(request.id, 'accepted')}>
                              <span aria-hidden="true">✓</span> Accept Booking
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'accepted' && (
            <section className="gd-panel" id="gd-panel-accepted" role="tabpanel" aria-labelledby="gd-tab-accepted">
              {accepted.length === 0 && <p className="gd-empty">No accepted trips yet.</p>}
              <div className="gd-request-list">
                {accepted.map((trip) => (
                  <article className="gd-trip" key={trip.id}>
                    <div className="gd-trip__top">
                      <img src={trip.image} alt={trip.title} />
                      <div className="gd-trip__info">
                        <GuideStatus status="accepted" />
                        <h3>{trip.title}</h3>
                        <p className="gd-muted"><span aria-hidden="true">⌖</span> {trip.location}</p>
                        <div className="gd-facts gd-facts--plain">
                          <span><span aria-hidden="true">▦</span>{trip.dateLong}</span>
                          <span><span aria-hidden="true">♧</span>{trip.travelers} Travelers</span>
                          <span><span aria-hidden="true">◷</span>{trip.duration}</span>
                        </div>
                        <p className="gd-muted">Agreed guide fee: <strong>{formatMoney(trip.budget)}</strong></p>
                      </div>
                    </div>

                  <div className="gd-trip__bottom">
                    <div className="gd-itinerary">
                      <h4>Itinerary overview</h4>
                      {(trip.itinerary || []).map((stop) => (
                        <div className="gd-stop" key={stop.time}>
                          <time>{stop.time}</time>
                          <div>
                            <strong>{stop.title}</strong>
                            <p>{stop.text}</p>
                          </div>
                        </div>
                      ))}
                      {!trip.itinerary && <p className="gd-muted">No itinerary added yet.</p>}
                    </div>

                    <aside className="gd-travelers" aria-label="Your travelers">
                      <h4>Your travelers</h4>
                      <strong>{trip.traveler}</strong>
                      {trip.travelerNote && <p>{trip.travelerNote}</p>}
                      {trip.travelerAbout && <p>{trip.travelerAbout}</p>}
                      <blockquote>“{trip.message}”</blockquote>
                      <button
                        className="gd-button gd-button--primary"
                        type="button"
                        onClick={() => messageTraveler(trip.id)}
                      >
                        {messagedIds.includes(trip.id) ? '✓ Message sent' : 'Message Traveler'}
                      </button>
                    </aside>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'all' && (
          <section className="gd-panel" id="gd-panel-all" role="tabpanel" aria-labelledby="gd-tab-all">
            <div className="gd-table-wrap">
              <table className="gd-table">
                <thead>
                  <tr>
                    <th>Tour / booking</th>
                    <th>Traveler</th>
                    <th>Trip date</th>
                    <th>Guide fee</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <div className="gd-table__tour">
                          <img src={request.image} alt="" />
                          <div>
                            <strong>{request.title}</strong>
                            <span>{request.location.split(',')[0]} · #{request.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{request.traveler}</strong>
                        <span>{request.travelers} traveler{request.travelers > 1 ? 's' : ''}</span>
                      </td>
                      <td>
                        <strong>{request.date}</strong>
                        <span>{request.duration}</span>
                      </td>
                      <td><strong>{formatMoney(request.budget)}</strong></td>
                      <td><GuideStatus status={request.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="gd-table__note">Showing all {requests.length} bookings</p>
            </div>
          </section>
        )}
      </div>
    </main>
    </>
  );
}

export default GuideDashboard;