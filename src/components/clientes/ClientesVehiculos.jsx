export function ClientesVehiculos({ cliente, vehiculos, loading, onCerrar }) {
    return (
        <div className="mt-4 bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-100">
                        Vehículos de {cliente.nombre} {cliente.apellido}
                    </h3>
                </div>
                <button
                    onClick={onCerrar}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                    title="Cerrar"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30">
                            {['Placa', 'Tipo de vehículo'].map((col) => (
                                <th key={col} className="px-4 py-3 border-b border-slate-800 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan="2" className="px-4 py-8 text-center text-xs font-bold uppercase text-slate-400 tracking-widest">
                                    <span className="material-symbols-outlined animate-spin text-primary align-middle mr-2">autorenew</span>
                                    Cargando vehículos...
                                </td>
                            </tr>
                        ) : vehiculos.length > 0 ? (
                            vehiculos.map((v) => (
                                <tr key={v.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-3 text-sm font-bold text-slate-100 tracking-widest font-mono">
                                        {v.placa}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-400 uppercase">
                                        {v.tipoVehiculo?.nombre ?? '—'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-10">
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <span className="material-symbols-outlined text-3xl text-slate-500">no_crash</span>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                            Este cliente no tiene vehículos registrados
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
