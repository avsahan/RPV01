function PlannedTrip() {
    return(
        <section className="gd-request">
            <div className="gd-request__media">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85" />
            </div>
            <div className="gd-request__body">
                <div className="gd-request__top">
                <div>
                    <h3>request.title</h3>
                    <p className="gd-muted">
                    Requested to request.Guide
                    </p>
                </div>
                <div className="gd-budget">
                    <span>Offered budget</span>
                    <strong>request.budget</strong>
                </div>
            </div>

            <p className="gd-request__message">Date</p>

                <div className="gd-request__footer">
                    <p>state</p>
                </div>
            </div>
        </section>
    );
}

export default PlannedTrip;