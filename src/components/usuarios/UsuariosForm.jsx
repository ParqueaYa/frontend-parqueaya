// components/usuarios/UsuariosForm.jsx
'use client';

export function UsuariosForm({ nuevoUsuario, setNuevoUsuario, crearEmpleado }) {
    const isFormValid = nuevoUsuario.nombre && nuevoUsuario.email;

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/50">
                <div className="h-4 w-1 bg-violet-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                    Registro de Empleado
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Nombre Completo</label>
                    <input
                        type="text"
                        value={nuevoUsuario.nombre}
                        onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-violet-500 outline-none transition-colors"
                        placeholder="Ej. Juan Pérez"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Correo Electrónico</label>
                    <input
                        type="email"
                        value={nuevoUsuario.email}
                        onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-violet-500 outline-none transition-colors"
                        placeholder="Ej. juan@parqueoya.com"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Rol del Sistema</label>
                    <select
                        value={nuevoUsuario.rol}
                        onChange={(e) => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-violet-500 outline-none transition-colors"
                    >
                        <option value="admin">Administrador</option>
                        <option value="empleado">Empleado</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Contraseña Inicial</label>
                    <input
                        type="password"
                        value={nuevoUsuario.password}
                        onChange={(e) => setNuevoUsuario({...nuevoUsuario, password: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 px-4 py-2 text-xs text-slate-100 focus:border-violet-500 outline-none transition-colors"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800/50">
                <button
                    onClick={crearEmpleado}
                    disabled={!isFormValid}
                    className="flex items-center gap-2 px-8 py-2.5 bg-violet-500 border border-violet-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-violet-500 transition-all disabled:opacity-50 disabled:hover:bg-violet-500 disabled:hover:text-white"
                >
                    <span className="material-symbols-outlined text-base">save</span>
                    Guardar Usuario
                </button>
            </div>
        </div>
    );
}