import axiosInstance from '../api/axiosConfig';

const statsService = {
    obtenerResumenDashboard: async () => {
        try {
            const response = await axiosInstance.get('/api/stats');
            return response.data;
        } catch (error) {
            console.warn('statsService: servidor no disponible, usando valores en cero.');
            return {
                vehiculosHoy: 0,
                ingresos: 0,
                espaciosDisponibles: 0,
                tiempoPromedio: 0,
                // Campos legacy mantenidos por compatibilidad
                total: 0,
                ocupados: 0,
                disponibles: 0,
            };
        }
    }
};

export default statsService;
