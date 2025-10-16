const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// ✅ CORRECT MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb+srv://SyedAjmathulla:companydirectory@cluster0.lsq52gf.mongodb.net/companies_directory?retryWrites=true&w=majority';

console.log('🔗 Attempting MongoDB connection...');
console.log('Database:', MONGODB_URI.includes('companies_directory') ? 'companies_directory' : 'unknown');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
  });

// Routes
app.use('/api/companies', require('./routes/companies'));

// Test route - get companies
app.get('/api/companies', async (req, res) => {
  try {
    console.log('📝 Fetching companies from MongoDB...');
    const Company = require('./models/Company');
    const companies = await Company.find().limit(50);

    console.log(`✅ Found ${companies.length} companies`);

    res.json({
      companies,
      total: companies.length,
      totalPages: 1,
      currentPage: 1
    });

  } catch (error) {
    console.error('❌ Error fetching companies:', error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: dbStatus === 1 ? 'OK' : 'ERROR',
    database: statusMap[dbStatus],
    timestamp: new Date().toISOString()
  });
});

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      status: 'success',
      database: mongoose.connection.db.databaseName,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Companies Directory API',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});