import axiosInstance from '../api/axiosConfig';

const tipoVehiculoService = {
    listar: async () => {
        const response = await axiosInstance.get('/api/tipos-vehiculo');
        return response.data;
    },
};

export default tipoVehiculoService;
