import '../styles/Footer.css';

const footerColumns = [
  {
    heading: 'Explore',
    links: ['Discover Places', 'Find a Guide', 'Find Hotels', 'Find Transport'],
  },
  {
    heading: 'Travel Planning',
    links: ['Plan Your Trip', 'My Trips', 'My Bookings', 'Permission Requests'],
  },
  {
    heading: 'Support',
    links: ['About VentureVista', 'Contact Us', 'Help Center', 'FAQs'],
  },
];

const Footer = () => {
  return (
    
    <footer className="site-footer">
      <div className="footer-top">
        <div className="brand-block">
          <div className="footer-logo">V</div>
          <p>
            Plan every step of your journey with
            clarity and confidence.
          </p>
        </div>

        {footerColumns.map((group) => (
          <div key={group.heading} className="footer-column">
            <h4>{group.heading}</h4>

            <ul>
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="newsletter">
          <h4>Get the app</h4>

          <div className="download-buttons">
            <button type="button">
              App Store
            </button>

            <button type="button">
              Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Velo. All rights reserved.
        </span>

        <div className="legal-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookie</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
