import axiosInstance from '../api/axiosConfig';

const authService = {
    login: async ({ email, password }) => {
        const response = await axiosInstance.post('/api/auth/login', { email, password });
        return response.data;
    },

    register: async ({ nombre, apellido, email, password, rol }) => {
        const response = await axiosInstance.post('/api/auth/registro', { nombre, apellido, email, password, rol });
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

    forgotPassword: async (email) => {
        const response = await axiosInstance.post('/api/auth/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (token, newPassword) => {
        const response = await axiosInstance.post('/api/auth/reset-password', { token, newPassword });
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
