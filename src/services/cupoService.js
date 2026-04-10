import axiosInstance from '../api/axiosConfig';

const cupoService = {
    obtenerCuposDisponibles: async () => {
        try {
            const response = await axiosInstance.get('/cupos/disponibles');
            return response.data;
        } catch (error) {
            console.warn("Usando datos de respaldo para cupos");
            return [
                "A-1", "A-2", "A-5", "A-12", "A-15",
                "B-3", "B-7", "B-10", "B-14",
                "C-2", "C-6", "C-9",
                "M-1", "M-2", "M-3", "M-4", "M-5"
            ];
        }
    }
};

export default cupoService;
