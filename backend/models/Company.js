const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    founded: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Add index for better performance
companySchema.index({ name: 1 });
companySchema.index({ industry: 1 });
companySchema.index({ location: 1 });

module.exports = mongoose.model('Company', companySchema);