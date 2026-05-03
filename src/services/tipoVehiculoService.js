import axiosInstance from '../api/axiosConfig';

const tipoVehiculoService = {
    listar: async () => {
        const response = await axiosInstance.get('/api/tipos-vehiculo');
        return response.data;
    },

    crear: async (dto) => {
        const response = await axiosInstance.post('/api/tipos-vehiculo', dto);
        return response.data;
    },

    actualizar: async (id, dto) => {
        const response = await axiosInstance.put(`/api/tipos-vehiculo/${id}`, dto);
        return response.data;
    },

    eliminar: async (id) => {
        await axiosInstance.delete(`/api/tipos-vehiculo/${id}`);
    },
};

export default tipoVehiculoService;
