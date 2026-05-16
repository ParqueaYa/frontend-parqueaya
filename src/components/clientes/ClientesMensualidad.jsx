'use client';

import { useState, useEffect } from 'react';
import mensualidadService from '@/services/mensualidadService';
import vehiculoService from '@/services/vehiculoService';
import tarifaService from '@/services/tarifaService';

export function ClientesMensualidad({ cliente, onCerrar }) {
    const [activa, setActiva] = useState(null);
    const [vehiculos, setVehiculos] = useState([]);
    const [tarifas, setTarifas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const [form, setForm] = useState({
        vehiculoId: '',
        tarifaId: '',
        fechaInicio: new Date().toISOString().split('T')[0],
        duracionMeses: 1
    });

    const cargarDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            // Cargar mensualidad activa
            const mensualidad = await mensualidadService.obtenerActivaPorCliente(cliente.id);
            setActiva(mensualidad);

            // Cargar todos los vehículos y filtrar los de este cliente
            const allVehiculos = await vehiculoService.listarTodos();
            const clienteVehiculos = allVehiculos.filter(v => v.cliente?.id === cliente.id);
            setVehiculos(clienteVehiculos);

            // Cargar tarifas
            const allTarifas = await tarifaService.listar();
            const tarifasMensuales = allTarifas.filter(t => t.tipoTarifa === 'MENSUALIDAD');
            setTarifas(tarifasMensuales);

            // Set default values if arrays are populated
            if (clienteVehiculos.length > 0) {
                setForm(prev => ({ ...prev, vehiculoId: clienteVehiculos[0].id }));
            }
            if (tarifasMensuales.length > 0) {
                setForm(prev => ({ ...prev, tarifaId: tarifasMensuales[0].id }));
            }

        } catch (error) {
            setError('Error al cargar la información requerida.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [cliente]);

    const handleAsignar = async (e) => {
        e.preventDefault();
        
        if (!form.vehiculoId || !form.tarifaId) {
            setError('Debe seleccionar un vehículo y una tarifa.');
            return;
        }

        setProcesando(true);
        setError(null);
        setMensaje(null);
        try {
            const fechaIni = new Date(form.fechaInicio);
            const fechaFin = new Date(fechaIni);
            fechaFin.setMonth(fechaFin.getMonth() + parseInt(form.duracionMeses, 10));

            const dto = {
                clienteId: cliente.id,
                vehiculoId: parseInt(form.vehiculoId),
                tarifaId: parseInt(form.tarifaId),
                fechaInicio: form.fechaInicio,
                fechaFin: fechaFin.toISOString().split('T')[0]
            };

            await mensualidadService.asignar(dto);
            setMensaje('Mensualidad asignada correctamente.');
            await cargarDatos();
        } catch (error) {
            setError(error?.response?.data?.message || 'Error al asignar la mensualidad.');
        } finally {
            setProcesando(false);
        }
    };

    const handleCancelar = async () => {
        if (!window.confirm(`¿Seguro que desea cancelar la mensualidad activa de ${cliente.nombre}?`)) return;
        setProcesando(true);
        setError(null);
        setMensaje(null);
        try {
            await mensualidadService.cancelar(activa.id);
            setMensaje('Mensualidad cancelada correctamente.');
            await cargarDatos();
        } catch (error) {
            setError(error?.response?.data?.message || 'Error al cancelar la mensualidad.');
        } finally {
            setProcesando(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-4 border border-slate-800 bg-slate-900 shadow-2xl p-6 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                <span className="material-symbols-outlined animate-spin text-emerald-500 align-middle mr-2">autorenew</span>
                Cargando estado...
            </div>
        );
    }

    return (
        <div className="mt-4 border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-emerald-500" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Gestión de Mensualidad
                    </h3>
                </div>
                <button
                    onClick={onCerrar}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-xl">person</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-100 tracking-tight">
                            {cliente.nombre} {cliente.apellido}
                        </h4>
                        <p className="text-[10px] font-mono text-slate-400 tracking-widest">
                            {cliente.cedula}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 text-xs font-bold px-4 py-3 border tracking-wide bg-red-500/10 border-red-500/30 text-red-400">
                        {error}
                    </div>
                )}
                {mensaje && (
                    <div className="mb-6 text-xs font-bold px-4 py-3 border tracking-wide bg-green-500/10 border-green-500/30 text-green-400">
                        {mensaje}
                    </div>
                )}

                {activa ? (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                Plan Activo
                            </h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-800/30 p-4 border border-slate-800">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Costo Mensual</span>
                                <span className="text-xl font-black text-emerald-400">
                                    ${activa.tarifa ? (activa.tarifa.monto || 0).toLocaleString() : '0'}
                                </span>
                            </div>
                            <div className="bg-slate-800/30 p-4 border border-slate-800">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Válido hasta</span>
                                <span className="text-lg font-mono font-bold text-slate-100">
                                    {activa.fechaFin ? new Date(activa.fechaFin).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleCancelar}
                                disabled={procesando}
                                className="flex items-center gap-2 px-6 py-2 bg-red-500/10 border border-red-500/50 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-base">cancel</span>
                                {procesando ? 'Procesando...' : 'Cancelar Mensualidad'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleAsignar}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-slate-500">info</span>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Sin plan activo
                            </h4>
                        </div>
                        
                        {vehiculos.length === 0 ? (
                            <div className="mb-4 text-[10px] font-bold px-4 py-2 border tracking-wide bg-amber-500/10 border-amber-500/30 text-amber-500">
                                El cliente no tiene vehículos registrados. Debe registrar un vehículo antes de asignarle una mensualidad.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        Vehículo a Afiliar
                                    </label>
                                    <select
                                        required
                                        value={form.vehiculoId}
                                        onChange={(e) => setForm({ ...form, vehiculoId: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-emerald-500 outline-none transition-colors"
                                    >
                                        <option value="">Seleccione vehículo...</option>
                                        {vehiculos.map(v => (
                                            <option key={v.id} value={v.id}>{v.placa} ({v.tipoVehiculo?.nombre})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        Tarifa Mensual
                                    </label>
                                    <select
                                        required
                                        value={form.tarifaId}
                                        onChange={(e) => setForm({ ...form, tarifaId: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-emerald-500 outline-none transition-colors"
                                    >
                                        <option value="">Seleccione tarifa...</option>
                                        {tarifas.map(t => (
                                            <option key={t.id} value={t.id}>{t.tipoTarifa} {t.tipoVehiculo?.nombre} - ${(t.monto || 0).toLocaleString()}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        Fecha de Inicio
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={form.fechaInicio}
                                        onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-emerald-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        Duración (Meses)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        required
                                        value={form.duracionMeses}
                                        onChange={(e) => setForm({ ...form, duracionMeses: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-emerald-500 outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={procesando || vehiculos.length === 0}
                                className="flex items-center gap-2 px-6 py-2 bg-emerald-500 border border-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-emerald-500 transition-all disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                {procesando ? 'Asignando...' : 'Asignar Mensualidad'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
