import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, updateCompany, clearCurrentCompany, clearError } from '../store/slices/companiesSlice';
import { selectCurrentCompany, selectFormLoading, selectFormError } from '../store/selectors/companySelectors';

const CompanyForm = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const currentCompany = useSelector(selectCurrentCompany);
    const formLoading = useSelector(selectFormLoading);
    const formError = useSelector(selectFormError);

    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        location: '',
        size: '',
        description: '',
        founded: '',
        website: ''
    });

    const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Renewable Energy', 'Logistics', 'Design', 'Automotive', 'Retail', 'Manufacturing'];
    const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA', 'Chicago, IL', 'Miami, FL', 'Portland, OR', 'Detroit, MI', 'Seattle, WA', 'Los Angeles, CA'];

    useEffect(() => {
        if (currentCompany) {
            setFormData({
                name: currentCompany.name,
                industry: currentCompany.industry,
                location: currentCompany.location,
                size: currentCompany.size,
                description: currentCompany.description,
                founded: currentCompany.founded.toString(),
                website: currentCompany.website || ''
            });
        } else {
            setFormData({
                name: '',
                industry: '',
                location: '',
                size: '',
                description: '',
                founded: '',
                website: ''
            });
        }
    }, [currentCompany]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const companyData = {
            ...formData,
            founded: parseInt(formData.founded)
        };

        if (currentCompany) {
            await dispatch(updateCompany({ id: currentCompany._id, companyData }));
        } else {
            await dispatch(createCompany(companyData));
        }

        if (!formError) {
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            industry: '',
            location: '',
            size: '',
            description: '',
            founded: '',
            website: ''
        });
        dispatch(clearCurrentCompany());
        dispatch(clearError());
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentCompany ? 'Edit Company' : 'Add New Company'}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {formError && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <p className="text-sm text-red-600">{formError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* Industry */}
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                                    Industry *
                                </label>
                                <select
                                    id="industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                >
                                    <option value="">Select Industry</option>
                                    {industries.map(industry => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location *
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                >
                                    <option value="">Select Location</option>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Company Size */}
                            <div>
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Size *
                                </label>
                                <select
                                    id="size"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                >
                                    <option value="">Select Size</option>
                                    {sizes.map(size => (
                                        <option key={size} value={size}>{size} employees</option>
                                    ))}
                                </select>
                            </div>

                            {/* Founded Year */}
                            <div>
                                <label htmlFor="founded" className="block text-sm font-medium text-gray-700 mb-1">
                                    Founded Year *
                                </label>
                                <input
                                    type="number"
                                    id="founded"
                                    name="founded"
                                    value={formData.founded}
                                    onChange={handleChange}
                                    required
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    placeholder="e.g., 2020"
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                placeholder="Describe the company..."
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={formLoading}
                                className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {formLoading ? 'Saving...' : currentCompany ? 'Update Company' : 'Add Company'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanyForm;