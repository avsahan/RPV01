import React, { useState } from 'react';
import GuideCard from '../components/GuideCard';
import GuideProfileDialog from '../components/GuideProfileDialog';

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=400&q=80';

const GUIDES = [
  {
    id: 1,
    name: 'Ishani Perera',
    address: 'Kandy, Sri Lanka',
    specialization: 'Culture & temple walks',
    bio: 'Explore sacred temples, lakeside lanes and Kandyan traditions at an easy pace.',
    priceLkr: 10500,
    rating: 4.9,
    reviewsCount: 128,
    language: 'English, Sinhala',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Kasun Dissanayake',
    address: 'Sigiriya, Sri Lanka',
    specialization: 'Ancient cities & heritage',
    bio: 'Uncover the stories of Lion Rock, ancient gardens and the Cultural Triangle.',
    priceLkr: 13500,
    rating: 4.8,
    reviewsCount: 94,
    language: 'English, Sinhala',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Sahan Silva',
    address: 'Ella, Sri Lanka',
    specialization: 'Trekking & mountain trails',
    bio: 'Guided hikes across Nine Arches Bridge, Little Adam’s Peak, and local tea estates.',
    priceLkr: 12000,
    rating: 5.0,
    reviewsCount: 156,
    language: 'English, Sinhala',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  }
];

export default function GuideSelect({ tripDetails = {}, onBack }) {
  const [selectedGuide, setSelectedGuide] = useState(null);

  const destination = tripDetails.destination || tripDetails.location || 'Ella';
  const bannerImg = tripDetails.image || DEFAULT_BANNER;

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Banner Box */}
      <div style={styles.banner}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h1 style={styles.bannerTitle}>Your {destination} escape, thoughtfully planned.</h1>
          <h2 style={styles.subHeading}>Select your tour guide</h2>
          <p style={styles.subText}>
            Choose a verified local guide to accompany you on your trip.
          </p>
        </div>

        <img src={bannerImg} alt={destination} style={styles.bannerImg} />
      </div>

      {/* Guides Grid */}
      <div style={styles.grid}>
        {GUIDES.map((guide) => (
          <GuideCard
            key={guide.id}
            guide={guide}
            onViewProfile={() => setSelectedGuide(guide)}
            onRequestGuide={(g) => alert(`Request sent to ${g.name}!`)}
          />
        ))}
      </div>

      {/* Profile Dialog Modal */}
      {selectedGuide && (
        <GuideProfileDialog guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
      )}
    </div>
  );
}

const styles = {
  banner: {
    backgroundColor: '#f8fafc',
    border: '1px solid #f1f5f9',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  bannerTitle: { margin: 0, fontSize: '2rem', color: '#0f172a', fontWeight: '800', lineHeight: '1.2' },
  subHeading: { margin: 0, fontSize: '1.15rem', color: '#1e293b', fontWeight: '700', lineHeight: '1.3' },
  subText: { margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.3' },
  bannerImg: { width: '180px', height: '100px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }
};