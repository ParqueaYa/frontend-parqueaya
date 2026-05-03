'use client';

import { useMemo } from 'react';

const TIPOS = ['TODAS', 'HORA', 'DIA', 'MENSUALIDAD'];

const formatCOP = (value) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value ?? 0);

const getTipoTarifaBadge = (tipo) => {
    if (tipo === 'HORA')        return 'bg-sky-500/10 border-sky-500/30 text-sky-400';
    if (tipo === 'DIA')         return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
    if (tipo === 'MENSUALIDAD') return 'bg-violet-500/10 border-violet-500/30 text-violet-400';
    return 'bg-slate-800 border-slate-700 text-slate-400';
};

export function TarifasTable({ tarifas, loading, filtroTipo, setFiltroTipo, onNuevo, onEditar, onEliminar }) {
    const filtradas = useMemo(() => {
        if (filtroTipo === 'TODAS') return tarifas;
        return tarifas.filter((t) => t.tipoTarifa === filtroTipo);
    }, [tarifas, filtroTipo]);

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-4 w-1 bg-primary shrink-0" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Tarifas registradas
                    </h3>
                    {!loading && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            ({filtradas.length})
                        </span>
                    )}
                    <div className="flex gap-1 ml-2">
                        {TIPOS.map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => setFiltroTipo(tipo)}
                                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    filtroTipo === tipo
                                        ? 'bg-primary border-primary text-white'
                                        : 'border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onNuevo}
                    className="flex items-center gap-2 px-4 py-1.5 bg-primary border border-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all shrink-0"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Nueva
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Tipo de vehículo', 'Modalidad', 'Monto', 'Estado', 'Acciones'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando tarifas...
                                </td>
                            </tr>
                        ) : filtradas.length > 0 ? (
                            filtradas.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-100">
                                        {t.tipoVehiculo?.nombre ?? '—'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 border ${getTipoTarifaBadge(t.tipoTarifa)}`}>
                                            {t.tipoTarifa ?? '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-black text-slate-100 tracking-tight">
                                        {formatCOP(t.monto)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 border ${
                                            t.activa
                                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                : 'bg-slate-800 border-slate-700 text-slate-500'
                                        }`}>
                                            {t.activa ? 'ACTIVA' : 'INACTIVA'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => onEditar(t)}
                                                title="Editar tarifa"
                                                className="p-1.5 border border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">edit</span>
                                            </button>
                                            <button
                                                onClick={() => onEliminar(t)}
                                                title="Eliminar tarifa"
                                                className="p-1.5 border border-slate-700 text-slate-400 hover:border-red-500 hover:text-red-400 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-14">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-4xl text-slate-500">receipt_long</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            {filtroTipo !== 'TODAS'
                                                ? `No hay tarifas de tipo ${filtroTipo}`
                                                : 'No hay tarifas registradas'}
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
