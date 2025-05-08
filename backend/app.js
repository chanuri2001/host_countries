const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: "https://country-ex.netlify.app/", // allow frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // if you're using cookies or auth
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;