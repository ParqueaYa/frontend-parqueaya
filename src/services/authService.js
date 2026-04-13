import axiosInstance from '../api/axiosConfig';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        // Lógica de logout (limpiar tokens, etc.)
        localStorage.removeItem('token');
    },

    forgotPassword: async (email) => {
        try {
            const response = await axiosInstance.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resetPassword: async (token, newPassword) => {
        try {
            const response = await axiosInstance.post('/auth/reset-password', { token, newPassword });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;
