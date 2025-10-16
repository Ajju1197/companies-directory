import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentCompany, deleteCompany } from '../store/slices/companiesSlice';
import { NavLink } from 'react-router-dom';

const CompanyCard = ({ company }) => {
    const dispatch = useDispatch();

    const getSizeColor = (size) => {
        const colors = {
            '1-10': 'bg-green-500/20 text-green-300',
            '11-50': 'bg-blue-500/20 text-blue-300',
            '51-200': 'bg-yellow-500/20 text-yellow-300',
            '201-500': 'bg-orange-500/20 text-orange-300',
            '501-1000': 'bg-red-500/20 text-red-300',
            '1000+': 'bg-purple-500/20 text-purple-300',
        };
        return colors[size] || 'bg-gray-500/20 text-gray-300';
    };

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(setCurrentCompany(company));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
            dispatch(deleteCompany(company._id));
        }
    };

    return (
        <NavLink
            to={`/companyDetails/${company._id}`}
            className="flex flex-col justify-between rounded-2xl bg-white/5 backdrop-blur-md p-6 shadow-lg border border-white/10 hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all duration-300 cursor-pointer"
        >
            {/* Top Section */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold text-indigo-300">{company.name}</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300">
                            {company.industry}
                        </span>
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${getSizeColor(company.size)}`}>
                            {company.size} employees
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={handleEdit}
                        className="text-gray-400 hover:text-indigo-400 transition-colors"
                        title="Edit company"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete company"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mt-4 line-clamp-3 text-left">{company.description}</p>

            {/* Details */}
            <div className="flex flex-col gap-2 text-sm text-gray-400 mt-4">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {company.location}
                </div>

                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    Founded in {company.founded}
                </div>

                {company.website && (
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                            Visit Website
                        </a>
                    </div>
                )}
            </div>
        </NavLink>
    );
};

export default CompanyCard;
