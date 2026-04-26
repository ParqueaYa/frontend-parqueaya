import axiosInstance from '../api/axiosConfig';

const vehiculoService = {
    // Operaciones de parqueo
    registrarEntrada: async ({ placa, observaciones }) => {
        const response = await axiosInstance.post('/api/parqueo/ingreso', { placa, observaciones });
        return response.data;
    },

    consultarPorPlaca: async (placa) => {
        const response = await axiosInstance.get(`/api/parqueo/consulta/placa/${placa}`);
        return response.data; // ConsultaCostoResponseDTO
    },

    registrarSalida: async (placa) => {
        const response = await axiosInstance.post(`/api/parqueo/salida/${placa}`);
        return response.data;
    },

    listarActivos: async () => {
        const response = await axiosInstance.get('/api/parqueo/activos');
        return response.data;
    },

    listarHistorial: async () => {
        const response = await axiosInstance.get('/api/parqueo');
        return response.data;
    },

    // CRUD administrativo de vehículos
    listarTodos: async () => {
        const response = await axiosInstance.get('/api/vehiculos');
        return response.data;
    },

    obtenerPorPlaca: async (placa) => {
        const response = await axiosInstance.get(`/api/vehiculos/placa/${placa}`);
        return response.data;
    },

    obtenerPorId: async (id) => {
        const response = await axiosInstance.get(`/api/vehiculos/${id}`);
        return response.data;
    },

    crear: async (dto) => {
        const response = await axiosInstance.post('/api/vehiculos', dto);
        return response.data;
    },

    actualizar: async (id, dto) => {
        const response = await axiosInstance.put(`/api/vehiculos/${id}`, dto);
        return response.data;
    },

    eliminar: async (id) => {
        await axiosInstance.delete(`/api/vehiculos/${id}`);
    },

    asociarCliente: async (vehiculoId, clienteId) => {
        const response = await axiosInstance.patch(`/api/vehiculos/${vehiculoId}/asociar-cliente/${clienteId}`);
        return response.data;
    },
};

export default vehiculoService;
