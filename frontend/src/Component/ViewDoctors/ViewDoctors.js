import React, {useState} from 'react';
import './ViewDoctors.css';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'

const ViewDoctors = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialization: 'Cardiologist',
      bio: 'Experienced in treating heart diseases and offering preventive care.',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      location: 'Mumbai, India',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialization: 'Dermatologist',
      bio: 'Specialized in skin treatments and cosmetic dermatology.',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      location: 'Delhi, India',
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialization: 'Neurologist',
      bio: 'Expert in neurological disorders and brain-related conditions.',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      location: 'Bangalore, India',
    },
    {
      id: 4,
      name: 'Dr. Michael Brown',
      specialization: 'Orthopedic Surgeon',
      bio: 'Specialized in bone and joint surgeries, treating fractures and degenerative diseases.',
      imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      location: 'Chennai, India',
    },
    {
      id: 5,
      name: 'Dr. Olivia Williams',
      specialization: 'Pediatrician',
      bio: 'Experienced in treating children and adolescents with a focus on preventative healthcare.',
      imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
      location: 'Kolkata, India',
    },
    {
      id: 6,
      name: 'Dr. Daniel Harris',
      specialization: 'Gynecologist',
      bio: "Provides comprehensive women's health care, including obstetrics and gynecology.",
      imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
      location: 'Hyderabad, India',
    },
    {
      id: 7,
      name: 'Dr. Sarah Martinez',
      specialization: 'Oncologist',
      bio: 'Specialized in the diagnosis and treatment of various types of cancer.',
      imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
      location: 'Ahmedabad, India',
    },
    {
      id: 8,
      name: 'Dr. David Lee',
      specialization: 'Pulmonologist',
      bio: 'Expert in treating lung diseases, asthma, and respiratory conditions.',
      imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
      location: 'Pune, India',
    },
    {
      id: 9,
      name: 'Dr. Lisa Wilson',
      specialization: 'Rheumatologist',
      bio: 'Specializes in autoimmune diseases and joint-related issues like arthritis.',
      imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
      location: 'Lucknow, India',
    },
    {
      id: 10,
      name: 'Dr. James Taylor',
      specialization: 'Gastroenterologist',
      bio: 'Specialized in digestive system disorders and liver diseases.',
      imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      location: 'Kochi, India',
    },
  ];

  // Filter doctors based on selected specialization
  const filteredDoctors = selectedSpecialization
    ? doctors.filter(doctor => doctor.specialization === selectedSpecialization)
    : doctors;

  return (
    <div className="view-doctor">
      <Header/>
      <Navbar/>
      <div className="doctors-container">
        <h1>Meet Our Doctors</h1>
        <div className="filter-container">
          <select
            value={selectedSpecialization}
            onChange={e => setSelectedSpecialization(e.target.value)}
            className="specialization-filter"
          >
            <option value="">All Specializations</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Rheumatologist">Rheumatologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
        <div className="doctor-cards">
          {filteredDoctors.map(doctor => (
            <div className="doctor-card" key={doctor.id}>
              <img
                src={doctor.imageUrl}
                alt={`${doctor.name}`}
                className="doctor-image"
              />
              <div className="doctor-info">
                <h2>{doctor.name}</h2>
                <p className="specialization">{doctor.specialization}</p>
                <p className="bio">{doctor.bio}</p>
                <p className="location">{doctor.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewDoctors;
