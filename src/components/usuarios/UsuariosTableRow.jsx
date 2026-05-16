// components/usuarios/UsuariosTableRow.jsx
'use client';

export function UsuariosTableRow({ usuario, onEdit, onToggleStatus, onResetPassword }) {
    const isActivo = usuario.estado === "Activo";

    return (
        <tr className={`group transition-all duration-300 ${!isActivo ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : 'hover:bg-violet-500/[0.03]'}`}>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black transition-colors uppercase ${
                        isActivo 
                            ? 'bg-slate-800 border-slate-700 text-slate-400 group-hover:border-violet-500/30' 
                            : 'bg-red-500/10 border-red-500/30 text-red-500'
                    }`}>
                        {usuario.nombre.substring(0, 2)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors">
                            {usuario.nombre} {usuario.id === 1 && <span className="ml-1 text-[10px] text-violet-400">(Tú)</span>}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">{usuario.rol}</span>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-xs font-mono text-slate-400">
                    {usuario.email}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    {usuario.google === "Sí" ? (
                        <span className="material-symbols-outlined text-slate-400 text-sm">verified</span>
                    ) : (
                        <span className="material-symbols-outlined text-slate-600 text-sm">cancel</span>
                    )}
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{usuario.google}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] border ${
                    isActivo 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                    {usuario.estado}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="w-8 h-8 rounded bg-slate-800 hover:bg-violet-500 text-slate-400 hover:text-white border border-slate-700 hover:border-violet-500 transition-colors flex items-center justify-center"
                        title="Editar Usuario"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                        onClick={onResetPassword}
                        className="w-8 h-8 rounded bg-slate-800 hover:bg-amber-500 text-slate-400 hover:text-white border border-slate-700 hover:border-amber-500 transition-colors flex items-center justify-center"
                        title="Resetear Contraseña"
                    >
                        <span className="material-symbols-outlined text-sm">key</span>
                    </button>
                    <button
                        onClick={onToggleStatus}
                        className="w-8 h-8 rounded bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white border border-slate-700 hover:border-red-500 transition-colors flex items-center justify-center"
                        title={isActivo ? "Desactivar" : "Activar"}
                    >
                        <span className="material-symbols-outlined text-sm">{isActivo ? "person_off" : "how_to_reg"}</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}