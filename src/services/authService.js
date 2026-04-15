import axiosInstance from '../api/axiosConfig';

const authService = {
    login: async ({ email, password }) => {
        const response = await axiosInstance.post('/api/auth/login', { email, password });
        return response.data;
    },

    register: async (userData) => {
        const response = await axiosInstance.post('/api/auth/registro', userData);
        return response.data;
    },

    loginGoogle: async (idToken) => {
        const response = await axiosInstance.post('/api/auth/google', { idToken });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombreCompleto');
        localStorage.removeItem('rol');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
    },

    getPerfil: async (email) => {
        const response = await axiosInstance.get('/api/auth/perfil', { params: { email } });
        return response.data;
    },

    guardarSesion: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('nombreCompleto', data.nombreCompleto);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('email', data.email);
    },
};

export default authService;
