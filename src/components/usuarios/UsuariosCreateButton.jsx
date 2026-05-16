// components/usuarios/UsuariosCreateButton.jsx
'use client';

export function UsuariosCreateButton({ mostrarFormulario, setMostrarFormulario }) {
    return (
        <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className={`flex items-center gap-2 px-6 py-2.5 border text-[10px] font-black uppercase tracking-widest transition-all ${
                mostrarFormulario
                    ? 'bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20'
                    : 'bg-violet-500 border-violet-500 text-white hover:bg-transparent hover:text-violet-500'
            }`}
        >
            <span className="material-symbols-outlined text-base">
                {mostrarFormulario ? 'close' : 'person_add'}
            </span>
            {mostrarFormulario ? "Cancelar" : "Nuevo Usuario"}
        </button>
    );
}