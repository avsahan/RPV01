import { useState } from 'react';
import '../styles/TravelerDashboard.css';

/* ---------- Data ---------- */

const upcomingTrips = [
  {
    id: 'RL-26481',
    region: 'Galle · Unawatuna · Mirissa',
    title: 'Galle & the slow south',
    dates: '18-21 Oct 2026',
    duration: '4 days · 2 travelers',
    stops: ['Galle Fort walk', 'Unawatuna beach', 'Mirissa coast'],
    guide: 'Nimal Perera',
    guideInitials: 'NP',
    contactId: 'nimal',
    status: 'confirmed',
    statusLabel: 'Confirmed',
    note: 'Meet Nimal at Fort Bazaar, Galle · 18 Oct, 9:00 AM',
    noteIcon: '⌖',
    image:
      'https://th.bing.com/th/id/OIP.eHDIU8q7JSGIfn8qC3H_hgHaE8?w=277&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    id: 'RL-26502',
    region: 'Ella · Haputale',
    title: 'Ella, above the clouds',
    dates: '25-27 Oct 2026',
    duration: '3 days · 2 travelers',
    stops: ['Nine Arch Bridge', "Little Adam's Peak", 'Tea country'],
    guide: 'Kasun Silva',
    guideInitials: 'KS',
    contactId: 'kasun',
    status: 'pending',
    statusLabel: 'Awaiting confirmation',
    note: 'Kasun will confirm your pickup details by 17 Oct.',
    noteIcon: '◷',
    image:
      'https://th.bing.com/th/id/OIP.7aL5EWCGxgBk4D11TUNuMQHaId?w=168&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
];

const completedTrips = [
  {
    id: 'RL-25310',
    region: 'Kandy · Sigiriya',
    title: 'Kandy & the cultural heart',
    dates: '12-15 Sep 2026',
    duration: '4 days · 2 travelers',
    guide: 'Dinesh Fernando',
    image:
      'https://th.bing.com/th/id/OIP.8Xm_q9vdITO_Eg5CLQpyhQHaE8?w=258&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    id: 'RL-24977',
    region: 'Yala · Tissamaharama',
    title: 'Wild mornings in Yala',
    dates: '06-08 Jun 2026',
    duration: '3 days · 2 travelers',
    guide: 'Sahan Jayawardhana',
    image:
      'https://th.bing.com/th/id/OIP.jxVb-5bC4IFzRLFTp_o4lQHaEK?w=276&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
];

const initialContacts = [
  {
    id: 'nimal',
    name: 'Nimal Perera',
    initials: 'NP',
    trip: 'Galle & the slow south',
    tripDates: '18-21 Oct 2026',
    tripTravelers: '2 travelers',
    tripId: 'RL-26481',
    tripImage:
      'https://th.bing.com/th/id/OIP.eHDIU8q7JSGIfn8qC3H_hgHaE8?w=277&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    time: '10:24 AM',
    unread: 2,
    online: true,
    messages: [
      {
        from: 'guide',
        text: "Ayubowan, Emma! Looking forward to showing you the south coast. We'll meet at Fort Bazaar in Galle at 9:00 AM on the 18th.",
        time: '10:18 AM',
      },
      {
        from: 'me',
        text: 'Hi Nimal! That sounds lovely. Could we include a stop for some local vegetarian food?',
        time: '10:21 AM',
        read: true,
      },
      {
        from: 'guide',
        text: "Of course! I know a wonderful family-run rice and curry spot. I've pinned our meeting point below.",
        time: '10:24 AM',
        location: {
          name: 'Fort Bazaar, Galle Fort',
          address: '26 Church Street · 18 Oct, 9:00 AM',
        },
      },
    ],
  },
  {
    id: 'kasun',
    name: 'Kasun Silva',
    initials: 'KS',
    trip: 'Ella, above the clouds',
    tripDates: '25-27 Oct 2026',
    tripTravelers: '2 travelers',
    tripId: 'RL-26502',
    tripImage:
      'https://th.bing.com/th/id/OIP.7aL5EWCGxgBk4D11TUNuMQHaId?w=168&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    time: 'Yesterday',
    unread: 0,
    online: true,
    messages: [
      {
        from: 'guide',
        text: "Hi Emma! I'll share the pickup details shortly.",
        time: 'Yesterday',
      },
    ],
  },
];

const tabs = [
  { id: 'upcoming', label: 'Upcoming Trips', icon: '▦', count: 2 },
  { id: 'completed', label: 'Past Completed Trips', icon: '✓', count: 2 },
  { id: 'chat', label: 'Live Guide Chat & Communication', icon: '▢', count: 2 },
];

const preferenceChips = ['Coastal escapes', 'Local food', 'Nature'];

/* ---------- Small components ---------- */

function ProfileCard({ profile, onChange, onSave, saved }) {
  const fields = [
    { key: 'name', label: 'Full name', type: 'text' },
    { key: 'country', label: 'Country', type: 'select' },
    { key: 'email', label: 'Email address', type: 'email' },
    { key: 'phone', label: 'Phone number', type: 'tel' },
    { key: 'passport', label: 'Passport number', type: 'text' },
  ];

  return (
    <aside className="rl-profile" aria-label="My profile">
      <div className="rl-profile__header">
        <h2>My profile</h2>
        <button className="rl-icon-button" type="button" aria-label="Profile settings">⚙</button>
      </div>

      <div className="rl-profile__identity">
        <div className="rl-profile__photo-wrap">
          <img
            className="rl-profile__photo"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85"
            alt="Emma Wilson"
          />
          <button className="rl-profile__camera" type="button" aria-label="Change photo">◉</button>
        </div>
        <h3>{profile.name}</h3>
        <p>Curious traveler · Member since 2025</p>
      </div>

      <form
        className="rl-profile__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
      >
        {fields.map((field) => (
          <label className="rl-field" key={field.key}>
            <span className="rl-field__label">{field.label}</span>
            <span className="rl-field__control">
              {field.type === 'select' ? (
                <>
                  <select value={profile.country} onChange={(e) => onChange('country', e.target.value)}>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>India</option>
                  </select>
                  <span className="rl-field__icon" aria-hidden="true">⌄</span>
                </>
              ) : (
                <>
                  <input
                    type={field.type}
                    value={profile[field.key]}
                    onChange={(e) => onChange(field.key, e.target.value)}
                  />
                  <span className="rl-field__icon" aria-hidden="true">✎</span>
                </>
              )}
            </span>
          </label>
        ))}

        <div className="rl-prefs">
          <div className="rl-prefs__header">
            <strong>Travel preferences</strong>
            <button className="rl-icon-button rl-icon-button--accent" type="button" aria-label="Edit preferences">✎</button>
          </div>
          <div className="rl-prefs__chips">
            {preferenceChips.map((chip) => (
              <span className="rl-chip" key={chip}>{chip}</span>
            ))}
          </div>
          <p className="rl-prefs__text">
            Relaxed pace · English-speaking guides
            <br />
            Vegetarian-friendly experiences
          </p>
        </div>

        <button className="rl-button rl-button--primary rl-button--block" type="submit">
          {saved ? 'Changes saved ✓' : 'Save profile changes'}
        </button>
        <p className="rl-profile__secure">
          <span aria-hidden="true">⛨</span> Your personal details stay private and secure.
        </p>
      </form>
    </aside>
  );
}

function UpcomingTripCard({ trip, onMessage, onItinerary }) {
  return (
    <article className="rl-trip-card">
      <div className="rl-trip-card__main">
        <div className="rl-trip-card__media">
          <img src={trip.image} alt="" />
          <span className="rl-trip-card__badge">{trip.duration.replace(' · ', ' · ')}</span>
        </div>

        <div className="rl-trip-card__body">
          <div className="rl-trip-card__top">
            <span className="rl-eyebrow">{trip.region}</span>
            <span className={`rl-status rl-status--${trip.status}`}>
              <span aria-hidden="true">{trip.status === 'confirmed' ? '✓' : '◷'}</span>
              {trip.statusLabel}
            </span>
          </div>

          <h3>{trip.title}</h3>
          <p className="rl-trip-card__meta">
            <span aria-hidden="true">▦</span> {trip.dates} <span aria-hidden="true">·</span> {trip.id}
          </p>

          <ol className="rl-trip-card__stops">
            {trip.stops.map((stop, index) => (
              <li key={stop}>
                <b>{String(index + 1).padStart(2, '0')}</b> {stop}
              </li>
            ))}
          </ol>

          <div className="rl-trip-card__footer">
            <div className="rl-guide-mini">
              <span className="rl-avatar rl-avatar--sm">{trip.guideInitials}</span>
              <span>
                <small>Your local guide</small>
                <strong>{trip.guide}</strong>
              </span>
            </div>
            <div className="rl-trip-card__actions">
              <button className="rl-button rl-button--outline" type="button" onClick={() => onMessage(trip)}>
                <span aria-hidden="true">💬︎</span> Message
              </button>
              <button className="rl-button rl-button--primary" type="button" onClick={() => onItinerary(trip)}>
                View itinerary
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rl-trip-card__note">
        <span aria-hidden="true">{trip.noteIcon}</span> {trip.note}
      </div>
    </article>
  );
}

function CompletedTripCard({ trip, onView, onBookAgain }) {
  return (
    <article className="rl-trip-card rl-trip-card--completed">
      <div className="rl-trip-card__main">
        <div className="rl-trip-card__media rl-trip-card__media--small">
          <img src={trip.image} alt="" />
        </div>

        <div className="rl-trip-card__body">
          <div className="rl-trip-card__top">
            <span className="rl-eyebrow">{trip.region}</span>
            <span className="rl-status rl-status--completed">
              <span aria-hidden="true">✓</span> Completed
            </span>
          </div>

          <h3>{trip.title}</h3>
          <p className="rl-trip-card__meta">
            {trip.dates} <span aria-hidden="true">·</span> {trip.duration.replace(' · ', ' · ')}
          </p>

          <div className="rl-trip-card__footer">
            <p className="rl-with-guide">
              <span aria-hidden="true">☺</span> With {trip.guide}
            </p>
            <div className="rl-trip-card__actions">
              <button className="rl-button rl-button--outline" type="button" onClick={() => onView(trip)}>
                View trip
              </button>
              <button className="rl-button rl-button--primary" type="button" onClick={() => onBookAgain(trip)}>
                <span aria-hidden="true">↻</span> Book again
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Main component ---------- */

function GuideDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState('nimal');
  const [draft, setDraft] = useState('');
  const [contactQuery, setContactQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Emma Wilson',
    country: 'United Kingdom',
    email: 'emma.wilson@gmail.com',
    phone: '+44 7700 900 218',
    passport: 'GBR •••••• 4821',
  });

  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) || contacts[0];

  const visibleContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.trip}`
      .toLowerCase()
      .includes(contactQuery.trim().toLowerCase()),
  );

  const showNotice = (text) => {
    setNotice(text);
    window.setTimeout(() => setNotice(''), 3500);
  };

  const updateProfile = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const saveProfile = () => {
    setSaved(true);
    showNotice('Your profile changes have been saved.');
    window.setTimeout(() => setSaved(false), 2500);
  };

  const openChat = (trip) => {
    const contact = contacts.find((item) => item.id === trip.contactId);
    if (contact) {
      setSelectedContactId(contact.id);
      setContacts((current) =>
        current.map((item) => (item.id === contact.id ? { ...item, unread: 0 } : item)),
      );
    }
    setActiveTab('chat');
  };

  const selectContact = (contactId) => {
    setSelectedContactId(contactId);
    setContacts((current) =>
      current.map((item) => (item.id === contactId ? { ...item, unread: 0 } : item)),
    );
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setContacts((current) =>
      current.map((contact) =>
        contact.id === selectedContactId
          ? {
              ...contact,
              time: 'Now',
              messages: [...contact.messages, { from: 'me', text, time: 'Now' }],
            }
          : contact,
      ),
    );
    setDraft('');
  };

  return (
    <div className="rl-page">
      <div className="rl-shell">
        <main className="rl-main">
          <section className="rl-hero">
            <div>
              <p className="rl-eyebrow rl-eyebrow--accent">Your Sri Lanka, your way</p>
              <h1>Welcome back, Emma.</h1>
              <p className="rl-hero__sub">
                A little planning. A lot to look forward to. Your next chapter starts here.
              </p>
            </div>
            <div className="rl-hero__banner">
              <img
                src="https://images.unsplash.com/photo-1588598198321-9735fd5c9e0b?auto=format&fit=crop&w=400&q=80"
                alt=""
              />
              <span>
                <span aria-hidden="true">⌖</span> Slow days, south coast
              </span>
            </div>
          </section>

          <div className="rl-layout">
            <ProfileCard
              profile={profile}
              onChange={updateProfile}
              onSave={saveProfile}
              saved={saved}
            />

            <section className="rl-content">
              <div className="rl-tabs" role="tablist" aria-label="Dashboard views">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    id={`rl-tab-${tab.id}`}
                    className={`rl-tab${activeTab === tab.id ? ' is-active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`rl-panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span aria-hidden="true">{tab.icon}</span>
                    {tab.label}
                    <span className="rl-tab__count">{tab.count}</span>
                  </button>
                ))}
              </div>

              {notice && (
                <p className="rl-notice" role="status">{notice}</p>
              )}

              {/* ---------- Upcoming ---------- */}
              {activeTab === 'upcoming' && (
                <section
                  className="rl-panel"
                  id="rl-panel-upcoming"
                  role="tabpanel"
                  aria-labelledby="rl-tab-upcoming"
                >
                  <div className="rl-panel__heading">
                    <h2>Your next adventures</h2>
                    <button
                      className="rl-button rl-button--outline"
                      type="button"
                      onClick={() => showNotice('Trip planning is coming soon.')}
                    >
                      <span aria-hidden="true">+</span> Plan a new trip
                    </button>
                  </div>

                  <div className="rl-trip-list">
                    {upcomingTrips.map((trip) => (
                      <UpcomingTripCard
                        key={trip.id}
                        trip={trip}
                        onMessage={openChat}
                        onItinerary={(t) => showNotice(`Opening the itinerary for ${t.title}…`)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* ---------- Completed ---------- */}
              {activeTab === 'completed' && (
                <section
                  className="rl-panel"
                  id="rl-panel-completed"
                  role="tabpanel"
                  aria-labelledby="rl-tab-completed"
                >
                  <div className="rl-trip-list">
                    {completedTrips.map((trip) => (
                      <CompletedTripCard
                        key={trip.id}
                        trip={trip}
                        onView={(t) => showNotice(`Opening ${t.title}…`)}
                        onBookAgain={(t) => showNotice(`Let's plan another trip like ${t.title}.`)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* ---------- Chat ---------- */}
              {activeTab === 'chat' && (
                <section
                  className="rl-panel rl-chat"
                  id="rl-panel-chat"
                  role="tabpanel"
                  aria-labelledby="rl-tab-chat"
                >
                  <aside className="rl-chat__sidebar" aria-label="Your guides">
                    <div className="rl-chat__sidebar-head">
                      <h3>Your guides</h3>
                      <span className="rl-pill">{contacts.length} active</span>
                    </div>

                    <label className="rl-search">
                      <span aria-hidden="true">⌕</span>
                      <span className="rl-visually-hidden">Search conversations</span>
                      <input
                        value={contactQuery}
                        onChange={(e) => setContactQuery(e.target.value)}
                        placeholder="Search conversations"
                      />
                    </label>

                    <div className="rl-contact-list">
                      {visibleContacts.map((contact) => (
                        <button
                          key={contact.id}
                          className={`rl-contact${selectedContactId === contact.id ? ' is-active' : ''}`}
                          type="button"
                          aria-pressed={selectedContactId === contact.id}
                          onClick={() => selectContact(contact.id)}
                        >
                          <span className="rl-avatar rl-avatar--sm rl-avatar--status">
                            {contact.initials}
                            {contact.online && <i aria-hidden="true" />}
                          </span>
                          <span className="rl-contact__text">
                            <strong>{contact.name}</strong>
                            <small>{contact.trip}</small>
                            <span>{contact.messages[contact.messages.length - 1]?.text}</span>
                            <time>{contact.time}</time>
                          </span>
                          {contact.unread > 0 && <b className="rl-contact__unread">{contact.unread}</b>}
                        </button>
                      ))}
                      {visibleContacts.length === 0 && (
                        <p className="rl-chat__empty">No conversations found.</p>
                      )}
                    </div>

                    <div className="rl-help-block">
                      <p className="rl-eyebrow">Here when you need us</p>
                      <p>Your guides usually reply within an hour, 8 AM–8 PM Sri Lanka time.</p>
                      <small><span aria-hidden="true">◷</span> Sri Lanka · UTC +5:30</small>
                    </div>

                    <div className="rl-help-block">
                      <strong>Need extra support?</strong>
                      <p>Our local team is here for booking questions and urgent travel help.</p>
                      <button
                        className="rl-button rl-button--outline rl-button--sm"
                        type="button"
                        onClick={() => showNotice('Connecting you with the Roam Lanka team…')}
                      >
                        <span aria-hidden="true">☎</span> Contact Roam Lanka
                      </button>
                    </div>
                  </aside>

                  <div className="rl-conversation">
                    <header className="rl-conversation__header">
                      <span className="rl-avatar">{selectedContact.initials}</span>
                      <div>
                        <strong>{selectedContact.name}</strong>
                        <span>
                          <i className="rl-online-dot" aria-hidden="true" />
                          Online now · Verified local guide
                        </span>
                      </div>
                      <div className="rl-conversation__tools">
                        <button className="rl-icon-button rl-icon-button--boxed" type="button" aria-label="Call guide">☎</button>
                        <button className="rl-icon-button" type="button" aria-label="More options">⋯</button>
                      </div>
                    </header>

                    <div className="rl-trip-banner">
                      <img src={selectedContact.tripImage} alt="" />
                      <div>
                        <strong>{selectedContact.trip}</strong>
                        <small>
                          {selectedContact.tripDates} · {selectedContact.tripTravelers} · {selectedContact.tripId}
                        </small>
                      </div>
                      <button
                        type="button"
                        onClick={() => showNotice(`Opening the itinerary for ${selectedContact.trip}…`)}
                      >
                        View itinerary <span aria-hidden="true">↗</span>
                      </button>
                    </div>

                    <div className="rl-messages" aria-live="polite">
                      <p className="rl-messages__date">Today, 15 October 2026</p>
                      {selectedContact.messages.map((message, index) => (
                        <div
                          className={`rl-message rl-message--${message.from}`}
                          key={`${selectedContact.id}-${index}`}
                        >
                          <p>{message.text}</p>
                          {message.location && (
                            <div className="rl-location-card">
                              <span aria-hidden="true">⌖</span>
                              <div>
                                <strong>{message.location.name}</strong>
                                <small>{message.location.address}</small>
                              </div>
                              <span aria-hidden="true">↗</span>
                            </div>
                          )}
                          <time>
                            {message.time}
                            {message.from === 'me' && message.read ? ' · Read ✓✓' : ''}
                          </time>
                        </div>
                      ))}
                    </div>

                    <form className="rl-composer" onSubmit={sendMessage}>
                      <button className="rl-icon-button" type="button" aria-label="Attach a file">⌁</button>
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={`Write a message to ${selectedContact.name.split(' ')[0]}...`}
                        aria-label={`Message ${selectedContact.name}`}
                      />
                      <button className="rl-icon-button" type="button" aria-label="Add emoji">☺</button>
                      <button
                        className="rl-send"
                        type="submit"
                        aria-label="Send message"
                        disabled={!draft.trim()}
                      >
                        ➤
                      </button>
                    </form>
                    <p className="rl-chat__safety">
                      Keep conversations and payments on Roam Lanka for a safer journey.
                    </p>
                  </div>
                </section>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GuideDashboard;