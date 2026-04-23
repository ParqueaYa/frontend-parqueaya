import axiosInstance from '../api/axiosConfig';

const clienteService = {
    listar: async () => {
        const response = await axiosInstance.get('/api/clientes');
        return response.data;
    },

    buscarPorCedula: async (cedula) => {
        const response = await axiosInstance.get(`/api/clientes/cedula/${cedula}`);
        return response.data;
    },

    crear: async (dto) => {
        const response = await axiosInstance.post('/api/clientes', dto);
        return response.data;
    },

    actualizar: async (id, dto) => {
        const response = await axiosInstance.put(`/api/clientes/${id}`, dto);
        return response.data;
    },

    eliminar: async (id) => {
        await axiosInstance.delete(`/api/clientes/${id}`);
    },

    obtenerVehiculos: async (clienteId) => {
        const response = await axiosInstance.get(`/api/vehiculos/cliente/${clienteId}`);
        return response.data;
    },
};

export default clienteService;
