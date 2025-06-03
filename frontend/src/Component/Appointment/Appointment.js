import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'; // Import Swal
import './Appointment.css';
import Header from '../Header/Header'; // Import Header component
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const AppointmentScheduler = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    meetingType: 'online',
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(''); // State to handle errors
  const [username, setUsername] = useState(''); // State for patient username
  const navigate = useNavigate();

  // Fetch username from localStorage or context
  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Adjust if the username is stored elsewhere
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://health-desk-backend.onrender.com/api/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors. Please try again later.');
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSchedule = async () => {
    const username = localStorage.getItem('username'); // Get username from local storage

    if (!formData.doctor || !formData.date || !formData.time || !username) {
      alert('Please fill out all required fields.');
      return;
    }

    // Check if the selected date and time are valid
    const selectedDate = new Date(`${formData.date}T${formData.time}`);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Swal.fire('Error', 'You cannot schedule an appointment for a past date/time.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://health-desk-backend.onrender.com/api/appointments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          doctorName: formData.doctor, // Passing doctor username
          date: formData.date,
          time: formData.time,
          meetingType: formData.meetingType,
          patientName: username
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire('Success', `Appointment scheduled successfully. Doctor: ${result.appointment.doctorName}, Date: ${result.appointment.date}`, 'success');
        // navigate('/confirmation'); // Redirect or show a success message directly
      } else {
        const errorData = await response.json();
        Swal.fire('Error', `Failed to schedule appointment: ${errorData.message || 'Unknown error'}`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error scheduling appointment. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment">
      <Header /> {/* Include Header component */}
      <Navbar />
      <div className="appointment-scheduler">
        <h2>Schedule an Appointment</h2>
        {error && <p className="error">{error}</p>} {/* Display error message if exists */}
        <form onSubmit={e => e.preventDefault()}>
          <label>
            Doctor:
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleInputChange}
            >
              <option value="">Select a Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor.email}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Meeting Type:
            <select
              name="meetingType"
              value={formData.meetingType}
              onChange={handleInputChange}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </label>
          <button type="button" onClick={handleSchedule} disabled={loading}>
            {loading ? 'Scheduling...' : 'Schedule'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentScheduler;
