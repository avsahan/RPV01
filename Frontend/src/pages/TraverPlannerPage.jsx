import { useState } from "react";
import "../styles/TraverPlannerPage.css"
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function TraverPlannerPage() {
    const navigate = useNavigate();

    const [open ,setOpen] = useState(false);
    const [activities, setActivities] = useState([]);

    function NavigateGuideSelection() {
        navigate("/Login/TravelHomePage/TraverPlannerPage/GudiderSelection");
    }

    function ActivityForm() {
        return (
            <form className="itinerary-add-form" onSubmit={HanaleActivity}>
                <div className="itinerary-add-form__heading">
                    <h3>Add an activity</h3>
                </div>
                <div className="itinerary-add-form__fields">
				<label>
					Activity
					<input name="title" required maxLength="80" placeholder="e.g. Visit a local tea estate" />
				</label>
                <label>
					Date
					<input name="date" required type="date" />
				</label>
				<label>
					Time
					<input name="time" type="time" defaultValue="10:00" required />
				</label>
				<label>
					Estimated cost (LKR)
					<input name="cost" type="number" min="0" step="100" defaultValue="0" />
				</label>
			    </div>
                <div className="itinerary-add-form__actions">
                    <button type="button" className="itinerary-button itinerary-button--quiet" onClick={() => {setOpen(false)}}>Cancel</button>
                    <button type="submit" className="itinerary-button itinerary-button--primary">Add activity</button>
                </div>
            </form>
        );
    }

    function ActivityRow({ activity }) {
        return (
            <div className="itinerary-activity">
                <time className="itinerary-activity__date">{activity.date}</time>
		    	<time className="itinerary-activity__time">{activity.time}</time>
			    <div className="itinerary-activity__main">
				    <h3>{activity.title}</h3>
                </div>
                <strong className="itinerary-activity__cost">${activity.cost}</strong>
                <button type="button" className="itinerary-icon-button itinerary-activity__remove" onClick={() => {removeActivity(activity.id)}} aria-label={`Remove ${activity.title}`}>
                    ×
                </button>
		    </div>
        );
    }

    function removeActivity(id) {
        setActivities((previous) => previous.filter((activity) => activity.id !== id));
    }

    function HanaleActivity(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const activityDetails = {
            id: Date.now(),
            title: formData.get("title"),
            time: formData.get("time"),
            cost: Number(formData.get("cost") || 0),
            date: formData.get("date")
        }
        setActivities((previous) => [...previous, activityDetails]);
        setOpen(false);
    }

    return(
        <>  
            <Header />
            <div className="itinerary-layout">
                <section className="itinerary-schedule" aria-labelledby="schedule-title">
                    <div>

                        <div className="itinerary-section-heading">
                            <div>
                                <h2 id="schedule-title">Day-by-day activity planner</h2>
                            </div>
                            <button type="button" className="itinerary-button itinerary-button--primary itinerary-add-button" onClick={() => {setOpen(true)}}>Add activity</button>
                        </div>
                        {open ? ActivityForm() : null}
                        {activities.map((activity) => (<ActivityRow key={activity.id} activity={activity} />))}
                        <div>
                            <button type="button" className="itinerary-button itinerary-button--primary" onClick={NavigateGuideSelection}>
                                Continue / Find the Guides 
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default TraverPlannerPage;