const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const salaryRoutes = require('./routes/salaryRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/salaries', salaryRoutes);
app.use('/api/leaves', leaveRoutes);


// MongoDB connection using .env
const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
