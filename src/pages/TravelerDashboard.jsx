import { useState } from 'react';
import '../styles/TravelerDashboard.css';

const trips = [
  {
    id: 'kandy',
    destination: 'Kandy, Sri Lanka',
    title: 'Kandy Heritage & Lake Walks',
    dates: '18 - 21 October 2026',
    days: 4,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd5c9e0b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Temple beside a lake in Sri Lanka',
  },
  {
    id: 'ella',
    destination: 'Ella, Sri Lanka',
    title: 'Highland Trails & Tea Country',
    dates: '06 - 10 December 2026',
    days: 5,
    status: 'planning',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Mountain ridge above a green valley',
  },
];

const itinerary = {
  kandy: [
    [
      { time: '08:30', title: 'Breakfast at the hotel', place: 'Lakeview Boutique Hotel', type: 'stay' },
      { time: '10:00', title: 'Temple of the Sacred Tooth Relic', place: 'Sri Dalada Maligawa', type: 'visit' },
      { time: '12:30', title: 'Lunch with a local family', place: 'Kandy city', type: 'food' },
      { time: '15:00', title: 'Walk around Kandy Lake', place: 'Lakeside promenade', type: 'walk' },
    ],
    [
      { time: '09:00', title: 'Botanical garden visit', place: 'Peradeniya', type: 'visit' },
      { time: '12:00', title: 'Garden-side lunch', place: 'Peradeniya village', type: 'food' },
      { time: '14:30', title: 'Kandyan craft workshop', place: 'Kandy', type: 'visit' },
    ],
    [
      { time: '08:00', title: 'Scenic train to the highlands', place: 'Kandy Railway Station', type: 'travel' },
      { time: '11:30', title: 'Tea estate visit', place: 'Ramboda', type: 'visit' },
      { time: '16:00', title: 'Check in and unwind', place: 'Hill Country Lodge', type: 'stay' },
    ],
  ],
  ella: [
    [
      { time: '09:00', title: 'Arrive and settle in', place: 'Ella town', type: 'stay' },
      { time: '15:30', title: 'Little Adam’s Peak sunset walk', place: 'Ella', type: 'walk' },
    ],
    [
      { time: '08:00', title: 'Nine Arch Bridge trail', place: 'Demodara', type: 'walk' },
      { time: '12:00', title: 'Lunch in the village', place: 'Ella town', type: 'food' },
      { time: '14:00', title: 'Tea factory tour', place: 'Uva Highlands', type: 'visit' },
    ],
  ],
};

const bookings = [
  {
    id: 'VV-1048',
    type: 'Stay',
    title: 'Lakeview Boutique Hotel',
    detail: 'Kandy · 3 nights · 1 room',
    date: '18 Oct 2026',
    amount: 'LKR 48,000',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'VV-1052',
    type: 'Local guide',
    title: 'Kandy Heritage & Lake Walks',
    detail: 'Nuwan Jayawardena · Private tour',
    date: '19 Oct 2026',
    amount: 'LKR 12,000',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'VV-1061',
    type: 'Rail',
    title: 'Kandy to Ella scenic train',
    detail: 'Reserved seats · 2 travelers',
    date: '20 Oct 2026',
    amount: 'LKR 6,400',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=240&q=80',
  },
];

const tabs = [
  { id: 'overview', label: 'My trips', count: '02' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'bookings', label: 'Bookings', count: '03' },
];

