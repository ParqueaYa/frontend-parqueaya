'use client';

import { useState, useEffect } from 'react';

const EMPTY = { nombre: '', apellido: '', cedula: '', telefono: '', email: '' };

export function ClientesForm({ clienteEditando, onGuardar, onCancelar, loading }) {
    const [campos, setCampos] = useState(EMPTY);

    useEffect(() => {
        if (clienteEditando) {
            setCampos({
                nombre:   clienteEditando.nombre   ?? '',
                apellido: clienteEditando.apellido  ?? '',
                cedula:   clienteEditando.cedula    ?? '',
                telefono: clienteEditando.telefono  ?? '',
                email:    clienteEditando.email     ?? '',
            });
        } else {
            setCampos(EMPTY);
        }
    }, [clienteEditando]);

    const set = (field) => (e) => setCampos((prev) => ({ ...prev, [field]: e.target.value }));

    const isValid = campos.nombre.trim() && campos.apellido.trim() && campos.cedula.trim() && !loading;

    const handleSubmit = () => {
        if (!isValid) return;
        const dto = {
            nombre:   campos.nombre.trim(),
            apellido: campos.apellido.trim(),
            cedula:   campos.cedula.trim(),
            ...(campos.telefono.trim() && { telefono: campos.telefono.trim() }),
            ...(campos.email.trim()    && { email:    campos.email.trim() }),
        };
        onGuardar(dto);
    };

    const esEdicion = !!clienteEditando;

    const rows = [
        { label: 'NOMBRE',    field: 'nombre',   placeholder: 'Juan',              required: true },
        { label: 'APELLIDO',  field: 'apellido',  placeholder: 'Pérez',             required: true },
        { label: 'CÉDULA',    field: 'cedula',    placeholder: '1234567890',        required: true },
        { label: 'TELÉFONO',  field: 'telefono',  placeholder: '3001234567',        required: false },
        { label: 'EMAIL',     field: 'email',     placeholder: 'correo@ejemplo.com', required: false },
    ];

    return (
        <div className="mt-4 bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        {esEdicion
                            ? `Editando: ${clienteEditando.nombre} ${clienteEditando.apellido}`
                            : 'Nuevo Cliente'}
                    </h3>
                </div>
                <button
                    onClick={onCancelar}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                    title="Cerrar"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            {/* Rows */}
            <div className="grid grid-cols-1">
                {rows.map(({ label, field, placeholder, required }) => (
                    <div key={field} className="flex border-b border-slate-800 group">
                        <div className="w-40 bg-slate-800/30 p-4 flex items-center border-r border-slate-800 shrink-0">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">
                                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                            </label>
                        </div>
                        <div className="flex-1 p-2 bg-slate-900">
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                value={campos[field]}
                                onChange={set(field)}
                                placeholder={placeholder}
                                className="w-full bg-slate-950 border border-slate-700 p-3 text-sm text-white placeholder:text-slate-700 focus:border-primary focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                ))}
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
                    <span className="material-symbols-outlined text-base">
                        {loading ? 'autorenew' : 'save_alt'}
                    </span>
                    {loading ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Crear Cliente'}
                </button>
            </div>
        </div>
    );
}
