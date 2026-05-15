'use client';

export function ReportesStatistics({ totalIngresos, totalMovimientos, facturasCount }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card Ingresos */}
            <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 p-6 shadow-2xl transition-all duration-300 hover:border-amber-500/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-500/10 border border-amber-500/20">
                            <span className="material-symbols-outlined text-amber-500 text-2xl">payments</span>
                        </div>
                        <span className="text-[10px] font-bold text-amber-500/50 uppercase tracking-widest">Financiero</span>
                    </div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Recaudación Total</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-100 font-mono tracking-tighter">${totalIngresos.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">COP</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Crecimiento este mes</span>
                        <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span> +12.5%
                        </span>
                    </div>
                </div>
            </div>

            {/* Card Facturas */}
            <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 p-6 shadow-2xl transition-all duration-300 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-primary/10 border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-2xl">receipt_long</span>
                        </div>
                        <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest">Documentación</span>
                    </div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Facturas Emitidas</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-100 font-mono tracking-tighter">{facturasCount}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Doc</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Efectividad de Cobro</span>
                        <span className="text-[10px] font-bold text-slate-100 font-mono">98%</span>
                    </div>
                </div>
            </div>

            {/* Card Movimientos */}
            <div className="relative group overflow-hidden bg-slate-900 border border-slate-800 p-6 shadow-2xl transition-all duration-300 hover:border-blue-500/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-500/10 border border-blue-500/20">
                            <span className="material-symbols-outlined text-blue-500 text-2xl">swap_horiz</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-500/50 uppercase tracking-widest">Operativo</span>
                    </div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Operaciones de Auditoría</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-100 font-mono tracking-tighter">{totalMovimientos}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reg</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Vehículos en curso</span>
                        <span className="text-[10px] font-bold text-blue-400 font-mono">Ver Activos</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
