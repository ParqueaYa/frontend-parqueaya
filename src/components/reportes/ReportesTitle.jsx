'use client';

export function ReportesTitle() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-5">
                <div className="relative">
                    <div className="w-14 h-14 bg-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(231,126,35,0.3)]">
                        <span className="material-symbols-outlined text-white text-3xl">insights</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 border-2 border-slate-950 flex items-center justify-center">
                        <span className="material-symbols-outlined text-amber-500 text-[10px] font-bold animate-pulse">monitoring</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-2">
                        Inteligencia de Negocio
                        <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 border border-amber-500/20 tracking-widest">PRO</span>
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">
                        Consolidado de Operaciones y Auditoría Financiera
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-amber-500/20" />
                <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Última Actualización</span>
                    <span className="block text-[10px] font-mono text-amber-500/70">{new Date().toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
