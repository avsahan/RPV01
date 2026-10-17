import React from 'react';

export default function GuideCard({ guide, onViewProfile, onRequestGuide }) {
  return (
    <div style={styles.card}>
      <img src={guide.image} alt={guide.name} style={styles.cardImg} />

      <div style={styles.cardBody}>
        <p style={styles.location}>📍 {guide.address}</p>
        <h3 style={styles.name}>{guide.name}</h3>
        <p style={styles.spec}>{guide.specialization}</p>

        <div style={{ marginBottom: '1.25rem' }}>
          <span style={styles.price}>LKR {guide.priceLkr?.toLocaleString()}</span>
          <span style={{ fontSize: '0.85rem', color: '#6b7280' }}> / day</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button type="button" onClick={onViewProfile} style={styles.btnOutline}>
            View Profile
          </button>
          <button type="button" onClick={() => onRequestGuide && onRequestGuide(guide)} style={styles.btnPrimary}>
            Request Guide
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardImg: { width: '100%', height: '210px', objectFit: 'cover' },
  cardBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  location: { margin: '0 0 0.25rem 0', color: '#0284c7', fontSize: '0.85rem' },
  name: { margin: '0 0 0.25rem 0', fontSize: '1.25rem', color: '#111827', fontWeight: '700' },
  spec: { margin: '0 0 1rem 0', color: '#0284c7', fontSize: '0.9rem', fontWeight: '600' },
  price: { fontSize: '1.15rem', fontWeight: '700', color: '#111827' },
  btnOutline: {
    flex: 1,
    padding: '0.65rem',
    backgroundColor: '#ffffff',
    color: '#0284c7',
    border: '1px solid #e0f2fe',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem'
  },
  btnPrimary: {
    flex: 1,
    padding: '0.65rem',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem'
  }
};