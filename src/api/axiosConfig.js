import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log("Cargando token para petición:", localStorage.getItem('token'));

        if (config.url && config.url.includes('/stats')) {
            console.log("Token a punto de enviarse para la petición de STATS:", localStorage.getItem('token'));
        }

        const isAuthRoute =
            config.url.includes('/auth/register') ||
            config.url.includes('/auth/login');

        if (token && !isAuthRoute) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else if (!isAuthRoute && !token) {
            console.warn('[axiosConfig] No se encontró token JWT. La petición puede fallar con 403:', config.url);
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Solo loguear errores inesperados (no 401/403/404 que son manejados por los servicios)
        const status = error.response?.status;
        if (!status || (status !== 401 && status !== 403 && status !== 404)) {
            console.error('API Error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
