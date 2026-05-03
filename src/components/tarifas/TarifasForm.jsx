'use client';

import { useState, useEffect } from 'react';

const EMPTY = { tipoVehiculoId: '', tipoTarifa: '', monto: '', activa: true };
const TIPOS_TARIFA = ['HORA', 'DIA', 'MENSUALIDAD'];

export function TarifasForm({ tarifaEditando, tiposVehiculo, onGuardar, onCancelar, loading }) {
    const [campos, setCampos] = useState(EMPTY);

    useEffect(() => {
        if (tarifaEditando) {
            setCampos({
                tipoVehiculoId: tarifaEditando.tipoVehiculo?.id ?? '',
                tipoTarifa:     tarifaEditando.tipoTarifa ?? '',
                monto:          tarifaEditando.monto ?? '',
                activa:         tarifaEditando.activa ?? true,
            });
        } else {
            setCampos(EMPTY);
        }
    }, [tarifaEditando]);

    const set = (field) => (e) => setCampos((prev) => ({ ...prev, [field]: e.target.value }));
    const toggleActiva = () => setCampos((prev) => ({ ...prev, activa: !prev.activa }));

    const isValid = campos.tipoVehiculoId && campos.tipoTarifa && campos.monto !== '' && Number(campos.monto) >= 0 && !loading;

    const handleSubmit = () => {
        if (!isValid) return;
        onGuardar({
            tipoVehiculoId: Number(campos.tipoVehiculoId),
            tipoTarifa:     campos.tipoTarifa,
            monto:          Number(campos.monto),
            activa:         campos.activa,
        });
    };

    const esEdicion = !!tarifaEditando;

    return (
        <div className="mt-4 bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        {esEdicion ? 'Editar tarifa' : 'Nueva tarifa'}
                    </h3>
                </div>
                <button onClick={onCancelar} className="text-slate-500 hover:text-slate-300 transition-colors" title="Cerrar">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            <div className="grid grid-cols-1">
                {/* Tipo de vehículo */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            VEHÍCULO<span className="text-red-500 ml-0.5">*</span>
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

                {/* Tipo de tarifa */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            MODALIDAD<span className="text-red-500 ml-0.5">*</span>
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <select
                            value={campos.tipoTarifa}
                            onChange={set('tipoTarifa')}
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white focus:border-primary focus:outline-none transition-all cursor-pointer"
                        >
                            <option value="" disabled className="text-slate-600">Seleccione una modalidad...</option>
                            {TIPOS_TARIFA.map((tipo) => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Monto */}
                <div className="flex border-b border-slate-800 group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            MONTO (COP)<span className="text-red-500 ml-0.5">*</span>
                        </label>
                    </div>
                    <div className="flex-1 p-2 bg-slate-900">
                        <input
                            type="number"
                            value={campos.monto}
                            onChange={set('monto')}
                            placeholder="0"
                            min="0"
                            step="any"
                            className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Activa */}
                <div className="flex group">
                    <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                            ACTIVA
                        </label>
                    </div>
                    <div className="flex-1 p-4 bg-slate-900 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleActiva}
                            className={`w-5 h-5 border flex items-center justify-center transition-all ${
                                campos.activa
                                    ? 'bg-primary border-primary'
                                    : 'bg-transparent border-slate-700'
                            }`}
                        >
                            {campos.activa && (
                                <span className="material-symbols-outlined text-white text-sm">check</span>
                            )}
                        </button>
                        <span className="text-xs text-slate-400">
                            {campos.activa ? 'La tarifa estará disponible para aplicar' : 'La tarifa quedará desactivada'}
                        </span>
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
                    {loading ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Crear tarifa'}
                </button>
            </div>
        </div>
    );
}
