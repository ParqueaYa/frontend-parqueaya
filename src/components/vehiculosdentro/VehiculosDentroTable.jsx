import Link from 'next/link';

const calcularTiempo = (fechaIngreso) => {
    const diff = Date.now() - new Date(fechaIngreso).getTime();
    if (diff < 0) return '0m';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const formatFecha = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
};

const truncar = (texto, max = 40) => {
    if (!texto) return '—';
    return texto.length > max ? `${texto.slice(0, max)}…` : texto;
};

export function VehiculosDentroTable({ registros, loading, tick }) {
    // tick es un prop que cambia cada 60s para forzar recálculo del tiempo sin fetch
    void tick;

    return (
        <div className="bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center gap-2">
                <div className="h-4 w-1 bg-primary" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                    Registro de vehículos activos
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Placa', 'Tipo', 'Hora de ingreso', 'Tiempo dentro', 'Observaciones', 'Acciones'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-4 py-10 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando vehículos activos...
                                </td>
                            </tr>
                        ) : registros.length > 0 ? (
                            registros.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-4 text-sm font-bold text-slate-100 tracking-widest font-mono">
                                        {r.vehiculo?.placa ?? '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-400 uppercase">
                                        {r.vehiculo?.tipoVehiculo?.nombre ?? '—'}
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-400">
                                        {formatFecha(r.fechaIngreso)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-xs font-black text-primary tracking-widest">
                                            {r.fechaIngreso ? calcularTiempo(r.fechaIngreso) : '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-500 italic">
                                        {truncar(r.observaciones)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <Link
                                            href={`/salidas?placa=${r.vehiculo?.placa ?? ''}`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 border border-orange-700 text-orange-500 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500/10 transition-colors w-fit"
                                        >
                                            <span className="material-symbols-outlined text-sm">logout</span>
                                            Registrar salida
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-16">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-4xl text-slate-500">garage</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            El parqueadero está vacío
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
