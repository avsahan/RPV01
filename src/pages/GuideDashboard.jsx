import { useState } from 'react';
import '../styles/GuideDashboard.css';
import GuideHeader from '../components/GuideHeader';

/* ---------- Icons ---------- */
const Icon = ({ children, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ClockIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
);
const CircleCheckIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></Icon>
);
const FilterIcon = (props) => (
  <Icon {...props}><path d="M3 6h18" /><path d="M7 12h10" /><path d="M10 18h4" /></Icon>
);
const CalendarIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </Icon>
);
const UserIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>
);
const PencilIcon = (props) => (
  <Icon {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></Icon>
);
const PinIcon = (props) => (
  <Icon {...props}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);
const ChatIcon = (props) => (
  <Icon {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>
);
const CheckIcon = (props) => (
  <Icon {...props}><path d="m5 12 5 5L20 7" /></Icon>
);
const ArrowIcon = (props) => (
  <Icon {...props}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></Icon>
);
const ChevronLeftIcon = (props) => (
  <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
);
const ChevronRightIcon = (props) => (
  <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
);

/* ---------- Data ---------- */
const guide = {
  name: 'Nuwan Jayawardena',
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
    image: '/image/ella-rock.jpeg',
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
    travelerInitials: 'EJ',
    travelerNote: 'United Kingdom · 2 adults',
    travelerAbout: 'Interested in culture, local food, and gentle walks. This is their first visit to Kandy.',
    messageFrom: 'Emma',
    messageDate: 'Oct 13, 2026',
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
    { id: 'pending', label: 'Pending Requests', icon: <ClockIcon />, count: pending.length },
    { id: 'accepted', label: 'Accepted Trips', icon: <CircleCheckIcon />, count: accepted.length },
    { id: 'all', label: 'All Requests', icon: <FilterIcon />, count: requests.length },
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
          {/* ---------- Profile ---------- */}
          <section className="gd-profile" aria-label="Guide profile">
            <div className="gd-profile__top">
              <img className="gd-profile__photo" src={guide.photo} alt={guide.name} />
              <div className="gd-profile__info">
                <h1>
                  {guide.name}
                  <span className="gd-verified"><CircleCheckIcon size={14} /> Verified Guide</span>
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
              <button className="gd-button" type="button"><PencilIcon size={14} /> Edit Profile &amp; Details</button>
            </div>
          </section>

          {/* ---------- Tabs ---------- */}
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
                <span className="gd-tab__icon">{tab.icon}</span>
                {tab.label}
                <span className="gd-tab__count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* ---------- Pending ---------- */}
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
                        <span><CalendarIcon size={14} />{request.dateLong}</span>
                        <span><UserIcon size={14} />{request.travelers} Traveler{request.travelers > 1 ? 's' : ''}</span>
                        <span><ClockIcon size={14} />{request.duration}</span>
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
                              <CheckIcon size={15} /> Accept Booking
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

          {/* ---------- Accepted ---------- */}
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
                        <p className="gd-muted gd-muted--icon"><PinIcon size={14} /> {trip.location}</p>
                        <div className="gd-facts gd-facts--plain">
                          <span><CalendarIcon size={14} />{trip.dateLong}</span>
                          <span><UserIcon size={14} />{trip.travelers} Travelers</span>
                          <span><ClockIcon size={14} />{trip.duration}</span>
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

                        <div className="gd-travelers__who">
                          <span className="gd-travelers__avatar" aria-hidden="true">
                            {trip.travelerInitials || trip.traveler.charAt(0)}
                          </span>
                          <div>
                            <strong>{trip.traveler}</strong>
                            {trip.travelerNote && <p>{trip.travelerNote}</p>}
                          </div>
                        </div>

                        {trip.travelerAbout && <p className="gd-travelers__about">{trip.travelerAbout}</p>}

                        <blockquote className="gd-travelers__quote">
                          {trip.messageFrom && (
                            <span>{trip.messageFrom} · {trip.messageDate}</span>
                          )}
                          “{trip.message}”
                        </blockquote>

                        <button
                          className="gd-button gd-button--primary gd-travelers__button"
                          type="button"
                          onClick={() => messageTraveler(trip.id)}
                        >
                          <ChatIcon size={15} />
                          {messagedIds.includes(trip.id) ? 'Message sent' : 'Message Traveler'}
                        </button>

                        <small className="gd-travelers__hint">
                          Keep meeting details and trip updates in your booking conversation.
                        </small>
                      </aside>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ---------- All requests ---------- */}
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
                      <th aria-label="Open booking" />
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
                        <td>
                          <strong>{formatMoney(request.budget)}</strong>
                          <span>{request.status === 'accepted' ? 'Agreed fee' : 'Offered budget'}</span>
                        </td>
                        <td><GuideStatus status={request.status} /></td>
                        <td className="gd-table__go">
                          <button type="button" aria-label={`Open ${request.title}`}>
                            <ArrowIcon size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="gd-pagination">
                  <span>Page 1 of 1</span>
                  <button type="button" aria-label="Previous page" disabled><ChevronLeftIcon size={14} /></button>
                  <button type="button" aria-label="Next page" disabled><ChevronRightIcon size={14} /></button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default GuideDashboard;