import React, { useEffect, useState, useMemo } from 'react';
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
    selectCurrentCompany
} from '../store/selectors/companySelectors';
import { fetchCompanies, setFilters, clearCurrentCompany } from '../store/slices/companiesSlice';

const CompaniesDirectory = () => {
    const dispatch = useDispatch();
    const allCompanies = useSelector(selectCompanies); // Fetch all companies once
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const filters = useSelector(selectFilters);
    const currentCompany = useSelector(selectCurrentCompany);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 6;

    // Fetch once (no backend filter params)
    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const filteredCompanies = useMemo(() => {
        let filtered = [...(allCompanies || [])];

        if (filters.name) {
            filtered = filtered.filter((c) =>
                c.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        if (filters.industry) {
            filtered = filtered.filter((c) => c.industry === filters.industry);
        }

        if (filters.location) {
            filtered = filtered.filter((c) => c.location === filters.location);
        }

        if (filters.size) {
            filtered = filtered.filter((c) => c.size === filters.size);
        }

        if (filters.sort) {
            const sortKey = filters.sort.replace('-', '');
            const sortOrder = filters.sort.startsWith('-') ? -1 : 1;

            filtered = filtered.sort((a, b) =>
                a[sortKey] > b[sortKey] ? sortOrder : -sortOrder
            );
        }

        return filtered;
    }, [allCompanies, filters]);

    // 📄 Pagination Logic
    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
    const startIndex = (currentPage - 1) * companiesPerPage;
    const currentCompanies = filteredCompanies.slice(startIndex, startIndex + companiesPerPage);

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters({ ...filters, ...newFilters }));
        setCurrentPage(1); // reset pagination when filters change
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleAddCompany = () => {
        dispatch(clearCurrentCompany());
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        dispatch(clearCurrentCompany());
    };

    useEffect(() => {
        if (currentCompany) setIsFormOpen(true);
    }, [currentCompany]);

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0c1020] via-[#101a2e] to-[#0c1020] text-gray-200">
                <div className="flex flex-col items-center gap-3 bg-white/5 backdrop-blur-md rounded-2xl px-10 py-8 text-center shadow-lg">
                    <h3 className="text-lg font-semibold text-red-400">Error</h3>
                    <p className="text-sm text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-[#0c1020] via-[#101a2e] to-[#0c1020] px-6 py-10 text-gray-100">
            <div className="flex w-full max-w-7xl flex-col gap-10">
                {/* Header */}
                <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                    <div className="flex flex-col text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-indigo-300 drop-shadow-md">
                            Companies Directory
                        </h1>
                        <p className="text-gray-400 text-base max-w-2xl">
                            Discover amazing companies across industries. Filter and explore your next opportunity.
                        </p>
                    </div>

                    <button
                        onClick={handleAddCompany}
                        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500/90 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-indigo-400/90 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Company
                    </button>
                </div>

                {/* Filters */}
                <div className="flex justify-center">
                    <CompanyFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        totalCompanies={filteredCompanies.length}
                    />
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-10">
                        <LoadingSpinner />
                    </div>
                )}

                {/* Company Grid */}
                {!loading && (
                    <div className="flex justify-center">
                        <CompanyGrid
                            companies={currentCompanies}
                            pagination={{
                                currentPage,
                                totalPages,
                            }}
                            onPageChange={handlePageChange}
                            loading={loading}
                        />
                    </div>
                )}

                {/* Modal Form */}
                <CompanyForm isOpen={isFormOpen} onClose={handleCloseForm} />
            </div>
        </div>
    );
};

export default CompaniesDirectory;
