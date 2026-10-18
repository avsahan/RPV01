function BookingCard({ booking }) {
  return (
    <section className="booking-card">
      <div className="booking-card__image">
        <img src={booking.guideImage} alt={booking.guideName} />
      </div>

      <div className="booking-card__content">
        <div className="booking-card__header">
          <div>
            <h3>{booking.tripName}</h3>
            <p>Guide: {booking.guideName}</p>
          </div>

          <div className="booking-card__budget">
            <span>Total Budget</span>
            <strong>Rs. {booking.totalBudget.toLocaleString()}</strong>
          </div>
        </div>

        <p className="booking-card__date">
          Travel Date: {booking.travelDate}
        </p>

        <p className="booking-card__description">
          {booking.description}
        </p>

        <div className="booking-card__footer">
          <span className={`booking-status booking-status--${booking.status.toLowerCase()}`}>
            {booking.status}
          </span>

          <button type="button" onClick={booking.onViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

export default BookingCard;