import React from 'react';

export default function GuideProfileDialog({ guide, onClose }) {
  if (!guide) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%',
        padding: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            border: 'none',
            background: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#6b7280'
          }}
        >
          ✕
        </button>

        {/* Profile Info */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <img
            src={guide.image}
            alt={guide.name}
            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>{guide.name}</h3>
            <p style={{ margin: 0, color: '#0284c7', fontSize: '0.875rem' }}>📍 {guide.address}</p>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '0.85rem' }}>⭐ {guide.rating} ({guide.reviewsCount} reviews)</p>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600' }}>Specialization</h4>
          <p style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem' }}>{guide.specialization}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600' }}>Languages Spoken</h4>
          <p style={{ margin: 0, color: '#4b5563', fontSize: '0.875rem' }}>{guide.language}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: '600' }}>About</h4>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.4' }}>{guide.bio}</p>
        </div>

        {/* Modal Action Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            alert(`Request sent to ${guide.name}!`);
          }}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          Request Guide — LKR {guide.priceLkr?.toLocaleString()} / day
        </button>
      </div>
    </div>
  );
}