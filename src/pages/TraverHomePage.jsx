import "../styles/TraverHomePage.css"
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function TraverHomePage () {
	const navigate = useNavigate();

	function navigateToPlanner() {
		navigate("/Login/TravelHomePage/TraverPlannerPage");
	}

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
						<button className="travel-planner__submit" onClick={navigateToPlanner}>Start planning</button>
					</div>
				</form>
			</div>
		</section>
        <Footer />
    </>
    );
}

export default TraverHomePage;