import { useMemo, useState } from 'react';
import '../styles/GuideSelect.css';

const guides = [
  {
    name: 'Ishani Perera',
    location: 'Kandy, Sri Lanka',
    specialty: 'Culture & temple walks',
    description: 'Explore sacred temples, lakeside lanes and Kandyan traditions at an easy pace.',
    price: 10500,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Kasun Dissanayake',
    location: 'Sigiriya, Sri Lanka',
    specialty: 'Ancient sites & heritage',
    description: 'Uncover the stories of Lion Rock, ancient gardens and the Cultural Triangle.',
    price: 13500,
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Nuwan Jayawardena',
    location: 'Ella, Sri Lanka',
    specialty: 'Hiking & tea country',
    description: 'Walk misty ridgelines, visit tea estates and discover quieter trails around Ella.',
    price: 12000,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Anjali Fernando',
    location: 'Ella, Sri Lanka',
    specialty: 'Nature & local food',
    description: 'Find local kitchens, waterfall paths and relaxed viewpoints beyond the main route.',
    price: 11000,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Ravi Senanayake',
    location: 'Nuwara Eliya, Sri Lanka',
    specialty: 'Tea & scenic routes',
    description: 'Discover highland tea estates, colonial landmarks and memorable train stops.',
    price: 12500,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Madu Silva',
    location: 'Galle, Sri Lanka',
    specialty: 'Coastal history',
    description: 'Explore the fort, coastal villages and the island’s southern food traditions.',
    price: 10000,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85',
  },
];

const formatMoney = (amount) => `LKR ${amount.toLocaleString('en-LK')}`;

function GuideProfileDialog({ guide, onClose, onRequest }) {
  if (!guide) return null;

  return (
    <div className="guide-dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="guide-dialog" role="dialog" aria-modal="true" aria-labelledby="guide-dialog-title">
        <button className="guide-dialog__close" type="button" onClick={onClose} aria-label="Close guide profile">×</button>
        <img src={guide.image} alt={guide.name} />
        <div className="guide-dialog__content">
          <p className="guide-eyebrow">Local guide · {guide.location}</p>
          <h2 id="guide-dialog-title">{guide.name}</h2>
          <p className="guide-card__specialty">{guide.specialty}</p>
          <p>{guide.description}</p>
          <div className="guide-dialog__footer">
            <strong>{formatMoney(guide.price)} <span>/ day</span></strong>
            <button type="button" className="guide-button guide-button--primary" onClick={() => onRequest(guide.name)}>
              Request guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function GuideSelect({ tripDetails = {}, onBack }) {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [notice, setNotice] = useState('');
  const destination = tripDetails.destination?.trim() || 'Ella';
  const specialties = [...new Set(guides.map((guide) => guide.specialty))];

  const visibleGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return guides.filter((guide) => {
      const matchesQuery = `${guide.name} ${guide.location} ${guide.specialty}`.toLowerCase().includes(normalizedQuery);
      const matchesSpecialty = specialty === 'all' || guide.specialty === specialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [query, specialty]);

  const requestGuide = (name) => {
    setNotice(`Your request for ${name} is ready. The guide will contact you to confirm availability.`);
    setSelectedGuide(null);
  };

  return (
    <main className="guide-page">
      <div className="guide-page__container">
        <div className="guide-page__topbar">
          <button type="button" className="guide-back" onClick={onBack}>← Back to itinerary</button>
          <span className="guide-trip-label">Your trip · {destination}</span>
        </div>

        <header className="guide-page__heading">
          <div>
            <p className="guide-eyebrow">Find your local expert</p>
            <h1>Make your {destination} escape unforgettable.</h1>
            <p>Meet trusted local guides who can make every day feel like your own.</p>
          </div>
          <img
            className="guide-page__destination-image"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
            alt={`${destination} landscape`}
          />
        </header>

        <section className="guide-results" aria-labelledby="guide-results-title">
          <div className="guide-results__heading">
            <div>
              <p className="guide-eyebrow">Curated for your trip</p>
              <h2 id="guide-results-title">Guides near {destination}</h2>
            </div>
            <div className="guide-filters">
              <label className="guide-search">
                <span aria-hidden="true">⌕</span>
                <span className="visually-hidden">Search guides</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides or places" />
              </label>
              <label className="visually-hidden" htmlFor="guide-specialty">Filter by specialty</label>
              <select id="guide-specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
                <option value="all">All specialties</option>
                {specialties.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          {notice && <p className="guide-notice" role="status">{notice}</p>}

          <div className="guide-grid">
            {visibleGuides.map((guide) => (
              <article className="guide-card" key={guide.name}>
                <div className="guide-card__photo-wrap">
                  <img className="guide-card__photo" src={guide.image} alt={guide.name} loading="lazy" />
                  <span className="guide-card__badge">Vetted local guide</span>
                </div>
                <div className="guide-card__body">
                  <p className="guide-card__location"><span aria-hidden="true">●</span> {guide.location}</p>
                  <div className="guide-card__name-row">
                    <h3>{guide.name}</h3>
                    <span className="guide-card__rating" aria-label={`${guide.rating} out of 5 stars`}>★ {guide.rating}</span>
                  </div>
                  <p className="guide-card__specialty">{guide.specialty}</p>
                  <p className="guide-card__description">{guide.description}</p>
                  <div className="guide-card__footer">
                    <strong>{formatMoney(guide.price)} <span>/ day</span></strong>
                    <div className="guide-card__actions">
                      <button type="button" className="guide-button guide-button--quiet" onClick={() => setSelectedGuide(guide)}>
                        View profile
                      </button>
                      <button type="button" className="guide-button guide-button--primary" onClick={() => requestGuide(guide.name)}>
                        Request guide
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleGuides.length === 0 && (
            <p className="guide-empty" role="status">No guides match those filters. Try a different name or specialty.</p>
          )}
        </section>

        <footer className="guide-page__footer">
          <span>All guides are locally based and reviewed by travelers.</span>
          <button type="button" className="guide-back" onClick={onBack}>Return to itinerary</button>
        </footer>
      </div>

      <GuideProfileDialog guide={selectedGuide} onClose={() => setSelectedGuide(null)} onRequest={requestGuide} />
    </main>
  );
}

export default GuideSelect;