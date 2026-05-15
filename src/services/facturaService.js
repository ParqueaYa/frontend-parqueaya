import axiosInstance from '../api/axiosConfig';

const facturaService = {
    generar: async (dto) => {
        const response = await axiosInstance.post('/api/facturas', dto);
        return response.data;
    },
    listar: async () => {
        const response = await axiosInstance.get('/api/facturas');
        return response.data;
    },
    consultarPorCliente: async (clienteId) => {
        const response = await axiosInstance.get(`/api/facturas/cliente/${clienteId}`);
        return response.data;
    },
    consultarPorPlaca: async (placa) => {
        const response = await axiosInstance.get(`/api/facturas/placa/${placa}`);
        return response.data;
    }
};

export default facturaService;
