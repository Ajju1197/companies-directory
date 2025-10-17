import axios from 'axios';

const API_BASE_URL = 'https://companies-backend-uyrx.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            return Promise.reject(error);
        } else if (error.request) {
            // Request made but no response received
            return Promise.reject(
                new Error('No response from server. Please check your connection.')
            );
        } else {
            // Something else happened
            return Promise.reject(error);
        }
    }
);

export const companyAPI = {
    // ✅ Fetch all companies (no filters, no pagination)
    getCompanies: () => api.get('/companies'),

    // ✅ Fetch a single company
    getCompany: (id) => api.get(`/companies/${id}`),

    // ✅ Create new company
    createCompany: (companyData) => api.post('/companies', companyData),

    // ✅ Update existing company
    updateCompany: (id, companyData) => api.put(`/companies/${id}`, companyData),

    // ✅ Delete company
    deleteCompany: (id) => api.delete(`/companies/${id}`),
};

export default api;
