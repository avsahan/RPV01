import "../styles/TraverHomePage.css"
import Header from "../components/Header";
import Footer from "../components/Footer";

function TraverHomePage () {
	
    return (
        <>
            <Header />
        	<section className="travel-planner">
			<div className="travel-planner__content">
				<h1>Plan a new trip</h1>

				<form className="travel-planner__form">
					<div className="travel-planner__fields">
						<div className="travel-planner__field travel-planner__destination">
							<label className="trip-planner-text">Where to?</label>
							<div className="travel-planner__input-wrap">
								<input id="trip-destination" type="text" placeholder="e.g. Elle" required/>
							</div>
                        </div>

                        <div className="travel-planner__dates">
                            <label className="trip-planner-text">
								<span>Trip start date</span>
							</label>
                            <input className="travel-planner__date-input" type="date" />
                        </div>
                        <div>
							<label className="trip-planner-text">
								<span>Trip end date</span>
							</label>
                            <input className="travel-planner__date-input" type="date" />
                        </div>
					</div>

					<div className="travel-planner__actions">
						<button className="travel-planner__submit" type="submit">Start planning</button>
					</div>
				</form>
			</div>
		</section>
        <Footer />
    </>
    );
}

export default TraverHomePage;