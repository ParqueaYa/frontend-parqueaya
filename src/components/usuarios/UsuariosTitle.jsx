// components/usuarios/UsuariosTitle.jsx
export function UsuariosTitle() {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-violet-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="material-symbols-outlined text-violet-500 text-3xl relative z-10">manage_accounts</span>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-px w-6 bg-violet-500"></div>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-violet-500 uppercase">Administración</span>
                </div>
                <h2 className="text-2xl font-black text-slate-100 tracking-tight uppercase">Gestión de Usuarios</h2>
            </div>
        </div>
    );
}