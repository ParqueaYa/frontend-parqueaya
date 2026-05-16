'use client';

import { useState } from 'react';
import vehiculoService from '@/services/vehiculoService';
import clienteService from '@/services/clienteService';
import facturaService from '@/services/facturaService';
import { FacturaTemplate } from './FacturaTemplate';

export function FacturacionGenerar() {
    const [placa, setPlaca] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datosParqueo, setDatosParqueo] = useState(null);
    const [clienteAsociado, setClienteAsociado] = useState(null);
    const [vehiculoId, setVehiculoId] = useState(null);
    const [registroParqueoId, setRegistroParqueoId] = useState(null);
    const [facturaGenerada, setFacturaGenerada] = useState(null);

    const handleBuscar = async (e) => {
        e.preventDefault();
        if (!placa) return;
        setLoading(true);
        setError(null);
        setDatosParqueo(null);
        setClienteAsociado(null);
        setVehiculoId(null);
        setRegistroParqueoId(null);
        setFacturaGenerada(null);
        
        try {
            const historial = await vehiculoService.listarHistorial();
            const registrosVehiculo = historial
                .filter(r => r.vehiculo?.placa === placa.toUpperCase())
                .sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso));
            
            if (registrosVehiculo.length === 0) {
                setError('No se encontró ningún registro de parqueo para esta placa.');
                setLoading(false);
                return;
            }

            const ultimoRegistro = registrosVehiculo[0];
            setRegistroParqueoId(ultimoRegistro.id);

            let costoMostrar = ultimoRegistro.totalCobrado || 0;
            let tiempoMostrar = 'N/A';
            let minMostrar = 0;

            if (!ultimoRegistro.fechaSalida) {
                // Aún activo
                try {
                    const estimado = await vehiculoService.consultarPorPlaca(placa.toUpperCase());
                    costoMostrar = estimado.costoAcumulado;
                    tiempoMostrar = estimado.tiempoTranscurrido;
                    minMostrar = estimado.minutosTranscurridos;
                } catch (e) {}
            } else {
                // Ya salió
                const start = new Date(ultimoRegistro.fechaIngreso);
                const end = new Date(ultimoRegistro.fechaSalida);
                const diffMs = end - start;
                const diffHrs = Math.floor(diffMs / 3600000);
                const diffMins = Math.floor((diffMs % 3600000) / 60000);
                tiempoMostrar = `${diffHrs}h ${diffMins}m`;
                minMostrar = Math.floor(diffMs / 60000);
            }

            setDatosParqueo({
                placa: placa.toUpperCase(),
                costoEstimado: costoMostrar,
                costoAcumulado: costoMostrar,
                tiempoTranscurrido: tiempoMostrar,
                minutosTranscurridos: minMostrar,
                fechaIngreso: ultimoRegistro.fechaIngreso,
                activo: !ultimoRegistro.fechaSalida
            });

            try {
                const vehiculoInfo = await vehiculoService.obtenerPorPlaca(placa.toUpperCase());
                setVehiculoId(vehiculoInfo?.id || null);
                if (vehiculoInfo?.cliente) {
                    setClienteAsociado(vehiculoInfo.cliente);
                }
            } catch (err) {}

        } catch (error) {
            setError('Error al consultar el parqueo. Verifique la placa.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerar = async () => {
        if (!datosParqueo) return;
        
        if (!vehiculoId || !clienteAsociado) {
            setError('Para generar una factura oficial, el vehículo DEBE estar registrado y tener un cliente asociado.');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const dto = {
                registroParqueoId: registroParqueoId,
                clienteId: clienteAsociado.id,
                vehiculoId: vehiculoId,
                detalle: `Servicio de parqueo - Tiempo transcurrido: ${datosParqueo.tiempoTranscurrido || 'N/A'}`
            };
            
            const nuevaFactura = await facturaService.generar(dto);
            setFacturaGenerada({
                ...nuevaFactura,
                tiempoMinutos: datosParqueo.minutosTranscurridos,
                fechaIngreso: datosParqueo.fechaIngreso
            });
            setDatosParqueo(null);
        } catch (error) {
            setError(error?.response?.data?.message || 'Error al generar la factura en el backend.');
        } finally {
            setLoading(false);
        }
    };

    if (facturaGenerada) {
        return (
            <div>
                <div className="mb-4 text-xs font-bold px-4 py-3 border tracking-wide bg-green-500/10 border-green-500/30 text-green-400 flex justify-between items-center">
                    <span>Factura generada exitosamente.</span>
                    <button 
                        onClick={() => { setFacturaGenerada(null); setPlaca(''); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary px-4 py-1.5 hover:bg-primary/10 transition-colors"
                    >
                        Generar Nueva
                    </button>
                </div>
                <FacturaTemplate factura={facturaGenerada} cliente={clienteAsociado} />
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Generar Factura de Parqueo
                    </h3>
                </div>
            </div>

            <div className="p-4">
                <form onSubmit={handleBuscar} className="flex items-end gap-4 mb-2">
                    <div className="flex-1 max-w-xs">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                            Placa del Vehículo
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                directions_car
                            </span>
                            <input
                                type="text"
                                value={placa}
                                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                                placeholder="EJ: ABC123"
                                className="w-full bg-slate-900 border border-slate-700 pl-8 pr-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:border-primary outline-none transition-colors text-slate-100 placeholder:text-slate-600 font-mono"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !placa}
                        className="flex items-center gap-2 px-4 py-1.5 bg-primary border border-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all disabled:opacity-50"
                    >
                        {loading && !datosParqueo ? <span className="material-symbols-outlined animate-spin text-sm">autorenew</span> : <span className="material-symbols-outlined text-sm">search</span>}
                        {loading && !datosParqueo ? 'Buscando...' : 'Buscar'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 mb-2 text-xs font-bold px-4 py-3 border tracking-wide bg-red-500/10 border-red-500/30 text-red-400">
                        {error}
                    </div>
                )}
            </div>

            {datosParqueo && (
                <div className="border-t border-slate-800 bg-slate-800/30 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                    
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 border-b border-slate-700/50 pb-2">
                        Detalles del Servicio
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Placa</span>
                            <span className="font-mono text-lg font-black text-slate-100">{datosParqueo.placa}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Cliente Asociado</span>
                            <span className={`font-bold ${clienteAsociado ? 'text-slate-300' : 'text-red-400'}`}>
                                {clienteAsociado ? `${clienteAsociado.nombre} ${clienteAsociado.apellido}` : 'Sin Cliente Asociado'}
                            </span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Tiempo Transcurrido</span>
                            <span className="text-slate-300 font-mono">
                                {datosParqueo.tiempoTranscurrido || (datosParqueo.minutosTranscurridos != null ? `${Math.floor(datosParqueo.minutosTranscurridos / 60)}h ${datosParqueo.minutosTranscurridos % 60}m` : 'N/A')}
                            </span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Costo Estimado</span>
                            <span className="text-2xl font-black text-primary">${datosParqueo.costoAcumulado?.toLocaleString() || datosParqueo.costoEstimado?.toLocaleString() || '0'}</span>
                        </div>
                    </div>

                    {!clienteAsociado && (
                        <div className="mb-4 text-[10px] font-bold px-4 py-2 border tracking-wide bg-amber-500/10 border-amber-500/30 text-amber-500">
                            Advertencia: No puede generar una factura oficial si el vehículo no tiene un cliente asignado en el sistema. Debe registrar el cliente en el módulo correspondiente primero.
                        </div>
                    )}
                    {datosParqueo.activo && (
                        <div className="mb-4 text-[10px] font-bold px-4 py-2 border tracking-wide bg-orange-500/10 border-orange-500/30 text-orange-400">
                            Advertencia: El vehículo aún se encuentra en el parqueadero. Debe ir al módulo de SALIDAS y liquidar el servicio antes de poder emitir la factura.
                        </div>
                    )}

                    <div className="flex justify-end border-t border-slate-700 pt-4 mt-4">
                        <button
                            onClick={handleGenerar}
                            disabled={loading || !clienteAsociado || !vehiculoId || datosParqueo.activo}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary border border-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-base">receipt_long</span>
                            {loading ? 'Generando...' : 'Confirmar y Generar Factura'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
