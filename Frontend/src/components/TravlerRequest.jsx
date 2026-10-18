function TravelerCard({ traveler }) {
  return (
    <section className="traveler-card">
      <div className="traveler-card__image">
        <img src={traveler.image} alt={traveler.name} />
      </div>

      <div className="traveler-card__content">
        <h3>{traveler.name}</h3>

        <p>Email: {traveler.email}</p>
        <p>Phone: {traveler.phone}</p>
        <p>Location: {traveler.location}</p>

        <div className="traveler-card__footer">
          <span className={`traveler-status traveler-status--${traveler.status.toLowerCase()}`}>
            {traveler.status}
          </span>

          <button type="button" onClick={traveler.onViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

export default TravelerCard;