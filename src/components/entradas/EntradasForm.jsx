'use client';

import { useState, useEffect } from "react";
import vehiculoService from "@/services/vehiculoService";

export function EntradasForm() {
    const [placa, setPlaca]               = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [loading, setLoading]           = useState(false);
    const [mensaje, setMensaje]           = useState(null);
    const [horaActual, setHoraActual]     = useState(null);
    const [fechaActual, setFechaActual]   = useState(null);

    useEffect(() => {
        const actualizarReloj = () => {
            const ahora = new Date();
            setHoraActual(ahora.toLocaleTimeString('es-CO'));
            setFechaActual(ahora.toLocaleDateString('es-CO'));
        };
        actualizarReloj();
        const timer = setInterval(actualizarReloj, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleRegistrarEntrada = async () => {
        setLoading(true);
        setMensaje(null);
        try {
            await vehiculoService.registrarEntrada({ placa, observaciones: observaciones || undefined });
            setMensaje({ tipo: 'exito', texto: `Vehículo ${placa} registrado exitosamente.` });
            setPlaca('');
            setObservaciones('');
        } catch (error) {
            const status = error?.response?.status;
            const serverMsg = error?.response?.data?.message;
            let texto = 'Error al registrar. Intente nuevamente.';
            if (status === 404) texto = `El vehículo con placa ${placa} no está registrado en el sistema. Regístrelo primero en el módulo de Vehículos.`;
            if (status === 409) texto = `El vehículo ${placa} ya se encuentra dentro del parqueadero.`;
            if (status === 400) texto = serverMsg || 'Datos incorrectos. Revise la placa ingresada.';
            if (status === 401 || status === 403) texto = 'Sesión expirada o sin permisos. Inicie sesión nuevamente.';
            setMensaje({ tipo: 'error', texto });
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = placa.trim().length >= 5 && !loading;

    return (
        <div className="max-w-[800px] bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center gap-3">
                <div className="h-4 w-1 bg-primary"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                    Registro de Entrada de Vehículo
                </h3>
            </div>

            <div className="grid grid-cols-1">
                {/* Fila: PLACA */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-48 bg-slate-800/30 p-4 flex items-center border-r border-slate-800">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            PLACA:
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <input
                            type="text"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                            placeholder="ABC123"
                            maxLength={10}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white font-bold tracking-widest placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all uppercase"
                        />
                    </div>
                </div>

                {/* Fila: OBSERVACIONES */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-48 bg-slate-800/30 p-4 flex items-start border-r border-slate-800 pt-5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            OBSERVACIONES:
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <textarea
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            placeholder="Opcional — ej: rayón en puerta derecha"
                            rows={2}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Fila: FECHA ENTRADA */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-48 bg-slate-800/30 p-4 flex items-center border-r border-slate-800">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            FECHA ENTRADA:
                        </label>
                    </div>
                    <div className="flex-1 p-4 bg-slate-900 flex items-center">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                            <span className="text-sm font-black text-white tracking-widest leading-none">
                                {fechaActual || "--/--/----"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Fila: HORA ENTRADA */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-48 bg-slate-800/30 p-4 flex items-center border-r border-slate-800">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            HORA ENTRADA:
                        </label>
                    </div>
                    <div className="flex-1 p-4 bg-slate-900 flex items-center">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                            <span className="text-sm font-black text-white tracking-widest leading-none italic">
                                {horaActual || "--:--:--"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-slate-900 flex flex-col gap-4">
                {mensaje && (
                    <div className={`text-xs font-bold px-4 py-3 border tracking-wide ${
                        mensaje.tipo === 'exito'
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                        {mensaje.texto}
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={handleRegistrarEntrada}
                        disabled={!isFormValid}
                        className={`group relative flex items-center gap-3 py-4 px-8 border text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                            isFormValid
                                ? "bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer"
                                : "bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-50"
                        }`}
                    >
                        <span className="material-symbols-outlined text-lg">save_alt</span>
                        {loading ? 'REGISTRANDO...' : 'REGISTRAR ENTRADA'}
                    </button>
                </div>
            </div>
        </div>
    );
}