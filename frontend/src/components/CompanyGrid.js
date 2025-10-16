import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyGrid = ({ companies, pagination, onPageChange, loading }) => {
    if (companies.length === 0 && !loading) {
        return (
            <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                    <p className="text-gray-600">Try adjusting your filters to find more companies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map(company => (
                    <CompanyCard key={company._id} company={company} />
                ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 pt-8">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-700">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>

                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyGrid;