const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - Fixed CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://companydirectories.netlify.app'  // Remove the trailing slash
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/companies', require('./routes/companies'));

// MongoDB connection - Use environment variable
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://SyedAjmathulla:companydirectory@cluster0.lsq52gf.mongodb.net/companies_directory?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Health check route (important for monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Companies Directory API is running',
    timestamp: new Date().toISOString()
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Companies Directory API',
    version: '1.0.0',
    status: 'active',
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});