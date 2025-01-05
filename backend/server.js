const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://sadneyasam05:root@cluster0.7gxwyxh.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, enum: ['Doctor', 'Patient'], required: true},
  createdAt: {type: Date, default: Date.now},
});

// Create User Model
const User = mongoose.model('User', userSchema);

// API Routes
app.post('/api/users', async (req, res) => {
  const {name, email, role} = req.body;

  if (!name || !email || !role) {
    return res
      .status(400)
      .json({message: 'All fields (name, email, role) are required'});
  }

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    const newUser = new User({name, email, role});
    await newUser.save();

    res.status(201).json({message: 'User created successfully', user: newUser});
  } catch (err) {
    res.status(500).json({message: 'Internal server error'});
  }
});

app.get('/api/users/:email', async (req, res) => {
  const {email} = req.params;

  try {
    const user = await User.findOne({email});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (err) {
    res.status(500).json({message: 'Internal server error'});
  }
});

// Define Appointment Schema
const appointmentSchema = new mongoose.Schema({
  patientName: {type: String, required: true},
  doctorName: {type: String, required: true},
  date: {type: Date, required: true},
  time: {type: String, required: true},
  meetingType: {type: String, enum: ['online', 'offline'], required: true},
  createdAt: {type: Date, default: Date.now},
});

// Create Appointment Model
const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/api/appointments', async (req, res) => {
  const { patientName, doctorName, date, time, meetingType } = req.body;

  try {
    const doctor = await User.findOne({ email: doctorName });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // Generate a unique room ID
    const roomId = crypto.randomBytes(6).toString('hex');

    const appointment = new Appointment({
      patientName,
      doctorName,
      date,
      time,
      meetingType,
      roomId,
    });

    await appointment.save();

    // Send email notification
    await sendNotificationEmail(patientName, doctorName, roomId, date, time);

    res.status(201).json({ appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to schedule appointment' });
  }
});

const sendNotificationEmail = async (patientName, doctorName, roomId, date, time) => {
  const patientEmail = patientName; // Assuming patient email is part of the patientName
  const doctorEmail = doctorName;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sadneyasam05@gmail.com', // Your email
      pass: 'qqjq hwfv ingo wdkk', // Your email password
    },
  });

  let mailOptions = {
    from: 'sadneyasam05@gmail.com',
    to: [patientEmail, doctorEmail],
    subject: 'Appointment Details and Meeting Room ID',
    text: `Dear ${patientName},\n\nYou have an appointment with Dr. ${doctorName} on ${date} at ${time}.\n\nYour unique room ID is: ${roomId}\n\nJoin the meeting at: http://3000/video_call/room/${roomId}\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent.');
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
};


// API Route to Get List of Doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await User.find({role: 'Doctor'});
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({message: 'Internal server error'});
  }
});

const reportSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
});

const Report = mongoose.model('Report', reportSchema);

// Multer setup for file uploads
const upload = multer({
  dest: 'uploads/reports/', // Folder where files will be stored
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
});

// Route to upload a medical report
app.post('/upload', upload.single('report'), async (req, res) => {
  try {
      const { originalname, path: filePath, filename } = req.file;
      const report = new Report({
          originalName: originalname,
          filePath: filePath,
          uploadedAt: new Date(),
          user: req.user.id, // Assuming user is set via authentication middleware
      });

      await report.save();

      res.status(200).json({ message: 'Report uploaded successfully', report });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Failed to upload report' });
  }
});

// Route to get all reports for a user
app.get('/:userId', async (req, res) => {
  try {
      const reports = await Report.find({ user: req.params.userId });
      res.status(200).json(reports);
  } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongodb+srv://sadneyasam05:root@cluster0.7gxwyxh.mongodb.net/?retryWrites=true&w=majority
