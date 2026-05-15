'use client';

import { useState } from 'react';
import facturaService from '@/services/facturaService';
import clienteService from '@/services/clienteService';

export function FacturacionHistorial() {
    const [modoBusqueda, setModoBusqueda] = useState('placa'); // 'placa' | 'cliente'
    const [termino, setTermino] = useState('');
    const [loading, setLoading] = useState(false);
    const [facturas, setFacturas] = useState([]);
    const [buscado, setBuscado] = useState(false);
    const [error, setError] = useState(null);

    const handleBuscar = async (e) => {
        e.preventDefault();
        if (!termino) return;
        
        setLoading(true);
        setError(null);
        setBuscado(true);
        setFacturas([]);
        
        try {
            let data = [];
            if (modoBusqueda === 'placa') {
                data = await facturaService.consultarPorPlaca(termino.toUpperCase());
            } else {
                const cliente = await clienteService.buscarPorCedula(termino);
                if (cliente && cliente.id) {
                    data = await facturaService.consultarPorCliente(cliente.id);
                } else {
                    setError('Cliente no encontrado.');
                    setLoading(false);
                    return;
                }
            }
            setFacturas(Array.isArray(data) ? data : (data ? [data] : []));
        } catch (err) {
            const status = err?.response?.status;
            if (status === 404) {
                setFacturas([]);
            } else {
                setError('Error al consultar facturas. Verifique la información ingresada.');
            }
        } finally {
            setLoading(false);
        }
    };

    const cambiarModo = (modo) => {
        setModoBusqueda(modo);
        setTermino('');
        setFacturas([]);
        setBuscado(false);
        setError(null);
    };

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Historial de Facturas
                    </h3>
                    {!loading && buscado && (
                        <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            ({facturas.length})
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => cambiarModo('placa')}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            modoBusqueda === 'placa' 
                                ? 'bg-primary/20 border-primary text-primary' 
                                : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'
                        }`}
                    >
                        Por Placa
                    </button>
                    <button
                        onClick={() => cambiarModo('cliente')}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            modoBusqueda === 'cliente' 
                                ? 'bg-primary/20 border-primary text-primary' 
                                : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'
                        }`}
                    >
                        Por Cliente
                    </button>
                </div>
            </div>

            <div className="p-4 border-b border-slate-800">
                <form onSubmit={handleBuscar} className="flex items-end gap-4">
                    <div className="flex-1 max-w-xs">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                            {modoBusqueda === 'placa' ? 'Placa del Vehículo' : 'Cédula del Cliente'}
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                search
                            </span>
                            <input
                                type="text"
                                value={termino}
                                onChange={(e) => setTermino(modoBusqueda === 'placa' ? e.target.value.toUpperCase() : e.target.value)}
                                placeholder={modoBusqueda === 'placa' ? 'EJ: ABC123' : 'EJ: 1010101010'}
                                className="w-full bg-slate-900 border border-slate-700 pl-8 pr-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary outline-none transition-colors text-slate-100 placeholder:text-slate-600 font-mono"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !termino}
                        className="flex items-center gap-2 px-4 py-1.5 bg-primary border border-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all disabled:opacity-50"
                    >
                        {loading ? <span className="material-symbols-outlined animate-spin text-sm">autorenew</span> : <span className="material-symbols-outlined text-sm">search</span>}
                        {loading ? 'Buscando...' : 'Consultar'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 mb-0 text-xs font-bold px-4 py-3 border tracking-wide bg-red-500/10 border-red-500/30 text-red-400">
                        {error}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Fecha', 'Número', 'Monto', ...(modoBusqueda === 'cliente' ? ['Vehículo'] : [])].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan={modoBusqueda === 'cliente' ? "4" : "3"} className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando facturas...
                                </td>
                            </tr>
                        ) : buscado && facturas.length > 0 ? (
                            facturas.map((f, i) => (
                                <tr key={f.id || i} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-4 text-xs font-mono text-slate-300 tracking-widest">
                                        {f.fecha ? new Date(f.fecha).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-400 font-mono tracking-widest">
                                        {String(f.id || '0').padStart(8, '0')}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-slate-100 tracking-tight">
                                        ${(f.total || f.monto || 0).toLocaleString()}
                                    </td>
                                    {modoBusqueda === 'cliente' && (
                                        <td className="px-4 py-4 text-xs font-mono text-slate-300 tracking-widest">
                                            {f.vehiculo?.placa || f.placa || '—'}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : buscado && facturas.length === 0 ? (
                            <tr>
                                <td colSpan={modoBusqueda === 'cliente' ? "4" : "3"} className="px-4 py-14">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-4xl text-slate-500">receipt_long</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            No se encontraron facturas
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={modoBusqueda === 'cliente' ? "4" : "3"} className="px-4 py-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    Ingrese los datos y presione buscar
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
