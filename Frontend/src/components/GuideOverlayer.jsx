function GuideRequest() {
  return (
    <div className="modal-overlay">
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()}>
        <button className="modal-close">
          &times;
        </button>

        <h2>Request Guide</h2>
        <p>Send a request to your selected travel guide.</p>

        <label>Destination</label>
        <input type="text" placeholder="Enter destination" />

        <label>Travel Date</label>
        <input type="date" />

        <label>Your Budget (LKR)</label>
        <input type="number" placeholder="Enter your budget" />

        <button
          className="modal-submit"
          onClick={() => {
            alert("Demo: connect this button to your backend.");
          }}
        >
          Send Request
        </button>
      </div>
    </div>
  );
}

export default GuideRequest;