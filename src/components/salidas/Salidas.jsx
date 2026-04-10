// components/salidas/Salidas.jsx
'use client';

import { useState } from "react";
import { SalidasTitle } from './SalidasTitle';
import { SalidasSearch } from './SalidasSearch';
import { SalidasVehicleInfo } from './SalidasVehicleInfo';
import { SalidasActions } from './SalidasActions';
import vehiculoService from "@/services/vehiculoService";

export function Salidas() {
    const [placaBusqueda, setPlacaBusqueda] = useState("");
    const [vehiculoEncontrado, setVehiculoEncontrado] = useState(null);
    const [loading, setLoading] = useState(false);

    const buscarVehiculo = async () => {
        setLoading(true);
        const busqueda = placaBusqueda.trim().toUpperCase();
        try {
            const vehiculo = await vehiculoService.buscarVehiculoPorPlaca(busqueda);

            if (vehiculo) {
                const horaActual = new Date();
                let horaEntrada = new Date();

                if (vehiculo.horaEntrada) {
                    if (typeof vehiculo.horaEntrada === 'string' && vehiculo.horaEntrada.includes('T')) {
                        horaEntrada = new Date(vehiculo.horaEntrada);
                    } else if (typeof vehiculo.horaEntrada === 'string' && vehiculo.horaEntrada.includes(':')) {
                        const [horas, minutos] = vehiculo.horaEntrada.split(":");
                        horaEntrada.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0);
                    } else {
                        const parsedDate = new Date(vehiculo.horaEntrada);
                        if (!isNaN(parsedDate.getTime())) {
                            horaEntrada = parsedDate;
                        }
                    }
                }

                const tiempoMinutos = Math.floor((horaActual.getTime() - horaEntrada.getTime()) / 60000);
                const horas_total = Math.floor(tiempoMinutos / 60);
                const minutos_total = tiempoMinutos % 60;

                const tarifaPorHora = vehiculo.tipo === "Moto" ? 2000 : (vehiculo.tipo === "Auto" || vehiculo.tipo === "Camioneta") ? 3000 : 4000;
                const monto = Math.ceil(tiempoMinutos / 60) * tarifaPorHora;

                setVehiculoEncontrado({
                    ...vehiculo,
                    horaSalida: horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    tiempoTotal: `${horas_total}h ${minutos_total}m`,
                    tarifaAplicada: `$${tarifaPorHora.toLocaleString()}/hora`,
                    montoPagar: `$${monto.toLocaleString()}`
                });
            } else {
                alert("Vehículo no encontrado en el servidor.");
                setVehiculoEncontrado(null);
            }
        } catch (error) {
            console.error("Error al buscar:", error);
            const status = error.response?.status;
            if (status === 404) {
                alert("El vehículo no se encuentra registrado o ya salió.");
            } else if (status === 403) {
                alert("No tiene permisos o su sesión expiró (403).");
            } else {
                alert(error.response?.data?.message || "Error al comunicarse con el servidor.");
            }
            setVehiculoEncontrado(null);
        } finally {
            setLoading(false);
        }
    };

    const finalizarSalida = async () => {
        try {
            if (vehiculoEncontrado?.id) {
                await vehiculoService.registrarSalida(vehiculoEncontrado.id);
                alert("Salida finalizada en el servidor. Cupo liberado.");
                setPlacaBusqueda("");
                setVehiculoEncontrado(null);
            }
        } catch (error) {
            console.error("Error al finalizar salida:", error);
            alert(error.response?.data?.message || "Error al finalizar salida en el servidor.");
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
                />

                {vehiculoEncontrado ? (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <SalidasVehicleInfo vehiculoEncontrado={vehiculoEncontrado} />
                        <SalidasActions finalizarSalida={finalizarSalida} />
                    </div>
                ) : (
                    <div className="border border-dashed border-slate-800 p-12 flex flex-col items-center justify-center opacity-30">
            <span className="material-symbols-outlined text-4xl mb-2 text-slate-500">
              manage_search
            </span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 text-center">
                            Ingrese la placa para liquidar el servicio
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}