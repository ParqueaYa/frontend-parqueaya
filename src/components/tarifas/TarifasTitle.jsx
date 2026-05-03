export function TarifasTitle() {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
                <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                <h2 className="text-xl font-black uppercase tracking-widest text-slate-100">
                    Tarifas
                </h2>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 pl-9">
                Configuración de tarifas por tipo de vehículo y modalidad
            </p>
        </div>
    );
}
