import { useState } from 'react';
import '../styles/AddDate.css';

const starterActivities = [
	{ id: 1, day: 0, time: '07:30', title: 'Sunrise walk to Little Adam\'s Peak', category: 'Hiking', cost: 2500, done: false },
	{ id: 2, day: 0, time: '10:30', title: 'Nine Arches Bridge viewpoint', category: 'Sightseeing', cost: 1800, done: false },
	{ id: 3, day: 0, time: '12:30', title: 'Lunch at a local cafe', category: 'Food', cost: 3200, done: false },
	{ id: 4, day: 1, time: '08:00', title: 'Ella Rock guided hike', category: 'Hiking', cost: 6500, done: false },
	{ id: 5, day: 1, time: '13:00', title: 'Ravana Falls and picnic stop', category: 'Sightseeing', cost: 2800, done: false },
	{ id: 6, day: 2, time: '09:00', title: 'Tea factory and plantation tour', category: 'Culture', cost: 5500, done: false },
	{ id: 7, day: 2, time: '15:30', title: 'Scenic train to Haputale', category: 'Transport', cost: 4200, done: false },
];

const categoryNames = ['Hiking', 'Sightseeing', 'Food', 'Transport', 'Culture', 'Stay', 'Other'];

const formatDate = (date) => {
	if (!date) return '';
	return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${date}T00:00:00`));
};

const formatMoney = (amount) => `LKR ${amount.toLocaleString('en-LK')}`;

function ActivityForm({ onAdd, onCancel }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const values = new FormData(event.currentTarget);
		onAdd({
			title: values.get('title').trim(),
			time: values.get('time'),
			category: values.get('category'),
			cost: Number(values.get('cost')) || 0,
		});
		event.currentTarget.reset();
	};

	return (
		<form className="itinerary-add-form" onSubmit={handleSubmit}>
			<div className="itinerary-add-form__heading">
				<h3>Add an activity</h3>
				<button type="button" className="itinerary-icon-button" onClick={onCancel} aria-label="Close form">×</button>
			</div>
			<div className="itinerary-add-form__fields">
				<label>
					Activity
					<input name="title" required maxLength="80" placeholder="e.g. Visit a local tea estate" />
				</label>
				<label>
					Time
					<input name="time" type="time" defaultValue="10:00" required />
				</label>
				<label>
					Category
					<select name="category" defaultValue="Sightseeing">
						{categoryNames.map((category) => <option key={category}>{category}</option>)}
					</select>
				</label>
				<label>
					Estimated cost (LKR)
					<input name="cost" type="number" min="0" step="100" defaultValue="0" />
				</label>
			</div>
			<div className="itinerary-add-form__actions">
				<button type="button" className="itinerary-button itinerary-button--quiet" onClick={onCancel}>Cancel</button>
				<button type="submit" className="itinerary-button itinerary-button--primary">Add activity</button>
			</div>
		</form>
	);
}

function ActivityRow({ activity, onToggle, onRemove }) {
	return (
		<article className={`itinerary-activity${activity.done ? ' itinerary-activity--done' : ''}`}>
			<time className="itinerary-activity__time">{activity.time}</time>
			<button
				type="button"
				className="itinerary-activity__check"
				aria-label={`${activity.done ? 'Mark as not done' : 'Mark as done'}: ${activity.title}`}
				aria-pressed={activity.done}
				onClick={onToggle}
			>
				{activity.done ? '✓' : ''}
			</button>
			<div className="itinerary-activity__main">
				<h3>{activity.title}</h3>
				<span>{activity.category}</span>
			</div>
			<strong className="itinerary-activity__cost">{formatMoney(activity.cost)}</strong>
			<button type="button" className="itinerary-icon-button itinerary-activity__remove" onClick={onRemove} aria-label={`Remove ${activity.title}`}>
				×
			</button>
		</article>
	);
}

function BudgetPanel({ activities, budget, onBudgetChange }) {
	const total = activities.reduce((sum, activity) => sum + activity.cost, 0);
	const progress = budget > 0 ? Math.min((total / budget) * 100, 100) : 0;
	const categoryTotals = categoryNames
		.map((category) => ({
			category,
			amount: activities.filter((activity) => activity.category === category).reduce((sum, activity) => sum + activity.cost, 0),
		}))
		.filter((item) => item.amount > 0);

	return (
		<aside className="itinerary-budget" aria-labelledby="budget-title">
			<div className="itinerary-budget__heading">
				<div>
					<p className="itinerary-eyebrow">Trip overview</p>
					<h2 id="budget-title">Live budget</h2>
				</div>
				<span className="itinerary-budget__currency">LKR</span>
			</div>

			<div className="itinerary-budget__total">
				<span>Planned spend</span>
				<strong>{formatMoney(total)}</strong>
			</div>

			<label className="itinerary-budget__limit">
				<span>Trip budget</span>
				<span className="itinerary-budget__limit-input">
					<span>LKR</span>
					<input
						aria-label="Trip budget in Sri Lankan rupees"
						type="number"
						min="0"
						step="1000"
						value={budget}
						onChange={(event) => onBudgetChange(Number(event.target.value))}
					/>
					<span className="itinerary-budget__edit" aria-hidden="true">Edit</span>
				</span>
			</label>

			<div className="itinerary-budget__progress" role="progressbar" aria-label="Budget used" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
				<span style={{ width: `${progress}%` }} />
			</div>
			<p className="itinerary-budget__remaining">
				{budget > total ? `${formatMoney(budget - total)} left` : `${formatMoney(total - budget)} over budget`}
			</p>

			<div className="itinerary-budget__breakdown">
				<h3>By category</h3>
				{categoryTotals.length ? categoryTotals.map(({ category, amount }) => (
					<div className="itinerary-budget__category" key={category}>
						<span>{category}</span>
						<strong>{formatMoney(amount)}</strong>
					</div>
				)) : <p className="itinerary-budget__empty">Add activities to see your breakdown.</p>}
			</div>

			<div className="itinerary-budget__footnote">
				<strong>One trip, one clear plan.</strong>
				<span>Costs update as you build your itinerary.</span>
			</div>
		</aside>
	);
}

function AddDate({ tripDetails = {}, onBack, onHome, onContinue }) {
	const [activeDay, setActiveDay] = useState(0);
	const [activities, setActivities] = useState(starterActivities);
	const [budget, setBudget] = useState(60000);
	const [showActivityForm, setShowActivityForm] = useState(false);
	const destination = tripDetails.destination?.trim() || 'Ella';
	const dateRange = [formatDate(tripDetails.startDate), formatDate(tripDetails.endDate)].filter(Boolean).join(' - ');
	const days = [
		{ label: 'Day 1', title: 'Little Adam\'s Peak and Nine Arches', date: dateRange.split(' - ')[0] },
		{ label: 'Day 2', title: 'Ella Rock and Ravana Falls', date: '' },
		{ label: 'Day 3', title: 'Tea country and the scenic train', date: dateRange.split(' - ')[1] },
	];
	const dayActivities = activities.filter((activity) => activity.day === activeDay).sort((a, b) => a.time.localeCompare(b.time));
	const dayTotal = dayActivities.reduce((sum, activity) => sum + activity.cost, 0);

	const addActivity = (activity) => {
		setActivities((current) => [...current, { ...activity, day: activeDay, id: Date.now(), done: false }]);
		setShowActivityForm(false);
	};

	const updateActivity = (id, updates) => {
		setActivities((current) => current.map((activity) => activity.id === id ? { ...activity, ...updates } : activity));
	};

	return (
		<section className="itinerary-page">
			<div className="itinerary-container">
				<div className="itinerary-topbar">
					<button type="button" className="itinerary-back" onClick={onBack}>Back to trip details</button>
					<div className="itinerary-topbar__actions">
						<button type="button" className="itinerary-button itinerary-button--quiet">Share plan</button>
						<button type="button" className="itinerary-button itinerary-button--primary">Save trip</button>
					</div>
				</div>

				<header className="itinerary-trip-header">
					<div>
					<p className="itinerary-eyebrow">Your travel itinerary</p>
					<h1>Your {destination} escape, thoughtfully planned.</h1>
					<p className="itinerary-trip-header__meta">
						<span>{dateRange || '3 days'}</span>
						<span>3 days</span>
						<span>Friends trip</span>
					</p>
				</div>
				<img
					className="itinerary-trip-header__image"
					src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=85"
					alt={`${destination} mountain landscape`}
				/>
				</header>

				<div className="itinerary-layout">
					<section className="itinerary-schedule" aria-labelledby="schedule-title">
						<div className="itinerary-section-heading">
							<div>
								<p className="itinerary-eyebrow">Make every day count</p>
								<h2 id="schedule-title">Day-by-day activity planner</h2>
							</div>
							<button type="button" className="itinerary-button itinerary-button--primary itinerary-add-button" onClick={() => setShowActivityForm((visible) => !visible)}>
								<span aria-hidden="true">+</span> Add activity
							</button>
						</div>

						<div className="itinerary-day-tabs" role="tablist" aria-label="Trip days">
							{days.map((day, index) => (
								<button
									key={day.label}
									id={`day-tab-${index}`}
									className={activeDay === index ? 'is-active' : ''}
									role="tab"
									aria-selected={activeDay === index}
									aria-controls="day-panel"
									tabIndex={activeDay === index ? 0 : -1}
									onClick={() => setActiveDay(index)}
								>
									<span>{day.label}</span>
									<strong>{day.date || day.title}</strong>
								</button>
							))}
						</div>

						<div id="day-panel" className="itinerary-day-panel" role="tabpanel" aria-labelledby={`day-tab-${activeDay}`}>
							<div className="itinerary-day-summary">
								<div>
									<h3>{days[activeDay].title}</h3>
									<p>{dayActivities.length} planned {dayActivities.length === 1 ? 'activity' : 'activities'}</p>
								</div>
								<strong>{formatMoney(dayTotal)}</strong>
							</div>

							{showActivityForm && <ActivityForm onAdd={addActivity} onCancel={() => setShowActivityForm(false)} />}

							<div className="itinerary-activity-list">
								{dayActivities.map((activity) => (
									<ActivityRow
										key={activity.id}
										activity={activity}
										onToggle={() => updateActivity(activity.id, { done: !activity.done })}
										onRemove={() => setActivities((current) => current.filter((item) => item.id !== activity.id))}
									/>
								))}
								{dayActivities.length === 0 && !showActivityForm && (
									<p className="itinerary-empty-day">Nothing planned for this day yet. Add an activity to get started.</p>
								)}
							</div>
						</div>

						<div className="itinerary-day-total">
							<span>Estimated spend for {days[activeDay].label.toLowerCase()}</span>
							<strong>{formatMoney(dayTotal)}</strong>
						</div>
					</section>

					<BudgetPanel activities={activities} budget={budget} onBudgetChange={setBudget} />
				</div>

				<div className="itinerary-bottom-actions">
					<button type="button" className="itinerary-button itinerary-button--quiet" onClick={onHome}>
						<span aria-hidden="true">←</span> Back to Home Page
					</button>
					<button type="button" className="itinerary-button itinerary-button--primary" onClick={onContinue}>
						Continue / Find the Guides <span aria-hidden="true">→</span>
					</button>
				</div>
			</div>
		</section>
	);
}

export default AddDate;