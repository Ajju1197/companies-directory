import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyAPI } from '../../services/api';

// Async thunks
export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await companyAPI.getCompanies(filters);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies');
        }
    }
);

export const getCompany = createAsyncThunk(
    'companies/getCompany',
    async (id, { rejectWithValue }) => {
        try {
            const response = await companyAPI.getCompany(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch company details.');
        }
    }
);

export const createCompany = createAsyncThunk(
    'companies/createCompany',
    async (companyData, { rejectWithValue }) => {
        try {
            const response = await companyAPI.createCompany(companyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create company');
        }
    }
);

export const updateCompany = createAsyncThunk(
    'companies/updateCompany',
    async ({ id, companyData }, { rejectWithValue }) => {
        try {
            const response = await companyAPI.updateCompany(id, companyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update company');
        }
    }
);

export const deleteCompany = createAsyncThunk(
    'companies/deleteCompany',
    async (id, { rejectWithValue }) => {
        try {
            await companyAPI.deleteCompany(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete company');
        }
    }
);

const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        loading: false,
        error: null,
        filters: {
            name: '',
            industry: '',
            location: '',
            size: '',
            page: 1,
            limit: 9,
            sort: 'name'
        },
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0
        },
        currentCompany: null,
        formLoading: false,
        formError: null
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload, page: 1 };
        },
        setPage: (state, action) => {
            state.filters.page = action.payload;
        },
        clearError: (state) => {
            state.error = null;
            state.formError = null;
        },
        setCurrentCompany: (state, action) => {
            state.currentCompany = action.payload;
        },
        clearCurrentCompany: (state) => {
            state.currentCompany = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch companies
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload.companies;
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    total: action.payload.total
                };
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Company Details
            .addCase(getCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCompany = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create company
            .addCase(createCompany.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.formLoading = false;
                state.companies.unshift(action.payload);
                state.formError = null;
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload;
            })

            // Update company
            .addCase(updateCompany.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.formLoading = false;
                const index = state.companies.findIndex(company => company._id === action.payload._id);
                if (index !== -1) {
                    state.companies[index] = action.payload;
                }
                state.currentCompany = null;
                state.formError = null;
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload;
            })

            // Delete company
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter(company => company._id !== action.payload);
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const {
    setFilters,
    setPage,
    clearError,
    setCurrentCompany,
    clearCurrentCompany
} = companiesSlice.actions;

export default companiesSlice.reducer;