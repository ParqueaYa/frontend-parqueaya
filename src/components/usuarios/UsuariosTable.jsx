// components/usuarios/UsuariosTable.jsx
import { UsuariosTableRow } from './UsuariosTableRow';

export function UsuariosTable({ usuarios, onEdit, onToggleStatus, onResetPassword }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-800">
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Usuario</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contacto</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Google Auth</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Estado</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 w-[280px]">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {usuarios.map((usuario, idx) => (
                        <UsuariosTableRow 
                            key={usuario.id || idx} 
                            usuario={usuario}
                            onEdit={() => onEdit(usuario)}
                            onToggleStatus={() => onToggleStatus(usuario.id)}
                            onResetPassword={() => onResetPassword(usuario.nombre)}
                        />
                    ))}
                    {usuarios.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-14">
                                <div className="flex flex-col items-center gap-2 opacity-30">
                                    <span className="material-symbols-outlined text-4xl text-slate-500">group_off</span>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                        No hay usuarios registrados
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}