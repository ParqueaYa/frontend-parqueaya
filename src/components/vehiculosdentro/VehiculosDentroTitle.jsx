export function VehiculosDentroTitle({ total, ultimaActualizacion, refreshing, onRefrescar }) {
    const horaActualizacion = ultimaActualizacion
        ? ultimaActualizacion.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : null;

    return (
        <div className="mb-6 flex items-start justify-between gap-4">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="material-symbols-outlined text-primary text-2xl">local_parking</span>
                    <h2 className="text-xl font-black uppercase tracking-widest text-slate-100">
                        Vehículos dentro
                    </h2>
                    <span className="px-2 py-0.5 border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                        {total} {total === 1 ? 'ACTIVO' : 'ACTIVOS'}
                    </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 pl-9">
                    {horaActualizacion
                        ? `Actualizado: ${horaActualizacion}`
                        : 'Cargando...'}
                </p>
            </div>

            <button
                onClick={onRefrescar}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
                <span className={`material-symbols-outlined text-sm ${refreshing ? 'animate-spin' : ''}`}>
                    refresh
                </span>
                Actualizar
            </button>
        </div>
    );
}
