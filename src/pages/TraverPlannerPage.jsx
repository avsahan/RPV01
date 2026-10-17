import { useState } from "react";

function TraverPlannerPage() {

    const [open ,setOpen] = useState(false)

    function ActivityForm() {
        return (
            <form className="itinerary-add-form">
                <div className="itinerary-add-form__heading">
                    <h3>Add an activity</h3>
                    <button type="button" className="itinerary-icon-button" aria-label="Close form" onClick={() => setOpen(false)}>×</button>
                </div>
             </form>
        );
    }

    return(
        <>
            <header className="itinerary-trip-header">
                <div>
                    <p className="itinerary-eyebrow">Your travel itinerary</p>
                    <h1>Your locationName escape, thoughtfully planned.</h1>
                    {/* add numbeer of date if need */}
                </div>
                {/* image if need about the trip */}
            </header>
            <div className="itinerary-layout">
                <section className="itinerary-schedule" aria-labelledby="schedule-title">
                    <div className="itinerary-section-heading">
                        <div>
                            <h2 id="schedule-title">Day-by-day activity planner</h2>
                        </div>
                        <button type="button" className="itinerary-button itinerary-button--primary itinerary-add-button" onClick={() => {
                            setOpen(true)
                            console.log(open ,'sss')
                        }}>Add activity</button>
                    </div>
                </section>
                {open ? ActivityForm() : 'p'}
            </div>
        </>
    );
}

export default TraverPlannerPage;