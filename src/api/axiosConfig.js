import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const isAuthRoute =
            config.url.includes('/auth/registro') ||
            config.url.includes('/auth/login') ||
            config.url.includes('/auth/google');

        if (token && !isAuthRoute) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const url = error?.config?.url || '';
        const isAuthRoute =
            url.includes('/auth/login') ||
            url.includes('/auth/registro') ||
            url.includes('/auth/google');

        if ((status === 401 || status === 403) && !isAuthRoute) {
            localStorage.clear();
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
