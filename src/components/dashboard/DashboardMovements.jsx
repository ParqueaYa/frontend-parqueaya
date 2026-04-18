'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import vehiculoService from '@/services/vehiculoService';

const formatFecha = (isoString) => {
    if (!isoString) return '—';
    const d = new Date(isoString);
    return d.toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
};

const getBadgeClass = (estado = '') => {
    if (estado === 'ACTIVO')     return 'bg-primary/10 text-primary border-primary/20';
    if (estado === 'FINALIZADO') return 'bg-green-500/10 text-green-600 border-green-500/20';
    return 'bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
};

const formatCOP = (value) => {
    if (value == null) return '—';
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
};

export function DashboardMovements() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm]     = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [movimientos, setMovimientos]   = useState([]);
    const [loading, setLoading]           = useState(true);

    useEffect(() => {
        const fetchMovimientos = async () => {
            setLoading(true);
            try {
                const data = await vehiculoService.listarHistorial();
                setMovimientos(data ?? []);
            } catch {
                setMovimientos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchMovimientos();
    }, [pathname]);

    const filteredMovements = movimientos.filter((mov) => {
        const placa    = mov.vehiculo?.placa ?? '';
        const placaOk  = placa.toLowerCase().includes(searchTerm.toLowerCase());
        const estadoOk = filterStatus === 'Todos' || mov.estado === filterStatus;
        return placaOk && estadoOk;
    });

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
                        Últimos Movimientos
                    </h3>
                    {!loading && (
                        <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            ({filteredMovements.length})
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="BUSCAR PLACA..."
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 pl-8 pr-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary focus:ring-0 w-40 outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                        />
                    </div>

                    <select
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary outline-none cursor-pointer text-slate-600 dark:text-slate-300"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="Todos">TODOS LOS ESTADOS</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="FINALIZADO">FINALIZADO</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/30">
                            {['Placa', 'Tipo', 'Entrada', 'Salida', 'Total', 'Estado'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando movimientos...
                                </td>
                            </tr>
                        ) : filteredMovements.length > 0 ? (
                            filteredMovements.map((mov, idx) => (
                                <tr key={mov.id ?? idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                        {mov.vehiculo?.placa ?? '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                                        {mov.vehiculo?.tipoVehiculo?.nombre ?? '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-600 dark:text-slate-400">
                                        {formatFecha(mov.fechaIngreso)}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-600 dark:text-slate-400">
                                        {formatFecha(mov.fechaSalida)}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                                        {formatCOP(mov.totalCobrado)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm border ${getBadgeClass(mov.estado)}`}>
                                            {mov.estado ?? '—'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    No se encontraron movimientos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}