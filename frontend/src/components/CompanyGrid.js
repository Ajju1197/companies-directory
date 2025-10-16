import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyGrid = ({ companies, pagination, onPageChange, loading }) => {
    if (companies.length === 0 && !loading) {
        return (
            <div className="text-center py-12">
                <div className="bg-[#1f1b2e] border border-[#2a2440] rounded-xl shadow-md p-8">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">No companies found</h3>
                    <p className="text-gray-400">Try adjusting your filters to find more companies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                    <CompanyCard key={company._id} company={company} />
                ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 pt-8">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-4 py-2 text-sm font-medium rounded-md 
                                text-white bg-[#3a2e59] hover:bg-[#4b3b72] 
                                border border-[#51406e] 
                                disabled:opacity-40 disabled:cursor-not-allowed 
                                transition-all duration-200"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-300">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>

                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-4 py-2 text-sm font-medium rounded-md 
                                text-white bg-[#3a2e59] hover:bg-[#4b3b72] 
                                border border-[#51406e] 
                                disabled:opacity-40 disabled:cursor-not-allowed 
                                transition-all duration-200"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyGrid;
