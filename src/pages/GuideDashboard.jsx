import NavBar from "../components/Navbar";
import "../styles/GuideDashboard.css"
import GuideRequest from "../components/GuideRequest";
import Footer from "../components/Footer";

function GuideDashboard() {
    return (
        <>
            <NavBar />
            <main className="gd-dashboard">
            <div className="gd-dashboard__inner">
            <section className="gd-profile" aria-label="Guide profile">
                <div className="gd-profile__top">
                <img className="gd-profile__photo" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85" />
                <div className="gd-profile__info">
                    <h1>
                    GuideName
                    </h1>
                    <p className="gd-profile__title">guide.title</p>
                    <p className="gd-profile__bio">guide.bio</p>
                </div>
                <div className="gd-fee">
                    <span>Standard Daily Fee</span>
                    <p><strong>guide.dailyFee</strong> / day</p>
                    <small><span aria-hidden="true" /> Available for Instant Booking</small>
                </div>
                </div>
                <div className="gd-profile__bottom">
                <div className="gd-detail"><span>Base location</span><strong>guide.baseLocation</strong></div>
                <div className="gd-detail"><span>Experience</span><strong>guide.experience</strong></div>
                <div className="gd-detail"><span>Contact phone</span><strong>guide.phone</strong></div>
                <div className="gd-detail"><span>License no.</span><strong>guide.license</strong></div>
                </div>
            </section>
            <GuideRequest />
            <Footer />
            </div>
        </main>
      </>
    );
}

export default GuideDashboard;