function TravelerDashboard({ currentUser, onPlanTrip }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTripId, setSelectedTripId] = useState('kandy');
  const [selectedDay, setSelectedDay] = useState(0);
  const [bookingFilter, setBookingFilter] = useState('All');

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) || trips[0];
  const tripDays = itinerary[selectedTrip.id] || [];
  const visibleBookings = bookingFilter === 'All'
    ? bookings
    : bookings.filter((booking) => booking.status === bookingFilter);

  const openItinerary = (tripId) => {
    setSelectedTripId(tripId);
    setSelectedDay(0);
    setActiveTab('itinerary');
  };

  return (
    <main className="traveler-dashboard">
      <div className="traveler-dashboard__inner">
        <section className="traveler-welcome" aria-labelledby="traveler-welcome-title">
          <div className="traveler-welcome__copy">
            <p className="traveler-eyebrow">Your travel space</p>
            <h1 id="traveler-welcome-title">Welcome, {currentUser?.fullName || 'Traveler'}<span>.</span></h1>
            <p>Every detail of your next journey, right where you need it.</p>
          </div>
          <div className="traveler-profile" aria-label="Traveler profile">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85"
              alt=""
            />
            <div>
              <strong>{currentUser?.fullName || 'Traveler'}</strong>
              <span>{currentUser?.email || 'Traveler account'}</span>
            </div>
            <span className="traveler-profile__menu" aria-hidden="true">⌄</span>
          </div>
        </section>

        <section className="traveler-summary" aria-label="Travel summary">
          <div className="traveler-summary__item">
            <span className="traveler-summary__icon traveler-summary__icon--blue" aria-hidden="true">↗</span>
            <div><strong>2</strong><span>Trips planned</span></div>
          </div>
          <div className="traveler-summary__item">
            <span className="traveler-summary__icon traveler-summary__icon--green" aria-hidden="true">▦</span>
            <div><strong>3</strong><span>Confirmed bookings</span></div>
          </div>
          <div className="traveler-summary__item">
            <span className="traveler-summary__icon traveler-summary__icon--gold" aria-hidden="true">◎</span>
            <div><strong>18 days</strong><span>Until your next trip</span></div>
          </div>
          <button className="traveler-summary__action" type="button" onClick={onPlanTrip}>
            <span aria-hidden="true">+</span> Plan a trip
          </button>
        </section>

        <div className="traveler-tabs" role="tablist" aria-label="Traveler dashboard sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`traveler-tab-${tab.id}`}
              className={`traveler-tab${activeTab === tab.id ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`traveler-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count && <span className="traveler-tab__count">{tab.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <section
            className="traveler-panel"
            id="traveler-panel-overview"
            role="tabpanel"
            aria-labelledby="traveler-tab-overview"
          >
            <div className="traveler-section-heading">
              <div>
                <p className="traveler-eyebrow">Your plans at a glance</p>
                <h2>Upcoming trips</h2>
              </div>
              <button type="button" className="traveler-text-button" onClick={() => setActiveTab('bookings')}>
                View bookings <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="traveler-trip-list">
              {trips.map((trip) => (
                <article className="traveler-trip" key={trip.id}>
                  <img className="traveler-trip__image" src={trip.image} alt={trip.imageAlt} />
                  <div className="traveler-trip__content">
                    <div className="traveler-trip__topline">
                      <span className={`traveler-status traveler-status--${trip.status}`}>
                        <span aria-hidden="true" /> {trip.status === 'upcoming' ? 'Upcoming' : 'Planning'}
                      </span>
                      <span className="traveler-trip__destination">{trip.destination}</span>
                    </div>
                    <h3>{trip.title}</h3>
                    <div className="traveler-trip__facts">
                      <span><span aria-hidden="true">▦</span>{trip.dates}</span>
                      <span><span aria-hidden="true">◷</span>{trip.days} days</span>
                      <span><span aria-hidden="true">♧</span>2 travelers</span>
                    </div>
                    <div className="traveler-trip__footer">
                      <span className="traveler-trip__progress-label">
                        {trip.status === 'upcoming' ? 'Trip details' : 'Planning progress'}
                      </span>
                      {trip.status === 'planning' && (
                        <span className="traveler-progress" aria-label="Planning progress 45 percent">
                          <span />
                        </span>
                      )}
                      <button type="button" onClick={() => openItinerary(trip.id)}>
                        {trip.status === 'upcoming' ? 'Open itinerary' : 'Continue planning'}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'itinerary' && (
          <section
            className="traveler-panel"
            id="traveler-panel-itinerary"
            role="tabpanel"
            aria-labelledby="traveler-tab-itinerary"
          >
            <div className="traveler-section-heading traveler-itinerary-heading">
              <div>
                <p className="traveler-eyebrow">Make room for the unexpected</p>
                <h2>{selectedTrip.title}</h2>
                <p className="traveler-section-subtitle">{selectedTrip.destination} <span>·</span> {selectedTrip.dates}</p>
              </div>
              <label className="traveler-trip-select">
                <span className="traveler-visually-hidden">Choose a trip</span>
                <select
                  value={selectedTrip.id}
                  onChange={(event) => {
                    setSelectedTripId(event.target.value);
                    setSelectedDay(0);
                  }}
                >
                  {trips.map((trip) => <option key={trip.id} value={trip.id}>{trip.destination}</option>)}
                </select>
              </label>
            </div>

            <div className="traveler-itinerary-layout">
              <div className="traveler-itinerary-main">
                <div className="traveler-day-tabs" role="tablist" aria-label="Itinerary days">
                  {tripDays.map((day, index) => (
                    <button
                      className={`traveler-day-tab${selectedDay === index ? ' is-active' : ''}`}
                      key={`${selectedTrip.id}-day-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={selectedDay === index}
                      onClick={() => setSelectedDay(index)}
                    >
                      <span>DAY {index + 1}</span>
                      <strong>{18 + index} OCT</strong>
                    </button>
                  ))}
                </div>
                <div className="traveler-itinerary-list">
                  {(tripDays[selectedDay] || []).map((item) => (
                    <article className="traveler-stop" key={`${item.time}-${item.title}`}>
                      <time>{item.time}</time>
                      <span className={`traveler-stop__marker traveler-stop__marker--${item.type}`} aria-hidden="true">
                        {item.type === 'food' ? '⌁' : item.type === 'travel' ? '↗' : item.type === 'stay' ? '⌂' : '◎'}
                      </span>
                      <div className="traveler-stop__details">
                        <h3>{item.title}</h3>
                        <p>{item.place}</p>
                      </div>
                      <button type="button" className="traveler-stop__more" aria-label={`More about ${item.title}`}>
                        ···
                      </button>
                    </article>
                  ))}
                </div>
                <button type="button" className="traveler-add-stop" onClick={() => setSelectedDay((day) => (day + 1) % tripDays.length)}>
                  <span aria-hidden="true">+</span> Explore the next day
                </button>
              </div>

              <aside className="traveler-itinerary-aside" aria-label="Trip details">
                <img
                  className="traveler-map-image"
                  src={selectedTrip.image}
                  alt={`${selectedTrip.destination} landscape`}
                />
                <div className="traveler-aside-block">
                  <p className="traveler-eyebrow">Your local guide</p>
                  <div className="traveler-guide-mini">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" alt="" />
                    <div><strong>Nuwan Jayawardena</strong><span>Local guide · Kandy</span></div>
                  </div>
                </div>
                <div className="traveler-aside-block traveler-budget">
                  <div><span>Trip budget</span><strong>LKR 84,500</strong></div>
                  <div className="traveler-budget__bar"><span /></div>
                  <p>LKR 32,000 spent <span>·</span> LKR 52,500 left</p>
                </div>
              </aside>
            </div>
          </section>
        )}

        {activeTab === 'bookings' && (
          <section
            className="traveler-panel"
            id="traveler-panel-bookings"
            role="tabpanel"
            aria-labelledby="traveler-tab-bookings"
          >
            <div className="traveler-section-heading traveler-booking-heading">
              <div>
                <p className="traveler-eyebrow">Everything in one place</p>
                <h2>Your bookings</h2>
              </div>
              <div className="traveler-booking-filters" role="group" aria-label="Filter bookings by status">
                {['All', 'Confirmed', 'Pending'].map((filter) => (
                  <button
                    className={bookingFilter === filter ? 'is-active' : ''}
                    key={filter}
                    type="button"
                    aria-pressed={bookingFilter === filter}
                    onClick={() => setBookingFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="traveler-booking-list">
              {visibleBookings.map((booking) => (
                <article className="traveler-booking" key={booking.id}>
                  <img src={booking.image} alt="" />
                  <div className="traveler-booking__main">
                    <span className="traveler-booking__type">{booking.type} <span>·</span> {booking.id}</span>
                    <h3>{booking.title}</h3>
                    <p>{booking.detail}</p>
                  </div>
                  <div className="traveler-booking__date"><span>Date</span><strong>{booking.date}</strong></div>
                  <div className="traveler-booking__amount"><span>Total</span><strong>{booking.amount}</strong></div>
                  <span className={`traveler-booking__status traveler-booking__status--${booking.status.toLowerCase()}`}>
                    <span aria-hidden="true" />{booking.status}
                  </span>
                  <button type="button" className="traveler-booking__view" onClick={() => openItinerary('kandy')}>
                    View <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
              {visibleBookings.length === 0 && <p className="traveler-booking-empty">No bookings in this category yet.</p>}
            </div>
            <p className="traveler-booking-note">Booking updates are sent to your account email.</p>
          </section>
        )}
      </div>
    </main>
  );
}

export default TravelerDashboard;