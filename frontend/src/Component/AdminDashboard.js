import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Header from '../Header/Header'; // Import Header component
import Navbar from '../Navbar/Navbar'; // Import Navbar component
import Footer from '../Footer/Footer'; // Import Footer component

const AdminDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format the date and time
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Hardcoded data for appointments and sessions
  const appointments = [
    { id: 1, patientName: "Riya Naik", doctor: "Dr. Wadia", session: "Consultation" },
    { id: 2, patientName: "Manoj Sarkar", doctor: "Dr. Jakia", session: "Follow-up" },
    { id: 3, patientName: "Sharvi Tiwari", doctor: "Dr. Patil", session: "Checkup" },
  ];

  const sessions = [
    { title: "Diabetes Management", doctor: "Dr. Tiwari", dateTime: "2025-01-10 10:00 AM" },
    { title: "Cardiology Consultation", doctor: "Dr. Patel", dateTime: "2025-01-11 11:30 AM" },
    { title: "Orthopedic Session", doctor: "Dr. Shah", dateTime: "2025-01-12 02:00 PM" },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* Header Component */}
      <Header />
      
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main Admin Dashboard Content */}
      <div className="admin-dashboard">
        {/* Display Current Date and Time */}
        <div className="date-time-container">
          <h2>Current Date: {formattedDate}</h2>
          <h3>Current Time: {formattedTime}</h3>
        </div>

        {/* Status Section */}
        <div className="status">
          <div className="status-box">
            <h3>5</h3>
            <p>Doctors</p>
          </div>
          <div className="status-box">
            <h3>12</h3>
            <p>Patients</p>
          </div>
          <div className="status-box">
            <h3>3</h3>
            <p>New Booking</p>
          </div>
          <div className="status-box">
            <h3>2</h3>
            <p>Today Sessions</p>
          </div>
        </div>

        {/* Appointments and Sessions Section */}
        <div className="appointments-sessions">
          {/* Upcoming Appointments */}
          <div className="appointments">
            <h2>Upcoming Appointments until Next Friday</h2>
            <table>
              <thead>
                <tr>
                  <th>Appointment Number</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Session</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.session}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No Appointments</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button>Show all Appointments</button>
          </div>

          {/* Upcoming Sessions */}
          <div className="sessions">
            <h2>Upcoming Sessions until Next Friday</h2>
            <table>
              <thead>
                <tr>
                  <th>Session Title</th>
                  <th>Doctor</th>
                  <th>Scheduled Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length > 0 ? (
                  sessions.map((session, index) => (
                    <tr key={index}>
                      <td>{session.title}</td>
                      <td>{session.doctor}</td>
                      <td>{session.dateTime}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Sessions</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button>Show all Sessions</button>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
