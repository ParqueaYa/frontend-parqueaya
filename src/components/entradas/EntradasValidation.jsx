// components/entradas/EntradasValidation.jsx
export function EntradasValidation() {
    return (
        <div className="mt-6 max-w-[800px] bg-slate-950 border-l-4 border-orange-600/80 shadow-lg overflow-hidden group">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-950/20 to-transparent">

                <div className="flex-shrink-0">
                    <span className="material-symbols-outlined text-orange-500 text-2xl animate-pulse">
                        warning
                    </span>
                </div>

                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                            Protocolo de Validación
                        </span>
                        <span className="h-[1px] w-4 bg-orange-900"></span>
                        <span className="text-[9px] font-mono text-slate-500">SYS-ERR_409</span>
                    </div>

                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                        <strong className="text-white font-bold tracking-wide">RESTRICCIÓN:</strong> No se permite el registro de <span className="text-orange-400/90 underline decoration-orange-900 underline-offset-4">placas duplicadas</span> activos en el sistema.
                    </p>
                </div>

                <div className="ml-auto opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="w-8 h-8 border-t border-r border-orange-500"></div>
                </div>
            </div>

            <div className="h-[1px] w-full bg-slate-800">
                <div className="h-full w-1/3 bg-orange-600/40"></div>
            </div>
        </div>
    );
}