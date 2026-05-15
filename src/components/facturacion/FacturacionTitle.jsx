// components/facturacion/FacturacionTitle.jsx
export function FacturacionTitle() {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
                <span className="material-symbols-outlined text-primary text-2xl">receipt_long</span>
                <h2 className="text-xl font-black uppercase tracking-widest text-slate-100">
                    Facturación
                </h2>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 pl-9">
                Módulo de facturación y cobros de parqueadero
            </p>
        </div>
    );
}