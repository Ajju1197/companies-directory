import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCompany,
    updateCompany,
    clearCurrentCompany,
    clearError
} from '../store/slices/companiesSlice';
import {
    selectCurrentCompany,
    selectFormLoading,
    selectFormError
} from '../store/selectors/companySelectors';

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

    const industries = [
        'Technology', 'Finance', 'Healthcare', 'Education', 'Renewable Energy',
        'Logistics', 'Design', 'Automotive', 'Retail', 'Manufacturing'
    ];
    const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    const locations = [
        'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA',
        'Chicago, IL', 'Miami, FL', 'Portland, OR', 'Detroit, MI',
        'Seattle, WA', 'Los Angeles, CA'
    ];

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
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#1f1b2e] border border-[#2e2642] text-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            {currentCompany ? 'Edit Company' : 'Add New Company'}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-white transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {formError && (
                        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-300 rounded-md p-4 mb-6">
                            <p className="text-sm">{formError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {[
                                { id: 'name', label: 'Company Name *', type: 'text', required: true },
                                { id: 'industry', label: 'Industry *', type: 'select', options: industries, required: true },
                                { id: 'location', label: 'Location *', type: 'select', options: locations, required: true },
                                { id: 'size', label: 'Company Size *', type: 'select', options: sizes, required: true },
                                { id: 'founded', label: 'Founded Year *', type: 'number', required: true, min: 1900, max: new Date().getFullYear() },
                                { id: 'website', label: 'Website', type: 'url' }
                            ].map(({ id, label, type, options, ...rest }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-200 text-left">{label}</label>
                                    {type === 'select' ? (
                                        <select
                                            id={id}
                                            name={id}
                                            value={formData[id]}
                                            onChange={handleChange}
                                            {...rest}
                                            className="w-full px-3 py-2 bg-[#282138] text-white border border-[#3c315a] rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition"
                                        >
                                            <option value="">Select</option>
                                            {options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={type}
                                            id={id}
                                            name={id}
                                            value={formData[id]}
                                            onChange={handleChange}
                                            {...rest}
                                            className="w-full px-3 py-2 bg-[#282138] text-white border border-[#3c315a] rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition"
                                            placeholder={id === 'website' ? 'https://example.com' : ''}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1 text-left">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="w-full px-3 py-2 bg-[#282138] text-white border border-[#3c315a] rounded-md focus:ring-2 focus:ring-accent focus:outline-none transition"
                                placeholder="Describe the company..."
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-[#2e2642]">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-6 py-2 text-sm font-medium text-gray-300 bg-[#282138] border border-[#3c315a] rounded-md hover:bg-[#342a4a] transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={formLoading}
                                className="px-6 py-2 text-sm font-medium text-white bg-[#5b3fd7] hover:bg-[#7152ec] rounded-md disabled:opacity-50 transition"
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
