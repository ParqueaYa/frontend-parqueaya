'use client';

import { useState, useEffect } from 'react';
import mensualidadService from '@/services/mensualidadService';

export function MensualidadesList() {
    const [mensualidades, setMensualidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarMensualidades = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await mensualidadService.listarTodasActivas();
            setMensualidades(data ?? []);
        } catch (err) {
            setError('Error al cargar la lista de mensualidades activas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarMensualidades();
    }, []);

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl mt-4">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-emerald-500" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Mensualidades Activas
                    </h3>
                    {!loading && (
                        <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            ({mensualidades.length})
                        </span>
                    )}
                </div>
                
                <button
                    onClick={cargarMensualidades}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-1.5 border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                >
                    <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>
                        refresh
                    </span>
                    Actualizar
                </button>
            </div>

            {error && (
                <div className="text-xs font-bold px-4 py-3 border-b tracking-wide bg-red-500/10 border-red-500/30 text-red-400">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Cliente', 'Cédula', 'Fecha Inicio', 'Fecha Fin', 'Monto', 'Estado'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-emerald-500 align-middle mr-2">autorenew</span>
                                    Cargando mensualidades...
                                </td>
                            </tr>
                        ) : mensualidades.length > 0 ? (
                            mensualidades.map((m) => (
                                <tr key={m.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-100 tracking-tight">
                                        {m.cliente?.nombre} {m.cliente?.apellido}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-300 tracking-widest">
                                        {m.cliente?.cedula ?? '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono text-slate-400">
                                        {m.fechaInicio ? new Date(m.fechaInicio).toLocaleDateString() : '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono font-bold text-slate-100">
                                        {m.fechaFin ? new Date(m.fechaFin).toLocaleDateString() : '—'}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-emerald-400 tracking-widest font-mono">
                                        ${(m.monto || 0).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                            Activa
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-14">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-4xl text-slate-500">event_busy</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            No hay mensualidades activas
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
