// components/salidas/SalidasActions.jsx
export function SalidasActions({ finalizarSalida }) {
    return (
        <div className="max-w-[800px] mt-6 space-y-4">

            <div className="bg-orange-600/5 border border-orange-600/20 p-4 flex items-start gap-4 shadow-lg">
                <div className="mt-1">
                    <span className="material-symbols-outlined text-orange-500 text-xl animate-pulse">
                        info
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                        Protocolo de Cierre:
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                        Al ejecutar la acción, el sistema <span className="text-slate-200 font-bold uppercase">liberará el cupo</span>,
                        procesará el <span className="text-slate-200 font-bold uppercase">registro contable</span> y
                        archivará la transacción en el historial.
                    </p>
                </div>
            </div>

            {/* Botón Principal */}
            <div className="flex justify-end pt-2">
                <button
                    onClick={finalizarSalida}
                    className="group relative flex items-center gap-4 py-4 px-10 bg-orange-600 border border-orange-500 text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-transparent hover:text-orange-500 overflow-hidden shadow-[0_0_20px_rgba(234,88,12,0.1)]"
                >
                    <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out"></div>

                    <span className="material-symbols-outlined text-lg">
                        check_circle
                    </span>
                    FINALIZAR PROCESO DE SALIDA
                </button>
            </div>

            <div className="flex items-center gap-2 px-2 opacity-50">
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter italic">
                    Ready to dispatch
                </span>
                <div className="h-[1px] flex-1 bg-slate-800"></div>
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter italic px-2 border border-slate-800">
                    ID: SYS-OUT-2026
                </span>
            </div>
        </div>
    );
}