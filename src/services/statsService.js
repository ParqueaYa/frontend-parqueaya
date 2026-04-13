import axiosInstance from '../api/axiosConfig';

const statsService = {
    obtenerResumenDashboard: async () => {
        try {
            const response = await axiosInstance.get('/api/stats/dashboard');
            return response.data;
        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
            throw error;
        }
    }
};

export default statsService;
