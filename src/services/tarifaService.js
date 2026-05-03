import axiosInstance from '../api/axiosConfig';

const tarifaService = {
    listar: async () => {
        const response = await axiosInstance.get('/api/tarifas');
        return response.data;
    },

    crear: async (dto) => {
        const response = await axiosInstance.post('/api/tarifas', dto);
        return response.data;
    },

    actualizar: async (id, dto) => {
        const response = await axiosInstance.put(`/api/tarifas/${id}`, dto);
        return response.data;
    },

    eliminar: async (id) => {
        await axiosInstance.delete(`/api/tarifas/${id}`);
    },
};

export default tarifaService;
