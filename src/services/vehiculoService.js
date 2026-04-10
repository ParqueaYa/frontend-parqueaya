import axiosInstance from '../api/axiosConfig';

const vehiculoService = {
    registrarEntrada: async (vehiculoData) => {
        // vehiculoData: { placa, tipoVehiculo, cupo }
        try {
            const response = await axiosInstance.post('/api/vehiculos/entrada', vehiculoData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    buscarVehiculoPorPlaca: async (placa) => {
        try {
            const response = await axiosInstance.get(`/api/vehiculos/placa/${placa}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    registrarSalida: async (id) => {
        try {
            const response = await axiosInstance.post(`/api/vehiculos/salida/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    obtenerMovimientos: async () => {
        const response = await axiosInstance.get('/api/movimientos');
        return response.data;
    }

};

export default vehiculoService;
