import axiosInstance from '../api/axiosConfig';

const mensualidadService = {
    asignar: async (dto) => {
        // POST /api/mensualidades
        const response = await axiosInstance.post(`/api/mensualidades`, dto);
        return response.data;
    },
    obtenerActivaPorCliente: async (clienteId) => {
        // GET /api/mensualidades/cliente/{clienteId}
        const response = await axiosInstance.get(`/api/mensualidades/cliente/${clienteId}`);
        // Devuelve una lista, buscamos la que esté ACTIVA
        const activas = response.data.filter(m => m.estado === 'ACTIVA');
        return activas.length > 0 ? activas[0] : null;
    },
    cancelar: async (mensualidadId) => {
        // PATCH /api/mensualidades/{id}/cancelar
        const response = await axiosInstance.patch(`/api/mensualidades/${mensualidadId}/cancelar`);
        return response.data;
    },
    listarTodasActivas: async () => {
        // GET /api/mensualidades/estado/ACTIVA
        const response = await axiosInstance.get('/api/mensualidades/estado/ACTIVA');
        return response.data;
    }
};

export default mensualidadService;
