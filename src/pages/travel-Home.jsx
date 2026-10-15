import { useState } from 'react';
import '../styles/TravelHome.css';

const TravelHome = ({ onStartTrip }) => {
	const [inviteOpen, setInviteOpen] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		onStartTrip(Object.fromEntries(formData.entries()));
	};

	return (
		<section className="travel-planner">
			<div className="travel-planner__content">
				<h1>Plan a new trip</h1>

				<form className="travel-planner__form" onSubmit={handleSubmit}>
					<div className="travel-planner__fields">
						<div className="travel-planner__field travel-planner__destination">
							<label htmlFor="trip-destination">Where to?</label>
							<div className="travel-planner__input-wrap">
								<span className="travel-planner__pin" aria-hidden="true">●</span>
								<input
									id="trip-destination"
									name="destination"
									type="text"
									placeholder="e.g. Paris, Hawaii, Sri Lanka"
									required
								/>
							</div>
						</div>

						<fieldset className="travel-planner__dates">
							<legend>Dates (optional)</legend>
							<label className="travel-planner__date-input">
								<span className="travel-planner__calendar" aria-hidden="true">▦</span>
								<span className="visually-hidden">Trip start date</span>
								<input name="startDate" type="date" />
							</label>
							<label className="travel-planner__date-input">
								<span className="travel-planner__calendar" aria-hidden="true">▦</span>
								<span className="visually-hidden">Trip end date</span>
								<input name="endDate" type="date" />
							</label>
						</fieldset>
					</div>

					<div className="travel-planner__actions">
						<div className="travel-planner__sharing">
							<button
								className="travel-planner__invite"
								type="button"
								aria-expanded={inviteOpen}
								onClick={() => setInviteOpen((open) => !open)}
							>
								<span aria-hidden="true">♟+</span>
								{inviteOpen ? 'Close invites' : 'Invite tripmates'}
							</button>
							<span className="travel-planner__divider" aria-hidden="true" />
							<label className="visually-hidden" htmlFor="trip-visibility">Trip visibility</label>
							<select id="trip-visibility" name="visibility" defaultValue="friends">
								<option value="friends">Friends</option>
								<option value="private">Only me</option>
								<option value="public">Everyone</option>
							</select>
						</div>

						<button className="travel-planner__submit" type="submit">Start planning</button>
					</div>

					{inviteOpen && (
						<div className="travel-planner__invite-row">
							<label htmlFor="tripmate-email">Invite by email</label>
							<input id="tripmate-email" name="tripmateEmail" type="email" placeholder="friend@example.com" />
						</div>
					)}
				</form>

				<p className="travel-planner__guide-copy">
					Or <a href="#new-guide">write a new guide</a> to share your recommendations.
				</p>
			</div>
		</section>
	);
};

export default TravelHome;
