import React from 'react';
import '../styles/DestinationDetails.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const destinationData = {
    Ella: {
        location: 'Ella, Bandarawela, Sri Lanka',
        category: 'Mountains & Nature',
        coordinates: [6.8667, 81.0466],
        description:
            'Ravana Ella and Ravana water fall both are located in the same place but, Ravana falls can not be seen from the Main road because Ravana Falls is situated above the Ravana Ella. There is a cave called Ravana cave and it is Located near to this Ravana Falls. This Name "Ravana Ella" received from, after the great king Ravana. According to the legend after the kidnapping sitha, ravana king brought her to this place and hid her at the cave behind the waterfall.',
        image: '/image/ella.jpg',
        photos: [
            { image: '/image/Ella_mountain.jpg', title: 'Mountain views' },
            { image: '/image/Ella_Tea.jpg', title: 'Tea plantations' },
            { image: '/image/ella.jpeg', title: 'Explore Ella' },
        ],
        places: [
            {
                name: 'Nine Arch Bridge',
                description: 'A famous railway bridge surrounded by green hills and forest.',
                coordinates: [6.8768, 81.0608],
            },
            {
                name: 'Little Adam’s Peak',
                description: 'A popular hike with scenic views of the surrounding mountains.',
                coordinates: [6.8722, 81.0572],
            },
            {
                name: 'Ravana Falls',
                description: 'A well-known waterfall near Ella, popular with visitors.',
                coordinates: [6.8394, 81.0567],
            },
        ],
        tips: [
            'Check the weather before planning hikes.',
            'Wear comfortable shoes for walking and hiking.',
            'Check current train schedules before travelling.',
        ],
    },
    Sigiriya: {
        location: 'Central Province, Sri Lanka',
        category: 'History & Culture',
        coordinates: [7.9570, 80.7603],
        description:
            'Explore the famous Sigiriya rock fortress, its historic surroundings and the beautiful landscapes nearby.',
        image: '/image/Sigiriya1.jpg',
        photos: [
            { image: '/image/Sigiriya1.jpg', title: 'Discover Sigiriya' },
        ],
        places: [
            {
                name: 'Sigiriya Rock Fortress',
                description:
                    'An ancient rock fortress known for its history, gardens and views.',
                coordinates: [7.9570, 80.7603],
            },
            {
                name: 'Pidurangala Rock',
                description:
                    'A popular hiking destination offering views of the surrounding landscape.',
                coordinates: [7.9698, 80.7633],
            },
        ],
        tips: [
            'Check opening times and entrance fees before visiting.',
            'Carry water and sun protection for outdoor activities.',
            'Check weather conditions before planning a hike.',
        ],
    },

    Galle: {
        location: 'Southern Province, Sri Lanka',
        category: 'Coast & Heritage',
        coordinates: [6.0535, 80.2210],
        description:
            'Enjoy coastal scenery, historic streets, local food and the charm of Galle Fort.',
        image: '/image/galle.jpg',
        photos: [],
        places: [
            {
                name: 'Galle Fort',
                description:
                    'Explore historic streets, old buildings, shops and cafés inside the fort.',
                coordinates: [6.0269, 80.2168],
            },
            {
                name: 'Galle Lighthouse',
                description:
                    'A well-known landmark along the coast near Galle Fort.',
                coordinates: [6.0259, 80.2200],
            },
        ],
        tips: [
            'Explore the fort on foot to discover its streets and small shops.',
            'Wear comfortable shoes and bring sun protection.',
            'Respect local residents and historic buildings when taking photos.',
        ],
    },
};

function FitMapToMarkers({ places }) {
    const map = useMap();

    React.useEffect(() => {
        if (places.length === 0) return;
        const bounds = places.map((place) => place.coordinates);
        map.fitBounds(bounds, {
            padding: [40, 40],
            maxZoom: 14,
        });
    }, [map, places]);

    return null;
}

function DestinationDetails({
    destinationName = 'Ella',
    onBack,
    onStartPlanning,
}) {
    const destination = destinationData[destinationName];

    if (!destination) {
        return (
            <section className="destination-details">
                <h1>Destination not found</h1>
                <button type="button" onClick={onBack}>
                    Back to destination
                </button>
            </section>
        );
    }

    return (
        <div className="destination-page-wrapper">

            <div className="destination-full-hero">
                <img
                    className="destination-full-cover"
                    src={destination.image}
                    alt={destinationName}
                />
                <div className="destination-full-hero-overlay">
                    <div className="destination-full-hero-content">
                        <h1>{destinationName}</h1>
                        <div className="destination-location-badge">
                            <span className="pin-icon">📍</span>
                            <span>{destination.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="destination-details-container">
                <section className="destination-content-section">
                    <h2>Description</h2>
                    <p className="destination-section-intro">
                        {destination.description}
                    </p>
                </section>

                <section className="destination-map-section">
                    <h2>Explore the Area</h2>
                    <p>Explore the destination using the map below.</p>

                    <div className="destination-map">
                        <MapContainer
                            center={destination.coordinates}
                            zoom={13}
                            scrollWheelZoom={false}
                            style={{ height: '450px', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <FitMapToMarkers places={destination.places} />

                            {destination.places.map((place) => (
                                <Marker position={place.coordinates} key={place.name}>
                                    <Popup>
                                        <strong>{place.name}</strong>
                                        <br />
                                        {place.description}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </section>

                {destination.photos.length > 0 && (
                    <section className="destination-content-section">
                        <h2>Photo gallery</h2>
                        <div className="destination-gallery">
                            {destination.photos.map((photo) => (
                                <article className="destination-gallery-item" key={photo.image}>
                                    <img src={photo.image} alt={photo.title} loading="lazy" />
                                    <p>{photo.title}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <section className="destination-content-section">
                    <h2>Local travel tips</h2>
                    <p className="destination-section-intro">
                        A few practical things to consider before your visit.
                    </p>
                    <ul className="destination-tips">
                        {destination.tips.map((tip) => (
                            <li key={tip}>{tip}</li>
                        ))}
                    </ul>
                    <p className="destination-disclaimer">
                        These are general travel suggestions, not live local reports.
                        Check current conditions and official information before travelling.
                    </p>
                </section>

                
            </main>
        </div>
    );
}

export default DestinationDetails;