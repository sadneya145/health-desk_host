import React, { useState } from 'react';
import { provider } from '../../firebase';
import { signInWithPopup, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Signup.css';

const Signup = () => {
  const [role, setRole] = useState('Doctor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        role: role,
      };

      const response = await axios.post('https://health-desk-backend.onrender.com/api/users', newUser);
      Swal.fire('Success!', 'You have successfully signed up!', 'success');
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing in with Google');
    }
  };

  const handleFormSignup = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const newUser = {
        name: name,
        email: firebaseUser.email,
        role: role,
      };

      await axios.post('https://health-desk-backend.onrender.com/api/users', newUser);
      Swal.fire('Success!', 'You have successfully signed up!', 'success');
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="role-switcher">
          <div
            className={`role-option ${role === 'Doctor' ? 'active' : ''}`}
            onClick={() => setRole('Doctor')}
          >
            Doctor
          </div>
          <div
            className={`role-option ${role === 'Patient' ? 'active' : ''}`}
            onClick={() => setRole('Patient')}
          >
            Patient
          </div>
          <div className="slider" style={{ left: role === 'Doctor' ? '0%' : '50%' }}></div>
        </div>
        <div className="form-container">
          <h2>{role} Signup</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleFormSignup}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Signup</button>
            <div className="alternate-action">
              <p>
                Already a member? <a href="/">Log in</a>
              </p>
            </div>
          </form>
        </div>
        <hr />
        <button className="google-login-button" onClick={handleGoogleSignIn}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
            alt="Google logo"
            className="google-logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
