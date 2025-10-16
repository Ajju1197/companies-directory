const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companyController');

// GET /api/companies - Get all companies with filtering
router.get('/', getCompanies);

// GET /api/companies/:id - Get single company
router.get('/:id', getCompany);

// POST /api/companies - Create new company
router.post('/', createCompany);

// PUT /api/companies/:id - Update company
router.put('/:id', updateCompany);

// DELETE /api/companies/:id - Delete company
router.delete('/:id', deleteCompany);

module.exports = router;