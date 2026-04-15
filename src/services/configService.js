import axiosInstance from '../api/axiosConfig';

const configService = {
    // Devuelve { tarifa: number } con el monto de la primera tarifa HORA activa encontrada.
    // Si no hay ninguna configurada devuelve { tarifa: 0 }.
    getTarifaHora: async (tipoVehiculoNombre = null) => {
        const response = await axiosInstance.get('/api/tarifas/activas');
        const tarifas = response.data;

        const tarifa = tarifas.find((t) => {
            const esHora = t.tipoTarifa === 'HORA';
            if (tipoVehiculoNombre) {
                return esHora && t.tipoVehiculo?.nombre?.toLowerCase() === tipoVehiculoNombre.toLowerCase();
            }
            return esHora;
        });

        return { tarifa: tarifa?.monto ?? 0 };
    },

    listarTarifas: async () => {
        const response = await axiosInstance.get('/api/tarifas');
        return response.data;
    },

    listarTarifasActivas: async () => {
        const response = await axiosInstance.get('/api/tarifas/activas');
        return response.data;
    },
};

export default configService;
