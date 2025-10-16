// const express = require('express');
const Company = require('../models/Company');

// import Company from "../models/Company.js";
// @access  Public
const getCompanies = async (req, res) => {
    try {
        const { name, industry, location, size, page = 1, limit = 10, sort = 'name' } = req.query;

        // Build filter object
        let filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (industry) filter.industry = { $regex: industry, $options: 'i' };
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (size) filter.size = size;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get companies with filtering and pagination
        const companies = await Company.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Company.countDocuments(filter);

        res.json({
            companies,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new company
// @route   POST /api/companies
// @access  Public
const createCompany = async (req, res) => {
    try {
        const { name, industry, location, size, description, founded, website } = req.body;

        // Validation
        if (!name || !industry || !location || !size || !description || !founded) {
            return res.status(400).json({ message: 'All fields are required except website' });
        }

        // Check if company already exists
        const existingCompany = await Company.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company with this name already exists' });
        }

        const company = new Company({
            name,
            industry,
            location,
            size,
            description,
            founded,
            website: website || ''
        });

        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ message: 'Error creating company', error: error.message });
    }
};

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Public
const updateCompany = async (req, res) => {
    try {
        const { name, industry, location, size, description, founded, website } = req.body;

        // Validation
        if (!name || !industry || !location || !size || !description || !founded) {
            return res.status(400).json({ message: 'All fields are required except website' });
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            { name, industry, location, size, description, founded, website },
            { new: true, runValidators: true }
        );

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json(company);
    } catch (error) {
        res.status(400).json({ message: 'Error updating company', error: error.message });
    }
};

// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Public
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json({ message: 'Company deleted successfully', deletedCompany: company });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
};