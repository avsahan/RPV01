import { useState } from 'react';
import '../styles/GuideDashboard.css';

const guideTrips = [
  {
    id: 'GT-2081',
    traveler: 'Emma Wilson',
    initials: 'EW',
    destination: 'Kandy Heritage & Lake Walks',
    location: 'Kandy, Central Province',
    date: '18 Oct 2026',
    time: '9:00 AM - 1:00 PM',
    travelers: '2 travelers',
    amount: 'LKR 12,000',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd5c9e0b?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'GT-2088',
    traveler: 'Oliver Chen',
    initials: 'OC',
    destination: 'Temple, Market & Local Flavors',
    location: 'Kandy, Central Province',
    date: '20 Oct 2026',
    time: '10:30 AM - 2:30 PM',
    travelers: '3 travelers',
    amount: 'LKR 15,500',
    status: 'Awaiting response',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=500&q=80',
  },
];

const completedTrips = [
  {
    id: 'GT-1942',
    traveler: 'Maya Thompson',
    initials: 'MT',
    destination: 'Tea Country & Scenic Train',
    location: 'Nuwara Eliya, Central Province',
    date: '12 Oct 2026',
    time: 'Full day · 8 hours',
    travelers: '2 travelers',
    amount: 'LKR 24,000',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80',
    rating: '5.0',
  },
  {
    id: 'GT-1896',
    traveler: 'Daniel Park',
    initials: 'DP',
    destination: 'Kandy Old Town & Lake',
    location: 'Kandy, Central Province',
    date: '08 Oct 2026',
    time: 'Half day · 4 hours',
    travelers: '4 travelers',
    amount: 'LKR 18,000',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?auto=format&fit=crop&w=500&q=80',
    rating: '4.9',
  },
];

const initialContacts = [
  {
    id: 'emma',
    name: 'Emma Wilson',
    initials: 'EW',
    trip: 'Kandy Heritage Walk',
    time: '2 min ago',
    unread: 2,
    messages: [
      { from: 'traveler', text: 'Hi Nuwan! We are looking forward to the walk tomorrow.', time: '10:42 AM' },
      { from: 'guide', text: 'Hello Emma, I’m looking forward to meeting you both. We’ll start by the lake entrance.', time: '10:46 AM' },
      { from: 'traveler', text: 'Perfect. Is there anything we should bring?', time: '10:51 AM' },
    ],
  },
  {
    id: 'oliver',
    name: 'Oliver Chen',
    initials: 'OC',
    trip: 'Temple & Market Tour',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { from: 'traveler', text: 'Could we start the tour a little later on Monday?', time: 'Yesterday' },
      { from: 'guide', text: 'Of course. What time works best for your group?', time: 'Yesterday' },
    ],
  },
  {
    id: 'maya',
    name: 'Maya Thompson',
    initials: 'MT',
    trip: 'Tea Country & Scenic Train',
    time: 'Mon',
    unread: 0,
    messages: [
      { from: 'traveler', text: 'Thank you for a wonderful day in the hills!', time: 'Monday' },
      { from: 'guide', text: 'It was a pleasure showing you around. Safe travels!', time: 'Monday' },
    ],
  },
];

const guideTabs = [
  { id: 'upcoming', label: 'Upcoming trips', count: '2' },
  { id: 'completed', label: 'Past completed', count: '12' },
  { id: 'chat', label: 'Live guide chat', count: '2' },
];

function GuideTripRow({ trip, completed, onMessage }) {
  return (
    <article className="guide-trip-row">
      <img className="guide-trip-row__image" src={trip.image} alt="" />
      <div className="guide-trip-row__details">
        <div className="guide-trip-row__eyebrow">
          <span className="guide-trip-row__id">{trip.id}</span>
          <span className={`guide-trip-status${completed ? ' guide-trip-status--complete' : trip.status === 'Confirmed' ? ' guide-trip-status--confirmed' : ' guide-trip-status--pending'}`}>
            <span aria-hidden="true" />{trip.status}
          </span>
        </div>
        <h3>{trip.destination}</h3>
        <p className="guide-trip-row__location">{trip.location}</p>
        <div className="guide-trip-row__facts">
          <span><span aria-hidden="true">▦</span>{trip.date}</span>
          <span><span aria-hidden="true">◷</span>{trip.time}</span>
          <span><span aria-hidden="true">♧</span>{trip.travelers}</span>
        </div>
      </div>
      <div className="guide-trip-row__traveler">
        <span className="guide-avatar-initials">{trip.initials}</span>
        <div><span>Traveler</span><strong>{trip.traveler}</strong></div>
      </div>
      <div className="guide-trip-row__amount">
        <span>{completed ? 'Earned' : 'Trip total'}</span>
        <strong>{trip.amount}</strong>
        {completed && <span className="guide-trip-row__rating">★ {trip.rating} review</span>}
      </div>
      <div className="guide-trip-row__actions">
        {completed ? (
          <span className="guide-completed-label">Trip complete</span>
        ) : (
          <>
            <button className="guide-quiet-button" type="button" onClick={() => onMessage(trip)}>
              Message
            </button>
            <button className="guide-primary-button" type="button" onClick={() => onMessage(trip)}>
              View details
            </button>
          </>
        )}
      </div>
    </article>
  );
}

