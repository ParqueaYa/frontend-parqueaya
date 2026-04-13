import axiosInstance from '../api/axiosConfig';

const cupoService = {
    obtenerCuposDisponibles: async () => {
        try {
            const response = await axiosInstance.get('/api/cupos/disponibles');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default cupoService;
