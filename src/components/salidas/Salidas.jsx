'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SalidasTitle } from './SalidasTitle';
import { SalidasSearch } from './SalidasSearch';
import { SalidasVehicleInfo } from './SalidasVehicleInfo';
import { SalidasActions } from './SalidasActions';
import vehiculoService from "@/services/vehiculoService";

export function Salidas() {
    const searchParams = useSearchParams();
    const [placaBusqueda, setPlacaBusqueda]     = useState("");
    const [vehiculoEncontrado, setVehiculoEncontrado] = useState(null);
    const [loading, setLoading]                 = useState(false);
    const [mensaje, setMensaje]                 = useState(null);

    useEffect(() => {
        const placa = searchParams.get('placa');
        if (placa) {
            setPlacaBusqueda(placa.toUpperCase());
        }
    }, [searchParams]);

    const buscarVehiculo = async () => {
        setLoading(true);
        setMensaje(null);
        const busqueda = placaBusqueda.trim().toUpperCase();
        try {
            const data = await vehiculoService.consultarPorPlaca(busqueda);
            // data: ConsultaCostoResponseDTO
            const formatCOP = (v) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v ?? 0);
            setVehiculoEncontrado({
                placa:          data.placa,
                tipoVehiculo:   data.tipoVehiculo,
                nombreCliente:  data.nombreCliente,
                fechaIngreso:   data.fechaIngreso,
                tiempoTotal:    data.tiempoTranscurrido,
                tarifaAplicada: `${formatCOP(data.tarifaHora)}/hora`,
                montoPagar:     formatCOP(data.costoAcumulado),
                tieneMensualidad: data.tieneMensualidad,
                horaSalida:     new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            });
        } catch (error) {
            const status = error?.response?.status;
            let texto = 'Error al comunicarse con el servidor.';
            if (status === 404) texto = 'El vehículo no está en el parqueadero o ya registró su salida.';
            if (status === 401 || status === 403) texto = 'Sin permisos o sesión expirada.';
            setMensaje({ tipo: 'error', texto });
            setVehiculoEncontrado(null);
        } finally {
            setLoading(false);
        }
    };

    const finalizarSalida = async () => {
        if (!vehiculoEncontrado?.placa) return;
        try {
            await vehiculoService.registrarSalida(vehiculoEncontrado.placa);
            setMensaje({ tipo: 'exito', texto: `Salida de ${vehiculoEncontrado.placa} registrada correctamente.` });
            setPlacaBusqueda("");
            setVehiculoEncontrado(null);
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al registrar la salida.' });
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-8 min-h-full">
            <div className="w-full max-w-[800px]">

                <SalidasTitle />

                <SalidasSearch
                    placaBusqueda={placaBusqueda}
                    setPlacaBusqueda={setPlacaBusqueda}
                    buscarVehiculo={buscarVehiculo}
                    loading={loading}
                />

                {mensaje && (
                    <div className={`mt-4 text-xs font-bold px-4 py-3 border tracking-wide ${
                        mensaje.tipo === 'exito'
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                        {mensaje.texto}
                    </div>
                )}

                {vehiculoEncontrado ? (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <SalidasVehicleInfo vehiculoEncontrado={vehiculoEncontrado} />
                        <SalidasActions finalizarSalida={finalizarSalida} />
                    </div>
                ) : !mensaje && (
                    <div className="border border-dashed border-slate-800 p-12 flex flex-col items-center justify-center opacity-30">
                        <span className="material-symbols-outlined text-4xl mb-2 text-slate-500">manage_search</span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 text-center">
                            Ingrese la placa para liquidar el servicio
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}