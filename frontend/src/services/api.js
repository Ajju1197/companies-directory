import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            return Promise.reject(error);
        } else if (error.request) {
            // Request made but no response received
            return Promise.reject(new Error('No response from server. Please check your connection.'));
        } else {
            // Something else happened
            return Promise.reject(error);
        }
    }
);

export const companyAPI = {
    getCompanies: (filters = {}) => {
        const params = new URLSearchParams();

        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params.append(key, filters[key]);
            }
        });

        return api.get(`/companies?${params}`);
    },

    getCompany: (id) => {
        return api.get(`/companies/${id}`);
    },

    createCompany: (companyData) => {
        return api.post('/companies', companyData);
    },

    updateCompany: (id, companyData) => {
        return api.put(`/companies/${id}`, companyData);
    },

    deleteCompany: (id) => {
        return api.delete(`/companies/${id}`);
    }
};

export default api;