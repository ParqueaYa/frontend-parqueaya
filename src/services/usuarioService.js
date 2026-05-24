import axiosInstance from '../api/axiosConfig';

const usuarioService = {
    listar: async () => {
        const response = await axiosInstance.get('/api/usuarios');
        return response.data;
    },

    actualizar: async (id, dto) => {
        const response = await axiosInstance.put(`/api/usuarios/${id}`, dto);
        return response.data;
    },

    cambiarEstado: async (id) => {
        const response = await axiosInstance.put(`/api/usuarios/${id}/estado`);
        return response.data;
    }
};

export default usuarioService;
