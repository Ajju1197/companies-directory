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
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);