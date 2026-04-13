// components/entradas/EntradasForm.jsx
'use client';

import { useState, useEffect } from "react";
import cupoService from "@/services/cupoService";
import vehiculoService from "@/services/vehiculoService";

export function EntradasForm() {
    const [placa, setPlaca] = useState("");
    const [tipoVehiculo, setTipoVehiculo] = useState("auto");
    const [cupo, setCupo] = useState("");
    const [cuposDisponibles, setCuposDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [horaActual, setHoraActual] = useState(null);
    const [fechaActual, setFechaActual] = useState(null);

    const cargarCupos = async () => {
        try {
            const cupos = await cupoService.obtenerCuposDisponibles();
            setCuposDisponibles(cupos);
        } catch (error) {
            console.error("[EntradasForm] Error al cargar cupos iniciales:", error);
        }
    };

    useEffect(() => {
        const actualizarReloj = () => {
            const ahora = new Date();
            setHoraActual(ahora.toLocaleTimeString());
            setFechaActual(ahora.toLocaleDateString());
        };

        actualizarReloj();
        const timer = setInterval(actualizarReloj, 1000);

        // Cargar cupos desde el servicio cada vez que se monta el componente
        cargarCupos();

        return () => clearInterval(timer);
    }, []);

    const [mensaje, setMensaje] = useState(null); // { tipo: 'exito'|'error', texto: string }

    const handleRegistrarEntrada = async () => {
        setLoading(true);
        setMensaje(null);
        try {
            await vehiculoService.registrarEntrada({
                placa,
                tipoVehiculo,
                cupo,
                fechaEntrada: fechaActual,
                horaEntrada: horaActual
            });
            setMensaje({ tipo: 'exito', texto: `✅ Vehículo ${placa} registrado exitosamente.` });
            setPlaca('');
            setCupo('');
            // Refresco: Recargar cupos disponibles para que el recién usado ya no aparezca
            await cargarCupos();
        } catch (error) {
            const status = error?.response?.status;
            let texto = 'Error al registrar. Intente nuevamente.';
            if (status === 401) texto = '⚠️ Sesión expirada. Por favor inicie sesión nuevamente.';
            if (status === 403) texto = '🔒 Acceso denegado (403). Su sesión no tiene permisos o el token JWT no es válido.';
            if (status === 400) texto = `❌ Datos incorrectos: ${error?.response?.data?.message || 'Revise los campos del formulario.'}`;
            console.error(`[EntradasForm] Error ${status ?? 'desconocido'} al registrar entrada:`, error?.response?.data || error.message);
            setMensaje({ tipo: 'error', texto });
        } finally {
            setLoading(false);
        }
    };


    // validación >= 5 caracteres
    const isFormValid = placa.length >= 5 && cupo !== "" && !loading;

    return (
        <div className="max-w-[800px] bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header del Formulario */}
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
                            placeholder="ABC-123"
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white font-bold tracking-widest placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all uppercase"
                        />
                    </div>
                </div>

                {/* Fila: TIPO VEHÍCULO */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-48 bg-slate-800/30 p-4 flex items-center border-r border-slate-800">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            TIPO VEHÍCULO:
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <select
                            value={tipoVehiculo}
                            onChange={(e) => setTipoVehiculo(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white font-bold uppercase tracking-wider focus:border-primary focus:outline-none cursor-pointer appearance-none"
                        >
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                            <option value="camioneta">Camioneta</option>
                            <option value="camion">Camión</option>
                        </select>
                    </div>
                </div>

                {/* Fila: SELECCIONAR CUPO */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-48 bg-slate-800/30 p-4 flex items-center border-r border-slate-800">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            SELECCIONAR CUPO:
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <select
                            value={cupo}
                            onChange={(e) => setCupo(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white font-bold uppercase tracking-wider focus:border-primary focus:outline-none cursor-pointer"
                        >
                            <option value="">-- SELECCIONAR CUPO DISPONIBLE --</option>
                            {cuposDisponibles.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
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
                {/* Banner de mensaje */}
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