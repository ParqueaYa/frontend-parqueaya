import axiosInstance from '../api/axiosConfig';

const reporteService = {
    obtenerIngresos: async () => {
        const response = await axiosInstance.get('/api/facturas');
        return response.data;
    },
    obtenerMovimientos: async () => {
        const response = await axiosInstance.get('/api/parqueo');
        return response.data;
    }
};

export default reporteService;
