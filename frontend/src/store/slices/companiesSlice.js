import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyAPI } from '../../services/api';

// ✅ Fetch all companies once (no filters sent to backend)
export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await companyAPI.getCompanies();
            // Assuming your backend returns an array of companies directly
            return response.data.companies || response.data;
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
            sort: 'name',
        },
        currentCompany: null,
        formLoading: false,
        formError: null,
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
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
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all companies (no pagination/filter from backend)
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload;
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

            // Create Company
            .addCase(createCompany.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.formLoading = false;
                state.companies.unshift(action.payload);
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload;
            })

            // Update Company
            .addCase(updateCompany.pending, (state) => {
                state.formLoading = true;
                state.formError = null;
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.formLoading = false;
                const index = state.companies.findIndex((c) => c._id === action.payload._id);
                if (index !== -1) {
                    state.companies[index] = action.payload;
                }
                state.currentCompany = null;
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.formLoading = false;
                state.formError = action.payload;
            })

            // Delete Company
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    setFilters,
    clearError,
    setCurrentCompany,
    clearCurrentCompany,
} = companiesSlice.actions;

export default companiesSlice.reducer;
