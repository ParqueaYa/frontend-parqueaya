'use client';

import { useState } from 'react';
import clienteService from '@/services/clienteService';

export function VehiculosAsociarCliente({ vehiculo, onAsociar, onCerrar, loading }) {
    const [cedula, setCedula]                   = useState('');
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [loadingBusqueda, setLoadingBusqueda] = useState(false);
    const [error, setError]                     = useState(null);

    const buscarCliente = async () => {
        const term = cedula.trim();
        if (!term) return;
        setLoadingBusqueda(true);
        setError(null);
        setClienteEncontrado(null);
        try {
            const data = await clienteService.buscarPorCedula(term);
            setClienteEncontrado(data);
        } catch (err) {
            const status = err?.response?.status;
            setError(status === 404
                ? `No se encontró ningún cliente con cédula ${term}.`
                : 'Error al buscar el cliente.');
        } finally {
            setLoadingBusqueda(false);
        }
    };

    const handleConfirmar = () => {
        if (!clienteEncontrado) return;
        onAsociar(clienteEncontrado.id, clienteEncontrado);
    };

    return (
        <div className="mt-4 bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Asociar cliente — {vehiculo.placa}
                    </h3>
                </div>
                <button onClick={onCerrar} className="text-slate-500 hover:text-slate-300 transition-colors" title="Cerrar">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
                {/* Cliente actual */}
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 w-32">
                        Cliente actual:
                    </span>
                    {vehiculo.cliente ? (
                        <span className="text-xs font-bold text-slate-300">
                            {vehiculo.cliente.nombre} {vehiculo.cliente.apellido}
                            <span className="ml-2 text-slate-600 font-mono text-[10px]">CC {vehiculo.cliente.cedula}</span>
                        </span>
                    ) : (
                        <span className="text-xs italic text-slate-600">Sin cliente asignado</span>
                    )}
                </div>

                {/* Búsqueda */}
                <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Buscar nuevo cliente por cédula:
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => { setCedula(e.target.value); setError(null); setClienteEncontrado(null); }}
                            onKeyDown={(e) => e.key === 'Enter' && buscarCliente()}
                            placeholder="Cédula del cliente..."
                            className="flex-1 bg-slate-950 border border-slate-700 p-3 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all"
                        />
                        <button
                            onClick={buscarCliente}
                            disabled={!cedula.trim() || loadingBusqueda}
                            className="px-5 border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <span className={`material-symbols-outlined text-sm ${loadingBusqueda ? 'animate-spin' : ''}`}>
                                {loadingBusqueda ? 'autorenew' : 'search'}
                            </span>
                            Buscar
                        </button>
                    </div>

                    {error && (
                        <p className="text-[10px] font-bold text-red-400 tracking-wide">{error}</p>
                    )}

                    {clienteEncontrado && (
                        <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-2">
                            <span className="material-symbols-outlined text-primary text-sm">person_check</span>
                            <span className="text-xs font-bold text-primary">
                                {clienteEncontrado.nombre} {clienteEncontrado.apellido}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">CC {clienteEncontrado.cedula}</span>
                        </div>
                    )}
                </div>

                {/* Confirmar */}
                <div className="flex justify-end">
                    <button
                        onClick={handleConfirmar}
                        disabled={!clienteEncontrado || loading}
                        className={`flex items-center gap-2 py-3 px-6 border text-xs font-black uppercase tracking-[0.2em] transition-all ${
                            clienteEncontrado && !loading
                                ? 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                                : 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-50'
                        }`}
                    >
                        <span className={`material-symbols-outlined text-base ${loading ? 'animate-spin' : ''}`}>
                            {loading ? 'autorenew' : 'link'}
                        </span>
                        {loading ? 'Asociando...' : 'Confirmar asociación'}
                    </button>
                </div>
            </div>
        </div>
    );
}
