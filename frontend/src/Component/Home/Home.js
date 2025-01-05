import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleViewDoctors = () => {
    navigate('/viewdoctors');
  };

  return (
    <div className="home">
      <Header />
      <Navbar />
      <div className="content">
        {/* Carousel */}
        <div
          id="servicesCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#servicesCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#servicesCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#servicesCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#servicesCarousel"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#servicesCarousel"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
            <button
              type="button"
              data-bs-target="#servicesCarousel"
              data-bs-slide-to="5"
              aria-label="Slide 6"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://hinduja-prod-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2023-01/home-page-banner1-Quality-healthcare-desktop.jpg?VersionId=oZjVdTWD75v31WTBmLr19t09IUGj14il"
                className="d-block w-100"
                alt="Appointments"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.bhatiahospital.org/storage/app/public/home_banner/1/image/1503414524again-revised-bhatia-homebanner-01.jpg"
                className="d-block w-100"
                alt="Health Records"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.bhatiahospital.org/storage/app/public/home_banner/2/image/1503411077revised-bhatia-homebanner-03.jpg"
                className="d-block w-100"
                alt="Video Call Scheduling"
              />
            </div>

            <div className="carousel-item">
              <img
                src="https://www.kokilabenhospital.com/images/operation-img11.webp"
                className="d-block w-100"
                alt="Video Call Scheduling"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/homepage-banners/December2024/SKUDgYMDOVjewetE9ytI.webp?w=3840&q=75"
                className="d-block w-100"
                alt="Placeholder"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/homepage-banners/January2024/VN8DnbFlModceGUJm44g.webp?w=3840&q=75"
                className="d-block w-100"
                alt="Placeholder"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#servicesCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#servicesCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cardshome">
          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/4305/4305152.png"
              alt="Dashboard"
              className="card-image"
            />
            <div className="card-content">
              <h4>Dashboard</h4>
              <a href="/dashboard">Learn More</a>
            </div>
          </div>

          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/4003/4003759.png"
              alt="Healthcare Records"
              className="card-image"
            />
            <div className="card-content">
              <h4>Healthcare Records</h4>
              <a href="/healthcare-records">Learn More</a>
            </div>
          </div>

          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/10714/10714002.png"
              alt="Nearby Hospital Locator"
              className="card-image"
            />
            <div className="card-content">
              <h4>Nearby Hospital Locator</h4>
              <a href="/hospital-locator">Learn More</a>
            </div>
          </div>

          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/3652/3652267.png"
              alt="Schedule Appointment"
              className="card-image"
            />
            <div className="card-content">
              <h4>Schedule Appointment</h4>
              <a href="/schedule-appointment">Learn More</a>
            </div>
          </div>

          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/1989/1989932.png"
              alt="Video Call Scheduling"
              className="card-image"
            />
            <div className="card-content">
              <h4>Video Call Scheduling</h4>
              <a href="/video-call">Learn More</a>
            </div>
          </div>

          <div className="dashboard-card">
            <img
              src="https://cdn-icons-png.flaticon.com/256/4187/4187213.png"
              alt="Text Your Doctor"
              className="card-image"
            />
            <div className="card-content">
              <h4>Text Your Doctor</h4>
              <a href="/text-doctor">Learn More</a>
            </div>
          </div>
        </div>
        <div className="departments-header">
          <p>Check out our departments</p>
        </div>
        {/* New Section for Hospital Departments */}
        <div className="departments-section">
          <div className="departments-left">
            <img
              src="https://cdn.apollohospitals.com/mumbaistorage/2023/09/speciality_ah-1.webp"
              alt="Hospital Image"
              className="hospital-image"
            />
          </div>
          <div className="departments-right">
            <div className="department-box">
              <h5>Cardiology</h5>
              <img
                src="https://img.icons8.com/?size=100&id=ZZbNbcYv74rW&format=png&color=000000"
                alt="Cardiology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Gastroenterology</h5>
              <img
                src="https://img.icons8.com/?size=100&id=tHiDegIL8l65&format=png&color=000000"
                alt="Gastroenterology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Neurology</h5>
              <img
                src="https://img.icons8.com/?size=100&id=MSsLqiLKVanu&format=png&color=000000"
                alt="Neurology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>ENT Specialist</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/ent-svg-1.png"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Internal Medicine</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/Critical-Care-1.png"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Nephrology</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/10.nephrology-1-1.jpg"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Pediatrics</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/15.paediatricurology-1.jpg"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Psychiatry</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/psychiatry-4.jpg"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Psychology</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/neurology-2.png"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Pulmonology</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/04/pulmonology-1-3.png"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Ob-Gyn</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/07/Obstetrics-Gynecology.png"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
            <div className="department-box">
              <h5>Transplant surgery</h5>
              <img
                src="https://cdn.apollohospitals.com/mumbaistorage/2024/10/transplant-surgery.png"
                alt="Oncology Icon"
                className="department-icon"
              />
            </div>
          </div>
        </div>
        {/* Meet Our Directors Section */}
        {/* Meet Our Directors Section */}
        <div className="directors-section">
          <h2 className="text-center my-4">Meet Our Directors</h2>
          <div
            id="directorsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#directorsCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Director 1"
              ></button>
              <button
                type="button"
                data-bs-target="#directorsCarousel"
                data-bs-slide-to="1"
                aria-label="Director 2"
              ></button>
              <button
                type="button"
                data-bs-target="#directorsCarousel"
                data-bs-slide-to="2"
                aria-label="Director 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {/* Director 1 */}
              <div className="carousel-item active">
                <div className="d-flex align-items-center">
                  <div className="carousel-image w-50">
                    <img
                    src="https://thumbs.dreamstime.com/b/indian-doctor-stethoscope-around-neck-his-office-143349306.jpg"
                      
                      className="d-block w-100"
                      alt="Director 1"
                    />
                  </div>
                  <div className="carousel-content w-50 p-4">
                    <h5>Dr. John Doe</h5>
                    <p>Cardiologist</p>
                    <p>
                      Dr. John Doe specializes in cardiovascular health and has
                      over 15 years of experience in treating patients with
                      heart conditions.
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleViewDoctors}
                    >
                      View Doctors
                    </button>
                  </div>
                </div>
              </div>

              {/* Director 2 */}
              <div className="carousel-item">
                <div className="d-flex align-items-center">
                  <div className="carousel-image w-50">
                    <img
                      src="https://img.freepik.com/premium-photo/portrait-happy-friendly-male-indian-latin-doctor-medical-worker-wearing-white-coat-with-stethoscope-around-neck-standing-modern-private-clinic-looking-camera-medical-healthcare-concept_255667-42300.jpg"
                      className="d-block w-100"
                      alt="Director 2"
                    />
                  </div>
                  <div className="carousel-content w-50 p-4">
                    <h5>Dr. Jane Smith</h5>
                    <p>Dermatologist</p>
                    <p>
                      Dr. Jane Smith is a leading dermatologist known for her
                      expertise in skincare and cosmetic dermatology.
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleViewDoctors}
                    >
                      View Doctors
                    </button>
                  </div>
                </div>
              </div>

              {/* Director 3 */}
              <div className="carousel-item">
                <div className="d-flex align-items-center">
                  <div className="carousel-image w-50">
                    <img
                      src="https://th.bing.com/th/id/OIP.84Xv_FiOkOV_XM5zbGnHMQHaE7?w=626&h=417&rs=1&pid=ImgDetMain"
                      className="d-block w-100"
                      alt="Director 3"
                    />
                  </div>
                  <div className="carousel-content w-50 p-4">
                    <h5>Dr. Emily Brown</h5>
                    <p>Neurologist</p>
                    <p>
                      Dr. Emily Brown has extensive experience in diagnosing and
                      treating neurological disorders and improving patients'
                      quality of life.
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleViewDoctors}
                    >
                      View Doctors
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#directorsCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#directorsCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
