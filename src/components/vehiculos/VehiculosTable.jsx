'use client';

import { useMemo } from 'react';

export function VehiculosTable({ vehiculos, loading, busqueda, setBusqueda, onNuevo, onEditar, onEliminar, onAsociarCliente, vehiculoAsociarId }) {
    const filtrados = useMemo(() => {
        const term = busqueda.trim().toLowerCase();
        if (!term) return vehiculos;
        return vehiculos.filter((v) => {
            const placaOk = (v.placa ?? '').toLowerCase().includes(term);
            const clienteNombre = v.cliente
                ? `${v.cliente.nombre} ${v.cliente.apellido}`.toLowerCase()
                : '';
            return placaOk || clienteNombre.includes(term);
        });
    }, [vehiculos, busqueda]);

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Catálogo de Vehículos
                    </h3>
                    {!loading && (
                        <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            ({filtrados.length})
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="PLACA O CLIENTE..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value.toUpperCase())}
                            className="bg-slate-900 border border-slate-700 pl-8 pr-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary outline-none transition-colors w-44 text-slate-100 placeholder:text-slate-600"
                        />
                    </div>

                    <button
                        onClick={onNuevo}
                        className="flex items-center gap-2 px-4 py-1.5 bg-primary border border-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        Nuevo
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Placa', 'Tipo de vehículo', 'Cliente asociado', 'Acciones'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando vehículos...
                                </td>
                            </tr>
                        ) : filtrados.length > 0 ? (
                            filtrados.map((v) => (
                                <tr
                                    key={v.id}
                                    className={`transition-colors ${vehiculoAsociarId === v.id ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'}`}
                                >
                                    <td className="px-4 py-4 text-sm font-bold text-slate-100 tracking-widest font-mono">
                                        {v.placa}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-400 uppercase">
                                        {v.tipoVehiculo?.nombre ?? '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs">
                                        {v.cliente ? (
                                            <span className="text-slate-300">
                                                {v.cliente.nombre} {v.cliente.apellido}
                                                <span className="ml-2 text-slate-600 font-mono">
                                                    {v.cliente.cedula}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="italic text-slate-600">Sin cliente</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => onAsociarCliente(v)}
                                                title="Asociar cliente"
                                                className={`p-1.5 border transition-colors ${
                                                    vehiculoAsociarId === v.id
                                                        ? 'border-primary text-primary bg-primary/10'
                                                        : 'border-slate-700 text-slate-400 hover:border-primary hover:text-primary'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-base">link</span>
                                            </button>
                                            <button
                                                onClick={() => onEditar(v)}
                                                title="Editar vehículo"
                                                className="p-1.5 border border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">edit</span>
                                            </button>
                                            <button
                                                onClick={() => onEliminar(v)}
                                                title="Eliminar vehículo"
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
                                <td colSpan="4" className="px-4 py-14">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-4xl text-slate-500">no_crash</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            {busqueda ? 'No se encontraron resultados' : 'No hay vehículos registrados'}
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
