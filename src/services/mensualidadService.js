import axiosInstance from '../api/axiosConfig';

const mensualidadService = {
    asignar: async (clienteId, dto) => {
        const response = await axiosInstance.post(`/api/clientes/${clienteId}/mensualidad`, dto);
        return response.data;
    },
    obtenerActivaPorCliente: async (clienteId) => {
        const response = await axiosInstance.get(`/api/clientes/${clienteId}/mensualidad/activa`);
        return response.data;
    },
    cancelar: async (clienteId, mensualidadId) => {
        const response = await axiosInstance.delete(`/api/clientes/${clienteId}/mensualidad/${mensualidadId}`);
        return response.data;
    },
    listarTodasActivas: async () => {
        const response = await axiosInstance.get('/api/mensualidades/activas');
        return response.data;
    }
};

export default mensualidadService;
