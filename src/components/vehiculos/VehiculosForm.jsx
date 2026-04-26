'use client';

import { useState, useEffect } from 'react';
import clienteService from '@/services/clienteService';

const EMPTY_CAMPOS = { placa: '', tipoVehiculoId: '' };

export function VehiculosForm({ vehiculoEditando, tiposVehiculo, onGuardar, onCancelar, loading }) {
    const [campos, setCampos] = useState(EMPTY_CAMPOS);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [cedulaBusqueda, setCedulaBusqueda]           = useState('');
    const [loadingBusqueda, setLoadingBusqueda]         = useState(false);
    const [errorBusqueda, setErrorBusqueda]             = useState(null);

    useEffect(() => {
        if (vehiculoEditando) {
            setCampos({
                placa:          vehiculoEditando.placa ?? '',
                tipoVehiculoId: vehiculoEditando.tipoVehiculo?.id ?? '',
            });
            setClienteSeleccionado(vehiculoEditando.cliente ?? null);
        } else {
            setCampos(EMPTY_CAMPOS);
            setClienteSeleccionado(null);
        }
        setCedulaBusqueda('');
        setErrorBusqueda(null);
    }, [vehiculoEditando]);

    const set = (field) => (e) => setCampos((prev) => ({ ...prev, [field]: e.target.value }));

    const buscarCliente = async () => {
        const cedula = cedulaBusqueda.trim();
        if (!cedula) return;
        setLoadingBusqueda(true);
        setErrorBusqueda(null);
        setClienteSeleccionado(null);
        try {
            const data = await clienteService.buscarPorCedula(cedula);
            setClienteSeleccionado(data);
            setCedulaBusqueda('');
        } catch (error) {
            const status = error?.response?.status;
            setErrorBusqueda(status === 404
                ? `No se encontró ningún cliente con cédula ${cedula}.`
                : 'Error al buscar el cliente.');
        } finally {
            setLoadingBusqueda(false);
        }
    };

    const limpiarCliente = () => {
        setClienteSeleccionado(null);
        setErrorBusqueda(null);
    };

    const esEdicion = !!vehiculoEditando;
    const isValid   = campos.placa.trim() && campos.tipoVehiculoId && !loading;

    const handleSubmit = () => {
        if (!isValid) return;
        const dto = {
            placa:          campos.placa.trim().toUpperCase(),
            tipoVehiculoId: Number(campos.tipoVehiculoId),
            ...(clienteSeleccionado && { clienteId: clienteSeleccionado.id }),
        };
        onGuardar(dto);
    };

    return (
        <div className="mt-4 bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        {esEdicion ? `Editando: ${vehiculoEditando.placa}` : 'Nuevo Vehículo'}
                    </h3>
                </div>
                <button onClick={onCancelar} className="text-slate-500 hover:text-slate-300 transition-colors" title="Cerrar">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            <div className="grid grid-cols-1">
                {/* Placa */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            PLACA<span className="text-red-500 ml-0.5">*</span>
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <input
                            type="text"
                            value={campos.placa}
                            onChange={set('placa')}
                            placeholder="ABC123"
                            maxLength={10}
                            disabled={esEdicion}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white font-bold tracking-widest placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Tipo de vehículo */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            TIPO<span className="text-red-500 ml-0.5">*</span>
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <select
                            value={campos.tipoVehiculoId}
                            onChange={set('tipoVehiculoId')}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white focus:border-primary focus:outline-none transition-all cursor-pointer"
                        >
                            <option value="" disabled className="text-slate-600">Seleccione un tipo...</option>
                            {tiposVehiculo.map((t) => (
                                <option key={t.id} value={t.id}>{t.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Cliente opcional */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-start pt-5 border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            CLIENTE
                        </label>
                    </div>
                    <div className="flex-1 p-3 bg-slate-900 flex flex-col gap-2">
                        {clienteSeleccionado ? (
                            <div className="flex items-center justify-between bg-primary/10 border border-primary/30 px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">person_check</span>
                                    <span className="text-xs font-bold text-primary">
                                        {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-mono">
                                        CC {clienteSeleccionado.cedula}
                                    </span>
                                </div>
                                <button onClick={limpiarCliente} className="text-slate-500 hover:text-red-400 transition-colors" title="Quitar cliente">
                                    <span className="material-symbols-outlined text-base">close</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={cedulaBusqueda}
                                    onChange={(e) => { setCedulaBusqueda(e.target.value); setErrorBusqueda(null); }}
                                    onKeyDown={(e) => e.key === 'Enter' && buscarCliente()}
                                    placeholder="Buscar por cédula..."
                                    className="flex-1 bg-slate-950 border border-slate-700 p-2.5 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all"
                                />
                                <button
                                    onClick={buscarCliente}
                                    disabled={!cedulaBusqueda.trim() || loadingBusqueda}
                                    className="px-4 border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    <span className={`material-symbols-outlined text-sm ${loadingBusqueda ? 'animate-spin' : ''}`}>
                                        {loadingBusqueda ? 'autorenew' : 'search'}
                                    </span>
                                    Buscar
                                </button>
                            </div>
                        )}
                        {errorBusqueda && (
                            <p className="text-[10px] font-bold text-red-400 tracking-wide">{errorBusqueda}</p>
                        )}
                        {!clienteSeleccionado && !errorBusqueda && (
                            <p className="text-[10px] text-slate-600 tracking-wide">Opcional — ingrese la cédula del cliente para asociarlo.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-900 flex items-center justify-end gap-3">
                <button
                    onClick={onCancelar}
                    className="py-3 px-6 border border-slate-700 text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:border-slate-500 hover:text-slate-200 transition-all"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={`flex items-center gap-2 py-3 px-6 border text-xs font-black uppercase tracking-[0.2em] transition-all ${
                        isValid
                            ? 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                            : 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-50'
                    }`}
                >
                    <span className={`material-symbols-outlined text-base ${loading ? 'animate-spin' : ''}`}>
                        {loading ? 'autorenew' : 'save_alt'}
                    </span>
                    {loading ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Crear Vehículo'}
                </button>
            </div>
        </div>
    );
}
