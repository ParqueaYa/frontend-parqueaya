// components/salidas/Salidas.jsx
'use client';

import { useState } from "react";
import { SalidasTitle } from './SalidasTitle';
import { SalidasSearch } from './SalidasSearch';
import { SalidasVehicleInfo } from './SalidasVehicleInfo';
import { SalidasActions } from './SalidasActions';

export function Salidas() {
    const [placaBusqueda, setPlacaBusqueda] = useState("");
    const [vehiculoEncontrado, setVehiculoEncontrado] = useState(null);

    // Datos quemados para pruebas
    const vehiculosDentro = [
        { placa: "XYZ789", tipo: "Moto", cupo: "M-5", horaEntrada: "09:15" },
        { placa: "QRS321", tipo: "Camioneta", cupo: "C-3", horaEntrada: "10:20" },
        { placa: "TUV654", tipo: "Auto", cupo: "A-8", horaEntrada: "11:30" },
    ];

    const buscarVehiculo = () => {
        const busqueda = placaBusqueda.trim().toUpperCase();
        const vehiculo = vehiculosDentro.find(v => v.placa === busqueda);

        if (vehiculo) {
            const horaActual = new Date();
            const [horas, minutos] = vehiculo.horaEntrada.split(":");
            const horaEntrada = new Date();
            horaEntrada.setHours(parseInt(horas), parseInt(minutos), 0);

            const tiempoMinutos = Math.floor((horaActual.getTime() - horaEntrada.getTime()) / 60000);
            const horas_total = Math.floor(tiempoMinutos / 60);
            const minutos_total = tiempoMinutos % 60;

            const tarifaPorHora = vehiculo.tipo === "Moto" ? 2000 : vehiculo.tipo === "Auto" ? 3000 : 4000;
            const monto = Math.ceil(tiempoMinutos / 60) * tarifaPorHora;

            setVehiculoEncontrado({
                ...vehiculo,
                horaSalida: horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                tiempoTotal: `${horas_total}h ${minutos_total}m`,
                tarifaAplicada: `$${tarifaPorHora.toLocaleString()}/hora`,
                montoPagar: `$${monto.toLocaleString()}`
            });
        } else {
            alert("Vehículo no encontrado. Verifique la placa.");
            setVehiculoEncontrado(null);
        }
    };

    const finalizarSalida = () => {
        alert("Salida finalizada. Cupo liberado y pago registrado.");
        setPlacaBusqueda("");
        setVehiculoEncontrado(null);
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