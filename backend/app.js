require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db'); // Import the MongoDB connection function
const formRoutes = require('./routes/form.routes');
const submissionRoutes = require('./routes/submission.routes');
const linkRoutes = require('./routes/link.routes');
const authRoutes = require('./routes/auth.routes');

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS to indicate which origins to be allowed to interact
const allowedOrigins = ['http://localhost:3000', 'https://formeeformbuilder.netlify.app']; // Add your frontend's URL here

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Use CORS middleware with options

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions)); // Allow preflight requests

// Routes
app.use('/api/auth', authRoutes); // Auth routes under /api/auth
app.use('/api/forms', formRoutes); // Form routes under /api/forms
app.use('/api/submissions', submissionRoutes); // Submission routes under /api/submissions
app.use('/api/links', linkRoutes); // Link routes under /api/links

// Basic route
app.get('/', (req, res) => {
  res.send('Form Builder API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
