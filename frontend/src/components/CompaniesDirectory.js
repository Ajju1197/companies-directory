import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyFilters from './CompanyFilters';
import CompanyGrid from './CompanyGrid';
import CompanyForm from './CompanyForm';
import LoadingSpinner from './LoadingSpinner';
import {
    selectCompanies,
    selectLoading,
    selectError,
    selectFilters,
    selectPagination,
    selectCurrentCompany
} from '../store/selectors/companySelectors';
import { fetchCompanies, setFilters, setPage, clearCurrentCompany } from '../store/slices/companiesSlice';
import '../App.css';

const CompaniesDirectory = () => {
    const dispatch = useDispatch();
    const companies = useSelector(selectCompanies);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const filters = useSelector(selectFilters);
    const pagination = useSelector(selectPagination);
    const currentCompany = useSelector(selectCurrentCompany);

    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);
    
    const handleSearch = () => {
        dispatch(fetchCompanies(filters));
    };

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters(newFilters));
    };

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    const handleAddCompany = () => {
        dispatch(clearCurrentCompany());
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        dispatch(clearCurrentCompany());
    };

    // Auto-open form when currentCompany is set (for editing)
    useEffect(() => {
        if (currentCompany) {
            setIsFormOpen(true);
        }
    }, [currentCompany]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="mt-1 text-sm text-red-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="companyMainDirectory min-h-screen bg-gray-50 py-8">
            <div className="max-w-7lg flex gap-y-5 flex-col content-center mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Add Button */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="text-center lg:text-left mb-6 lg:mb-0">
                        <h1 className="text-4xl font-bold text-gray-900 text-white mb-4">
                            Companies Directory
                        </h1>
                        <p className="text-lg text-gray-600 text-#06B6D4 max-w-2xl"
                        style={{
                            color: 'var(--color-accent)',
                        }}>
                            Discover amazing companies across various industries and locations.
                            Filter by your preferences to find your perfect match.
                        </p>
                    </div>
                    <button
                        onClick={handleAddCompany}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Company
                    </button>
                </div>

                {/* Filters */}
                <CompanyFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    totalCompanies={pagination.total}
                    onSearch={handleSearch}
                />

                {/* Loading State */}
                {loading && <LoadingSpinner />}

                {/* Companies Grid */}
                {!loading && (
                    <CompanyGrid
                        companies={companies}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        loading={loading}
                    />
                )}

                {/* Company Form Modal */}
                <CompanyForm
                    isOpen={isFormOpen}
                    onClose={handleCloseForm}
                />
            </div>
        </div>
    );
};

export default CompaniesDirectory;