function GuideDashboard({ currentUser }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedContactId, setSelectedContactId] = useState('emma');
  const [contacts, setContacts] = useState(initialContacts);
  const [draft, setDraft] = useState('');
  const [contactQuery, setContactQuery] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [notice, setNotice] = useState('');

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId) || contacts[0];
  const visibleContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.trip}`.toLowerCase().includes(contactQuery.trim().toLowerCase()),
  );

  const openChat = (trip) => {
    const contact = contacts.find((item) => item.name === trip.traveler);
    if (contact) {
      setSelectedContactId(contact.id);
    } else {
      setNotice(`A conversation with ${trip.traveler} will appear here when they message you.`);
      window.setTimeout(() => setNotice(''), 3500);
    }
    setActiveTab('chat');
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const message = draft.trim();
    if (!message) return;

    setContacts((currentContacts) => currentContacts.map((contact) => (
      contact.id === selectedContactId
        ? { ...contact, messages: [...contact.messages, { from: 'guide', text: message, time: 'Now' }], time: 'Now' }
        : contact
    )));
    setDraft('');
  };

  return (
    <main className="guide-dashboard">
      <div className="guide-dashboard__layout">
        <aside className="guide-sidebar" aria-label="Guide account">
          <div className="guide-sidebar__profile">
            <div className="guide-sidebar__cover" />
            <img
              className="guide-sidebar__photo"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=85"
              alt=""
            />
            <h2>{currentUser?.fullName || 'Local guide'}</h2>
            <p>Local guide{currentUser?.baseLocation ? ` · ${currentUser.baseLocation}` : ''}</p>
            <div className="guide-sidebar__rating"><span>★</span> 4.9 <span>·</span> 28 reviews</div>
            <span className="guide-verified">
              <span aria-hidden="true">✓</span>
              {currentUser?.verificationStatus === 'approved' ? 'Approved guide' : 'Pending verification'}
            </span>
          </div>

          <div className="guide-sidebar__availability">
            <div><strong>Availability</strong><span>{isAvailable ? 'Accepting new trips' : 'Not accepting trips'}</span></div>
            <button
              className={`guide-toggle${isAvailable ? ' is-on' : ''}`}
              type="button"
              role="switch"
              aria-checked={isAvailable}
              aria-label="Toggle guide availability"
              onClick={() => setIsAvailable((available) => !available)}
            ><span /></button>
          </div>

          <div className="guide-sidebar__up-next">
            <p className="guide-sidebar__label">Next trip</p>
            <div className="guide-sidebar__next-date"><strong>18</strong><span>OCT<br />SUN</span></div>
            <strong className="guide-sidebar__next-title">Kandy Heritage Walk</strong>
            <span className="guide-sidebar__next-time">9:00 AM · Emma Wilson</span>
            <button type="button" onClick={() => setActiveTab('upcoming')}>See trip details <span aria-hidden="true">→</span></button>
          </div>

          <div className="guide-sidebar__help">
            <span aria-hidden="true">?</span>
            <div><strong>Need a hand?</strong><p>Our guide support team is here for you.</p></div>
          </div>
        </aside>

        <section className="guide-workspace">
          <header className="guide-welcome">
            <div>
              <p className="guide-eyebrow">Guide workspace</p>
              <h1>Welcome back, Nuwan<span>.</span></h1>
              <p>Keep your trips, travelers, and conversations moving.</p>
            </div>
            <div className="guide-welcome__destination">
              <img src="https://images.unsplash.com/photo-1588598198321-9735fd5c9e0b?auto=format&fit=crop&w=280&q=80" alt="Kandy lake and temple" />
              <span><strong>Kandy, Sri Lanka</strong><small>Your home base</small></span>
            </div>
          </header>

          <section className="guide-metrics" aria-label="Guide performance">
            <div><span className="guide-metric__icon guide-metric__icon--teal" aria-hidden="true">↗</span><span>This month<strong>LKR 84,500</strong></span><small>+12% vs last month</small></div>
            <div><span className="guide-metric__icon guide-metric__icon--gold" aria-hidden="true">★</span><span>Average rating<strong>4.9 / 5.0</strong></span><small>From 28 reviews</small></div>
            <div><span className="guide-metric__icon guide-metric__icon--blue" aria-hidden="true">♧</span><span>Trips completed<strong>12 trips</strong></span><small>Since joining</small></div>
          </section>

          <div className="guide-tabs" role="tablist" aria-label="Guide dashboard views">
            {guideTabs.map((tab) => (
              <button
                className={`guide-tab${activeTab === tab.id ? ' is-active' : ''}`}
                id={`guide-tab-${tab.id}`}
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`guide-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="guide-tab__count">{tab.count}</span>
              </button>
            ))}
          </div>

          {activeTab === 'upcoming' && (
            <section className="guide-panel" id="guide-panel-upcoming" role="tabpanel" aria-labelledby="guide-tab-upcoming">
              <div className="guide-panel__heading">
                <div><p className="guide-eyebrow">The next chapter</p><h2>Upcoming trips</h2></div>
                <button className="guide-filter-button" type="button" onClick={() => setNotice('Showing all upcoming trips.')}>All trips <span aria-hidden="true">⌄</span></button>
              </div>
              {notice && <p className="guide-notice" role="status">{notice}</p>}
              <div className="guide-trip-list">
                {guideTrips.map((trip) => <GuideTripRow key={trip.id} trip={trip} onMessage={openChat} />)}
              </div>
              <div className="guide-tip"><span aria-hidden="true">✦</span><p><strong>A little preparation goes a long way.</strong> Send your travelers a quick note before the trip to make meeting up easy.</p><button type="button" onClick={() => setActiveTab('chat')}>Open messages <span aria-hidden="true">→</span></button></div>
            </section>
          )}

          {activeTab === 'completed' && (
            <section className="guide-panel" id="guide-panel-completed" role="tabpanel" aria-labelledby="guide-tab-completed">
              <div className="guide-panel__heading">
                <div><p className="guide-eyebrow">Good memories, well earned</p><h2>Past completed trips</h2></div>
                <span className="guide-completed-total">12 completed</span>
              </div>
              <div className="guide-trip-list">
                {completedTrips.map((trip) => <GuideTripRow key={trip.id} trip={trip} completed onMessage={openChat} />)}
              </div>
              <p className="guide-history-note">Your trip history and traveler reviews are kept here for easy reference.</p>
            </section>
          )}

          {activeTab === 'chat' && (
            <section className="guide-panel guide-chat-panel" id="guide-panel-chat" role="tabpanel" aria-labelledby="guide-tab-chat">
              <div className="guide-panel__heading guide-chat-heading">
                <div><p className="guide-eyebrow">Keep the conversation going</p><h2>Live guide chat</h2></div>
                <label className="guide-chat-search">
                  <span aria-hidden="true">⌕</span>
                  <span className="guide-visually-hidden">Search conversations</span>
                  <input value={contactQuery} onChange={(event) => setContactQuery(event.target.value)} placeholder="Search conversations" />
                </label>
              </div>
              {notice && <p className="guide-notice" role="status">{notice}</p>}
              <div className="guide-chat">
                <div className="guide-chat__contacts" aria-label="Conversations">
                  {visibleContacts.map((contact) => (
                    <button
                      className={`guide-contact${selectedContactId === contact.id ? ' is-active' : ''}`}
                      key={contact.id}
                      type="button"
                      aria-pressed={selectedContactId === contact.id}
                      onClick={() => setSelectedContactId(contact.id)}
                    >
                      <span className="guide-avatar-initials">{contact.initials}</span>
                      <span className="guide-contact__text"><strong>{contact.name}</strong><small>{contact.trip}</small><span>{contact.messages.at(-1)?.text}</span></span>
                      <span className="guide-contact__meta"><small>{contact.time}</small>{contact.unread > 0 && <b>{contact.unread}</b>}</span>
                    </button>
                  ))}
                  {visibleContacts.length === 0 && <p className="guide-chat__empty">No conversations found.</p>}
                </div>

                <div className="guide-conversation">
                  <div className="guide-conversation__header">
                    <span className="guide-avatar-initials">{selectedContact.initials}</span>
                    <div><strong>{selectedContact.name}</strong><span>{selectedContact.trip}</span></div>
                    <span className="guide-conversation__online"><span /> Trip confirmed</span>
                  </div>
                  <div className="guide-conversation__messages" aria-live="polite">
                    <p className="guide-chat-date">Today</p>
                    {selectedContact.messages.map((message, index) => (
                      <div className={`guide-message guide-message--${message.from}`} key={`${selectedContact.id}-${index}`}>
                        <p>{message.text}</p><time>{message.time}</time>
                      </div>
                    ))}
                  </div>
                  <form className="guide-message-form" onSubmit={sendMessage}>
                    <input
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder={`Message ${selectedContact.name.split(' ')[0]}...`}
                      aria-label={`Message ${selectedContact.name}`}
                    />
                    <button type="submit" aria-label="Send message" disabled={!draft.trim()}><span aria-hidden="true">↑</span></button>
                  </form>
                  <p className="guide-chat-safety">Keep your trip details and payments on VentureVista.</p>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}

export default GuideDashboard;