import axiosInstance from '../api/axiosConfig';

const statsService = {
    obtenerResumenDashboard: async () => {
        const [activos, historial, facturas] = await Promise.all([
            axiosInstance.get('/api/parqueo/activos'),
            axiosInstance.get('/api/parqueo'),
            axiosInstance.get('/api/facturas'),
        ]);

        const registrosActivos = activos.data;
        const todosLosRegistros = historial.data;
        const todasLasFacturas = facturas.data;

        const hoy = new Date().toISOString().slice(0, 10);

        const registrosFinalizadosHoy = todosLosRegistros.filter((r) => {
            if (r.estado !== 'FINALIZADO' || !r.fechaSalida) return false;
            return r.fechaSalida.startsWith(hoy);
        });

        const ingresosHoy = todasLasFacturas
            .filter((f) => f.fecha?.startsWith(hoy))
            .reduce((acc, f) => acc + (f.total ?? f.monto ?? 0), 0);

        const minutosFinalizados = registrosFinalizadosHoy
            .map((r) => {
                const entrada = new Date(r.fechaIngreso);
                const salida = new Date(r.fechaSalida);
                return (salida - entrada) / 60000;
            });

        const tiempoPromedio = minutosFinalizados.length
            ? Math.round(minutosFinalizados.reduce((a, b) => a + b, 0) / minutosFinalizados.length)
            : 0;

        return {
            vehiculosHoy: registrosActivos.length + registrosFinalizadosHoy.length,
            ingresosHoy,
            cuposDisponibles: registrosActivos.length,
            tiempoPromedio,
        };
    },
};

export default statsService;
