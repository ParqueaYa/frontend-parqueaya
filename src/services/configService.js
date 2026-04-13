import axiosInstance from '../api/axiosConfig';

const configService = {
    getTarifa: async () => {
        try {
            const response = await axiosInstance.get('/api/config/tarifa');
            return response.data; // { tarifa: 5000 }
        } catch (error) {
            console.error("Error al obtener tarifa:", error);
            throw error;
        }
    }
};

export default configService;
