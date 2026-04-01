// components/salidas/SalidasTitle.jsx
export function SalidasTitle() {
    return (
        <div className="relative max-w-[800px] mb-6 overflow-hidden group">
            <div className="bg-slate-900 border border-slate-800 p-5 shadow-xl flex items-center gap-4">

                {/* Indicador Vertical de Estado */}
                <div className="h-8 w-1.5 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.4)]"></div>

                <div className="flex flex-col">
                    <h1 className="text-xl font-black text-white tracking-[0.25em] uppercase italic">
                        Registro de <span className="text-orange-500">Salidas</span>
                    </h1>

                    <div className="flex items-center gap-2 mt-1">
                        <span className="h-[1px] w-8 bg-slate-700"></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Módulo de Liquidación y Despacho v1.0
                        </span>
                    </div>
                </div>

                <div className="absolute right-6 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-6xl text-white">
                        logout
                    </span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-600/50 to-transparent"></div>
        </div>
    );
}