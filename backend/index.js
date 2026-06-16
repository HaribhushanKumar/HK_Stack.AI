const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing Middleware
app.use('/api', apiRoutes);

// Root path message
app.get('/', (req, res) => {
    res.json({ message: 'MERN Portfolio Backend API running successfully.' });
});

// Port and DB variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

// DB Connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB successfully connected.');
        app.listen(PORT, () => {
            console.log(`Server launched successfully on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error: ', err);
        process.exit(1);
    });
