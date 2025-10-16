import React from 'react';

const CompanyFilters = ({ filters, onFilterChange, totalCompanies, onSearch }) => {
    const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Renewable Energy', 'Logistics', 'Design', 'Automotive'];
    const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA', 'Chicago, IL', 'Miami, FL', 'Portland, OR', 'Detroit, MI'];

    const handleInputChange = (field, value) => {
        onFilterChange({ [field]: value });
    };

    const clearFilters = () => {
        onFilterChange({
            name: '',
            industry: '',
            location: '',
            size: '',
            sort: 'name'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-4">
                <div className='flex items-center gap-2'>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Filter Companies
                    </h2>
                    <p className="text-sm text-gray-600 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {totalCompanies} companies found
                    </p>
                </div>

                <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                    Clear Filters
                </button>
            </div>

            <div className="flex items-end flex-wrap gap-4">
                {/* Search by Name */}
                <div className='flex flex-col gap-1 items-start flex-1'>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={filters.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Search companies..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                </div>

                {/* Industry Filter */}
                <div className='flex flex-col gap-1 items-start flex-1'>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                    </label>
                    <select
                        id="industry"
                        value={filters.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                        <option value="">All Industries</option>
                        {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>

                {/* Location Filter */}
                <div className='flex flex-col gap-1 items-start flex-1'>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <select
                        id="location"
                        value={filters.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                        <option value="">All Locations</option>
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                {/* Size Filter */}
                <div className='flex flex-col gap-1 items-start flex-1'>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Size
                    </label>
                    <select
                        id="size"
                        value={filters.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                        <option value="">All Sizes</option>
                        {sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div className='flex flex-col gap-1 items-start flex-1'>
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                        Sort By
                    </label>
                    <select
                        id="sort"
                        value={filters.sort}
                        onChange={(e) => handleInputChange('sort', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                        <option value="name">Name (A-Z)</option>
                        <option value="-name">Name (Z-A)</option>
                        <option value="founded">Founded (Oldest)</option>
                        <option value="-founded">Founded (Newest)</option>
                        <option value="-createdAt">Recently Added</option>
                    </select>
                </div>
                <button
                    onClick={onSearch}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                    Go
                </button>
            </div>
        </div>
    );
};

export default CompanyFilters;