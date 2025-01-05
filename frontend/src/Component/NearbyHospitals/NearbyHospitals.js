import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './NearbyHospitals.css';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Fix Leaflet marker icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HospitalLocator = () => {
  const [userPosition, setUserPosition] = useState({lat: 19.076, lng: 72.8777}); // Default to Mumbai
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to format the address correctly
  const formatAddress = address => {
    if (!address) return 'Address not available';

    const addressParts = [
      address.road,
      address.suburb,
      address.city,
      address.state,
      address.country,
    ];

    return addressParts.filter(Boolean).join(', ');
  };

  // Fetch hospitals based on location
  const fetchHospitals = async (latitude, longitude) => {
    setLoading(true);
    try {
      const boundingBox = [
        longitude - 0.05, // Minimum longitude
        latitude - 0.05, // Minimum latitude
        longitude + 0.05, // Maximum longitude
        latitude + 0.05, // Maximum latitude
      ].join(',');

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital&addressdetails=1&viewbox=${boundingBox}&bounded=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch hospital data');
      }

      const data = await response.json();
      console.log('Hospitals Data:', data);

      // Filter and format the hospital data
      const hospitalData = data.map((hospital, index) => ({
        id: index + 1,
        name: hospital.display_name || 'Unnamed Hospital',
        lat: parseFloat(hospital.lat),
        lon: parseFloat(hospital.lon),
        address: formatAddress(hospital.address),
        phone: `+91 ${9000000000 + index}`, // Mock phone numbers
      }));

      setHospitals(hospitalData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserPosition({lat: latitude, lng: longitude});
          fetchHospitals(latitude, longitude);
        },
        () => {
          console.warn('Geolocation not allowed. Using default location.');
          fetchHospitals(userPosition.lat, userPosition.lng);
        }
      );
    } else {
      console.warn('Geolocation not supported. Using default location.');
      fetchHospitals(userPosition.lat, userPosition.lng);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="locator">
      <Header/>
      <Navbar/>
      <div className="hospital-locator-container">
        <h1 className="page-title">📍 Nearby Hospitals Locator 🏥</h1>
        <div className="map-container">
          <MapContainer
            center={userPosition}
            zoom={15}
            style={{height: '100%', width: '100%'}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hospitals.map(hospital => (
              <Marker key={hospital.id} position={[hospital.lat, hospital.lon]}>
                <Tooltip>{hospital.name}</Tooltip>
                <Popup>
                  <strong>{hospital.name}</strong>
                  <br />
                  {hospital.address}
                  <br />
                  📞 {hospital.phone}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="hospitals-list">
          <h3>Hospital List</h3>
          {loading ? (
            <p className="loading-message">Loading hospitals...</p>
          ) : (
            <ul>
              {hospitals.map(hospital => (
                <li key={hospital.id} className="hospital-item">
                  <div className="hospital-details">
                    <h4>{hospital.name}</h4>
                    <button className="book-appointment-btn">
                      Book Appointment
                    </button>
                  </div>
                  <p className="address">📍 {hospital.address}</p>
                  <p className="phone">📞 {hospital.phone}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HospitalLocator;
