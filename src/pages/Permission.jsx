import { useState } from 'react';
import '../styles/Permission.css';

const permissionTypes = [
  'Local guide registration',
  'Trip or itinerary access',
  'Profile or account change',
  'Other request',
];

function Permission({ onCancel }) {
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('fullName').trim();
    setConfirmation(`Thanks, ${name}. Your request is ready for review. This demo has not sent it to a server.`);
    event.currentTarget.reset();
  };

  const handleReset = () => setConfirmation('');

  return (
    <main className="permission-page">
      <div className="permission-page__inner">
        <div className="permission-breadcrumb" aria-label="Breadcrumb">
          <span>Workspace</span><span aria-hidden="true">/</span><strong>Permission request</strong>
        </div>

        <header className="permission-heading">
          <div>
            <p className="permission-eyebrow">Access and account support</p>
            <h1>Request permission</h1>
            <p>Tell us what you need and our team will review your request.</p>
          </div>
          <div className="permission-heading__mark" aria-hidden="true"><span>✓</span></div>
        </header>

        {confirmation && (
          <div className="permission-confirmation" role="status">
            <span aria-hidden="true">✓</span>
            <p>{confirmation}</p>
            <button type="button" onClick={() => setConfirmation('')} aria-label="Dismiss confirmation">×</button>
          </div>
        )}

        <div className="permission-layout">
          <form className="permission-form" onSubmit={handleSubmit} onReset={handleReset}>
            <section className="permission-section" aria-labelledby="permission-personal-title">
              <div className="permission-section__heading">
                <span className="permission-section__number">01</span>
                <div><h2 id="permission-personal-title">Personal information</h2><p>Who should we contact about this request?</p></div>
              </div>
              <div className="permission-fields">
                <label className="permission-field permission-field--wide">
                  <span>Full name <b>*</b></span>
                  <input name="fullName" autoComplete="name" placeholder="Your full name" required />
                </label>
                <label className="permission-field">
                  <span>Email address <b>*</b></span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </label>
                <label className="permission-field">
                  <span>Phone number</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="+94 77 123 4567" />
                </label>
                <label className="permission-field">
                  <span>Account type <b>*</b></span>
                  <select name="accountType" defaultValue="" required>
                    <option value="" disabled>Select account type</option>
                    <option value="traveler">Traveler</option>
                    <option value="guide">Local guide</option>
                    <option value="other">I do not have an account yet</option>
                  </select>
                </label>
                <label className="permission-field">
                  <span>Account email (if different)</span>
                  <input name="accountEmail" type="email" placeholder="Email linked to your account" />
                </label>
              </div>
            </section>

            <section className="permission-section" aria-labelledby="permission-request-title">
              <div className="permission-section__heading">
                <span className="permission-section__number">02</span>
                <div><h2 id="permission-request-title">Request details</h2><p>Choose a request type and explain what you need.</p></div>
              </div>
              <div className="permission-fields">
                <label className="permission-field">
                  <span>Request type <b>*</b></span>
                  <select name="requestType" defaultValue="" required>
                    <option value="" disabled>Select a request type</option>
                    {permissionTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>
                <label className="permission-field">
                  <span>Related trip or reference</span>
                  <input name="reference" placeholder="e.g. trip name or booking ID" />
                </label>
                <label className="permission-field permission-field--wide">
                  <span>What permission do you need? <b>*</b></span>
                  <textarea name="description" rows="4" placeholder="Describe what you are requesting and why..." minLength="20" maxLength="1200" required />
                  <small>Include enough detail for our team to understand your request.</small>
                </label>
                <label className="permission-field permission-field--wide">
                  <span>Additional context <small>(optional)</small></span>
                  <textarea name="context" rows="3" placeholder="Anything else that may help us review your request?" maxLength="800" />
                </label>
              </div>
            </section>

            <section className="permission-section permission-section--declaration" aria-labelledby="permission-declaration-title">
              <div className="permission-section__heading">
                <span className="permission-section__number">03</span>
                <div><h2 id="permission-declaration-title">Before you submit</h2><p>Confirm that the information is accurate.</p></div>
              </div>
              <label className="permission-consent">
                <input type="checkbox" name="accurate" required />
                <span>I confirm the information above is accurate and understand that access is granted only after review. <b>*</b></span>
              </label>
            </section>

            <div className="permission-actions">
              <button className="permission-cancel" type="button" onClick={onCancel}>Cancel</button>
              <button className="permission-reset" type="reset">Clear form</button>
              <button className="permission-submit" type="submit">Submit request <span aria-hidden="true">→</span></button>
            </div>
            <p className="permission-required-note"><b>*</b> Required fields</p>
          </form>

          <aside className="permission-sidebar">
            <section className="permission-info-block permission-info-block--review">
              <span className="permission-info-icon" aria-hidden="true">◷</span>
              <h2>What happens next?</h2>
              <ol className="permission-steps">
                <li><span>1</span><div><strong>We review your request</strong><p>Our team checks the details you provide.</p></div></li>
                <li><span>2</span><div><strong>We may contact you</strong><p>We will email if we need more information.</p></div></li>
                <li><span>3</span><div><strong>You receive an update</strong><p>We will let you know the outcome by email.</p></div></li>
              </ol>
            </section>

            <section className="permission-info-block">
              <span className="permission-info-icon permission-info-icon--gold" aria-hidden="true">i</span>
              <h2>Helpful notes</h2>
              <ul className="permission-notes">
                <li>Use the email linked to your VentureVista account when possible.</li>
                <li>Never include passwords, payment details, or other sensitive information.</li>
                <li>Submitting a request does not automatically grant access.</li>
              </ul>
            </section>

            <section className="permission-support">
              <div className="permission-support__icon" aria-hidden="true">?</div>
              <div><h2>Need help?</h2><p>For account access issues, contact our support team.</p><a href="mailto:support@venturevista.example">Contact support <span aria-hidden="true">↗</span></a></div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Permission;