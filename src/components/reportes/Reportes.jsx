'use client';

import { useState, useEffect, useMemo } from "react";
import { ReportesTitle } from './ReportesTitle';
import reporteService from '@/services/reporteService';

export function Reportes() {
    const [tab, setTab] = useState('ingresos'); // 'ingresos' | 'movimientos'
    const [loading, setLoading] = useState(true);
    const [ingresos, setIngresos] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [error, setError] = useState(null);

    // Filters
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const cargarDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            if (tab === 'ingresos') {
                const data = await reporteService.obtenerIngresos();
                setIngresos(data || []);
            } else {
                const data = await reporteService.obtenerMovimientos();
                setMovimientos(data || []);
            }
        } catch (err) {
            setError('Error al cargar la información del reporte.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [tab]);

    const handleClearFilters = () => {
        setFechaInicio('');
        setFechaFin('');
        setBusqueda('');
    };

    // Lógica de filtrado
    const ingresosFiltrados = useMemo(() => {
        return ingresos.filter(i => {
            if (fechaInicio && i.fecha && i.fecha.substring(0, 10) < fechaInicio) return false;
            if (fechaFin && i.fecha && i.fecha.substring(0, 10) > fechaFin) return false;
            if (busqueda && !(i.placa || '').toLowerCase().includes(busqueda.toLowerCase())) return false;
            return true;
        });
    }, [ingresos, fechaInicio, fechaFin, busqueda]);

    const totalIngresos = useMemo(() => ingresosFiltrados.reduce((acc, i) => acc + (i.monto || i.total || 0), 0), [ingresosFiltrados]);

    const movimientosFiltrados = useMemo(() => {
        return movimientos.filter(m => {
            const fechaRef = m.fechaIngreso ? m.fechaIngreso.substring(0, 10) : '';
            if (fechaInicio && fechaRef && fechaRef < fechaInicio) return false;
            if (fechaFin && fechaRef && fechaRef > fechaFin) return false;
            if (busqueda && !(m.placa || '').toLowerCase().includes(busqueda.toLowerCase())) return false;
            return true;
        });
    }, [movimientos, fechaInicio, fechaFin, busqueda]);

    return (
        <div className="w-full px-4 py-8">
            <ReportesTitle />

            <div className="flex gap-1 mb-6 border-b border-slate-800">
                <button
                    onClick={() => setTab('ingresos')}
                    className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                        tab === 'ingresos'
                            ? 'text-primary border-b-2 border-primary bg-primary/5'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    <span className="material-symbols-outlined text-base">payments</span>
                    Reporte de Ingresos
                </button>
                <button
                    onClick={() => setTab('movimientos')}
                    className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                        tab === 'movimientos'
                            ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    <span className="material-symbols-outlined text-base">history</span>
                    Historial de Movimientos
                </button>
            </div>

            {error && (
                <div className="mb-6 text-xs font-bold px-4 py-3 border tracking-wide bg-red-500/10 border-red-500/30 text-red-400">
                    {error}
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 shadow-2xl mb-8">
                <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">filter_list</span>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Filtros de Búsqueda
                    </h3>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Fecha Inicio</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Fecha Fin</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Buscar Placa</label>
                        <input
                            type="text"
                            placeholder="EJ: ABC123"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value.toUpperCase())}
                            className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-primary outline-none transition-colors font-mono uppercase tracking-widest"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleClearFilters}
                            className="w-full px-4 py-2 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors text-[10px] font-bold uppercase tracking-widest"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>
            </div>

            {tab === 'ingresos' && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-900 border border-slate-800 p-6 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Total Recaudado</span>
                            <span className="text-3xl font-black text-primary">${totalIngresos.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-6 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Facturas Emitidas</span>
                            <span className="text-3xl font-black text-sky-400">{ingresosFiltrados.length}</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 shadow-2xl">
                        <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-1 bg-primary" />
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">Detalle de Ingresos</h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-800/30">
                                        {['Fecha', 'Factura', 'Placa', 'Monto'].map((col) => (
                                            <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {loading ? (
                                        <tr><td colSpan="4" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest"><span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span> Cargando...</td></tr>
                                    ) : ingresosFiltrados.length > 0 ? (
                                        ingresosFiltrados.map((i, idx) => (
                                            <tr key={i.id || idx} className="hover:bg-slate-800/20 transition-colors">
                                                <td className="px-4 py-4 text-xs font-mono text-slate-300">{i.fecha ? new Date(i.fecha).toLocaleString() : '—'}</td>
                                                <td className="px-4 py-4 text-xs font-mono text-slate-400">#{i.id || 'N/A'}</td>
                                                <td className="px-4 py-4 text-sm font-bold text-slate-100 tracking-widest">{i.placa || '—'}</td>
                                                <td className="px-4 py-4 text-sm font-bold text-primary font-mono">${(i.monto || i.total || 0).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="4" className="px-4 py-14 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 opacity-50">No se encontraron ingresos</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {tab === 'movimientos' && (
                <div className="bg-slate-900 border border-slate-800 shadow-2xl">
                    <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-1 bg-amber-500" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">Registro de Movimientos</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({movimientosFiltrados.length} Registros)</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-800/30">
                                    {['Placa', 'Entrada', 'Salida', 'Duración', 'Estado'].map((col) => (
                                        <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {loading ? (
                                    <tr><td colSpan="5" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest"><span className="material-symbols-outlined animate-spin text-amber-500 align-middle mr-2">autorenew</span> Cargando...</td></tr>
                                ) : movimientosFiltrados.length > 0 ? (
                                    movimientosFiltrados.map((m, idx) => (
                                        <tr key={m.id || idx} className="hover:bg-slate-800/20 transition-colors">
                                            <td className="px-4 py-4 text-sm font-bold text-slate-100 tracking-widest">{m.placa || '—'}</td>
                                            <td className="px-4 py-4 text-xs font-mono text-slate-300">{m.fechaIngreso ? new Date(m.fechaIngreso).toLocaleString() : '—'}</td>
                                            <td className="px-4 py-4 text-xs font-mono text-slate-400">{m.fechaSalida ? new Date(m.fechaSalida).toLocaleString() : 'En curso'}</td>
                                            <td className="px-4 py-4 text-xs font-mono text-slate-400">
                                                {m.tiempoMinutos ? `${Math.floor(m.tiempoMinutos / 60)}h ${m.tiempoMinutos % 60}m` : '—'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${m.estado === 'FINALIZADO' ? 'bg-slate-800/50 text-slate-400 border-slate-700' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>
                                                    {m.estado || 'ACTIVO'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="px-4 py-14 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 opacity-50">No se encontraron movimientos</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}