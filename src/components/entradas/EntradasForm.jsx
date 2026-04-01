// components/entradas/EntradasForm.jsx
'use client';

import { useState, useEffect } from "react";

export function EntradasForm() {
    const [placa, setPlaca] = useState("");
    const [tipoVehiculo, setTipoVehiculo] = useState("auto");
    const [cupo, setCupo] = useState("");

    // Inicializamos en null para evitar el error de hidratación de Next.js
    const [horaActual, setHoraActual] = useState(null);
    const [fechaActual, setFechaActual] = useState(null);

    useEffect(() => {
        // Definimos una función interna para actualizar el estado
        const actualizarReloj = () => {
            const ahora = new Date();
            setHoraActual(ahora.toLocaleTimeString());
            setFechaActual(ahora.toLocaleDateString());
        };

        // La llamamos una vez para que no aparezca vacío al montar
        actualizarReloj();

        // Configuramos el intervalo
        const timer = setInterval(actualizarReloj, 1000);

        return () => clearInterval(timer);
    }, []); // El array vacío asegura que solo se ejecute al montar

    const cuposDisponibles = [
        "A-1", "A-2", "A-5", "A-12", "A-15",
        "B-3", "B-7", "B-10", "B-14",
        "C-2", "C-6", "C-9",
        "M-1", "M-2", "M-3", "M-4", "M-5"
    ];

    const handleRegistrarEntrada = () => {
        alert(`Entrada registrada:\nPlaca: ${placa}\nTipo: ${tipoVehiculo}\nCupo: ${cupo}\nFecha: ${fechaActual}\nHora: ${horaActual}`);
        setPlaca("");
        setCupo("");
    };

    // Mantenemos tu validación original de >= 5 caracteres
    const isFormValid = placa.length >= 5 && cupo !== "";

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

            {/* Footer / Botón */}
            <div className="p-6 bg-slate-900 flex justify-end">
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
                    REGISTRAR ENTRADA
                </button>
            </div>
        </div>
    );
}