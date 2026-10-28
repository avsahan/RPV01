import { useEffect, useMemo, useState } from "react";
import { getGuides } from "../api/auth";
import "../styles/GuideSelect.css";

const DEFAULT_DESTINATION = "Ella";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85";

const formatMoney = (amount) => `LKR ${amount.toLocaleString("en-LK")}`;

const getSearchText = (guide) =>
  [
    guide.name,
    guide.location,
    guide.specialty,
    guide.description,
    ...(guide.languages || []),
  ]
    .join(" ")
    .toLowerCase();

const filterGuides = (guides, query, specialty) => {
  const normalizedQuery = query.trim().toLowerCase();

  return guides.filter((guide) => {
    const matchesQuery = getSearchText(guide).includes(normalizedQuery);
    const matchesSpecialty = specialty === "all" || guide.specialty === specialty;
    return matchesQuery && matchesSpecialty;
  });
};


function useRegisteredGuides() {
  const [state, setState] = useState({
    guides: [],
    isLoading: true,
    error: "",
  });

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const { guides } = (await getGuides()) || {};
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            guides: Array.isArray(guides) ? guides : [],
          }));
        }
      } catch (error) {
        if (isMounted) {
          setState((prev) => ({ ...prev, error: error.message }));
        }
      } finally {
        if (isMounted) {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}

function Price({ amount }) {
  return (
    <strong>
      {formatMoney(amount)} <span>/ day</span>
    </strong>
  );
}

function PageNotices({ notice, loadError, isLoading }) {
  return (
    <>
      {notice && (
        <p className="guide-notice" role="status">
          {notice}
        </p>
      )}
      {loadError && (
        <p className="guide-notice" role="status">
          Showing featured guides. Registered guides could not be loaded:{" "}
          {loadError}
        </p>
      )}
      {isLoading && (
        <p className="guide-notice" role="status">
          Loading registered guides…
        </p>
      )}
    </>
  );
}

function GuideCard({ guide, onView, onRequest }) {
  return (
    <article className="guide-card">
      <div className="guide-card__photo-wrap">
        <img
          className="guide-card__photo"
          src={guide.image}
          alt={guide.name}
          loading="lazy"
        />
      </div>

      <div className="guide-card__body">
        <p className="guide-card__location">
          <span aria-hidden="true">●</span> {guide.location}
        </p>

        <div className="guide-card__name-row">
          <h3>{guide.name}</h3>
        </div>

        <p className="guide-card__specialty">{guide.specialty}</p>
        <p className="guide-card__description">{guide.description}</p>

        <div className="guide-card__footer">
          <Price amount={guide.price} />

          <div className="guide-card__actions">
            <button
              type="button"
              className="guide-button guide-button--quiet"
              onClick={() => onView(guide)}
            >
              View profile
            </button>
            <button
              type="button"
              className="guide-button guide-button--primary"
              onClick={() => onRequest(guide)}
            >
              Request guide
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function GuideProfileDialog({ guide, onClose, onRequest }) {
  if (!guide) return null;

  const closeOnBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="guide-dialog-backdrop" onMouseDown={closeOnBackdropClick}>
      <section
        className="guide-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-dialog-title"
      >
        <button
          className="guide-dialog__close"
          type="button"
          onClick={onClose}
          aria-label="Close guide profile"
        >
          ×
        </button>

        <img src={guide.image} alt={guide.name} />

        <div className="guide-dialog__content">
          <p className="guide-eyebrow">Local Guide {guide.location}</p>
          <h2 id="guide-dialog-title">{guide.name}</h2>
          <p className="guide-card__specialty">
            Specialization: {guide.specialty}
          </p>
          <p>{guide.description}</p>

          <div className="guide-dialog__footer">
            <Price amount={guide.price} />
            <button
              type="button"
              className="guide-button guide-button--primary"
              onClick={() => onRequest(guide)}
            >
              Request This Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TopBar({ destination, onBack }) {
  return (
    <div className="guide-page__topbar">
      <button type="button" className="guide-back" onClick={onBack}>
        ← Back to itinerary
      </button>
      <span className="guide-trip-label">Your trip · {destination}</span>
    </div>
  );
}

function PageHeading({ destination }) {
  return (
    <header className="guide-page__heading">
      <div>
        <p className="guide-eyebrow">Find your local expert</p>
        <h1>Make your {destination} escape unforgettable.</h1>
      </div>
      <img
        className="guide-page__destination-image"
        src={HERO_IMAGE}
        alt={`${destination} landscape`}
      />
    </header>
  );
}

function PageFooter({ onBack }) {
  return (
    <footer className="guide-page__footer">
      <span>All guides are locally based and reviewed by travelers.</span>
      <button type="button" className="guide-back" onClick={onBack}>
        Return to itinerary
      </button>
    </footer>
  );
}

function GuideSelect({ tripDetails = {}, onBack, onRequestGuide }) {
  const query = "";
  const specialty = "all";

  const { guides, isLoading, error: loadError } = useRegisteredGuides();
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [notice, setNotice] = useState("");

  const destination = tripDetails.destination?.trim() || DEFAULT_DESTINATION;

  const visibleGuides = useMemo(
    () => filterGuides(guides, query, specialty),
    [guides]
  );

  const handleRequest = async (guide) => {
    setNotice("");
    try {
      await onRequestGuide(guide);
      setNotice(`Your request for ${guide.name} was sent.`);
      setSelectedGuide(null);
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <main className="guide-page">
      <div className="guide-page__container">
        <TopBar destination={destination} onBack={onBack} />
        <PageHeading destination={destination} />

        <section
          className="guide-results"
          aria-labelledby="guide-results-title"
        >
          <div className="guide-results__heading">
            <div>
              <p className="guide-eyebrow">Curated for your trip</p>
            </div>
            <div className="guide-filters"></div>
          </div>

          <PageNotices
            notice={notice}
            loadError={loadError}
            isLoading={isLoading}
          />

          <div className="guide-grid">
            {visibleGuides.map((guide) => (
              <GuideCard
                key={guide.id || guide.name}
                guide={guide}
                onView={setSelectedGuide}
                onRequest={handleRequest}
              />
            ))}
          </div>

          {visibleGuides.length === 0 && (
            <p className="guide-empty" role="status">
              No guides match those filters. Try a different name or specialty.
            </p>
          )}
        </section>

        <PageFooter onBack={onBack} />
      </div>

      <GuideProfileDialog
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
        onRequest={handleRequest}
      />
    </main>
  );
}

export default GuideSelect;