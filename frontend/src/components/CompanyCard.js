import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCompany, deleteCompany } from '../store/slices/companiesSlice';
import { Link, NavLink } from 'react-router-dom'

const CompanyCard = ({ company }) => {
    const dispatch = useDispatch();


    const getSizeColor = (size) => {
        const colors = {
            '1-10': 'bg-green-100 text-green-800',
            '11-50': 'bg-blue-100 text-blue-800',
            '51-200': 'bg-yellow-100 text-yellow-800',
            '201-500': 'bg-orange-100 text-orange-800',
            '501-1000': 'bg-red-100 text-red-800',
            '1000+': 'bg-purple-100 text-purple-800'
        };
        return colors[size] || 'bg-gray-100 text-gray-800';
    };

    const handleEdit = () => {
        dispatch(setCurrentCompany(company));
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
            dispatch(deleteCompany(company._id));
        }
    };

    return (
        <NavLink to={`/companyDetails/${company._id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
            <div className="p-6 flex flex-col gap-5 justify-start">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-3 items-start">
                        <h3 className="text-xl font-semibold text-gray-900 text-left">
                            {company.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                {company.industry}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSizeColor(company.size)}`}>
                                {company.size} employees
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="text-gray-400 hover:text-primary-600 transition-colors"
                            title="Edit company"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete company"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 text-left">
                    {company.description}
                </p>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {company.location}
                    </div>

                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Founded in {company.founded}
                    </div>

                    {company.website && (
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-700 underline"
                            >
                                Visit Website
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </NavLink>
    );
};

export default CompanyCard;