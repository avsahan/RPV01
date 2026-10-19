import "../styles/TravelerRequest.css"

function TravelerRequest() {
  return (
    <div className="traveler-request-card">
      <div className="traveler-request-card__header">
        <div>
          <h3>request.travelerName</h3>
        </div>
      </div>

      <div className="traveler-request-card__details">
        <p><strong>Destination:</strong> request.destination</p>
        <p><strong>Travel Date:</strong> request.travelDate</p>
        <p><strong>Budget:</strong> LKR request.budget</p>
        <p><strong>Message:</strong> request.message</p>
      </div>
      <div className="footer-button">
        <button className="action-button reject-button">Reject</button>
        <button className="action-button accpect-button">Accpet</button>
      </div>
    </div>
  );
}

export default TravelerRequest;