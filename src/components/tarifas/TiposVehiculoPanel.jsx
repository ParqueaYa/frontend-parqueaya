'use client';

import { useState, useEffect } from 'react';
import tipoVehiculoService from '@/services/tipoVehiculoService';

const EMPTY = { nombre: '', descripcion: '' };

export function TiposVehiculoPanel({ tiposVehiculo, loading, onTiposChanged, onCerrar }) {
    const [tipoEditando, setTipoEditando] = useState(null);
    const [formVisible, setFormVisible]   = useState(false);
    const [campos, setCampos]             = useState(EMPTY);
    const [loadingForm, setLoadingForm]   = useState(false);
    const [mensaje, setMensaje]           = useState(null);

    useEffect(() => {
        if (tipoEditando) {
            setCampos({ nombre: tipoEditando.nombre ?? '', descripcion: tipoEditando.descripcion ?? '' });
        } else {
            setCampos(EMPTY);
        }
    }, [tipoEditando]);

    const set = (field) => (e) => setCampos((prev) => ({ ...prev, [field]: e.target.value }));

    const handleNuevo = () => {
        setTipoEditando(null);
        setFormVisible(true);
        setMensaje(null);
    };

    const handleEditar = (tipo) => {
        setTipoEditando(tipo);
        setFormVisible(true);
        setMensaje(null);
    };

    const handleCancelar = () => {
        setFormVisible(false);
        setTipoEditando(null);
    };

    const handleGuardar = async () => {
        const nombre = campos.nombre.trim();
        if (!nombre) return;
        setLoadingForm(true);
        setMensaje(null);
        try {
            const dto = {
                nombre,
                ...(campos.descripcion.trim() && { descripcion: campos.descripcion.trim() }),
            };
            if (tipoEditando) {
                await tipoVehiculoService.actualizar(tipoEditando.id, dto);
                setMensaje({ tipo: 'exito', texto: `Tipo "${nombre}" actualizado.` });
            } else {
                await tipoVehiculoService.crear(dto);
                setMensaje({ tipo: 'exito', texto: `Tipo "${nombre}" creado.` });
            }
            setFormVisible(false);
            setTipoEditando(null);
            onTiposChanged();
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al guardar el tipo.' });
        } finally {
            setLoadingForm(false);
        }
    };

    const handleEliminar = async (tipo) => {
        if (!window.confirm(`¿Eliminar el tipo "${tipo.nombre}"? Las tarifas asociadas podrían verse afectadas.`)) return;
        setMensaje(null);
        try {
            await tipoVehiculoService.eliminar(tipo.id);
            setMensaje({ tipo: 'exito', texto: `Tipo "${tipo.nombre}" eliminado.` });
            if (tipoEditando?.id === tipo.id) handleCancelar();
            onTiposChanged();
        } catch (error) {
            const serverMsg = error?.response?.data?.message;
            setMensaje({ tipo: 'error', texto: serverMsg || 'Error al eliminar el tipo.' });
        }
    };

    const isValid = campos.nombre.trim() && !loadingForm;
    const esEdicion = !!tipoEditando;

    return (
        <div className="mt-4 bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Tipos de vehículo
                    </h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleNuevo}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary border border-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        Nuevo
                    </button>
                    <button onClick={onCerrar} className="text-slate-500 hover:text-slate-300 transition-colors" title="Cerrar">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>
            </div>

            {mensaje && (
                <div className={`mx-4 mt-4 text-xs font-bold px-4 py-3 border tracking-wide ${
                    mensaje.tipo === 'exito'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                    {mensaje.texto}
                </div>
            )}

            {/* Mini-tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Nombre', 'Descripción', 'Acciones'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="px-4 py-8 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando...
                                </td>
                            </tr>
                        ) : tiposVehiculo.length > 0 ? (
                            tiposVehiculo.map((t) => (
                                <tr key={t.id} className={`transition-colors ${tipoEditando?.id === t.id ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'}`}>
                                    <td className="px-4 py-3 text-sm font-bold text-slate-100 uppercase">
                                        {t.nombre}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-400">
                                        {t.descripcion ?? '—'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEditar(t)}
                                                title="Editar"
                                                className="p-1.5 border border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(t)}
                                                title="Eliminar"
                                                className="p-1.5 border border-slate-700 text-slate-400 hover:border-red-500 hover:text-red-400 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-8">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-3xl text-slate-500">category</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            No hay tipos registrados
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form inline */}
            {formVisible && (
                <div className="border-t border-slate-800">
                    <div className="p-3 bg-slate-800/20 border-b border-slate-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {esEdicion ? `Editando: ${tipoEditando.nombre}` : 'Nuevo tipo'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="flex border-b border-slate-800 group">
                            <div className="w-36 bg-slate-800/30 p-3 flex items-center border-r border-slate-800 shrink-0">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                                    NOMBRE<span className="text-red-500 ml-0.5">*</span>
                                </label>
                            </div>
                            <div className="flex-1 p-2 bg-slate-900">
                                <input
                                    type="text"
                                    value={campos.nombre}
                                    onChange={set('nombre')}
                                    placeholder="Ej: MOTO"
                                    className="w-full bg-slate-950 border border-slate-700 p-2.5 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all uppercase"
                                />
                            </div>
                        </div>
                        <div className="flex group">
                            <div className="w-36 bg-slate-800/30 p-3 flex items-center border-r border-slate-800 shrink-0">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                                    DESCRIPCIÓN
                                </label>
                            </div>
                            <div className="flex-1 p-2 bg-slate-900">
                                <input
                                    type="text"
                                    value={campos.descripcion}
                                    onChange={set('descripcion')}
                                    placeholder="Opcional"
                                    className="w-full bg-slate-950 border border-slate-700 p-2.5 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-3 flex justify-end gap-2">
                        <button
                            onClick={handleCancelar}
                            className="py-2 px-5 border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-slate-500 hover:text-slate-200 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleGuardar}
                            disabled={!isValid}
                            className={`flex items-center gap-2 py-2 px-5 border text-[10px] font-black uppercase tracking-widest transition-all ${
                                isValid
                                    ? 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                                    : 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-50'
                            }`}
                        >
                            <span className={`material-symbols-outlined text-sm ${loadingForm ? 'animate-spin' : ''}`}>
                                {loadingForm ? 'autorenew' : 'save_alt'}
                            </span>
                            {loadingForm ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
